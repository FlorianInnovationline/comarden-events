"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MapPin, Users } from "lucide-react";
import type { ComardenEvent } from "@/types/events";

/**
 * Body of a `kind: "formation"` detail page:
 *  - lead paragraph (intro)
 *  - "Le programme"  → numbered module rows
 *  - "Comment ça marche ?" → 3 connected steps
 *  - "Pour qui ?"    → audience / coverage band
 *  - conversion CTA band
 */
export function FormationDetail({ event }: { event: ComardenEvent }) {
  const reduce = useReducedMotion();
  const modules = event.program?.modules ?? [];
  const steps = event.process ?? [];

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

      {/* Le programme */}
      {modules.length > 0 && (
        <section>
          <SectionHeading kicker="Programme" title="Le programme" />
          {event.program?.customNote && (
            <p className="mb-6 max-w-2xl text-sm text-ink-light sm:text-base">
              {event.program.customNote}
            </p>
          )}
          <motion.ol
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: reduce ? 0 : 0.08 },
              },
            }}
            className="grid gap-3 sm:gap-4"
          >
            {modules.map((m, i) => (
              <motion.li
                key={m.title}
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: reduce ? 0.001 : 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-soft ring-1 ring-primary/5 transition hover:shadow-glow sm:p-6"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-base font-extrabold text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-bold text-primary sm:text-lg">
                    {m.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-light sm:text-base">
                    {m.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </section>
      )}

      {/* Comment ça marche ? */}
      {steps.length > 0 && (
        <section>
          <SectionHeading kicker="Méthode" title="Comment ça marche ?" />
          <motion.ol
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: reduce ? 0 : 0.12 } },
            }}
            className="grid gap-6 md:grid-cols-3 md:gap-5"
          >
            {steps.map((s, i) => (
              <motion.li
                key={s.title}
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: reduce ? 0.001 : 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="h-full rounded-2xl border border-primary/10 bg-white p-5 shadow-soft sm:p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-extrabold text-white">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 text-base font-bold text-primary sm:text-lg">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-light">
                    {s.description}
                  </p>
                </div>
                {i < steps.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-full z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-primary shadow-soft md:left-full md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
                  >
                    <ArrowRight className="h-4 w-4 rotate-90 md:rotate-0" />
                  </span>
                )}
              </motion.li>
            ))}
          </motion.ol>
        </section>
      )}

      {/* Pour qui ? */}
      {(event.audience || event.coverage || event.location) && (
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduce ? 0.001 : 0.55 }}
          className="overflow-hidden rounded-3xl bg-primary p-6 text-white sm:p-8"
        >
          <span className="kicker text-accent">Pour qui ?</span>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            {event.audience && (
              <span className="inline-flex items-center gap-2.5 text-lg font-bold sm:text-xl">
                <Users className="h-5 w-5 shrink-0 text-accent" />
                {event.audience}
              </span>
            )}
            {(event.coverage || event.location) && (
              <span className="inline-flex items-center gap-2.5 text-sm text-white/85 sm:text-base">
                <MapPin className="h-5 w-5 shrink-0 text-accent" />
                {event.coverage ?? event.location}
              </span>
            )}
          </div>
        </motion.section>
      )}

      {/* Conversion CTA */}
      {event.contactCta && (
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduce ? 0.001 : 0.55 }}
          className="relative overflow-hidden rounded-3xl bg-accent p-8 text-center text-primary sm:p-12"
        >
          <div
            aria-hidden
            className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-white/30 blur-3xl"
          />
          <div className="relative mx-auto max-w-xl">
            <h2 className="heading-lg text-balance">
              Prêt à organiser votre formation ?
            </h2>
            <p className="mt-3 text-sm text-primary/80 sm:text-base">
              Parlez-nous de vos besoins, on construit la session avec vous.
            </p>
            <a
              href={event.contactCta.mailto}
              className="group mt-7 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-bold text-white shadow-soft transition hover:bg-primary-light hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
            >
              {event.contactCta.label}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
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
