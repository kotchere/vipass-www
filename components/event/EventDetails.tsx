import EventDate from "@/components/ui/EventDate";
import { priceLabel } from "@/lib/event-state";
import type { EventPageData, TicketType } from "@/lib/types";

function locationLine(event: EventPageData): string | null {
  const place = [event.location_city, event.location_country].filter(Boolean).join(", ");
  const parts = [event.location_name, place].filter((p) => p && p.trim() !== "");
  return parts.length ? parts.join(" · ") : null;
}

function CreatorLine({ event }: { event: EventPageData }) {
  if (!event.creator_handle) return null;
  const initial = event.creator_handle.charAt(0).toUpperCase();
  return (
    <div className="vp-row vp-event-creator">
      {event.creator_avatar_url ? (
        // eslint-disable-next-line @next/next/no-img-element -- tiny remote avatar, not worth the optimizer
        <img
          className="vp-avatar"
          src={event.creator_avatar_url}
          alt=""
          width={32}
          height={32}
        />
      ) : (
        <span className="vp-avatar vp-avatar--fallback" aria-hidden="true">
          {initial}
        </span>
      )}
      <span className="vp-muted">
        Hosted by <span className="vp-event-creator__handle">@{event.creator_handle}</span>
      </span>
    </div>
  );
}

export default function EventDetails({
  event,
  ticketTypes,
  children,
}: {
  event: EventPageData;
  ticketTypes: TicketType[];
  /** The CTA block, rendered between the meta rows and the description. */
  children?: React.ReactNode;
}) {
  const location = locationLine(event);
  const price = priceLabel(event, ticketTypes);

  return (
    <div className="vp-stack vp-event-details">
      <div className="vp-stack vp-stack--tight">
        <h1 className="vp-title vp-event-title">{event.title}</h1>
        <div className="vp-event-meta">
          {event.starts_at && (
            <p className="vp-event-meta__row">
              <EventDate iso={event.starts_at} />
            </p>
          )}
          {location && <p className="vp-event-meta__row vp-muted">{location}</p>}
          {price && <p className="vp-event-meta__row vp-event-price">{price}</p>}
        </div>
        <CreatorLine event={event} />
      </div>

      {children}

      {event.description && event.description.trim() !== "" && (
        <section className="vp-stack vp-stack--tight" aria-label="About this event">
          <h2 className="vp-event-section-title">About</h2>
          <p className="vp-prose">{event.description}</p>
        </section>
      )}
    </div>
  );
}
