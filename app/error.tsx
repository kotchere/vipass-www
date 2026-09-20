"use client";

import { useEffect } from "react";

import Header from "@/components/layout/Header";

type ErrorProps = {
  error: Error & { digest?: string };
  /** Next.js 16 retry callback (re-renders the segment). */
  unstable_retry?: () => void;
  /** Older name for the same callback; kept for forward/backward compatibility. */
  reset?: () => void;
};

export default function ErrorPage({ error, unstable_retry, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const retry = unstable_retry ?? reset;

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
            {/* Error boundaries are client-only, so signed-in state is unknown here. */}
            <Header />
          </div>
        </div>
        <main className="vp-page vp-page--narrow">
          <div className="vp-card vp-stack vp-center">
            <span className="vp-chip vp-chip--danger">Error</span>
            <h1 className="vp-title">Something went wrong</h1>
            <p className="vp-muted">
              We couldn&apos;t load this page. Please try again in a moment.
            </p>
            {error.digest && <p className="vp-muted vp-small">Reference: {error.digest}</p>}
            <div className="vp-row">
              {retry && (
                <button type="button" className="vp-btn vp-btn-primary" onClick={() => retry()}>
                  Try again
                </button>
              )}
              <a className="vp-btn vp-btn-secondary" href="/">
                Back to Vipass
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
