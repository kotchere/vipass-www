import type { MetadataRoute } from "next";

import { getSitemapEvents } from "@/lib/events";

const SITE = "https://vipass.app";

// Re-generate at most hourly so newly published events show up without a deploy.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: SITE,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE}/legal/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE}/legal/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE}/legal/delete-account`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  let events: Awaited<ReturnType<typeof getSitemapEvents>> = [];
  try {
    events = await getSitemapEvents();
  } catch (error) {
    console.error("sitemap: failed to load events", error);
  }

  const eventEntries: MetadataRoute.Sitemap = events.map((event) => ({
    url: `${SITE}/events/${event.id}`,
    lastModified: event.updated_at ? new Date(event.updated_at) : new Date(),
    changeFrequency: "daily",
    priority: 0.7,
  }));

  return [...staticEntries, ...eventEntries];
}
