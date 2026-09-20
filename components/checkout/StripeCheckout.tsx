"use client";

import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe, type Stripe, type StripeElementsOptions } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";

import { getStripePublishableKey } from "@/lib/env";

let stripePromise: Promise<Stripe | null> | undefined;

/** `loadStripe` once per page; Stripe.js itself is only downloaded on first use. */
function getStripe(): Promise<Stripe | null> {
  if (!stripePromise) stripePromise = loadStripe(getStripePublishableKey());
  return stripePromise;
}

export type StripeCheckoutProps = {
  clientSecret: string;
  paymentIntentId: string;
  eventId: string;
  /** Absolute origin (e.g. https://vipass.app) for Stripe's `return_url`. */
  siteUrl: string;
  /** Pre-formatted total, e.g. "$16.50". */
  totalLabel: string;
  onBack: () => void;
};

const APPEARANCE: StripeElementsOptions["appearance"] = {
  theme: "night",
  variables: {
    colorPrimary: "#ffffff",
    colorBackground: "#1a1a1a",
    colorText: "#ffffff",
    colorTextSecondary: "rgba(255, 255, 255, 0.62)",
    colorDanger: "#ff5c5c",
    borderRadius: "12px",
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
};

function PaymentForm({ successUrl, totalLabel, onBack }: { successUrl: string; totalLabel: string; onBack: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!stripe || !elements || submitting) return;
    setSubmitting(true);
    setError(null);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: successUrl },
      redirect: "if_required",
    });

    if (result.error) {
      setError(result.error.message ?? "Your payment could not be completed. Please try again.");
      setSubmitting(false);
      return;
    }

    const status = result.paymentIntent?.status;
    if (status === "succeeded" || status === "processing" || status === "requires_capture") {
      router.push(successUrl);
      return; // keep the button disabled while navigating
    }

    setError("Your payment could not be completed. Please try again.");
    setSubmitting(false);
  }

  return (
    <form className="vp-stack vp-stack--tight vp-stripe" onSubmit={handleSubmit}>
      <PaymentElement
        options={{ layout: "tabs" }}
        onReady={() => setReady(true)}
        onChange={() => setError(null)}
      />
      {error && (
        <p className="vp-error" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        className="vp-btn vp-btn-primary vp-btn--block"
        disabled={!stripe || !elements || !ready || submitting}
      >
        {submitting ? "Processing…" : `Pay ${totalLabel}`}
      </button>
      <button type="button" className="vp-link" onClick={onBack} disabled={submitting}>
        ← Back to ticket selection
      </button>
    </form>
  );
}

/** Inline Stripe Payment Element for one PaymentIntent. */
export default function StripeCheckout({
  clientSecret,
  paymentIntentId,
  eventId,
  siteUrl,
  totalLabel,
  onBack,
}: StripeCheckoutProps) {
  const successUrl = `${siteUrl}/events/${eventId}/success?payment_intent=${encodeURIComponent(paymentIntentId)}`;

  const stripe = useMemo(() => {
    try {
      return getStripe();
    } catch (e) {
      console.error("[checkout] Stripe publishable key missing", e);
      return null;
    }
  }, []);

  if (!stripe) {
    return (
      <div className="vp-stack vp-stack--tight">
        <p className="vp-error" role="alert">
          Card payments aren&apos;t available right now. Please try again later.
        </p>
        <button type="button" className="vp-link" onClick={onBack}>
          ← Back to ticket selection
        </button>
      </div>
    );
  }

  return (
    <Elements stripe={stripe} options={{ clientSecret, appearance: APPEARANCE, loader: "auto" }}>
      <PaymentForm successUrl={successUrl} totalLabel={totalLabel} onBack={onBack} />
    </Elements>
  );
}
