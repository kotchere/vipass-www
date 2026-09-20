import { NextResponse, type NextRequest } from "next/server";

import { createClient } from "@/lib/supabase/server";

/**
 * Sign out. POST only (submitted by the header's sign-out form) so a crawler
 * or prefetch can never log someone out. Responds 303 so the browser follows
 * with a GET to "/". Next.js appends the cookie deletions made by the server
 * client to this response.
 */
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  // Local scope: only end this browser's session. The default (global) revokes
  // every session for the user, including the one in the phone app.
  await supabase.auth.signOut({ scope: "local" });

  return NextResponse.redirect(new URL("/", request.nextUrl.origin), { status: 303 });
}
