"use client";

import { useEffect, useState } from "react";

interface TicketActionsProps {
  ticketId: string;
  /** Only `active` tickets can be added to Apple Wallet (the edge fn rejects the rest). */
  canAddToWallet: boolean;
}

function isIosBrowser(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  // iPadOS 13+ reports as Macintosh; the touch-points check catches it.
  return /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
}

/**
 * Wallet + deep-link buttons. The Wallet link is a real navigation (not a
 * fetch) so Safari hands the .pkpass to the Wallet app. It only renders on
 * iOS after mount — no UA sniffing on the server, no hydration mismatch.
 */
export default function TicketActions({ ticketId, canAddToWallet }: TicketActionsProps) {
  const [showWallet, setShowWallet] = useState(false);

  useEffect(() => {
    setShowWallet(canAddToWallet && isIosBrowser());
  }, [canAddToWallet]);

  return (
    <div className="vp-stack vp-stack--tight">
      {showWallet && (
        <a className="vp-btn vp-btn-primary vp-btn--block" href={`/api/tickets/${ticketId}/pass`}>
          Add to Apple Wallet
        </a>
      )}
      <a
        className="vp-btn vp-btn-secondary vp-btn--block"
        href={`vipass://ticket-detail?ticketId=${ticketId}`}
      >
        Open in app
      </a>
      <p className="vp-muted vp-small vp-center-text">
        Refunds and transfers are available in the Vipass app.
      </p>
    </div>
  );
}
