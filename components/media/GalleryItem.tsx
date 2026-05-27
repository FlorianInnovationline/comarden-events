"use client";

import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import type { EventMedia } from "@/types/events";
import { VideoThumb } from "@/components/media/VideoEmbed";

interface GalleryItemProps {
  media: EventMedia;
  onOpen: () => void;
  aspect?: "square" | "video" | "tall" | "wide";
  index?: number;
}

const aspectClasses = {
  square: "aspect-square",
  video: "aspect-video",
  tall: "aspect-[3/4]",
  wide: "aspect-[16/10]"
};

export function GalleryItem({ media, onOpen, aspect = "square" }: GalleryItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={"group relative overflow-hidden rounded-2xl bg-primary/10 " + aspectClasses[aspect]}
    >
      {media.type === "video" ? (
        <VideoThumb
          youtubeId={media.youtubeId}
          src={media.src}
          alt={media.alt}
          poster={media.poster}
          onOpen={onOpen}
        />
      ) : (
        <button
          type="button"
          onClick={onOpen}
          className="group block h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label={`Agrandir l'image : ${media.alt}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={media.src}
            alt={media.alt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="pointer-events-none absolute right-3 top-3 inline-flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white/90 text-primary opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <Maximize2 className="h-4 w-4" />
          </span>
        </button>
      )}
    </motion.div>
  );
}
