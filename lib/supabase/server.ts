import { createServerClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { cache } from "react";

import { getSupabaseAnonKey, getSupabaseUrl } from "@/lib/env";

/**
 * Cookie-backed Supabase client for Server Components, Server Functions and
 * Route Handlers. Create a fresh one per request — never cache the client
 * itself across requests.
 *
 * `setAll` is wrapped in try/catch: Server Components cannot write cookies
 * (the response has already started streaming), and `proxy.ts` refreshes the
 * session on every request anyway, so a failed write here is harmless.
 */
export async function createClient(): Promise<SupabaseClient> {
  const cookieStore = await cookies();

  return createServerClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Called from a Server Component render; proxy.ts owns refreshes there.
        }
      },
    },
  });
}

/**
 * The signed-in user for the current request, or `null`.
 *
 * Wrapped in React `cache` so a layout, a page and any nested Server
 * Components share a single `auth.getUser()` round-trip per request.
 * This validates the JWT against Supabase Auth — never use `getSession()`
 * for trust decisions on the server.
 */
export const getUser = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});
