"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { GENERIC_ERROR_COPY } from "@/lib/edge-errors";
import { clearPaystackStash, readPaystackStash, verifyPaystack } from "@/lib/payment";

type ReturnState =
  | { kind: "verifying" }
  | { kind: "success" }
  | { kind: "not_completed"; status: string }
  | { kind: "missing_reference" }
  | { kind: "error"; message: string };

/** Paystack statuses that may still flip to `success`; the stash is kept so a reload can re-verify. */
const PENDING_STATUSES = new Set(["pending", "ongoing", "processing"]);

const STATUS_COPY: Record<string, string> = {
  failed: "Paystack reported the payment as failed.",
  abandoned: "The payment was abandoned before it finished.",
  cancelled: "The payment was cancelled.",
  pending: "Paystack is still processing this payment.",
  ongoing: "Paystack is still processing this payment.",
  processing: "Paystack is still processing this payment.",
  reversed: "This payment was reversed.",
};

/**
 * Landing spot after Paystack's hosted page. Reads the reference from the
 * query (`?reference=` / `?trxref=`) or the pre-redirect stash, verifies it
 * with the user's session, then hands off to the success page. Must sit under
 * a `<Suspense>` boundary because of `useSearchParams`.
 */
export default function PaystackReturn({ eventId, signedIn }: { eventId: string; signedIn: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryRef = searchParams.get("reference") ?? searchParams.get("trxref");
  const [state, setState] = useState<ReturnState>({ kind: "verifying" });

  useEffect(() => {
    if (!signedIn) return;
    let cancelled = false;
    const stash = readPaystackStash(eventId);
    const reference = queryRef ?? stash?.reference ?? null;

    if (!reference) {
      setState({ kind: "missing_reference" });
      return;
    }

    verifyPaystack(reference)
      .then((result) => {
        if (cancelled) return;
        if (result.status === "success" && result.order_id) {
          clearPaystackStash(eventId);
          router.replace(`/events/${eventId}/success?order=${encodeURIComponent(result.order_id)}`);
          setState({ kind: "success" });
          return;
        }
        // Leave the stash for a retry only while Paystack still says "pending".
        if (!PENDING_STATUSES.has(result.status)) clearPaystackStash(eventId);
        setState({ kind: "not_completed", status: result.status });
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setState({ kind: "error", message: e instanceof Error && e.message ? e.message : GENERIC_ERROR_COPY });
      });

    return () => {
      cancelled = true;
    };
  }, [eventId, queryRef, router, signedIn]);

  const eventHref = `/events/${eventId}`;

  if (!signedIn) {
    const here = `${eventHref}/paystack-return${queryRef ? `?reference=${encodeURIComponent(queryRef)}` : ""}`;
    return (
      <div className="vp-card vp-stack">
        <p className="vp-title vp-title--sm">Sign in to confirm your payment</p>
        <p className="vp-muted">Your session ended while you were at Paystack. Sign in again and we&apos;ll finish up.</p>
        <Link className="vp-btn vp-btn-primary" href={`/login?next=${encodeURIComponent(here)}`}>
          Sign in
        </Link>
      </div>
    );
  }

  switch (state.kind) {
    case "verifying":
    case "success":
      return (
        <div className="vp-card vp-stack vp-center" aria-busy="true">
          <p className="vp-title vp-title--sm">Confirming your payment…</p>
          <p className="vp-muted">Checking with Paystack. This only takes a moment.</p>
        </div>
      );
    case "missing_reference":
      return (
        <div className="vp-card vp-stack">
          <p className="vp-title vp-title--sm">Nothing to confirm</p>
          <p className="vp-muted">We couldn&apos;t find a payment to verify. If you were charged, check My Tickets.</p>
          <div className="vp-row">
            <Link className="vp-btn vp-btn-primary" href={eventHref}>
              Back to event
            </Link>
            <Link className="vp-btn vp-btn-secondary" href="/tickets">
              My tickets
            </Link>
          </div>
        </div>
      );
    case "not_completed":
      return (
        <div className="vp-card vp-stack" data-paystack-status={state.status}>
          <p className="vp-title vp-title--sm">Payment not completed</p>
          <p className="vp-muted">
            {STATUS_COPY[state.status] ?? `Paystack returned the status “${state.status}”.`} No tickets were
            issued.
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
    case "error":
      return (
        <div className="vp-card vp-stack">
          <p className="vp-title vp-title--sm">We couldn&apos;t confirm this payment</p>
          <p className="vp-error" role="alert">
            {state.message}
          </p>
          <div className="vp-row">
            <Link className="vp-btn vp-btn-primary" href="/tickets">
              Check my tickets
            </Link>
            <Link className="vp-btn vp-btn-secondary" href={eventHref}>
              Back to event
            </Link>
          </div>
        </div>
      );
  }
}
