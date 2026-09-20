import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

import { getSupabaseAnonKey, getSupabaseUrl } from "@/lib/env";

let browserClient: SupabaseClient | undefined;

/**
 * Supabase client for Client Components ("use client").
 *
 * Memoized module-level singleton: every component shares one auth state and
 * one cookie store. Sessions live in cookies (managed by @supabase/ssr) so the
 * server client and `proxy.ts` see the same session.
 */
export function createClient(): SupabaseClient {
  if (!browserClient) {
    browserClient = createBrowserClient(getSupabaseUrl(), getSupabaseAnonKey());
  }
  return browserClient;
}
