import { cache } from "react";

import { createClient } from "@/lib/supabase/server";
import type { EventPageData, TicketType } from "@/lib/types";

export type EventPage = {
  event: EventPageData;
  ticketTypes: TicketType[];
};

const TICKET_TYPE_SELECT =
  "id, event_id, name, description, price_cents, currency, inventory_total, inventory_sold, max_per_user, is_active, sales_start, sales_end, seat_category";

/**
 * Event + active ticket types for the public event page.
 *
 * Wrapped in React `cache` so `generateMetadata` and the page body share one
 * RPC round-trip per request. Returns `null` when the RPC yields no row — it
 * hides draft / inreview / deleted / rejected events itself, so a null here
 * should become `notFound()`.
 */
export const getEventPage = cache(async (id: string): Promise<EventPage | null> => {
  const supabase = await createClient();

  const [eventResult, ticketTypesResult] = await Promise.all([
    supabase.rpc("get_enriched_event_by_id", { p_event_id: id }).maybeSingle(),
    supabase
      .from("ticket_types")
      .select(TICKET_TYPE_SELECT)
      .eq("event_id", id)
      .eq("is_active", true)
      .order("price_cents", { ascending: true }),
  ]);

  if (eventResult.error) {
    throw new Error(`get_enriched_event_by_id failed: ${eventResult.error.message}`);
  }
  if (!eventResult.data) return null;

  if (ticketTypesResult.error) {
    throw new Error(`ticket_types query failed: ${ticketTypesResult.error.message}`);
  }

  return {
    event: eventResult.data as EventPageData,
    ticketTypes: (ticketTypesResult.data ?? []) as TicketType[],
  };
});
