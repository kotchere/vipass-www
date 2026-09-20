import Image from "next/image";

import type { EventFlyer, EventPageData } from "@/lib/types";

export type HeroImage = {
  src: string;
  width: number | null;
  height: number | null;
};

/** First image flyer (by sort order), else the cover image. */
export function pickHeroImage(event: EventPageData): HeroImage | null {
  const flyers = (event.flyers ?? [])
    .filter((f: EventFlyer) => f.media_type === "image" && !!f.media_url)
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
  const first = flyers[0];
  if (first) {
    return { src: first.media_url, width: first.media_width, height: first.media_height };
  }
  if (event.cover_image_url) {
    return {
      src: event.cover_image_url,
      width: event.cover_image_width,
      height: event.cover_image_height,
    };
  }
  return null;
}

const DEFAULT_RATIO = 4 / 5;
const MIN_RATIO = 0.6; // tallest allowed (portrait)
const MAX_RATIO = 1.6; // widest allowed (landscape)

export default function EventHero({ event }: { event: EventPageData }) {
  const image = pickHeroImage(event);

  const rawRatio = image?.width && image?.height ? image.width / image.height : DEFAULT_RATIO;
  const ratio = Math.min(MAX_RATIO, Math.max(MIN_RATIO, rawRatio));

  return (
    <div className="vp-event-hero" style={{ aspectRatio: `${ratio}` }}>
      {image ? (
        <Image
          src={image.src}
          alt={event.title}
          fill
          priority
          sizes="(max-width: 809px) 100vw, 460px"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      ) : (
        <div className="vp-event-hero__empty" aria-hidden="true" />
      )}
    </div>
  );
}
