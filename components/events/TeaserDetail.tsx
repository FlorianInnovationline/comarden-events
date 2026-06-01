"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BellRing, CheckCircle2, Sparkles } from "lucide-react";
import type { ComardenEvent } from "@/types/events";
import { PartnerBlock } from "@/components/events/PartnerBlock";

/**
 * Body of a `kind: "teaser"` detail page:
 *  - lead paragraph (intro)
 *  - "Au programme" → checklist of modules
 *  - "Une surprise de taille…" callout (shimmer)
 *  - partner block (SOPREMA, via the shared fallback component)
 *  - "Restez connectés" CTA band
 */
export function TeaserDetail({ event }: { event: ComardenEvent }) {
  const reduce = useReducedMotion();
  const modules = event.program?.modules ?? [];
  const partner = event.partners[0];

  return (
    <div className="space-y-14 sm:space-y-20">
      {/* Lead */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: reduce ? 0.001 : 0.55 }}
        className="text-base leading-relaxed text-ink sm:text-lg lg:text-xl"
      >
        {event.intro}
      </motion.p>

      {/* Au programme — checklist */}
      {modules.length > 0 && (
        <section>
          <SectionHeading kicker="Aperçu" title="Au programme" />
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: reduce ? 0 : 0.1 } },
            }}
            className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {modules.map((m) => (
              <motion.li
                key={m.title}
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: reduce ? 0.001 : 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex h-full flex-col gap-2 rounded-2xl bg-white p-5 shadow-soft ring-1 ring-primary/5"
              >
                <CheckCircle2 className="h-6 w-6 text-accent-dark" />
                <h3 className="text-base font-bold text-primary">{m.title}</h3>
                <p className="text-sm leading-relaxed text-ink-light">
                  {m.description}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </section>
      )}

      {/* Callout — "Une surprise de taille…" */}
      {event.callout && (
        <motion.section
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: reduce ? 0.001 : 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl bg-accent px-6 py-10 text-center text-primary sm:px-10 sm:py-14"
        >
          <div
            aria-hidden
            className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/30 blur-3xl"
          />
          <div className="relative mx-auto max-w-2xl">
            <Sparkles className="mx-auto h-9 w-9" />
            <p className="mt-4 text-balance text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl">
              {event.callout}
            </p>
          </div>
          {!reduce && (
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{ x: ["0%", "400%"] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2.5,
                ease: "easeInOut",
              }}
            />
          )}
        </motion.section>
      )}

      {/* Partner — SOPREMA via shared fallback block */}
      {partner && (
        <section>
          <SectionHeading kicker="Le partenaire" title="Avec SOPREMA" />
          <PartnerBlock partner={partner} />
        </section>
      )}

      {/* Stay-connected CTA */}
      {event.contactCta && (
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduce ? 0.001 : 0.55 }}
          className="relative overflow-hidden rounded-3xl bg-primary p-8 text-center text-white sm:p-12"
        >
          <div
            aria-hidden
            className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-accent/20 blur-3xl"
          />
          <div className="relative mx-auto max-w-xl">
            <span className="kicker text-accent">Restez connectés</span>
            <h2 className="heading-lg mt-3 text-balance">Détails à venir</h2>
            <p className="mt-3 text-sm text-white/80 sm:text-base">
              La date complète et le programme détaillé seront dévoilés très
              prochainement. Laissez-nous un mot pour être prévenu en priorité.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={event.contactCta.mailto}
                className="group inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-base font-bold text-primary shadow-soft transition hover:bg-accent-light hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:w-auto"
              >
                {event.contactCta.label}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              {/* TODO: wire "Suivre cet événement" to the newsletter provider once available. */}
              <span className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border-2 border-white/25 px-7 py-3.5 text-base font-bold text-white/90 sm:w-auto">
                <BellRing className="h-4 w-4 text-accent" />
                Suivre cet événement
              </span>
            </div>
          </div>
        </motion.section>
      )}
    </div>
  );
}

function SectionHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:mb-8">
      <span className="kicker">{kicker}</span>
      <h2 className="heading-lg text-balance text-primary">{title}</h2>
      <span aria-hidden className="block h-1 w-16 rounded-full bg-accent" />
    </div>
  );
}
