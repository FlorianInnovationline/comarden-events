"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Users } from "lucide-react";
import type { ComardenEvent } from "@/types/events";
import { DateBadge } from "@/components/ui/Badge";
import { splitDate } from "@/lib/format";

interface EventCardProps {
  event: ComardenEvent;
  featured?: boolean;
}

export function EventCard({ event, featured }: EventCardProps) {
  const { day, month, year } = splitDate(event.date);
  const cover = event.media.find((m) => m.type === "image")?.src;

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={
        "group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-primary/5 transition-shadow hover:shadow-glow"
      }
    >
      <Link href={`/evenements/${event.slug}`} className="flex h-full flex-col">
        <div className={"relative " + (featured ? "aspect-[16/9]" : "aspect-[4/3]") + " w-full overflow-hidden bg-primary/10"}>
          {cover && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={cover}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent" />
          <div className="absolute left-4 top-4">
            <DateBadge day={day} month={month} year={year} />
          </div>
          {event.audience && (
            <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-kicker text-primary">
              <Users className="h-3 w-3" />
              {event.audience}
            </span>
          )}
          {event.status === "upcoming" && (
            <span className="absolute bottom-4 left-4 inline-flex items-center rounded-full bg-accent px-3 py-1 text-[0.7rem] font-bold uppercase tracking-kicker text-primary">
              À venir
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
          <h3 className={(featured ? "heading-md" : "text-xl font-bold tracking-tight") + " text-primary"}>
            {event.title}
          </h3>
          {event.location && (
            <p className="flex items-center gap-2 text-sm text-ink-light">
              <MapPin className="h-4 w-4 shrink-0 text-accent" />
              <span className="break-words">{event.location}</span>
            </p>
          )}
          <p className="text-sm leading-relaxed text-ink-light">{event.teaser}</p>

          {event.partners.length > 0 && (
            <ul className="flex flex-wrap gap-2 pt-1">
              {event.partners.map((p) => (
                <li
                  key={p.name}
                  className="rounded-full border border-primary/10 bg-neutral px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-kicker text-primary"
                >
                  {p.name}
                </li>
              ))}
            </ul>
          )}

          <span className="mt-auto inline-flex items-center gap-2 pt-3 text-sm font-bold text-primary">
            Découvrir
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>

        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
        />
      </Link>
    </motion.article>
  );
}
