"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CalendarRange,
  Camera,
  GraduationCap,
  Mail,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";
import type { ComardenEvent, FormationModule } from "@/types/events";
import { splitDate } from "@/lib/format";
import { PartnerChipLogo } from "@/components/events/PartnerChipLogo";
import { PartnerLogo } from "@/components/events/partners/PartnerLogo";

interface EventTimelineProps {
  events: ComardenEvent[];
  onPhotosClick?: (event: ComardenEvent) => void;
}

/** Subtle diagonal texture for formation panels — signals "ongoing offering". */
const FORMATION_TEXTURE: React.CSSProperties = {
  backgroundImage:
    "repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 11px)",
};

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
          const flip = i % 2 === 1;

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
              {/* Timeline node — solid dot for events/formations, dashed pulse for teasers */}
              {event.kind === "teaser" ? (
                <motion.span
                  aria-hidden
                  className="absolute left-3 top-6 h-4 w-4 -translate-x-[6px] rounded-full border-2 border-dashed border-accent bg-white ring-4 ring-white sm:left-4 md:left-1/2 md:-translate-x-1/2"
                  animate={reduce ? {} : { scale: [1, 1.18, 1] }}
                  transition={
                    reduce
                      ? {}
                      : { repeat: Infinity, duration: 2, ease: "easeInOut" }
                  }
                />
              ) : (
                <motion.span
                  aria-hidden
                  className="absolute left-3 top-6 h-4 w-4 -translate-x-[6px] rounded-full bg-accent ring-4 ring-white sm:left-4 md:left-1/2 md:-translate-x-1/2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                />
              )}

              {event.kind === "formation" ? (
                <FormationItem event={event} flip={flip} />
              ) : event.kind === "teaser" ? (
                <TeaserItem event={event} flip={flip} reduce={!!reduce} />
              ) : (
                <EventItem
                  event={event}
                  flip={flip}
                  onPhotosClick={onPhotosClick}
                />
              )}
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// kind: "event" — the original dated treatment (photo + day number + Photos)
// ─────────────────────────────────────────────────────────────────────────────

function EventItem({
  event,
  flip,
  onPhotosClick,
}: {
  event: ComardenEvent;
  flip: boolean;
  onPhotosClick?: (event: ComardenEvent) => void;
}) {
  const { day, month, year } = splitDate(event.date);
  const cover = event.media.find((m) => m.type === "image")?.src;
  const hasMedia = event.media.length > 0;

  return (
    <>
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

        <div className={"mt-5 flex flex-wrap gap-2 " + (flip ? "md:justify-end" : "")}>
          <Link
            href={`/evenements/${event.slug}`}
            className="group inline-flex min-h-[44px] items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white transition hover:bg-primary-light"
          >
            Découvrir
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          {onPhotosClick &&
            (hasMedia ? (
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
            ))}
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// kind: "formation" — ongoing on-demand offering (no photo, no day number)
// ─────────────────────────────────────────────────────────────────────────────

function FormationItem({ event, flip }: { event: ComardenEvent; flip: boolean }) {
  const modules = event.program?.modules ?? [];

  return (
    <>
      {/* Designed navy panel (sits where the photo would be) */}
      <Link
        href={`/evenements/${event.slug}`}
        className={
          "group relative block overflow-hidden rounded-2xl shadow-soft ring-1 ring-primary/10 transition-shadow hover:shadow-glow [direction:ltr] " +
          (flip ? "md:mr-12" : "md:ml-12")
        }
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-primary via-primary to-primary-dark">
          <div aria-hidden className="absolute inset-0" style={FORMATION_TEXTURE} />
          <div
            aria-hidden
            className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl"
          />
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-[0.65rem] font-bold uppercase tracking-kicker text-primary">
            <GraduationCap className="h-3 w-3" />
            Sur mesure
          </span>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-accent ring-1 ring-white/15 transition-transform duration-500 group-hover:-translate-y-1">
              <GraduationCap className="h-8 w-8" />
            </span>
            {event.audience && (
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-kicker text-white">
                {event.audience}
              </span>
            )}
          </div>
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
            "flex flex-wrap items-center gap-2 " + (flip ? "md:justify-end" : "")
          }
        >
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3 py-2 text-[0.7rem] font-extrabold uppercase tracking-kicker text-accent">
            <GraduationCap className="h-3.5 w-3.5" />
            Formation sur mesure
          </span>
          {event.audience && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/15 bg-neutral px-3 py-1 text-[0.7rem] font-bold uppercase tracking-kicker text-primary">
              <Users className="h-3 w-3" />
              {event.audience}
            </span>
          )}
        </div>

        <span
          className={
            "mt-3 inline-flex items-center gap-2 text-sm font-bold text-primary " +
            (flip ? "md:flex-row-reverse" : "")
          }
        >
          <CalendarRange className="h-4 w-4 shrink-0 text-accent" />
          <span className="relative">
            {event.dateLabel}
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-accent/60"
            />
          </span>
        </span>

        <h3 className="mt-3 heading-md text-primary sm:mt-4">{event.title}</h3>

        {(event.coverage || event.location) && (
          <p
            className={
              "mt-2 inline-flex items-center gap-2 text-sm text-ink-light " +
              (flip ? "md:flex-row-reverse" : "")
            }
          >
            <MapPin className="h-4 w-4 shrink-0 text-accent" />
            <span className="break-words">{event.coverage ?? event.location}</span>
          </p>
        )}

        <p className="mt-3 text-sm text-ink-light sm:text-base">{event.teaser}</p>

        {modules.length > 0 && (
          <ModuleChips modules={modules} flip={flip} />
        )}

        <div className={"mt-5 flex flex-wrap gap-2 " + (flip ? "md:justify-end" : "")}>
          <Link
            href={`/evenements/${event.slug}`}
            className="group inline-flex min-h-[44px] items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white transition hover:bg-primary-light"
          >
            Découvrir le programme
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          {event.contactCta && (
            <a
              href={event.contactCta.mailto}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border-2 border-primary/20 bg-white px-5 py-2.5 text-sm font-bold text-primary transition hover:border-accent hover:bg-accent/10"
            >
              <Mail className="h-4 w-4 text-accent" />
              Nous contacter
            </a>
          )}
        </div>
      </div>
    </>
  );
}

function ModuleChips({
  modules,
  flip,
  max = 3,
}: {
  modules: FormationModule[];
  flip: boolean;
  max?: number;
}) {
  const shown = modules.slice(0, max);
  const extra = modules.length - shown.length;

  return (
    <ul className={"mt-4 flex flex-wrap gap-2 " + (flip ? "md:justify-end" : "")}>
      {shown.map((m) => (
        <li
          key={m.title}
          className="inline-flex items-center rounded-full border border-primary/15 bg-white px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-kicker text-primary"
        >
          {m.title}
        </li>
      ))}
      {extra > 0 && (
        <li className="inline-flex items-center rounded-full bg-accent/20 px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-kicker text-primary">
          +{extra}
        </li>
      )}
    </ul>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// kind: "teaser" — real event, partner-branded, full details "coming soon"
// ─────────────────────────────────────────────────────────────────────────────

function TeaserItem({
  event,
  flip,
  reduce,
}: {
  event: ComardenEvent;
  flip: boolean;
  reduce: boolean;
}) {
  const partner = event.partners[0];

  return (
    <>
      {/* Premium spotlight panel with partner branding */}
      <Link
        href={`/evenements/${event.slug}`}
        className={
          "group relative block overflow-hidden rounded-2xl shadow-soft ring-1 ring-primary/10 transition-shadow hover:shadow-glow [direction:ltr] " +
          (flip ? "md:mr-12" : "md:ml-12")
        }
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-dark">
          <div
            aria-hidden
            className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-accent/25 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-primary-light/40 blur-3xl"
          />
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-[0.65rem] font-bold uppercase tracking-kicker text-primary">
            <Sparkles className="h-3 w-3" />
            Événement exclusif
          </span>

          {partner && (
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="rounded-2xl bg-white px-6 py-4 shadow-xl">
                <PartnerLogo
                  name={partner.name}
                  imgClassName="h-12 max-w-[180px] object-contain"
                  fallbackClassName="text-2xl"
                />
              </div>
            </div>
          )}

          {!reduce && (
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/12 to-transparent"
              animate={{ x: ["0%", "400%"] }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut",
              }}
            />
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
        <span
          className={
            "inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-kicker text-accent-dark " +
            (flip ? "md:flex-row-reverse" : "")
          }
        >
          <Sparkles className="h-3.5 w-3.5" />
          Événement exclusif
        </span>

        <div
          className={
            "mt-2 inline-flex items-center gap-3 " +
            (flip ? "md:flex-row-reverse" : "")
          }
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent/15 text-accent-dark">
            <Sparkles className="h-6 w-6" />
          </span>
          <div className={flip ? "md:text-right" : ""}>
            <span className="block text-lg font-extrabold leading-tight text-primary">
              {event.dateLabel}
            </span>
            {event.dateRevealed === false && (
              <span className="mt-1 inline-flex items-center rounded-full bg-accent/20 px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-kicker text-primary">
                Date à confirmer
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

        {event.callout && (
          <div className="relative mt-4 overflow-hidden rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3">
            <span
              className={
                "inline-flex items-center gap-2 text-sm font-bold text-primary " +
                (flip ? "md:flex-row-reverse" : "")
              }
            >
              <Sparkles className="h-4 w-4 shrink-0 text-accent-dark" />
              {event.callout}
            </span>
            {!reduce && (
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                animate={{ x: ["0%", "400%"] }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  repeatDelay: 2.4,
                  ease: "easeInOut",
                }}
              />
            )}
          </div>
        )}

        <div className={"mt-5 flex flex-wrap gap-2 " + (flip ? "md:justify-end" : "")}>
          <Link
            href={`/evenements/${event.slug}`}
            className="group inline-flex min-h-[44px] items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white transition hover:bg-primary-light"
          >
            Découvrir
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          {event.contactCta && (
            <a
              href={event.contactCta.mailto}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border-2 border-primary/20 bg-white px-5 py-2.5 text-sm font-bold text-primary transition hover:border-accent hover:bg-accent/10"
            >
              <Mail className="h-4 w-4 text-accent" />
              {event.contactCta.label}
            </a>
          )}
        </div>
      </div>
    </>
  );
}
