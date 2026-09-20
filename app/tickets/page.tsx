import type { Metadata } from "next";
import { redirect } from "next/navigation";

import SiteHeader from "@/components/layout/SiteHeader";
import TicketCard from "@/components/tickets/TicketCard";
import { createClient, getUser } from "@/lib/supabase/server";
import { getTicketsForUser, isTicketUpcoming, ticketEndTime, type Ticket } from "@/lib/tickets";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "My tickets - Vipass",
  robots: { index: false, follow: false },
};

function byStart(direction: 1 | -1) {
  return (a: Ticket, b: Ticket) => {
    const ta = ticketEndTime(a) ?? 0;
    const tb = ticketEndTime(b) ?? 0;
    return (ta - tb) * direction;
  };
}

export default async function TicketsPage() {
  const user = await getUser();
  if (!user) {
    redirect(`/login?next=${encodeURIComponent("/tickets")}`);
  }

  const supabase = await createClient();
  const tickets = await getTicketsForUser(supabase, user.id);

  const now = Date.now();
  const upcoming = tickets.filter((t) => isTicketUpcoming(t, now)).sort(byStart(1));
  const past = tickets.filter((t) => !isTicketUpcoming(t, now)).sort(byStart(-1));

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
        <main className="vp-page vp-page--tickets">
          <div className="vp-stack">
            <h1 className="vp-title">My tickets</h1>

            {tickets.length === 0 ? (
              <div className="vp-card vp-stack vp-center">
                <p className="vp-title vp-title--sm">No tickets yet</p>
                <p className="vp-muted">
                  Tickets you buy or RSVP for with this account will show up here.
                </p>
                <a className="vp-btn vp-btn-primary" href="/">
                  Find an event
                </a>
              </div>
            ) : (
              <>
                <section className="vp-stack vp-stack--tight" aria-labelledby="tickets-upcoming">
                  <h2 id="tickets-upcoming" className="vp-section-title">
                    Upcoming
                  </h2>
                  {upcoming.length === 0 ? (
                    <p className="vp-muted">No upcoming events.</p>
                  ) : (
                    <div className="vp-ticket-list">
                      {upcoming.map((t) => (
                        <TicketCard key={t.id} ticket={t} />
                      ))}
                    </div>
                  )}
                </section>

                {past.length > 0 && (
                  <section className="vp-stack vp-stack--tight" aria-labelledby="tickets-past">
                    <h2 id="tickets-past" className="vp-section-title">
                      Past
                    </h2>
                    <div className="vp-ticket-list">
                      {past.map((t) => (
                        <TicketCard key={t.id} ticket={t} />
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
