/**
 * Row shapes shared between the event page, the checkout flow and My Tickets.
 * Column names mirror the dev database (verified 2026-09-19); keep them in
 * sync with the Supabase queries that produce them rather than widening here.
 */

/** `public.ticket_types` — anon-readable. `inventory_total` null = unlimited. */
export type TicketType = {
  id: string;
  event_id: string;
  name: string;
  description: string | null;
  price_cents: number;
  currency: string;
  inventory_total: number | null;
  inventory_sold: number;
  max_per_user: number | null;
  is_active: boolean;
  sales_start: string | null;
  sales_end: string | null;
  seat_category: string | null;
};

/** One entry of the `flyers` jsonb array returned by `get_enriched_event_by_id`. */
export type EventFlyer = {
  id: string;
  media_type: "image" | "video" | string;
  media_url: string;
  thumbnail_url: string | null;
  media_blurhash: string | null;
  media_width: number | null;
  media_height: number | null;
  sort_order: number | null;
  display_order?: number | null;
  caption?: string | null;
};

/** Row returned by the `get_enriched_event_by_id(p_event_id)` RPC. */
export type EventPageData = {
  id: string;
  creator_id: string;
  title: string;
  description: string | null;
  location_name: string | null;
  location_address: string | null;
  location_city: string | null;
  location_country: string | null;
  location_geo: unknown;
  visibility: string;
  status: string;
  seating_type: string;
  venue_layout_id: string | null;
  cover_image_url: string | null;
  cover_image_width: number | null;
  cover_image_height: number | null;
  starts_at: string | null;
  ends_at: string | null;
  timezone: string | null;
  created_at: string;
  updated_at: string;
  flyers: EventFlyer[] | null;
  tags: unknown;
  like_count: number | null;
  follow_count: number | null;
  cheapest_price_cents: number | null;
  cheapest_price_currency: string | null;
  share_count: number | null;
  creator_avatar_url: string | null;
  creator_handle: string | null;
  comment_count: number | null;
};

export type EventPageState =
  | "cancelled"
  | "ended"
  | "not_on_sale"
  | "sold_out"
  | "seated"
  | "on_sale";
