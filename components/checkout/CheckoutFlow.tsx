"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import RefundToggle from "@/components/checkout/RefundToggle";
import StripeCheckout from "@/components/checkout/StripeCheckout";
import TicketSelector from "@/components/checkout/TicketSelector";
import { GENERIC_ERROR_COPY, INVENTORY_CHANGED_CODES } from "@/lib/edge-errors";
import { getSiteUrl } from "@/lib/env";
import { formatPrice } from "@/lib/event-state";
import {
  EdgeError,
  FALLBACK_REFUND_PROTECTION_PERCENT,
  fetchRefundProtectionPercent,
  fetchUserTicketCounts,
  startFreeOrder,
  startPaystackPayment,
  startStripePayment,
  takeCheckoutStash,
  writeCheckoutStash,
  type StripeSession,
} from "@/lib/payment";
import { createClient } from "@/lib/supabase/client";
import {
  clampSelections,
  computeTotals,
  defaultChannelsForCurrency,
  getPaymentProviderForCurrency,
  selectionCount,
  type TicketSelection,
  type UserTicketCounts,
} from "@/lib/ticket-math";
import type { TicketType } from "@/lib/types";

export type CheckoutFlowProps = {
  event: { id: string; title: string; currency: string };
  ticketTypes: TicketType[];
  signedIn: boolean;
};

type Phase = { kind: "select" } | { kind: "stripe"; session: StripeSession; totalLabel: string };

function toSelections(quantities: Record<string, number>): TicketSelection[] {
  return Object.entries(quantities)
    .filter(([, quantity]) => quantity > 0)
    .map(([ticket_type_id, quantity]) => ({ ticket_type_id, quantity }));
}

function toQuantities(selections: TicketSelection[]): Record<string, number> {
  return Object.fromEntries(selections.map((s) => [s.ticket_type_id, s.quantity]));
}

/**
 * Ticket selection → provider hand-off. Rendered by `TicketCta` only while
 * the event is `on_sale`. Free totals create the order directly; Paystack
 * currencies leave for the hosted page; everything else shows the Stripe
 * Payment Element inline.
 */
export default function CheckoutFlow({ event, ticketTypes, signedIn }: CheckoutFlowProps) {
  const router = useRouter();

  const [rawQuantities, setRawQuantities] = useState<Record<string, number>>({});
  const [refundWanted, setRefundWanted] = useState(false);
  const [refundPct, setRefundPct] = useState(FALLBACK_REFUND_PROTECTION_PERCENT);
  const [userCounts, setUserCounts] = useState<UserTicketCounts>({});
  const [phase, setPhase] = useState<Phase>({ kind: "select" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Refund-protection percent (public, no auth) — falls back to 10 like the app.
  useEffect(() => {
    let cancelled = false;
    fetchRefundProtectionPercent().then((pct) => {
      if (!cancelled) setRefundPct(pct);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const loadUserCounts = useCallback(async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return {};
    return fetchUserTicketCounts(event.id, user.id);
  }, [event.id]);

  // Signed in: per-type active counts (drives max_per_user), then restore any
  // selection stashed before the login round-trip.
  useEffect(() => {
    if (!signedIn) return;
    let cancelled = false;
    loadUserCounts().then((counts) => {
      if (cancelled) return;
      setUserCounts(counts);
      const stash = takeCheckoutStash(event.id);
      if (stash && stash.selections.length > 0) {
        setRawQuantities(toQuantities(stash.selections));
        setRefundWanted(stash.refundProtectionEnabled);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [signedIn, event.id, loadUserCounts]);

  // Derived, never stored: the selection is re-clamped against whatever the
  // server last sent (router.refresh() after an inventory error swaps the
  // `ticketTypes` prop) so a stale "+3" can't outlive a sold-out row.
  const selections = useMemo(
    () => clampSelections(toSelections(rawQuantities), ticketTypes, userCounts),
    [rawQuantities, ticketTypes, userCounts],
  );
  const quantities = useMemo(() => toQuantities(selections), [selections]);
  const totals = useMemo(
    () => computeTotals(selections, ticketTypes, refundPct, refundWanted),
    [selections, ticketTypes, refundPct, refundWanted],
  );
  const count = selectionCount(selections);
  const currency = totals.currency || event.currency;
  const showRefundToggle = totals.subtotalCents > 0;
  const refundEnabled = showRefundToggle && refundWanted;
  const isFree = totals.totalCents <= 0;
  const totalLabel = formatPrice(totals.totalCents, currency);

  const handleQuantity = useCallback((ticketTypeId: string, quantity: number) => {
    setError(null);
    setRawQuantities((prev) => {
      if (quantity <= 0) {
        const { [ticketTypeId]: _removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [ticketTypeId]: quantity };
    });
  }, []);

  async function handleSubmit() {
    if (count === 0 || busy) return;
    setError(null);

    const eventPath = `/events/${event.id}`;

    if (!signedIn) {
      writeCheckoutStash(event.id, { selections, refundProtectionEnabled: refundEnabled });
      router.push(`/login?next=${encodeURIComponent(eventPath)}`);
      return;
    }

    setBusy(true);
    const input = { eventId: event.id, selections, refundProtectionEnabled: refundEnabled };

    try {
      if (isFree) {
        const { orderId } = await startFreeOrder(input);
        router.push(`${eventPath}/success?order=${encodeURIComponent(orderId)}`);
        return; // stay busy while navigating
      }

      if (getPaymentProviderForCurrency(currency) === "paystack") {
        await startPaystackPayment(input, {
          channels: defaultChannelsForCurrency(currency),
          callbackUrl: `${getSiteUrl()}${eventPath}/paystack-return`,
        });
        return; // never resolves — the browser has left for Paystack
      }

      const session = await startStripePayment(input);
      setPhase({ kind: "stripe", session, totalLabel });
    } catch (e) {
      setError(e instanceof Error && e.message ? e.message : GENERIC_ERROR_COPY);

      const code = e instanceof EdgeError ? e.code : undefined;
      if (code && INVENTORY_CHANGED_CODES.has(code)) {
        // The server's counts moved under us: re-fetch ticket types (the page
        // re-renders with fresh props and the derived selection re-clamps),
        // refresh the per-user counts, and pull the offending line down now.
        router.refresh();
        loadUserCounts().then(setUserCounts).catch(() => {});
        const extras = e instanceof EdgeError ? e.extras : {};
        const ttId = typeof extras.ticket_type_id === "string" ? extras.ticket_type_id : undefined;
        if (ttId) {
          const allowed =
            typeof extras.available === "number"
              ? extras.available
              : typeof extras.remaining === "number"
                ? extras.remaining
                : 0;
          handleQuantity(ttId, Math.max(0, Math.floor(allowed)));
        }
      }
    } finally {
      setBusy(false);
    }
  }

  if (phase.kind === "stripe") {
    return (
      <div className="vp-card vp-stack vp-stack--tight vp-checkout">
        <div className="vp-row vp-row--between">
          <p className="vp-checkout__heading">Pay {phase.totalLabel}</p>
          <span className="vp-muted vp-small">
            {count} {count === 1 ? "ticket" : "tickets"}
          </span>
        </div>
        <StripeCheckout
          clientSecret={phase.session.clientSecret}
          paymentIntentId={phase.session.paymentIntentId}
          eventId={event.id}
          siteUrl={getSiteUrl()}
          totalLabel={phase.totalLabel}
          onBack={() => {
            setPhase({ kind: "select" });
            setError(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="vp-card vp-stack vp-stack--tight vp-checkout" data-checkout="select">
      <TicketSelector
        ticketTypes={ticketTypes}
        quantities={quantities}
        userCounts={userCounts}
        disabled={busy}
        onChange={handleQuantity}
      />

      {showRefundToggle && (
        <RefundToggle
          percent={refundPct}
          checked={refundEnabled}
          disabled={busy}
          onChange={setRefundWanted}
        />
      )}

      {count > 0 && (
        <dl className="vp-checkout-summary" aria-label="Order summary">
          <div className="vp-checkout-summary__row">
            <dt>
              Subtotal · {count} {count === 1 ? "ticket" : "tickets"}
            </dt>
            <dd>{totals.subtotalCents === 0 ? "Free" : formatPrice(totals.subtotalCents, currency)}</dd>
          </div>
          {refundEnabled && (
            <div className="vp-checkout-summary__row">
              <dt>Refund Protection</dt>
              <dd>{formatPrice(totals.refundCents, currency)}</dd>
            </div>
          )}
          <div className="vp-checkout-summary__row vp-checkout-summary__row--total">
            <dt>Total</dt>
            <dd>{isFree ? "Free" : totalLabel}</dd>
          </div>
        </dl>
      )}

      {error && (
        <p className="vp-error" role="alert">
          {error}
        </p>
      )}

      <button
        type="button"
        className="vp-btn vp-btn-primary vp-btn--block"
        disabled={count === 0 || busy}
        onClick={handleSubmit}
        data-checkout-submit
      >
        {busy ? "Please wait…" : isFree ? "RSVP" : `Pay ${totalLabel}`}
      </button>

      {!signedIn && count > 0 && (
        <p className="vp-muted vp-small">You&apos;ll be asked to sign in before we hold your tickets.</p>
      )}
    </div>
  );
}
