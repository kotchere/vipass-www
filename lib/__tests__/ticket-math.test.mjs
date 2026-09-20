// Run with: npm test   (node --experimental-strip-types --test lib/__tests__/)
import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  clampSelections,
  computeTotals,
  defaultChannelsForCurrency,
  getIsMaxedOut,
  getMaxSelectable,
  getPaymentProviderForCurrency,
  getSalesWindowState,
  inventoryRemaining,
  isSoldOut,
  isWithinSalesWindow,
  selectionCount,
} from "../ticket-math.ts";

const base = {
  id: "tt-1",
  event_id: "ev-1",
  name: "GA",
  description: null,
  price_cents: 1500,
  currency: "usd",
  inventory_total: 10,
  inventory_sold: 4,
  max_per_user: 2,
  is_active: true,
  sales_start: null,
  sales_end: null,
  seat_category: null,
};

const tt = (overrides = {}) => ({ ...base, ...overrides });

describe("inventoryRemaining / isSoldOut", () => {
  it("is Infinity when inventory_total is null", () => {
    assert.equal(inventoryRemaining(tt({ inventory_total: null })), Infinity);
    assert.equal(isSoldOut(tt({ inventory_total: null })), false);
  });
  it("subtracts sold and never goes negative", () => {
    assert.equal(inventoryRemaining(tt()), 6);
    assert.equal(inventoryRemaining(tt({ inventory_sold: 12 })), 0);
    assert.equal(isSoldOut(tt({ inventory_sold: 10 })), true);
  });
});

describe("getMaxSelectable", () => {
  it("is the smaller of inventory left and per-user remaining", () => {
    assert.equal(getMaxSelectable(tt(), 0), 2);
    assert.equal(getMaxSelectable(tt(), 1), 1);
    assert.equal(getMaxSelectable(tt({ max_per_user: 20 }), 0), 6);
  });
  it("clamps at zero when the user is over their limit", () => {
    assert.equal(getMaxSelectable(tt(), 5), 0);
  });
  it("is Infinity with no inventory cap and no per-user cap", () => {
    assert.equal(getMaxSelectable(tt({ inventory_total: null, max_per_user: null })), Infinity);
  });
  it("defaults userCount to 0", () => {
    assert.equal(getMaxSelectable(tt()), 2);
  });
});

describe("getIsMaxedOut", () => {
  it("is false without a per-user limit", () => {
    assert.equal(getIsMaxedOut(tt({ max_per_user: null }), 99), false);
  });
  it("is true when the limit is hit but stock remains", () => {
    assert.equal(getIsMaxedOut(tt(), 2), true);
    assert.equal(getIsMaxedOut(tt(), 1), false);
  });
  it("is false when the type is sold out (that chip wins)", () => {
    assert.equal(getIsMaxedOut(tt({ inventory_sold: 10 }), 2), false);
  });
});

describe("sales window", () => {
  const now = new Date("2026-09-19T12:00:00Z");
  it("is open when both bounds are null", () => {
    assert.equal(getSalesWindowState(tt(), now), "open");
    assert.equal(isWithinSalesWindow(tt(), now), true);
  });
  it("is not_started before sales_start", () => {
    const t = tt({ sales_start: "2026-09-20T00:00:00Z" });
    assert.equal(getSalesWindowState(t, now), "not_started");
    assert.equal(isWithinSalesWindow(t, now), false);
  });
  it("is ended after sales_end", () => {
    const t = tt({ sales_end: "2026-09-18T00:00:00Z" });
    assert.equal(getSalesWindowState(t, now), "ended");
    assert.equal(isWithinSalesWindow(t, now), false);
  });
  it("is open inside the window and at its bounds", () => {
    const t = tt({ sales_start: "2026-09-19T12:00:00Z", sales_end: "2026-09-19T12:00:00Z" });
    assert.equal(isWithinSalesWindow(t, now), true);
  });
  it("treats unparseable bounds as open", () => {
    assert.equal(isWithinSalesWindow(tt({ sales_start: "garbage" }), now), true);
  });
});

describe("computeTotals", () => {
  const types = [tt(), tt({ id: "tt-2", price_cents: 0 }), tt({ id: "tt-3", price_cents: 2550 })];

  it("sums price × quantity and reports the currency", () => {
    const totals = computeTotals(
      [
        { ticket_type_id: "tt-1", quantity: 2 },
        { ticket_type_id: "tt-3", quantity: 1 },
      ],
      types,
      10,
      false,
    );
    assert.deepEqual(totals, {
      subtotalCents: 5550,
      refundCents: 0,
      totalCents: 5550,
      currency: "usd",
    });
  });

  it("adds the rounded refund fee only when enabled", () => {
    const on = computeTotals([{ ticket_type_id: "tt-3", quantity: 1 }], types, 10, true);
    assert.equal(on.refundCents, 255);
    assert.equal(on.totalCents, 2805);
    const off = computeTotals([{ ticket_type_id: "tt-3", quantity: 1 }], types, 10, false);
    assert.equal(off.refundCents, 0);
  });

  it("rounds half up like the mobile sheet (Math.round)", () => {
    // 1005 × 10% = 100.5 → 101
    const totals = computeTotals(
      [{ ticket_type_id: "tt-4", quantity: 1 }],
      [tt({ id: "tt-4", price_cents: 1005 })],
      10,
      true,
    );
    assert.equal(totals.refundCents, 101);
  });

  it("never charges refund protection on a free subtotal", () => {
    const totals = computeTotals([{ ticket_type_id: "tt-2", quantity: 3 }], types, 10, true);
    assert.deepEqual(totals, { subtotalCents: 0, refundCents: 0, totalCents: 0, currency: "usd" });
  });

  it("ignores unknown ids and non-positive quantities", () => {
    const totals = computeTotals(
      [
        { ticket_type_id: "nope", quantity: 5 },
        { ticket_type_id: "tt-1", quantity: 0 },
      ],
      types,
      10,
      true,
    );
    assert.equal(totals.subtotalCents, 0);
    assert.equal(totals.totalCents, 0);
  });

  it("treats a bad pct as 0 and falls back to the first type's currency", () => {
    const totals = computeTotals([{ ticket_type_id: "tt-1", quantity: 1 }], types, NaN, true);
    assert.equal(totals.refundCents, 0);
    const empty = computeTotals([], [tt({ currency: "GHS" })], 10, true);
    assert.equal(empty.currency, "ghs");
    assert.equal(computeTotals([], [], 10, true).currency, "usd");
  });
});

describe("selectionCount", () => {
  it("sums quantities", () => {
    assert.equal(
      selectionCount([
        { ticket_type_id: "a", quantity: 2 },
        { ticket_type_id: "b", quantity: 1 },
      ]),
      3,
    );
    assert.equal(selectionCount([]), 0);
  });
});

describe("clampSelections", () => {
  const now = new Date("2026-09-19T12:00:00Z");
  const types = [
    tt(), // max 2 per user, 6 left
    tt({ id: "inactive", is_active: false }),
    tt({ id: "ended", sales_end: "2026-09-01T00:00:00Z" }),
    tt({ id: "unlimited", inventory_total: null, max_per_user: null }),
  ];

  it("caps at the per-user / inventory max and drops zero lines", () => {
    const out = clampSelections(
      [
        { ticket_type_id: "tt-1", quantity: 5 },
        { ticket_type_id: "unlimited", quantity: 7 },
      ],
      types,
      { "tt-1": 1 },
      now,
    );
    assert.deepEqual(out, [
      { ticket_type_id: "tt-1", quantity: 1 },
      { ticket_type_id: "unlimited", quantity: 7 },
    ]);
  });

  it("drops unknown, inactive and out-of-window types", () => {
    const out = clampSelections(
      [
        { ticket_type_id: "missing", quantity: 1 },
        { ticket_type_id: "inactive", quantity: 1 },
        { ticket_type_id: "ended", quantity: 1 },
        { ticket_type_id: "tt-1", quantity: 0 },
      ],
      types,
      {},
      now,
    );
    assert.deepEqual(out, []);
  });
});

describe("provider routing", () => {
  it("routes the five Paystack currencies to paystack, everything else to stripe", () => {
    for (const c of ["ghs", "NGN", "zar", "kes", "XOF"]) {
      assert.equal(getPaymentProviderForCurrency(c), "paystack", c);
    }
    for (const c of ["usd", "eur", "GBP", "cad"]) {
      assert.equal(getPaymentProviderForCurrency(c), "stripe", c);
    }
  });

  it("offers mobile money only for GHS and KES", () => {
    assert.deepEqual(defaultChannelsForCurrency("ghs"), ["card", "mobile_money"]);
    assert.deepEqual(defaultChannelsForCurrency("KES"), ["card", "mobile_money"]);
    assert.deepEqual(defaultChannelsForCurrency("ngn"), ["card"]);
    assert.deepEqual(defaultChannelsForCurrency("usd"), ["card"]);
  });
});
