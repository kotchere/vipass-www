import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import SuccessView from "@/components/checkout/SuccessView";
import SiteHeader from "@/components/layout/SiteHeader";
import { getEventPage } from "@/lib/event-page";
import { getUser } from "@/lib/supabase/server";
import { isUuid } from "@/lib/uuid";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Order confirmed - Vipass",
  robots: { index: false, follow: false },
};

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/**
 * Post-checkout confirmation. `?order=` (free / Paystack) loads the tickets
 * directly; `?payment_intent=` (Stripe) polls until `stripe-webhook` has
 * written the order. Requires a session — the tickets are read under owner RLS.
 */
export default async function EventSuccessPage({ params, searchParams }: PageProps) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  if (!isUuid(id)) notFound();

  const orderId = first(query.order);
  const paymentIntentId = first(query.payment_intent);
  const redirectStatus = first(query.redirect_status);

  const user = await getUser();
  if (!user) {
    const search = new URLSearchParams();
    if (orderId) search.set("order", orderId);
    if (paymentIntentId) search.set("payment_intent", paymentIntentId);
    if (redirectStatus) search.set("redirect_status", redirectStatus);
    const qs = search.toString();
    redirect(`/login?next=${encodeURIComponent(`/events/${id}/success${qs ? `?${qs}` : ""}`)}`);
  }

  const page = await getEventPage(id);
  if (!page) notFound();

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
          <SuccessView
            eventId={id}
            eventTitle={page.event.title}
            userId={user.id}
            orderId={isUuid(orderId) ? orderId : undefined}
            paymentIntentId={paymentIntentId && /^pi_[A-Za-z0-9_]+$/.test(paymentIntentId) ? paymentIntentId : undefined}
            startedAt={Date.now()}
            redirectStatus={redirectStatus}
          />
        </main>
      </div>
    </div>
  );
}
