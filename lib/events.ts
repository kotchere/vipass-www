import { createClient as createAnonClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

import { getSupabaseAnonKey, getSupabaseUrl } from "@/lib/env";

export type Event = {
  id: string;
  title: string;
  description: string | null;
  cover_image_url: string;
  starts_at: string | null;
  ends_at: string | null;
  is_featured: boolean;
  visibility: string;
  status: string;
  seating_type: string;
};

const MAX_EVENTS = 6;

const EVENT_SELECT =
  "id, title, description, cover_image_url, starts_at, ends_at, is_featured, visibility, status, seating_type";

/**
 * Cookie-less anon client for public, cacheable reads. `unstable_cache` scopes
 * cannot touch `cookies()`, and these queries are public-RLS anyway.
 */
function createPublicClient() {
  return createAnonClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

async function fetchExperienceEvents(): Promise<Event[]> {
  const supabase = createPublicClient();
  const now = new Date().toISOString();

  const baseFilters = (query: any) =>
    query
      .eq("status", "published")
      .eq("visibility", "public")
      .not("cover_image_url", "is", null)
      .neq("cover_image_url", "");

  const [featuredResult, regularResult, pastResult] = await Promise.all([
    baseFilters(supabase.from("events").select(EVENT_SELECT))
      .eq("is_featured", true)
      .gte("ends_at", now)
      .order("starts_at", { ascending: true })
      .limit(MAX_EVENTS),

    baseFilters(supabase.from("events").select(EVENT_SELECT))
      .gte("ends_at", now)
      .order("starts_at", { ascending: true })
      .limit(MAX_EVENTS),

    baseFilters(supabase.from("events").select(EVENT_SELECT))
      .lt("ends_at", now)
      .order("starts_at", { ascending: false })
      .limit(MAX_EVENTS),
  ]);

  const featuredEvents: Event[] = featuredResult.data ?? [];
  const allEvents: Event[] = regularResult.data ?? [];
  const pastEvents: Event[] = pastResult.data ?? [];

  // Merge: featured first, then non-featured upcoming, then past — deduped
  const featuredIds = new Set(featuredEvents.map((e: Event) => e.id));
  const nonFeatured = allEvents.filter((e: Event) => !featuredIds.has(e.id));
  const upcoming = [...featuredEvents, ...nonFeatured];
  const upcomingIds = new Set(upcoming.map((e: Event) => e.id));
  const uniquePast = pastEvents.filter((e: Event) => !upcomingIds.has(e.id));

  return [...upcoming, ...uniquePast].slice(0, MAX_EVENTS) as Event[];
}

/**
 * Home-page Experiences list, cached across requests for 60 s. The page
 * itself renders dynamically (the header reads the session cookie), so the
 * cache lives on the query rather than on the route.
 */
export const getExperienceEvents = unstable_cache(fetchExperienceEvents, ["experience-events"], {
  revalidate: 60,
});

export type SitemapEvent = {
  id: string;
  updated_at: string | null;
};

/**
 * Every published, public, upcoming event — uncapped — for `app/sitemap.ts`.
 * Same visibility rules as the Experiences list, minus the cover requirement.
 *
 * Uses a cookie-less anon client on purpose: the sitemap has no session and
 * touching `cookies()` would force the route to render on every request.
 */
export async function getSitemapEvents(): Promise<SitemapEvent[]> {
  const supabase = createPublicClient();
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("events")
    .select("id, updated_at")
    .eq("status", "published")
    .eq("visibility", "public")
    .gte("ends_at", now)
    .order("starts_at", { ascending: true });

  if (error) {
    throw new Error(`getSitemapEvents failed: ${error.message}`);
  }
  return (data ?? []) as SitemapEvent[];
}
