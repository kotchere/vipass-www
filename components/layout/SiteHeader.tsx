import Header from "@/components/layout/Header";
import { getUser } from "@/lib/supabase/server";

/**
 * Server wrapper around the (client) Header: resolves the signed-in state once
 * per request via the cached `getUser()` and passes a plain boolean down.
 * Use this in layouts/pages instead of `<Header />` directly.
 */
export default async function SiteHeader() {
  const user = await getUser();
  return <Header signedIn={!!user} />;
}
