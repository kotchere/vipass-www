/**
 * Pure checkout math — no React, no Supabase, no `@/` runtime imports — so it
 * can be unit-tested with plain `node --test` (see `lib/__tests__/`).
 *
 * Ports of the mobile app's selection logic (`sheet-ticket-selection.tsx`)
 * and provider routing (`util-currency.ts`). The edge functions enforce all
 * of this again server-side; these helpers only keep the UI honest.
 */
import type { TicketType } from "./types";

/** One line of an order, in the shape `create-payment-intent` expects. */
export type TicketSelection = { ticket_type_id: string; quantity: number };

/** Per-ticket-type count of the buyer's *active* tickets for this event. */
export type UserTicketCounts = Record<string, number>;

export type TicketAvailability = Pick<
  TicketType,
  "id" | "inventory_total" | "inventory_sold" | "max_per_user"
>;

export type TicketSalesWindow = Pick<TicketType, "sales_start" | "sales_end">;

export type PaymentProvider = "stripe" | "paystack";

export type PaystackChannel = "card" | "mobile_money" | "bank_transfer";

export type OrderTotals = {
  subtotalCents: number;
  refundCents: number;
  totalCents: number;
  currency: string;
};

/** Seats still unsold for a ticket type; `Infinity` when inventory is unlimited. */
export function inventoryRemaining(tt: Pick<TicketType, "inventory_total" | "inventory_sold">): number {
  if (tt.inventory_total == null) return Number.POSITIVE_INFINITY;
  return Math.max(0, tt.inventory_total - (tt.inventory_sold ?? 0));
}

/**
 * How many more of this type the buyer may add: the smaller of inventory left
 * and their remaining per-person allowance, never negative. `Infinity` when
 * neither limit applies.
 */
export function getMaxSelectable(tt: TicketAvailability, userCount = 0): number {
  const userRemaining =
    tt.max_per_user == null ? Number.POSITIVE_INFINITY : tt.max_per_user - userCount;
  return Math.max(0, Math.min(inventoryRemaining(tt), userRemaining));
}

/**
 * True when the buyer has hit their per-person limit while stock remains —
 * the "Limit reached" chip, as opposed to "Sold out".
 */
export function getIsMaxedOut(tt: TicketAvailability, userCount = 0): boolean {
  if (tt.max_per_user == null) return false;
  if (tt.max_per_user - userCount > 0) return false;
  return inventoryRemaining(tt) > 0;
}

export function isSoldOut(tt: Pick<TicketType, "inventory_total" | "inventory_sold">): boolean {
  return inventoryRemaining(tt) <= 0;
}

export type SalesWindowState = "open" | "not_started" | "ended";

/** Where `now` falls relative to the type's sales window (null bounds are open). */
export function getSalesWindowState(tt: TicketSalesWindow, now: Date = new Date()): SalesWindowState {
  const t = now.getTime();
  const start = tt.sales_start ? Date.parse(tt.sales_start) : Number.NaN;
  const end = tt.sales_end ? Date.parse(tt.sales_end) : Number.NaN;
  if (Number.isFinite(start) && t < start) return "not_started";
  if (Number.isFinite(end) && t > end) return "ended";
  return "open";
}

export function isWithinSalesWindow(tt: TicketSalesWindow, now: Date = new Date()): boolean {
  return getSalesWindowState(tt, now) === "open";
}

/**
 * Subtotal, refund-protection fee and total for a selection. The fee is only
 * charged on a paid subtotal (`Math.round(subtotal * pct / 100)`), mirroring
 * the mobile sheet and the server's own calculation. Selections that point at
 * an unknown ticket type are ignored.
 */
export function computeTotals(
  selections: TicketSelection[],
  ticketTypes: Pick<TicketType, "id" | "price_cents" | "currency">[],
  refundPct: number,
  refundEnabled: boolean,
): OrderTotals {
  const byId = new Map(ticketTypes.map((tt) => [tt.id, tt]));
  let subtotalCents = 0;
  let currency: string | undefined;

  for (const sel of selections) {
    const tt = byId.get(sel.ticket_type_id);
    if (!tt || sel.quantity <= 0) continue;
    subtotalCents += tt.price_cents * sel.quantity;
    currency ??= tt.currency;
  }

  const pct = Number.isFinite(refundPct) && refundPct > 0 ? refundPct : 0;
  const refundCents =
    refundEnabled && subtotalCents > 0 ? Math.round((subtotalCents * pct) / 100) : 0;

  return {
    subtotalCents,
    refundCents,
    totalCents: subtotalCents + refundCents,
    currency: (currency ?? ticketTypes[0]?.currency ?? "usd").toLowerCase(),
  };
}

export function selectionCount(selections: TicketSelection[]): number {
  return selections.reduce((sum, sel) => sum + Math.max(0, sel.quantity), 0);
}

/**
 * Drop lines for types that are missing, inactive or outside their sales
 * window, and cap each quantity at `getMaxSelectable`. Lines that fall to
 * zero are removed. Used after a fresh server fetch (post-error refresh) and
 * when restoring a stashed selection.
 */
export function clampSelections(
  selections: TicketSelection[],
  ticketTypes: TicketType[],
  userCounts: UserTicketCounts = {},
  now: Date = new Date(),
): TicketSelection[] {
  const byId = new Map(ticketTypes.map((tt) => [tt.id, tt]));
  const out: TicketSelection[] = [];
  for (const sel of selections) {
    const tt = byId.get(sel.ticket_type_id);
    if (!tt || !tt.is_active || !isWithinSalesWindow(tt, now)) continue;
    const max = getMaxSelectable(tt, userCounts[tt.id] ?? 0);
    const quantity = Math.min(Math.floor(sel.quantity), max);
    if (quantity > 0) out.push({ ticket_type_id: tt.id, quantity });
  }
  return out;
}

// ── Provider routing (port of util-currency.ts) ─────────────────────────────

export const PAYSTACK_CURRENCIES = ["ghs", "ngn", "zar", "kes", "xof"] as const;

const PAYSTACK_SET = new Set<string>(PAYSTACK_CURRENCIES);
const MOMO_CAPABLE = new Set<string>(["ghs", "kes"]);

export function getPaymentProviderForCurrency(code: string): PaymentProvider {
  return PAYSTACK_SET.has(code.toLowerCase()) ? "paystack" : "stripe";
}

export function currencySupportsMobileMoney(code: string): boolean {
  return MOMO_CAPABLE.has(code.toLowerCase());
}

/** Paystack channels to request for a currency: `card` (+ `mobile_money` for GHS/KES). */
export function defaultChannelsForCurrency(code: string): PaystackChannel[] {
  if (getPaymentProviderForCurrency(code) === "paystack" && currencySupportsMobileMoney(code)) {
    return ["card", "mobile_money"];
  }
  return ["card"];
}
