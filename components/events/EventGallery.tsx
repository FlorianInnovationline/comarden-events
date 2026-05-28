"use client";

import { useState } from "react";
import { Maximize2 } from "lucide-react";
import { Lightbox } from "@/components/ui/Lightbox";
import { GalleryItem } from "@/components/media/GalleryItem";
import { VideoThumb } from "@/components/media/VideoEmbed";
import type { EventMedia } from "@/types/events";

export function EventGallery({ media }: { media: EventMedia[] }) {
  const [index, setIndex] = useState<number | null>(null);

  if (media.length === 0) return null;

  const [hero, ...rest] = media;

  return (
    <>
      <div className="space-y-3 sm:space-y-4">
        {/* Hero item — full-width banner */}
        <HeroItem media={hero} onOpen={() => setIndex(0)} />

        {/* Rest — uniform grid */}
        {rest.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {rest.map((m, i) => (
              <GalleryItem
                key={m.src + (m.youtubeId ?? "") + i}
                media={m}
                aspect={m.type === "video" ? "video" : "square"}
                onOpen={() => setIndex(i + 1)}
              />
            ))}
          </div>
        )}
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

function HeroItem({
  media,
  onOpen,
}: {
  media: EventMedia;
  onOpen: () => void;
}) {
  if (media.type === "video") {
    return (
      <div className="overflow-hidden rounded-2xl">
        <div className="aspect-video">
          <VideoThumb
            youtubeId={media.youtubeId}
            src={media.src}
            alt={media.alt}
            poster={media.poster}
            onOpen={onOpen}
          />
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Agrandir : ${media.alt}`}
      className="group relative block w-full overflow-hidden rounded-2xl aspect-[16/9] sm:aspect-[21/9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <div className="absolute inset-0 animate-pulse bg-primary/5" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={media.src}
        alt={media.alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="pointer-events-none absolute right-4 top-4 inline-flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white/90 text-primary opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <Maximize2 className="h-5 w-5" />
      </span>
    </button>
  );
}
