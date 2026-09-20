import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import PaystackReturn from "@/components/checkout/PaystackReturn";
import SiteHeader from "@/components/layout/SiteHeader";
import { getUser } from "@/lib/supabase/server";
import { isUuid } from "@/lib/uuid";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Confirming payment - Vipass",
  robots: { index: false, follow: false },
};

type PageProps = { params: Promise<{ id: string }> };

/**
 * Web buyers land here after Paystack's hosted page (the app's own
 * `/paystack-return` is untouched). Verification runs client-side with the
 * buyer's session; a signed-out visitor gets a sign-in prompt rather than a
 * redirect so the reference in the query survives.
 */
export default async function EventPaystackReturnPage({ params }: PageProps) {
  const { id } = await params;
  if (!isUuid(id)) notFound();

  const user = await getUser();

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
          <Suspense
            fallback={
              <div className="vp-card vp-stack vp-center" aria-busy="true">
                <p className="vp-title vp-title--sm">Confirming your payment…</p>
              </div>
            }
          >
            <PaystackReturn eventId={id} signedIn={!!user} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
