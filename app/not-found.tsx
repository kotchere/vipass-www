import type { Metadata } from "next";

import SiteHeader from "@/components/layout/SiteHeader";

export const metadata: Metadata = {
  title: "Page not found - Vipass",
};

export default function NotFound() {
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
          <div className="vp-card vp-stack vp-center">
            <span className="vp-chip">404</span>
            <h1 className="vp-title">Page not found</h1>
            <p className="vp-muted">
              This event or page doesn&apos;t exist, or the link has expired.
            </p>
            <a className="vp-btn vp-btn-primary" href="/">
              Back to Vipass
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}
