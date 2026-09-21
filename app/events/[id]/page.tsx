import type { Metadata } from "next";
import { notFound } from "next/navigation";

import OpenInAppBanner from "@/components/OpenInAppBanner";
import EventDetails from "@/components/event/EventDetails";
import EventHero, { pickHeroImage } from "@/components/event/EventHero";
import TicketCta from "@/components/event/TicketCta";
import SiteHeader from "@/components/layout/SiteHeader";
import { getSiteUrl } from "@/lib/env";
import { getEventPage } from "@/lib/event-page";
import { deriveEventState } from "@/lib/event-state";
import { isUuid } from "@/lib/uuid";

type EventPageProps = {
  params: Promise<{ id: string }>;
};

const APP_STORE_ID = "6451340949";
const DESCRIPTION_MAX = 160;

function metaDescription(description: string | null): string {
  const text = (description ?? "").replace(/\s+/g, " ").trim();
  if (!text) return "Get tickets on Vipass.";
  return text.length > DESCRIPTION_MAX ? `${text.slice(0, DESCRIPTION_MAX - 1).trimEnd()}…` : text;
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { id } = await params;
  if (!isUuid(id)) return { title: "Event not found · Vipass" };

  const page = await getEventPage(id);
  if (!page) return { title: "Event not found · Vipass" };

  const { event } = page;
  const title = `${event.title} · Vipass`;
  const description = metaDescription(event.description);
  const url = `${getSiteUrl()}/events/${event.id}`;
  const cover = pickHeroImage(event)?.src ?? event.cover_image_url ?? undefined;
  const images = cover ? [cover] : undefined;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, images, type: "website", url },
    twitter: { card: "summary_large_image", title, description, images },
    ...(event.visibility !== "public" ? { robots: { index: false, follow: false } } : {}),
    itunes: { appId: APP_STORE_ID, appArgument: `vipass://event?eventId=${event.id}` },
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params;
  if (!isUuid(id)) notFound();

  const page = await getEventPage(id);
  if (!page) notFound();

  const { event, ticketTypes } = page;
  const state = deriveEventState(event, ticketTypes);
  const site = getSiteUrl();
  const cover = pickHeroImage(event)?.src ?? event.cover_image_url ?? "";

  return (
    <div id="main">
      <div
        className="f-D2wOp f-128kipa"
        data-layout-template="true"
        data-selection="true"
        style={{ minHeight: "100vh", width: "auto" }}
      >
        <OpenInAppBanner
          deepLink={`vipass://event?eventId=${event.id}`}
          branchData={{ contentType: "event", eventId: event.id, flyer: cover }}
          title={event.title}
          canonicalUrl={`${site}/${event.id}`}
          desktopUrl={`${site}/events/${event.id}`}
          imageUrl={cover || undefined}
        />
        <div className="f-gdzxqr-container" data-f-layout-hint-center-x="true">
          <div className="ssr-variant hidden-1l0aw67 hidden-xwr0r7">
            <SiteHeader />
          </div>
        </div>
        <main className="vp-page vp-event-page">
          <div className="vp-event">
            <EventHero event={event} />
            <EventDetails event={event} ticketTypes={ticketTypes}>
              <TicketCta event={event} ticketTypes={ticketTypes} state={state} />
            </EventDetails>
          </div>
        </main>
      </div>
    </div>
  );
}
