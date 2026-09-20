"use client";

import { formatPrice } from "@/lib/event-state";
import {
  getIsMaxedOut,
  getMaxSelectable,
  getSalesWindowState,
  isSoldOut,
  type UserTicketCounts,
} from "@/lib/ticket-math";
import type { TicketType } from "@/lib/types";

type TicketSelectorProps = {
  ticketTypes: TicketType[];
  /** ticket_type_id → quantity (absent = 0). */
  quantities: Record<string, number>;
  userCounts: UserTicketCounts;
  disabled?: boolean;
  onChange: (ticketTypeId: string, quantity: number) => void;
  now?: Date;
};

type RowStatus =
  | { kind: "available"; max: number }
  | { kind: "sold_out" }
  | { kind: "limit_reached" }
  | { kind: "not_started" }
  | { kind: "ended" };

function rowStatus(tt: TicketType, userCount: number, now: Date): RowStatus {
  const window = getSalesWindowState(tt, now);
  if (window === "not_started") return { kind: "not_started" };
  if (window === "ended") return { kind: "ended" };
  if (isSoldOut(tt)) return { kind: "sold_out" };
  if (getIsMaxedOut(tt, userCount)) return { kind: "limit_reached" };
  return { kind: "available", max: getMaxSelectable(tt, userCount) };
}

const CHIP_LABEL: Record<Exclude<RowStatus["kind"], "available">, string> = {
  sold_out: "Sold out",
  limit_reached: "Limit reached",
  not_started: "Not on sale yet",
  ended: "Sales ended",
};

/** One row per ticket type with a +/− stepper and an availability chip. */
export default function TicketSelector({
  ticketTypes,
  quantities,
  userCounts,
  disabled = false,
  onChange,
  now = new Date(),
}: TicketSelectorProps) {
  if (ticketTypes.length === 0) {
    return <p className="vp-muted">No tickets available.</p>;
  }

  return (
    <ul className="vp-ticket-select" aria-label="Ticket types">
      {ticketTypes.map((tt) => {
        const status = rowStatus(tt, userCounts[tt.id] ?? 0, now);
        const qty = quantities[tt.id] ?? 0;
        const available = status.kind === "available";
        const max = available ? status.max : 0;
        const canAdd = available && !disabled && qty < max;
        const canRemove = !disabled && qty > 0;
        const remaining = tt.inventory_total != null ? tt.inventory_total - tt.inventory_sold : null;
        const showLowStock = available && remaining != null && remaining > 0 && remaining <= 10;
        const inputId = `qty-${tt.id}`;

        return (
          <li
            key={tt.id}
            className={`vp-ticket-select__row${available ? "" : " vp-ticket-select__row--off"}`}
            data-ticket-type-id={tt.id}
          >
            <div className="vp-ticket-select__info">
              <p className="vp-ticket-select__name" id={`${inputId}-name`}>
                {tt.name}
              </p>
              <p className="vp-ticket-select__price">
                {tt.price_cents === 0 ? "Free" : formatPrice(tt.price_cents, tt.currency)}
              </p>
              {tt.description && (
                <p className="vp-muted vp-small vp-ticket-select__desc">{tt.description}</p>
              )}
              <div className="vp-ticket-select__meta">
                {!available && <span className="vp-chip vp-chip--muted">{CHIP_LABEL[status.kind]}</span>}
                {showLowStock && <span className="vp-muted vp-small">{remaining} left</span>}
                {available && tt.max_per_user != null && (
                  <span className="vp-muted vp-small">Limit {tt.max_per_user} per person</span>
                )}
              </div>
            </div>

            <div
              className="vp-stepper"
              role="group"
              aria-labelledby={`${inputId}-name`}
              aria-disabled={!available || disabled}
            >
              <button
                type="button"
                className="vp-stepper__btn"
                aria-label={`Remove one ${tt.name}`}
                disabled={!canRemove}
                onClick={() => onChange(tt.id, Math.max(0, qty - 1))}
              >
                −
              </button>
              <output
                id={inputId}
                className="vp-stepper__value"
                aria-live="polite"
                aria-label={`${tt.name} quantity`}
              >
                {qty}
              </output>
              <button
                type="button"
                className="vp-stepper__btn"
                aria-label={`Add one ${tt.name}`}
                disabled={!canAdd}
                onClick={() => onChange(tt.id, qty + 1)}
              >
                +
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
