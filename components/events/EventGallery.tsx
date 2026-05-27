"use client";

import { useState } from "react";
import { GalleryItem } from "@/components/media/GalleryItem";
import { Lightbox } from "@/components/ui/Lightbox";
import type { EventMedia } from "@/types/events";

const aspects: Array<"square" | "tall" | "wide" | "video"> = [
  "wide",
  "square",
  "tall",
  "square",
  "square",
  "tall",
  "wide",
  "square"
];

export function EventGallery({ media }: { media: EventMedia[] }) {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {media.map((m, i) => (
          <GalleryItem
            key={m.src + (m.youtubeId ?? "") + i}
            media={m}
            aspect={m.type === "video" ? "video" : aspects[i % aspects.length]}
            onOpen={() => setIndex(i)}
          />
        ))}
      </div>
      <Lightbox
        items={media}
        index={index}
        onClose={() => setIndex(null)}
        onChange={setIndex}
      />
    </>
  );
}
