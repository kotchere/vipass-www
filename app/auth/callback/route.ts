import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

import { ensureProfile } from "@/lib/ensure-profile";
import { sanitizeNextPath } from "@/lib/safe-next";
import { createClient } from "@/lib/supabase/server";

/**
 * OAuth (Google / Apple) return URL. Supabase redirects here with a PKCE
 * `code`; we exchange it for a session (cookie writes are allowed in Route
 * Handlers), bootstrap the profile row, then send the user on to `next`.
 *
 * Must be listed under Supabase → Authentication → URL configuration →
 * Additional Redirect URLs for every origin (localhost, previews, vipass.app).
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const code = searchParams.get("code");
  const next = sanitizeNextPath(searchParams.get("next")) ?? "/";
  const providerError = searchParams.get("error") ?? searchParams.get("error_description");

  const loginWithError =
    next === "/" ? "/login?error=oauth" : `/login?error=oauth&next=${encodeURIComponent(next)}`;

  if (!code || providerError) {
    redirect(loginWithError);
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data.user) {
    console.error("[auth/callback] exchangeCodeForSession failed", error);
    redirect(loginWithError);
  }

  await ensureProfile(supabase, data.user.id);

  redirect(next);
}
