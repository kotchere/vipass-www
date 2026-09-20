"use client";

import { FunctionsHttpError } from "@supabase/supabase-js";
import dayjs from "dayjs";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";
import type { TicketStatus } from "@/lib/tickets";

/** Payload shape the scanner (`verify-ticket`, type "wallet") accepts. */
type WalletPayload = {
  ticketId: string;
  eventId: string;
  walletToken: string;
  type: "wallet";
};

type QrState =
  | { kind: "loading" }
  | { kind: "ready"; value: string }
  | { kind: "error"; message: string };

const QR_SIZE = 260;

const NOT_PRESENTABLE = "This ticket can't be presented.";

function messageForError(code: string | undefined, status: number | undefined): string {
  if (status === 403 || status === 400 || code === "not_owner" || code === "ticket_not_scannable") {
    return NOT_PRESENTABLE;
  }
  if (status === 404 || code === "ticket_not_found") return "Ticket not found.";
  if (status === 401) return "Please sign in again to view this ticket.";
  return "Couldn't load your QR code. Check your connection and try again.";
}

interface TicketQrProps {
  ticketId: string;
  status: TicketStatus;
  scannedAt: string | null;
  /** ISO end (or start) of the event; drives the EXPIRED watermark. */
  endsAt: string | null;
}

export default function TicketQr({ ticketId, status, scannedAt, endsAt }: TicketQrProps) {
  const scannable = status === "active" || status === "used";
  const [state, setState] = useState<QrState>({ kind: "loading" });
  const [expired, setExpired] = useState(false);
  const [attempt, setAttempt] = useState(0);

  // Evaluated on the client so the server never renders a clock-dependent branch.
  useEffect(() => {
    if (!endsAt) return;
    const end = Date.parse(endsAt);
    if (!Number.isNaN(end)) setExpired(end < Date.now());
  }, [endsAt]);

  useEffect(() => {
    if (!scannable) return;
    let cancelled = false;
    setState({ kind: "loading" });

    (async () => {
      const supabase = createClient();
      const { data, error } = await supabase.functions.invoke<WalletPayload>("get-ticket-qr", {
        body: { ticket_id: ticketId },
      });

      if (cancelled) return;

      if (error) {
        let code: string | undefined;
        let httpStatus: number | undefined;
        if (error instanceof FunctionsHttpError) {
          httpStatus = error.context?.status;
          try {
            const body = await error.context.json();
            code = typeof body?.error === "string" ? body.error : undefined;
          } catch {
            // Non-JSON error body — fall through to the status-based message.
          }
        }
        if (!cancelled) setState({ kind: "error", message: messageForError(code, httpStatus) });
        return;
      }

      if (!data?.walletToken || !data.ticketId || !data.eventId) {
        setState({ kind: "error", message: NOT_PRESENTABLE });
        return;
      }

      // Field order matches the app (`comp-ticket-qr.tsx`) so both produce the same QR.
      const payload: WalletPayload = {
        ticketId: data.ticketId,
        eventId: data.eventId,
        walletToken: data.walletToken,
        type: "wallet",
      };
      setState({ kind: "ready", value: JSON.stringify(payload) });
    })();

    return () => {
      cancelled = true;
    };
  }, [ticketId, scannable, attempt]);

  if (!scannable) {
    return (
      <div className="vp-qr-placeholder vp-stack vp-stack--tight vp-center">
        <p className="vp-muted">
          {status === "refund_pending"
            ? "A refund is being processed for this ticket, so it can't be scanned."
            : "This ticket has been refunded and can't be scanned."}
        </p>
      </div>
    );
  }

  return (
    <div className="vp-stack vp-stack--tight vp-center">
      <div className="vp-qr-frame" style={{ width: QR_SIZE + 40, height: QR_SIZE + 40 }}>
        {state.kind === "ready" && (
          <QRCodeSVG
            value={state.value}
            size={QR_SIZE}
            level="M"
            bgColor="#ffffff"
            fgColor="#000000"
            className={status === "used" || expired ? "vp-qr-svg vp-qr-svg--dimmed" : "vp-qr-svg"}
            aria-label="Ticket QR code"
            role="img"
          />
        )}
        {state.kind === "loading" && (
          <div className="vp-qr-center">
            <span className="vp-qr-spinner" aria-hidden="true" />
            <span className="vp-qr-hint">Loading QR code…</span>
          </div>
        )}
        {state.kind === "error" && (
          <div className="vp-qr-center">
            <span className="vp-qr-hint vp-qr-hint--error">{state.message}</span>
            {state.message !== NOT_PRESENTABLE && (
              <button type="button" className="vp-link" onClick={() => setAttempt((n) => n + 1)}>
                Try again
              </button>
            )}
          </div>
        )}
        {state.kind === "ready" && status === "used" && (
          <div className="vp-qr-overlay">
            <span className="vp-qr-overlay__title">Used</span>
            {scannedAt && (
              <span className="vp-qr-overlay__sub">
                Scanned {dayjs(scannedAt).format("ddd, MMM D [at] h:mma")}
              </span>
            )}
          </div>
        )}
        {state.kind === "ready" && status !== "used" && expired && (
          <div className="vp-qr-watermark" aria-hidden="true">
            Expired
          </div>
        )}
      </div>
      {state.kind === "ready" && status === "active" && !expired && (
        <p className="vp-muted vp-small">Show this code at the door.</p>
      )}
      {state.kind === "ready" && status === "active" && expired && (
        <p className="vp-muted vp-small">This event has ended.</p>
      )}
    </div>
  );
}
