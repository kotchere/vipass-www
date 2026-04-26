import { supabase } from "@/lib/supabase";

export type Event = {
  id: string;
  title: string;
  description: string | null;
  cover_image_url: string;
  starts_at: string | null;
  ends_at: string | null;
  is_featured: boolean;
};

const MAX_EVENTS = 6;

const EVENT_SELECT =
  "id, title, description, cover_image_url, starts_at, ends_at, is_featured";

export async function getExperienceEvents(): Promise<Event[]> {
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

  const featuredEvents = featuredResult.data ?? [];
  const allEvents = regularResult.data ?? [];
  const pastEvents = pastResult.data ?? [];

  // Merge: featured first, then non-featured upcoming, then past — deduped
  const featuredIds = new Set(featuredEvents.map((e) => e.id));
  const nonFeatured = allEvents.filter((e) => !featuredIds.has(e.id));
  const upcoming = [...featuredEvents, ...nonFeatured];
  const upcomingIds = new Set(upcoming.map((e) => e.id));
  const uniquePast = pastEvents.filter((e) => !upcomingIds.has(e.id));

  return [...upcoming, ...uniquePast].slice(0, MAX_EVENTS) as Event[];
}
