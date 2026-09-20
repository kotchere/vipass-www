import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Guarantees a `public.users` row exists for a freshly signed-in user.
 *
 * Inserts a *bare* `{ id }` only — never `onboarded_at`, `handle`, `age_range`
 * or anything else: the mobile app's onboarding owns those fields and gates
 * on them. `ignoreDuplicates` makes this a no-op for existing app users.
 * RLS policy `insert_users_own` permits the insert for `id = auth.uid()`.
 *
 * Failure is logged, not thrown: a missing profile row must not block sign-in.
 */
export async function ensureProfile(supabase: SupabaseClient, userId: string): Promise<void> {
  const { error } = await supabase
    .from("users")
    .upsert({ id: userId }, { onConflict: "id", ignoreDuplicates: true });

  if (error) {
    console.error("[ensureProfile] users upsert failed", { userId, error });
  }
}
