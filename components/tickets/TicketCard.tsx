import Image from "next/image";
import Link from "next/link";

import TicketStatusChip from "@/components/tickets/TicketStatusChip";
import EventDate from "@/components/ui/EventDate";
import type { Ticket } from "@/lib/tickets";

/** One row in the "My tickets" list. Server Component — links to /tickets/<id>. */
export default function TicketCard({ ticket }: { ticket: Ticket }) {
  const event = ticket.events;
  const title = event?.title ?? "Event";
  const cover = event?.cover_image_url || null;
  const place = [event?.location_name, event?.location_city].filter(Boolean).join(", ");

  return (
    <Link href={`/tickets/${ticket.id}`} className="vp-ticket-card" aria-label={`${title} ticket`}>
      <div className="vp-ticket-thumb" aria-hidden="true">
        {cover ? (
          <Image src={cover} alt="" fill sizes="96px" style={{ objectFit: "cover" }} />
        ) : (
          <div className="vp-ticket-thumb__empty" />
        )}
      </div>
      <div className="vp-ticket-card__body">
        <div className="vp-ticket-card__top">
          <h3 className="vp-ticket-card__title">{title}</h3>
          <TicketStatusChip status={ticket.status} />
        </div>
        {event?.starts_at && (
          <p className="vp-muted vp-small">
            <EventDate iso={event.starts_at} />
          </p>
        )}
        <p className="vp-muted vp-small">
          {ticket.ticket_types?.name ?? "Ticket"}
          {place ? ` · ${place}` : ""}
        </p>
      </div>
      <span className="vp-ticket-card__chevron" aria-hidden="true">
        ›
      </span>
    </Link>
  );
}
