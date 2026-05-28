"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import type { EventMedia } from "@/types/events";
import { GalleryItem } from "@/components/media/GalleryItem";
import { Lightbox } from "@/components/ui/Lightbox";
import { cn } from "@/lib/utils";

interface GalleryFilter {
  id: string;
  label: string;
}

interface GalleryProps {
  media: EventMedia[];
  filters?: GalleryFilter[];
  activeFilter?: string;
  onFilterChange?: (id: string) => void;
  itemsHaveTag?: (m: EventMedia, filterId: string) => boolean;
}

const aspects: Array<"square" | "tall" | "wide" | "video"> = [
  "tall",
  "square",
  "wide",
  "square",
  "tall",
  "square",
  "wide",
  "square"
];

export function Gallery({
  media,
  filters,
  activeFilter,
  onFilterChange,
  itemsHaveTag
}: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (!filters || !activeFilter || activeFilter === "all" || !itemsHaveTag) return media;
    return media.filter((m) => itemsHaveTag(m, activeFilter));
  }, [media, filters, activeFilter, itemsHaveTag]);

  return (
    <div className="space-y-8">
      {filters && filters.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const active = f.id === activeFilter;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => onFilterChange?.(f.id)}
                className={cn(
                  "inline-flex min-h-[44px] items-center rounded-full border px-4 py-2.5 text-xs font-bold transition sm:text-sm",
                  active
                    ? "border-primary bg-primary text-white"
                    : "border-primary/15 bg-white text-primary hover:border-accent hover:text-accent-dark"
                )}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      )}

      <motion.div
        layout
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((m, i) => (
            <GalleryItem
              key={m.src + (m.youtubeId ?? "") + i}
              media={m}
              aspect={m.type === "video" ? "video" : aspects[i % aspects.length]}
              onOpen={() => setLightboxIndex(i)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="rounded-2xl border border-dashed border-primary/15 bg-white p-8 text-center text-sm text-ink-light">
          Aucun souvenir pour ce filtre. Réessayez bientôt.
        </p>
      )}

      <Lightbox
        items={filtered}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChange={setLightboxIndex}
      />
    </div>
  );
}
