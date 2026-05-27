"use client";

import { Play } from "lucide-react";

interface VideoEmbedProps {
  youtubeId?: string;
  src?: string;
  alt: string;
  poster?: string;
  onOpen?: () => void;
}

export function VideoThumb({ youtubeId, poster, alt, onOpen }: VideoEmbedProps) {
  const thumb =
    poster ||
    (youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : undefined);
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative block h-full w-full overflow-hidden rounded-2xl bg-primary text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      aria-label={`Lire la vidéo : ${alt}`}
    >
      {thumb && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={thumb}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/70 via-primary/10 to-transparent" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-primary shadow-glow transition-transform duration-300 group-hover:scale-110">
          <Play className="h-7 w-7 translate-x-[1px]" fill="currentColor" />
        </span>
      </span>
    </button>
  );
}
