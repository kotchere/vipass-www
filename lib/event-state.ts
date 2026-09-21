import type { EventPageData, EventPageState, TicketType } from "@/lib/types";

/**
 * Pure event-page state helpers (no server / React imports) so they can be
 * unit-tested and reused by client components.
 */
const ON_SALE_STATUSES = new Set(["published", "onair"]);

/**
 * Port of the mobile `comp-event-overlay` state ladder. Priority order:
 * cancelled → ended → not_on_sale → sold_out → seated → on_sale.
 */
export function deriveEventState(
  event: Pick<EventPageData, "status" | "starts_at" | "ends_at" | "seating_type">,
  ticketTypes: Pick<TicketType, "inventory_total" | "inventory_sold">[],
  now: Date = new Date(),
): EventPageState {
  if (event.status === "cancelled") return "cancelled";

  const endedAt = event.ends_at ?? event.starts_at;
  const endedAtMs = endedAt ? Date.parse(endedAt) : Number.NaN;
  if (Number.isFinite(endedAtMs) && endedAtMs < now.getTime()) return "ended";

  if (!ON_SALE_STATUSES.has(event.status)) return "not_on_sale";

  const soldOut =
    ticketTypes.length > 0 &&
    ticketTypes.every(
      (tt) => tt.inventory_total != null && tt.inventory_sold >= tt.inventory_total,
    );
  if (soldOut) return "sold_out";

  if (event.seating_type === "assigned_seating") return "seated";

  return "on_sale";
}

/** True when every ticket type is free (an empty list counts as free / RSVP). */
export function isFreeEvent(ticketTypes: Pick<TicketType, "price_cents">[]): boolean {
  return ticketTypes.every((tt) => tt.price_cents === 0);
}

/** Port of mobile `util-currency.formatPrice`: `formatPrice(1250, "usd")` → `$12.50`. */
export function formatPrice(cents: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

export function formatStartingPrice(cents: number, currency: string): string {
  return `From ${formatPrice(cents, currency)}`;
}

/**
 * The label shown next to the title: "Free", "From $12.50", or "$12.50" when
 * there is a single price point. Falls back to the RPC's cheapest price when
 * no active ticket types exist.
 */
export function priceLabel(
  event: Pick<EventPageData, "cheapest_price_cents" | "cheapest_price_currency">,
  ticketTypes: Pick<TicketType, "price_cents" | "currency">[],
): string | null {
  if (ticketTypes.length > 0) {
    if (isFreeEvent(ticketTypes)) return "Free";
    const prices = ticketTypes.map((tt) => tt.price_cents);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const currency = ticketTypes[0].currency;
    // A free tier alongside paid ones: the cheapest ticket is free, so say so
    // rather than "From $0.00".
    if (min === 0) return "Free";
    return min === max ? formatPrice(min, currency) : formatStartingPrice(min, currency);
  }
  if (event.cheapest_price_cents == null) return null;
  if (event.cheapest_price_cents === 0) return "Free";
  return formatStartingPrice(
    event.cheapest_price_cents,
    event.cheapest_price_currency ?? "usd",
  );
}
