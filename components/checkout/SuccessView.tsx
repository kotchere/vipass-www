"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";

export type SuccessViewProps = {
  eventId: string;
  eventTitle: string;
  userId: string;
  /** Free / Paystack: the order already exists. */
  orderId?: string;
  /** Stripe: the order is created by `stripe-webhook`, so we poll for it. */
  paymentIntentId?: string;
  /** Epoch ms when the page was first rendered — the 60 s poll budget starts here. */
  startedAt: number;
  /** Stripe's `redirect_status` when it bounced back through `return_url`. */
  redirectStatus?: string;
};

type TicketRow = { id: string; status: string; ticket_types: { name: string } | null };

type ViewState =
  | { kind: "loading" }
  | { kind: "ready"; tickets: TicketRow[] }
  | { kind: "timeout" }
  | { kind: "error"; message: string }
  | { kind: "not_found" }
  | { kind: "redirect_failed" };

const POLL_MS = 2_000;
const POLL_BUDGET_MS = 60_000;
const TICKET_SELECT = "id, status, ticket_types(name)";

function groupByType(tickets: TicketRow[]): { name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const t of tickets) {
    const name = t.ticket_types?.name ?? "Ticket";
    counts.set(name, (counts.get(name) ?? 0) + 1);
  }
  return [...counts.entries()].map(([name, count]) => ({ name, count }));
}

/** Loads (or, after Stripe, polls for) the tickets of a just-completed order. */
export default function SuccessView({
  eventId,
  eventTitle,
  userId,
  orderId,
  paymentIntentId,
  startedAt,
  redirectStatus,
}: SuccessViewProps) {
  const redirectFailed = !!redirectStatus && redirectStatus !== "succeeded";
  const [state, setState] = useState<ViewState>(() => {
    if (redirectFailed) return { kind: "redirect_failed" };
    if (!orderId && !paymentIntentId) return { kind: "not_found" };
    return { kind: "loading" };
  });

  useEffect(() => {
    if (redirectFailed || (!orderId && !paymentIntentId)) return;
    const supabase = createClient();
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const deadline = Math.max(startedAt, Date.now() - POLL_MS) + POLL_BUDGET_MS;

    async function resolveOrderId(): Promise<string | null> {
      if (orderId) return orderId;
      const { data, error } = await supabase
        .from("ticket_orders")
        .select("id")
        .eq("payment_intent_id", paymentIntentId!)
        .eq("user_id", userId)
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return (data as { id: string } | null)?.id ?? null;
    }

    async function tick() {
      try {
        const id = await resolveOrderId();
        let tickets: TicketRow[] = [];
        if (id) {
          const { data, error } = await supabase
            .from("tickets")
            .select(TICKET_SELECT)
            .eq("order_id", id)
            .eq("owner_id", userId)
            .order("created_at", { ascending: true });
          if (error) throw error;
          tickets = (data ?? []) as unknown as TicketRow[];
        }
        if (cancelled) return;
        if (tickets.length > 0) {
          setState({ kind: "ready", tickets });
          return;
        }
        if (Date.now() >= deadline) {
          setState({ kind: "timeout" });
          return;
        }
        timer = setTimeout(tick, POLL_MS);
      } catch (e) {
        if (cancelled) return;
        console.error("[success] ticket lookup failed", e);
        setState({ kind: "error", message: "We couldn't load your tickets right now." });
      }
    }

    tick();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [orderId, paymentIntentId, userId, startedAt, redirectFailed]);

  const eventHref = `/events/${eventId}`;

  const links = (
    <div className="vp-row">
      <Link className="vp-btn vp-btn-primary" href="/tickets">
        View my tickets
      </Link>
      <Link className="vp-btn vp-btn-secondary" href={eventHref}>
        Back to event
      </Link>
    </div>
  );

  switch (state.kind) {
    case "loading":
      return (
        <div className="vp-card vp-stack vp-center" aria-busy="true">
          <p className="vp-title vp-title--sm">Confirming your payment…</p>
          <p className="vp-muted">Hang tight — this usually takes a few seconds.</p>
        </div>
      );

    case "timeout":
      return (
        <div className="vp-card vp-stack">
          <p className="vp-title vp-title--sm">Still processing</p>
          <p className="vp-muted">
            Your payment went through, but the tickets are taking a moment to appear. Check My Tickets or
            your email in a minute.
          </p>
          {links}
        </div>
      );

    case "error":
      return (
        <div className="vp-card vp-stack">
          <p className="vp-title vp-title--sm">Something went wrong</p>
          <p className="vp-error" role="alert">
            {state.message}
          </p>
          <p className="vp-muted">Your tickets are safe — they&apos;ll be in My Tickets and in your email.</p>
          {links}
        </div>
      );

    case "not_found":
      return (
        <div className="vp-card vp-stack">
          <p className="vp-title vp-title--sm">No order to show</p>
          <p className="vp-muted">This link doesn&apos;t point at an order. Your tickets, if any, are in My Tickets.</p>
          {links}
        </div>
      );

    case "redirect_failed":
      return (
        <div className="vp-card vp-stack">
          <p className="vp-title vp-title--sm">Payment not completed</p>
          <p className="vp-muted">
            Your bank didn&apos;t approve this payment, so nothing was charged. You can try again from the
            event page.
          </p>
          <div className="vp-row">
            <Link className="vp-btn vp-btn-primary" href={eventHref}>
              Try again
            </Link>
            <Link className="vp-btn vp-btn-secondary" href="/tickets">
              My tickets
            </Link>
          </div>
        </div>
      );

    case "ready": {
      const groups = groupByType(state.tickets);
      const total = state.tickets.length;
      return (
        <div className="vp-card vp-stack" data-checkout="success">
          <div className="vp-stack vp-stack--tight">
            <p className="vp-title vp-title--sm">You&apos;re in!</p>
            <p className="vp-muted">
              {total === 1 ? "Your ticket" : `Your ${total} tickets`} for <strong>{eventTitle}</strong>{" "}
              {total === 1 ? "is" : "are"} confirmed.
            </p>
          </div>
          <ul className="vp-checkout-tickets" aria-label="Your tickets">
            {groups.map((g) => (
              <li key={g.name} className="vp-checkout-tickets__row">
                <span>{g.name}</span>
                <span className="vp-muted">× {g.count}</span>
              </li>
            ))}
          </ul>
          <p className="vp-muted vp-small">
            We&apos;ve also emailed your {total === 1 ? "ticket" : "tickets"} to you. Show the QR code from My
            Tickets or the Vipass app at the door.
          </p>
          {links}
        </div>
      );
    }
  }
}
