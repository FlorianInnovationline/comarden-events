"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Camera, MapPin, Users } from "lucide-react";
import type { ComardenEvent } from "@/types/events";
import { splitDate } from "@/lib/format";
import { PartnerChipLogo } from "@/components/events/PartnerChipLogo";

interface EventTimelineProps {
  events: ComardenEvent[];
  onPhotosClick?: (event: ComardenEvent) => void;
}

export function EventTimeline({ events, onPhotosClick }: EventTimelineProps) {
  const reduce = useReducedMotion();

  return (
    <div className="relative py-2">
      {/* Yellow vertical line */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute left-3 top-0 h-full w-[3px] origin-top rounded-full bg-gradient-to-b from-accent via-accent/60 to-accent/0 sm:left-4 md:left-1/2 md:-translate-x-1/2"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: reduce ? 0.001 : 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      <ol className="flex flex-col gap-10 md:gap-16">
        {events.map((event, i) => {
          const { day, month, year } = splitDate(event.date);
          const cover = event.media.find((m) => m.type === "image")?.src;
          const flip = i % 2 === 1;
          const hasMedia = event.media.length > 0;

          return (
            <motion.li
              key={event.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={
                "relative pl-10 sm:pl-12 md:grid md:grid-cols-2 md:items-center md:gap-12 md:pl-0 " +
                (flip ? "md:[direction:rtl]" : "")
              }
            >
              {/* Timeline dot */}
              <motion.span
                aria-hidden
                className="absolute left-3 top-6 h-4 w-4 -translate-x-[6px] rounded-full bg-accent ring-4 ring-white sm:left-4 md:left-1/2 md:-translate-x-1/2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
              />

              {/* Image card */}
              <Link
                href={`/evenements/${event.slug}`}
                className={
                  "group relative block overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-primary/5 transition-shadow hover:shadow-glow [direction:ltr] " +
                  (flip ? "md:mr-12" : "md:ml-12")
                }
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-primary/10">
                  {cover && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={cover}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                  {event.audience && (
                    <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-kicker text-primary">
                      <Users className="h-3 w-3" />
                      {event.audience}
                    </span>
                  )}
                  {event.status === "upcoming" && (
                    <span className="absolute bottom-3 left-3 inline-flex items-center rounded-full bg-accent px-3 py-1 text-[0.65rem] font-bold uppercase tracking-kicker text-primary">
                      À venir
                    </span>
                  )}
                </div>
              </Link>

              {/* Text content */}
              <div
                className={
                  "mt-5 [direction:ltr] sm:mt-6 md:mt-0 " +
                  (flip ? "md:pr-12 md:text-right" : "md:pl-12")
                }
              >
                <div
                  className={
                    "inline-flex items-baseline gap-3 " + (flip ? "md:flex-row-reverse" : "")
                  }
                >
                  <span className="text-4xl font-extrabold leading-none text-primary sm:text-5xl md:text-6xl">
                    {day}
                  </span>
                  <div className={flip ? "text-right" : ""}>
                    <span className="block text-xs font-bold uppercase tracking-kicker text-accent sm:text-sm">
                      {month} {year}
                    </span>
                    {event.audience && (
                      <span className="block text-[0.7rem] font-semibold uppercase tracking-kicker text-ink-light sm:text-xs">
                        {event.audience}
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="mt-3 heading-md text-primary sm:mt-4">{event.title}</h3>
                {event.location && (
                  <p
                    className={
                      "mt-2 inline-flex items-center gap-2 text-sm text-ink-light " +
                      (flip ? "md:flex-row-reverse" : "")
                    }
                  >
                    <MapPin className="h-4 w-4 shrink-0 text-accent" />
                    <span className="break-words">{event.location}</span>
                  </p>
                )}
                <p className="mt-3 text-sm text-ink-light sm:text-base">{event.teaser}</p>

                {event.partners.length > 0 && (
                  <ul
                    className={
                      "mt-4 flex flex-wrap gap-2 " + (flip ? "md:justify-end" : "")
                    }
                  >
                    {event.partners.map((p) => (
                      <li
                        key={p.name}
                        className="inline-flex items-center gap-1.5 rounded-full border border-primary/10 bg-neutral px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-kicker text-primary"
                      >
                        <PartnerChipLogo name={p.name} />
                        {p.name}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Action buttons */}
                <div
                  className={
                    "mt-5 flex flex-wrap gap-2 " + (flip ? "md:justify-end" : "")
                  }
                >
                  <Link
                    href={`/evenements/${event.slug}`}
                    className="group inline-flex min-h-[44px] items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white transition hover:bg-primary-light"
                  >
                    Découvrir
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>

                  {onPhotosClick && (
                    hasMedia ? (
                      <motion.button
                        type="button"
                        onClick={() => onPhotosClick(event)}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        className="inline-flex min-h-[44px] items-center gap-2 rounded-full border-2 border-primary/20 bg-white px-5 py-2.5 text-sm font-bold text-primary transition hover:border-accent hover:bg-accent/10"
                      >
                        <Camera className="h-4 w-4 text-accent" />
                        Photos
                      </motion.button>
                    ) : (
                      <span
                        title="Photos bientôt disponibles"
                        className="inline-flex min-h-[44px] cursor-not-allowed items-center gap-2 rounded-full border-2 border-primary/10 bg-white px-5 py-2.5 text-sm font-bold text-ink-light opacity-60"
                      >
                        <Camera className="h-4 w-4" />
                        Photos
                      </span>
                    )
                  )}
                </div>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
