/**
 * Validates a `?next=` value so post-login redirects can only land on this
 * site. Accepts a relative path starting with a single "/" (rejects "//host",
 * "/\host", absolute URLs and anything non-string); returns `null` otherwise.
 */
export function sanitizeNextPath(value: unknown): string | null {
  if (typeof value !== "string") return null;
  if (!/^\/(?![\/\\])/.test(value)) return null;
  return value;
}
