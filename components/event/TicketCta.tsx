import CheckoutFlow from "@/components/checkout/CheckoutFlow";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/app-links";
import { getUser } from "@/lib/supabase/server";
import type { EventPageData, EventPageState, TicketType } from "@/lib/types";

type TicketCtaProps = {
  event: EventPageData;
  ticketTypes: TicketType[];
  state: EventPageState;
};

function StateChip({ label, danger }: { label: string; danger?: boolean }) {
  return (
    <div className="vp-event-cta">
      <span className={`vp-chip${danger ? " vp-chip--danger" : ""}`}>{label}</span>
    </div>
  );
}

/**
 * The buy / RSVP block. Server component: only the `on_sale` branch touches
 * the session (via the cached `getUser()`), so every other state stays
 * renderable for anonymous visitors without an auth round-trip.
 */
export default async function TicketCta({ event, ticketTypes, state }: TicketCtaProps) {
  switch (state) {
    case "cancelled":
      return <StateChip label="Cancelled" danger />;
    case "ended":
      return <StateChip label="This event has ended" />;
    case "not_on_sale":
      return <StateChip label="Tickets not available" />;
    case "sold_out":
      return <StateChip label="Sold out" danger />;
    case "seated":
      return (
        <div className="vp-card vp-stack vp-stack--tight vp-event-cta">
          <p className="vp-event-cta__lead">
            This event has reserved seating — pick your seats in the Vipass app.
          </p>
          <div className="vp-row">
            <a className="vp-btn vp-btn-primary" href={`vipass://event?eventId=${event.id}`}>
              Open in app
            </a>
            <a
              className="vp-btn vp-btn-secondary"
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              App Store
            </a>
            <a
              className="vp-btn vp-btn-secondary"
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Play
            </a>
          </div>
        </div>
      );
    case "on_sale": {
      const user = await getUser();
      const currency =
        ticketTypes[0]?.currency ?? event.cheapest_price_currency ?? "usd";
      return (
        <div className="vp-event-cta">
          <CheckoutFlow
            event={{ id: event.id, title: event.title, currency }}
            ticketTypes={ticketTypes}
            signedIn={!!user}
          />
        </div>
      );
    }
  }
}
