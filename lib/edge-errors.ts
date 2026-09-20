/**
 * Turns a failed `supabase.functions.invoke(...)` into buyer-facing copy.
 *
 * supabase-js wraps every non-2xx edge-function response in a
 * `FunctionsHttpError` whose `message` is the generic "Edge Function returned
 * a non-2xx status code"; the function's own JSON body — and its
 * machine-readable code — only survives on `error.context` (the raw
 * `Response`). Port of the mobile `util-edge-function-error.ts`; the copy is
 * lifted from `en.ts` `edgeErrors.*` so web and app say the same thing.
 */

export type EdgeErrorInfo = {
  /** Machine-readable code (`code`, else `error`) when the body carried one. */
  code?: string;
  /** Server-authored text, when any. For logs only — never rendered. */
  message?: string;
  /** Every other field of the body (counts, ticket_type_id, …). */
  extras: Record<string, unknown>;
  /** HTTP status of the response, when known. */
  status?: number;
};

export const GENERIC_ERROR_COPY = "Something went wrong. Please try again.";

/**
 * A `Response` body can be read once; memoise per error object so a second
 * caller (e.g. a component catching what a helper re-threw) still sees it.
 */
const EXTRACTION_CACHE = new WeakMap<object, Promise<EdgeErrorInfo>>();

function infoFromBody(body: unknown, status?: number): EdgeErrorInfo | null {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;
  const record = body as Record<string, unknown>;
  const code = typeof record.code === "string" ? record.code : undefined;
  const error = typeof record.error === "string" ? record.error : undefined;
  if (!code && !error) return null;
  const { code: _c, error: _e, message: _m, ...extras } = record;
  const message =
    typeof record.message === "string" ? record.message : error && code ? error : undefined;
  return { code: code ?? error, message: message ?? error, extras, status };
}

async function unpack(error: unknown, data: unknown): Promise<EdgeErrorInfo> {
  // 1. A FunctionsHttpError (or anything carrying a Response-like `context`).
  if (error && typeof error === "object") {
    const ctx = (error as { context?: unknown }).context;
    if (ctx && typeof ctx === "object") {
      const response = ctx as { json?: () => Promise<unknown>; status?: number };
      if (typeof response.json === "function") {
        try {
          const parsed = await response.json();
          const info = infoFromBody(parsed, response.status);
          if (info) return info;
          return { extras: {}, status: response.status };
        } catch {
          // Non-JSON body (HTML error page, empty response): nothing to map.
          return { extras: {}, status: response.status };
        }
      }
    }
    // Errors already tagged with a code (see `EdgeError` in lib/payment.ts).
    const tagged = error as { code?: unknown; message?: unknown; extras?: unknown };
    if (typeof tagged.code === "string") {
      return {
        code: tagged.code,
        message: typeof tagged.message === "string" ? tagged.message : undefined,
        extras:
          tagged.extras && typeof tagged.extras === "object"
            ? (tagged.extras as Record<string, unknown>)
            : {},
      };
    }
  }

  // 2. A 2xx body that still carries `error` / `code`.
  const fromData = infoFromBody(data);
  if (fromData) return fromData;

  // 3. Anything else (transport failure, thrown string, …).
  const message =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : undefined;
  return { message, extras: {} };
}

/**
 * Extract `{ code, message, extras }` from an invoke failure. Always resolves
 * — `code` is simply undefined when nothing machine-readable was found.
 */
export function readEdgeError(error: unknown, data?: unknown): Promise<EdgeErrorInfo> {
  if (!error || typeof error !== "object") return unpack(error, data);
  const cached = EXTRACTION_CACHE.get(error);
  if (cached) return cached;
  const pending = unpack(error, data);
  EXTRACTION_CACHE.set(error, pending);
  return pending;
}

type CopyResolver = (extras: Record<string, unknown>) => string;

const CODE_COPY: Record<string, string | CopyResolver> = {
  // create-payment-intent / paystack-init-transaction (shared codes)
  event_not_on_sale: "This event is no longer on sale.",
  EVENT_NOT_ON_SALE: "This event is no longer on sale.",
  event_not_found: "We couldn't find this event. It may already have been removed.",
  TICKET_NOT_ON_SALE: "These tickets aren't on sale right now.",
  SOLD_OUT: "These tickets are sold out.",
  INSUFFICIENT_INVENTORY: (extras) =>
    typeof extras.available === "number"
      ? `Only ${extras.available} left. Please choose a smaller quantity.`
      : "There aren't enough tickets left. Please choose a smaller quantity.",
  USER_LIMIT_EXCEEDED: (extras) =>
    typeof extras.max_per_user === "number"
      ? `Ticket limit reached — you can buy up to ${extras.max_per_user} per person for this event.`
      : "Ticket limit reached for this event.",
  owner_payouts_not_ready: "This organizer can't accept payments yet. Try again later.",
  user_profile_missing: "Finish setting up your account in the Vipass app, then try again.",
  internal_error: "We couldn't start this payment. Please try again.",

  // Auth failures, spelled differently across functions.
  unauthorized: "You don't have permission to do that. Sign in and try again.",
  missing_authorization: "You don't have permission to do that. Sign in and try again.",
  not_authorized: "You don't have permission to do that. Sign in and try again.",
  unauthenticated: "You don't have permission to do that. Sign in and try again.",

  // paystack-init-transaction. Its shared `jsonError` puts a snake_case code
  // in `error` and (for the inventory family) a SCREAMING twin in `code`;
  // `readEdgeError` prefers `code`, but both spellings are mapped.
  ticket_not_on_sale: "These tickets aren't on sale right now.",
  sold_out: "These tickets are sold out.",
  insufficient_inventory: (extras) =>
    typeof extras.available === "number"
      ? `Only ${extras.available} left. Please choose a smaller quantity.`
      : "There aren't enough tickets left. Please choose a smaller quantity.",
  user_limit_exceeded: (extras) =>
    typeof extras.max_per_user === "number"
      ? `Ticket limit reached — you can buy up to ${extras.max_per_user} per person for this event.`
      : "Ticket limit reached for this event.",
  ticket_type_not_found: "One of those ticket types is no longer available. Refresh and try again.",
  currency_not_paystack: "This event's currency can't be paid through Paystack.",
  mixed_currencies: "These tickets are priced in different currencies and can't be bought together.",
  missing_user_email: "We need an email address on your account to send your tickets. Add one and try again.",
  paystack_init_failed: "We couldn't start this payment. Please try again.",
  no_valid_channels: "We couldn't start this payment. Please try again.",
  missing_fields: "Please choose at least one ticket.",
  invalid_event_id: "Something went wrong with this event. Please try again.",

  // paystack-verify-transaction
  missing_reference: "We couldn't confirm this payment. Check My Tickets before trying again.",
  order_not_found: "We couldn't find this order. Check My Tickets before trying again.",
  paystack_verify_failed: "We couldn't confirm this payment. Check My Tickets before trying again.",
  order_update_failed: "We couldn't confirm this payment. Check My Tickets before trying again.",
  ticket_creation_failed: "We couldn't confirm this payment. Check My Tickets before trying again.",
};

/** Plain-English copy for a server code; unknown or missing codes get the generic line. */
export function edgeErrorCopy(code: string | undefined, extras: Record<string, unknown> = {}): string {
  const entry = code ? CODE_COPY[code] : undefined;
  if (!entry) return GENERIC_ERROR_COPY;
  return typeof entry === "function" ? entry(extras) : entry;
}

/** Codes after which the server's ticket counts have moved and the page should refetch. */
export const INVENTORY_CHANGED_CODES: ReadonlySet<string> = new Set([
  "SOLD_OUT",
  "INSUFFICIENT_INVENTORY",
  "USER_LIMIT_EXCEEDED",
  "TICKET_NOT_ON_SALE",
  "event_not_on_sale",
]);

/** One call for most screens: unpack an invoke failure and hand back copy + code. */
export async function describeEdgeError(
  error: unknown,
  data?: unknown,
): Promise<{ code?: string; copy: string; extras: Record<string, unknown> }> {
  const info = await readEdgeError(error, data);
  return { code: info.code, copy: edgeErrorCopy(info.code, info.extras), extras: info.extras };
}
