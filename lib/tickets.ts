import type { SupabaseClient } from "@supabase/supabase-js";

/** Ticket statuses the web "My tickets" pages show. `transferred`/`cancelled` are hidden. */
export const VISIBLE_TICKET_STATUSES = ["active", "used", "refund_pending", "refunded"] as const;

export type TicketStatus = (typeof VISIBLE_TICKET_STATUSES)[number] | "cancelled" | "transferred";

export type TicketEvent = {
  id: string;
  title: string;
  starts_at: string | null;
  ends_at: string | null;
  cover_image_url: string | null;
  location_name: string | null;
  location_city: string | null;
  status: string;
};

export type Ticket = {
  id: string;
  event_id: string;
  status: TicketStatus;
  scanned_at: string | null;
  created_at: string;
  gate: string | null;
  section: string | null;
  seat: string | null;
  /** Many-to-one embed; `null` only if the event row is not visible to the caller. */
  events: TicketEvent | null;
  ticket_types: { name: string } | null;
};

// FK names verified on dev: tickets_event_id_fkey → events, tickets_ticket_type_id_fkey → ticket_types.
const TICKET_SELECT =
  "id, event_id, status, scanned_at, created_at, gate, section, seat, " +
  "events(id, title, starts_at, ends_at, cover_image_url, location_name, location_city, status), " +
  "ticket_types(name)";

/**
 * All of the caller's own tickets, newest purchase first. Tickets RLS also
 * grants event hosts/managers read access, so the owner filter is explicit —
 * a host must not see attendee tickets in their own "My tickets" list.
 */
export async function getTicketsForUser(supabase: SupabaseClient, userId: string): Promise<Ticket[]> {
  const { data, error } = await supabase
    .from("tickets")
    .select(TICKET_SELECT)
    .eq("owner_id", userId)
    .in("status", [...VISIBLE_TICKET_STATUSES])
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[tickets] list failed", error);
    throw new Error("Could not load tickets");
  }
  return (data ?? []) as unknown as Ticket[];
}

/** One ticket owned by the caller, or `null` (missing, hidden status, or not the owner). */
export async function getOwnedTicket(
  supabase: SupabaseClient,
  userId: string,
  ticketId: string,
): Promise<Ticket | null> {
  const { data, error } = await supabase
    .from("tickets")
    .select(TICKET_SELECT)
    .eq("id", ticketId)
    .eq("owner_id", userId)
    .in("status", [...VISIBLE_TICKET_STATUSES])
    .maybeSingle();

  if (error) {
    console.error("[tickets] detail failed", error);
    throw new Error("Could not load ticket");
  }
  return (data as unknown as Ticket | null) ?? null;
}

/** The instant a ticket stops being "upcoming": event end, else start. */
export function ticketEndTime(ticket: Ticket): number | null {
  const iso = ticket.events?.ends_at ?? ticket.events?.starts_at ?? null;
  if (!iso) return null;
  const ms = Date.parse(iso);
  return Number.isNaN(ms) ? null : ms;
}

export function isTicketUpcoming(ticket: Ticket, now = Date.now()): boolean {
  const end = ticketEndTime(ticket);
  // No dates at all → keep it in Upcoming rather than burying it in Past.
  return end === null || end >= now;
}

export const TICKET_STATUS_LABEL: Record<TicketStatus, string> = {
  active: "Active",
  used: "Used",
  refund_pending: "Refund pending",
  refunded: "Refunded",
  cancelled: "Cancelled",
  transferred: "Transferred",
};

export function ticketStatusChipClass(status: TicketStatus): string {
  switch (status) {
    case "active":
      return "vp-chip vp-chip--success";
    case "refunded":
    case "cancelled":
      return "vp-chip vp-chip--danger";
    default:
      return "vp-chip";
  }
}
