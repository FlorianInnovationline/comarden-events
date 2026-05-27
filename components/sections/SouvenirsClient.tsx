"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { Gallery } from "@/components/media/Gallery";
import type { EventMedia } from "@/types/events";

type MediaWithMeta = EventMedia & {
  eventSlug?: string;
  eventTitle?: string;
  audience?: string;
};

interface SouvenirsClientProps {
  media: MediaWithMeta[];
  filters: { id: string; label: string }[];
}

export function SouvenirsClient({ media, filters }: SouvenirsClientProps) {
  const [active, setActive] = useState("all");

  return (
    <>
      <section className="relative overflow-hidden bg-primary pb-14 pt-24 text-white sm:pb-20 sm:pt-32 lg:pt-40">
        <div
          aria-hidden
          className="absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-accent/15 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -bottom-32 right-0 h-[26rem] w-[26rem] rounded-full bg-primary-light/40 blur-3xl"
        />
        <div className="container relative">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="kicker inline-flex items-center gap-2"
          >
            <Camera className="h-4 w-4" />
            Souvenirs
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="heading-xl mt-4 text-balance sm:mt-5"
          >
            Revivez nos événements en images et en vidéos.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 max-w-2xl text-sm text-white/80 sm:mt-5 sm:text-base lg:text-lg"
          >
            Photos, démos et moments conviviaux — l&apos;ambiance des rencontres Comarden,
            filtrée par événement.
          </motion.p>
        </div>
      </section>

      <section className="bg-neutral py-12 sm:py-16 lg:py-20">
        <div className="container">
          <Gallery
            media={media}
            filters={filters}
            activeFilter={active}
            onFilterChange={setActive}
            itemsHaveTag={(m, id) => (m as MediaWithMeta).eventSlug === id}
          />
        </div>
      </section>
    </>
  );
}
