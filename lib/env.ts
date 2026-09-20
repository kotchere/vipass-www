/**
 * Typed accessors for the public runtime configuration.
 *
 * Every getter reads its `process.env.NEXT_PUBLIC_*` variable by its literal
 * name so Next.js can inline the value into the browser bundle at build time.
 * Do not refactor these into a dynamic lookup (`process.env[name]`) — that
 * breaks the inlining and the getters would throw in the browser.
 */

function required(name: string, value: string | undefined): string {
  if (!value || value.trim() === "") {
    throw new Error(
      `Missing environment variable ${name}. Add it to .env (see .env.example) and to the Vercel project settings.`,
    );
  }
  return value.trim();
}

/** Absolute origin of this deployment, no trailing slash (e.g. https://vipass.app). */
export function getSiteUrl(): string {
  return required("NEXT_PUBLIC_SITE_URL", process.env.NEXT_PUBLIC_SITE_URL).replace(/\/+$/, "");
}

export function getSupabaseUrl(): string {
  return required("NEXT_PUBLIC_SUPABASE_URL", process.env.NEXT_PUBLIC_SUPABASE_URL);
}

export function getSupabaseAnonKey(): string {
  return required("NEXT_PUBLIC_SUPABASE_ANON_KEY", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export function getStripePublishableKey(): string {
  return required(
    "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  );
}

export function getBranchKey(): string {
  return required("NEXT_PUBLIC_BRANCH_KEY", process.env.NEXT_PUBLIC_BRANCH_KEY);
}
