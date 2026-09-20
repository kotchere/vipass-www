import { notFound, permanentRedirect } from "next/navigation";

import { isUuid } from "@/lib/uuid";

type FlatEventPathProps = {
  params: Promise<{ eventId: string }>;
};

/**
 * Flat share-link path: `https://vipass.app/<uuid>` is the canonical URL the
 * app already puts on every Branch event link. It 308s to the real event page;
 * anything that is not a UUID is a 404. Static segments (`/login`, `/tickets`,
 * `/events`, `/legal`, …) always win over this dynamic segment.
 */
export default async function FlatEventPath({ params }: FlatEventPathProps) {
  const { eventId } = await params;
  if (!isUuid(eventId)) notFound();
  permanentRedirect(`/events/${eventId.toLowerCase()}`);
}
