"use server";

import { ensureProfile } from "@/lib/ensure-profile";
import { createClient } from "@/lib/supabase/server";

/**
 * Called from LoginForm right after `verifyOtp` succeeds in the browser.
 * The browser client has already written the session cookies, so the server
 * client can validate the user and bootstrap the `users` row.
 */
export async function ensureProfileAction(): Promise<{ ok: boolean }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { ok: false };

  await ensureProfile(supabase, user.id);
  return { ok: true };
}
