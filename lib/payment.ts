/**
 * Browser-side checkout calls. Every helper talks to the edge functions with
 * the user's session (the browser client attaches the JWT itself) and throws
 * an `EdgeError` — code + copy already resolved — on any failure, so a
 * component only ever renders `error.message`.
 *
 * Import only from Client Components: the Supabase browser client is a
 * module-level singleton and `sessionStorage` is used for the Paystack hand-off.
 */
import { createClient } from "@/lib/supabase/client";
import { describeEdgeError } from "@/lib/edge-errors";
import type { PaystackChannel, TicketSelection } from "@/lib/ticket-math";

export const FALLBACK_REFUND_PROTECTION_PERCENT = 10;

/** A failed edge-function call with its machine code and buyer-facing copy. */
export class EdgeError extends Error {
  code?: string;
  extras: Record<string, unknown>;

  constructor(copy: string, code: string | undefined, extras: Record<string, unknown> = {}) {
    super(copy);
    this.name = "EdgeError";
    this.code = code;
    this.extras = extras;
  }
}

async function toEdgeError(error: unknown, data?: unknown): Promise<EdgeError> {
  const { code, copy, extras } = await describeEdgeError(error, data);
  return new EdgeError(copy, code, extras);
}

type Json = Record<string, unknown>;

async function invoke<T extends Json>(name: string, body: Json): Promise<T> {
  const supabase = createClient();
  const { data, error } = await supabase.functions.invoke<T>(name, { body });
  if (error) throw await toEdgeError(error, data);
  // A 2xx body that still reports a failure. No success body carries `error`.
  if (data && typeof data === "object" && typeof (data as Json).error === "string") {
    throw await toEdgeError(null, data);
  }
  if (!data) throw new EdgeError("Something went wrong. Please try again.", undefined);
  return data;
}

export type OrderInput = {
  eventId: string;
  selections: TicketSelection[];
  refundProtectionEnabled: boolean;
};

function paymentIntentBody(input: OrderInput): Json {
  return {
    event_id: input.eventId,
    selections: input.selections,
    refund_protection_enabled: input.refundProtectionEnabled,
  };
}

// ── Free ─────────────────────────────────────────────────────────────────────

/** Creates the order + tickets immediately (`create-payment-intent`, free branch). */
export async function startFreeOrder(input: OrderInput): Promise<{ orderId: string }> {
  const data = await invoke<{ free?: boolean; orderId?: string }>(
    "create-payment-intent",
    paymentIntentBody({ ...input, refundProtectionEnabled: false }),
  );
  if (!data.free || typeof data.orderId !== "string") {
    throw new EdgeError("This order isn't free. Refresh the page and try again.", "not_free");
  }
  return { orderId: data.orderId };
}

// ── Stripe ───────────────────────────────────────────────────────────────────

export type StripeSession = { clientSecret: string; paymentIntentId: string };

/** Creates a PaymentIntent; the Payment Element confirms it client-side. */
export async function startStripePayment(input: OrderInput): Promise<StripeSession> {
  const data = await invoke<{ clientSecret?: string; paymentIntentId?: string; free?: boolean }>(
    "create-payment-intent",
    paymentIntentBody(input),
  );
  if (data.free) {
    throw new EdgeError("This order is free — refresh the page and RSVP instead.", "unexpected_free");
  }
  if (typeof data.clientSecret !== "string" || typeof data.paymentIntentId !== "string") {
    throw new EdgeError("We couldn't start this payment. Please try again.", "bad_payment_intent");
  }
  return { clientSecret: data.clientSecret, paymentIntentId: data.paymentIntentId };
}

// ── Paystack ─────────────────────────────────────────────────────────────────

export type PaystackStash = { reference: string; order_id: string; eventId: string; startedAt: number };

export function paystackStashKey(eventId: string): string {
  return `paystack:${eventId}`;
}

export function readPaystackStash(eventId: string): PaystackStash | null {
  try {
    const raw = window.sessionStorage.getItem(paystackStashKey(eventId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<PaystackStash>;
    if (typeof parsed.reference !== "string" || typeof parsed.order_id !== "string") return null;
    return {
      reference: parsed.reference,
      order_id: parsed.order_id,
      eventId,
      startedAt: typeof parsed.startedAt === "number" ? parsed.startedAt : 0,
    };
  } catch {
    return null;
  }
}

export function clearPaystackStash(eventId: string): void {
  try {
    window.sessionStorage.removeItem(paystackStashKey(eventId));
  } catch {
    // Storage unavailable (private mode / blocked): nothing to clear.
  }
}

/**
 * Creates a pending order and hands the browser to Paystack's hosted page.
 * Persists `{ reference, order_id }` first so `/events/<id>/paystack-return`
 * can verify even if Paystack drops the query string. Never resolves on
 * success — the page navigates away.
 */
export async function startPaystackPayment(
  input: OrderInput,
  options: { channels: PaystackChannel[]; callbackUrl: string },
): Promise<never> {
  const data = await invoke<{ authorization_url?: string; reference?: string; order_id?: string }>(
    "paystack-init-transaction",
    {
      ...paymentIntentBody(input),
      channels: options.channels,
      callback_url: options.callbackUrl,
    },
  );
  const { authorization_url, reference, order_id } = data;
  if (
    typeof authorization_url !== "string" ||
    typeof reference !== "string" ||
    typeof order_id !== "string" ||
    !/^https:\/\//.test(authorization_url)
  ) {
    throw new EdgeError("We couldn't start this payment. Please try again.", "bad_paystack_init");
  }

  const stash: PaystackStash = { reference, order_id, eventId: input.eventId, startedAt: Date.now() };
  try {
    window.sessionStorage.setItem(paystackStashKey(input.eventId), JSON.stringify(stash));
  } catch {
    // Storage blocked: the return page still gets `?reference=` from Paystack.
  }
  window.location.assign(authorization_url);
  // Keep the caller's "busy" state until the navigation actually happens.
  return new Promise<never>(() => {});
}

export type PaystackVerification = {
  status: string;
  order_id?: string;
  channel?: string;
  already_finalized?: boolean;
};

export async function verifyPaystack(reference: string): Promise<PaystackVerification> {
  const data = await invoke<PaystackVerification & Json>("paystack-verify-transaction", { reference });
  if (typeof data.status !== "string") {
    throw new EdgeError("We couldn't confirm this payment. Check My Tickets before trying again.", "bad_verify");
  }
  return data;
}

// ── Config & per-user counts ─────────────────────────────────────────────────

/** `GET refund-config` → percent; falls back to 10 like the app when it fails. */
export async function fetchRefundProtectionPercent(): Promise<number> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.functions.invoke<{ refund_protection_percent?: unknown }>(
      "refund-config",
      { method: "GET" },
    );
    if (error) return FALLBACK_REFUND_PROTECTION_PERCENT;
    const pct = data?.refund_protection_percent;
    return typeof pct === "number" && Number.isFinite(pct) && pct >= 0
      ? pct
      : FALLBACK_REFUND_PROTECTION_PERCENT;
  } catch {
    return FALLBACK_REFUND_PROTECTION_PERCENT;
  }
}

/**
 * The signed-in buyer's active tickets for this event, grouped by type
 * (port of the app's `queryGetUserTicketCountsByType`). Owner RLS scopes the
 * rows; an empty map on error keeps the selector usable.
 */
export async function fetchUserTicketCounts(
  eventId: string,
  userId: string,
): Promise<Record<string, number>> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("tickets")
    .select("ticket_type_id")
    .eq("owner_id", userId)
    .eq("event_id", eventId)
    .eq("status", "active");
  if (error || !data) return {};
  const counts: Record<string, number> = {};
  for (const row of data as { ticket_type_id: string | null }[]) {
    if (!row.ticket_type_id) continue;
    counts[row.ticket_type_id] = (counts[row.ticket_type_id] ?? 0) + 1;
  }
  return counts;
}

// ── Selection stash (signed-out → login → back) ──────────────────────────────

export type CheckoutStash = { selections: TicketSelection[]; refundProtectionEnabled: boolean };

export function checkoutStashKey(eventId: string): string {
  return `checkout:${eventId}`;
}

export function writeCheckoutStash(eventId: string, stash: CheckoutStash): void {
  try {
    window.sessionStorage.setItem(checkoutStashKey(eventId), JSON.stringify(stash));
  } catch {
    // Storage unavailable: the buyer just re-picks after signing in.
  }
}

export function takeCheckoutStash(eventId: string): CheckoutStash | null {
  try {
    const key = checkoutStashKey(eventId);
    const raw = window.sessionStorage.getItem(key);
    if (!raw) return null;
    window.sessionStorage.removeItem(key);
    const parsed = JSON.parse(raw) as Partial<CheckoutStash>;
    const selections = Array.isArray(parsed.selections)
      ? parsed.selections.filter(
          (s): s is TicketSelection =>
            !!s &&
            typeof s === "object" &&
            typeof (s as TicketSelection).ticket_type_id === "string" &&
            typeof (s as TicketSelection).quantity === "number",
        )
      : [];
    return { selections, refundProtectionEnabled: parsed.refundProtectionEnabled === true };
  } catch {
    return null;
  }
}
