import type { Metadata } from "next";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";

import OpenInAppBanner from "@/components/OpenInAppBanner";
import SiteHeader from "@/components/layout/SiteHeader";
import TicketActions from "@/components/tickets/TicketActions";
import TicketQr from "@/components/tickets/TicketQr";
import TicketStatusChip from "@/components/tickets/TicketStatusChip";
import EventDate from "@/components/ui/EventDate";
import { getSiteUrl } from "@/lib/env";
import { createClient, getUser } from "@/lib/supabase/server";
import { getOwnedTicket } from "@/lib/tickets";
import { isUuid } from "@/lib/uuid";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your ticket - Vipass",
  robots: { index: false, follow: false },
};

export default async function TicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!isUuid(id)) {
    notFound();
  }

  const user = await getUser();
  if (!user) {
    redirect(`/login?next=${encodeURIComponent(`/tickets/${id}`)}`);
  }

  const supabase = await createClient();
  const ticket = await getOwnedTicket(supabase, user.id, id);
  if (!ticket) {
    notFound();
  }

  const event = ticket.events;
  const title = event?.title ?? "Event";
  const cover = event?.cover_image_url || null;
  const place = [event?.location_name, event?.location_city].filter(Boolean).join(", ");
  const endsAt = event?.ends_at ?? event?.starts_at ?? null;
  const seatBits = [
    ticket.section ? `Section ${ticket.section}` : null,
    ticket.seat ? `Seat ${ticket.seat}` : null,
    ticket.gate ? `Gate ${ticket.gate}` : null,
  ].filter(Boolean) as string[];
  const ticketUrl = `${getSiteUrl()}/tickets/${ticket.id}`;

  return (
    <div id="main">
      <div
        className="f-D2wOp f-128kipa"
        data-layout-template="true"
        data-selection="true"
        style={{ minHeight: "100vh", width: "auto" }}
      >
        <div className="f-gdzxqr-container" data-f-layout-hint-center-x="true">
          <div className="ssr-variant hidden-1l0aw67 hidden-xwr0r7">
            <SiteHeader />
          </div>
        </div>
        <main className="vp-page vp-page--narrow">
          <div className="vp-stack">
            <OpenInAppBanner
              deepLink={`vipass://ticket-detail?ticketId=${ticket.id}`}
              branchData={{ contentType: "ticket_detail", ticketId: ticket.id }}
              title="Open your ticket in Vipass"
              subtitle={title}
              canonicalUrl={ticketUrl}
              desktopUrl={ticketUrl}
              imageUrl={cover ?? undefined}
            />
            <a className="vp-link" href="/tickets">
              ← My tickets
            </a>

            <article className="vp-card vp-stack vp-ticket">
              {cover && (
                <div className="vp-ticket-cover">
                  <Image
                    src={cover}
                    alt=""
                    fill
                    sizes="(max-width: 500px) 100vw, 440px"
                    style={{ objectFit: "cover" }}
                    priority
                  />
                </div>
              )}

              <header className="vp-stack vp-stack--tight">
                <div className="vp-row vp-row--between">
                  <TicketStatusChip status={ticket.status} />
                  {ticket.ticket_types?.name && (
                    <span className="vp-muted vp-small">{ticket.ticket_types.name}</span>
                  )}
                </div>
                <h1 className="vp-title vp-title--sm">{title}</h1>
                {event?.starts_at && (
                  <p className="vp-muted">
                    <EventDate iso={event.starts_at} />
                  </p>
                )}
                {place && <p className="vp-muted">{place}</p>}
                {seatBits.length > 0 && (
                  <p className="vp-ticket-seat">{seatBits.join(" · ")}</p>
                )}
              </header>

              <div className="vp-ticket-tear" aria-hidden="true" />

              <TicketQr
                ticketId={ticket.id}
                status={ticket.status}
                scannedAt={ticket.scanned_at}
                endsAt={endsAt}
              />

              <TicketActions ticketId={ticket.id} canAddToWallet={ticket.status === "active"} />
            </article>
          </div>
        </main>
      </div>
    </div>
  );
}
