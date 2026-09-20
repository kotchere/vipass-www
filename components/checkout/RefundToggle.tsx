"use client";

type RefundToggleProps = {
  percent: number;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
};

/**
 * Opt-in Refund Protection. Only rendered when the subtotal is above zero;
 * the parent turns it off again when the subtotal drops to zero.
 */
export default function RefundToggle({ percent, checked, disabled = false, onChange }: RefundToggleProps) {
  return (
    <label className={`vp-refund-toggle${checked ? " vp-refund-toggle--on" : ""}`}>
      <input
        type="checkbox"
        className="vp-refund-toggle__input"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="vp-refund-toggle__body">
        <span className="vp-refund-toggle__title">Refund Protection (+{percent}%)</span>
        <span className="vp-muted vp-small">
          Refund instantly and get the full ticket price back. Without it, refunds are reduced by the
          Vipass platform fee.
        </span>
      </span>
    </label>
  );
}
