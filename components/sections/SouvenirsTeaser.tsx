"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Camera } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { EventMedia } from "@/types/events";

interface SouvenirsTeaserProps {
  media: EventMedia[];
}

export function SouvenirsTeaser({ media }: SouvenirsTeaserProps) {
  const reduce = useReducedMotion();
  const images = media.filter((m) => m.type === "image").slice(0, 7);

  return (
    <section className="relative overflow-hidden bg-neutral py-14 sm:py-20 lg:py-28">
      <div className="container grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="lg:col-span-5">
          <SectionTitle
            kicker="Souvenirs"
            title={<>Revivez nos événements en <span className="relative text-primary">images<span aria-hidden className="absolute inset-x-0 -bottom-1 block h-2 origin-left rounded-full bg-accent/70" /></span>.</>}
            description="Une mosaïque de moments — démos, échanges, sourires — captés lors de nos rencontres."
          />
          <Reveal delay={0.2} className="mt-8">
            <Link
              href="/souvenirs"
              className="group inline-flex min-h-[44px] items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-primary-light"
            >
              <Camera className="h-4 w-4" />
              Voir tous les souvenirs
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="relative lg:col-span-7">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-3 sm:grid-cols-6 sm:gap-4"
          >
            {images.map((img, i) => (
              <motion.div
                key={img.src + i}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                  delay: i * 0.06
                }}
                whileHover={reduce ? undefined : { scale: 1.04, y: -4 }}
                className={"group relative overflow-hidden rounded-2xl bg-primary/10 shadow-soft " + collageClass(i)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="h-full w-full object-cover ease-out group-hover:scale-110"
                  style={{ transitionProperty: "transform", transitionDuration: "1600ms" }}
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function collageClass(i: number): string {
  // Mobile (grid-cols-2) layout: clean 2-col with the first image featured.
  // Tablet+ (grid-cols-6) layout: rich mosaic.
  const layout = [
    "col-span-2 aspect-[4/5] sm:col-span-3 sm:row-span-2",
    "col-span-2 aspect-[4/3] sm:col-span-3",
    "col-span-1 aspect-square sm:col-span-2",
    "col-span-1 aspect-square sm:col-span-2",
    "col-span-2 aspect-square sm:col-span-2",
    "col-span-1 aspect-square sm:col-span-3 sm:aspect-[4/3]",
    "col-span-1 aspect-square sm:col-span-3 sm:aspect-[4/3]"
  ];
  return layout[i] ?? "col-span-1 aspect-square sm:col-span-2";
}
