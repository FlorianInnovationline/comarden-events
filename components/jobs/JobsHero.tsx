"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";

const HEADLINE = ["Rejoignez", "l'équipe", "Comarden."];

export function JobsHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate flex min-h-[88vh] items-center overflow-hidden bg-primary text-white sm:min-h-[92vh]">
      <HeroBackground reduce={!!reduce} />

      <div className="container relative z-10 pb-20 pt-28 sm:pb-24 sm:pt-36 lg:pt-40">
        {/* Kicker */}
        <motion.span
          className="kicker"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          COMARDEN RECRUTE
        </motion.span>

        {/* Headline */}
        <h1 className="heading-xl mt-4 text-balance sm:mt-5">
          <span className="inline-flex flex-wrap gap-x-3 gap-y-2 sm:gap-x-5">
            {HEADLINE.map((word, i) => (
              <motion.span
                key={word + i}
                initial={{ opacity: 0, y: 40, rotateX: -20 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.15 + i * 0.09,
                }}
                className="inline-block will-change-transform"
              >
                {i === 2 ? (
                  <span className="relative inline-block">
                    <span className="relative z-10">{word}</span>
                    <motion.span
                      aria-hidden
                      className="absolute inset-x-0 -bottom-1 -z-0 h-3 origin-left rounded-full bg-accent/80"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: reduce ? 0.001 : 0.7,
                        ease: [0.22, 1, 0.36, 1],
                        delay: 0.85,
                      }}
                    />
                  </span>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-6 max-w-2xl text-sm leading-relaxed text-white/80 sm:mt-7 sm:text-base lg:text-lg"
        >
          Négoce spécialisé en matériaux de toiture et d&apos;isolation, implanté à Naninne
          (Namur) et à Bertrix, Comarden accompagne ses clients avec une gamme complète de
          produits de haute qualité pour toitures plates et inclinées. Dans le cadre de
          notre développement, nous recrutons sur nos deux sites.
        </motion.p>

        {/* Location chips */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.85 }}
          className="mt-5 flex flex-wrap gap-2 sm:mt-6"
        >
          {["Naninne", "Bertrix", "Plusieurs postes ouverts"].map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-kicker text-white/90 ring-1 ring-white/20"
            >
              <MapPin className="h-3 w-3 text-accent" />
              {tag}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap"
        >
          <Button
            href="#offres"
            variant="secondary"
            size="lg"
            className="w-full justify-center sm:w-auto"
          >
            Voir les postes
          </Button>
          <Button
            href="#postuler"
            variant="outline"
            size="lg"
            className="w-full justify-center border-white/60 text-white hover:bg-white hover:text-primary sm:w-auto"
          >
            Postuler
          </Button>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.a
        href="#offres"
        aria-label="Faire défiler vers les offres"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 text-white/70 hover:text-accent sm:block sm:bottom-8"
      >
        <ChevronDown className="h-7 w-7 animate-bounce-soft" />
      </motion.a>
    </section>
  );
}

function HeroBackground({ reduce }: { reduce: boolean }) {
  return (
    <>
      <div aria-hidden className="absolute inset-0 bg-grid-soft opacity-30" />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-primary via-primary to-primary-dark"
      />
      {/* Amber/yellow blob top-left */}
      <motion.div
        aria-hidden
        className="absolute -left-24 -top-32 h-[22rem] w-[22rem] rounded-full bg-accent/20 blur-3xl sm:h-[28rem] sm:w-[28rem]"
        animate={reduce ? undefined : { x: [0, 28, 0], y: [0, 18, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Blue blob bottom-right */}
      <motion.div
        aria-hidden
        className="absolute -bottom-32 right-0 h-[24rem] w-[24rem] rounded-full bg-primary-light/35 blur-3xl sm:h-[30rem] sm:w-[30rem]"
        animate={reduce ? undefined : { x: [0, -36, 0], y: [0, -18, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Small accent blob center-right */}
      <motion.div
        aria-hidden
        className="absolute right-[12%] top-[25%] h-40 w-40 rounded-full bg-accent/10 blur-2xl"
        animate={reduce ? undefined : { scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}
