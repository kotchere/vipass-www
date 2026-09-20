import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { getSupabaseAnonKey, getSupabaseUrl } from "@/lib/env";

/**
 * Refreshes the Supabase session cookie on every matched request.
 *
 * Server Components cannot write cookies, so this is the only place an
 * expired access token gets rotated during a plain page load. It does no
 * authorization — pages/route handlers decide access with `getUser()`.
 *
 * `auth.getUser()` is used (not `getSession()`): it validates the token with
 * Supabase Auth and triggers the refresh; with no session cookie it returns
 * without a network call.
 */
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        // Make the refreshed cookies visible to this request's Server Components…
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }
        // …and send them (plus the no-store cache headers) back to the browser.
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
        for (const [key, value] of Object.entries(headers)) {
          response.headers.set(key, value);
        }
      },
    },
  });

  // Do not add code between client creation and this call: it must run first
  // so the refreshed cookies are in place before anything else reads them.
  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: [
    /*
     * Everything except:
     * - _next/static, _next/image (build assets, image optimizer)
     * - assets/ (self-hosted fonts/images), .well-known/ (AASA etc.), favicon.ico
     * - image and font files by extension
     */
    "/((?!_next/static|_next/image|assets/|\\.well-known/|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|woff2?|ttf|otf)$).*)",
  ],
};
