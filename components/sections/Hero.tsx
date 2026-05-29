"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";

const HEADLINE = ["Des", "rencontres", "pensées", "pour", "vous."];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate flex min-h-[88vh] items-center overflow-hidden bg-primary text-white sm:min-h-[92vh]">
      <BackgroundLayer reduce={!!reduce} />

      <div className="container relative z-10 grid w-full gap-10 pb-20 pt-24 sm:pb-24 sm:pt-32 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-9">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="kicker"
          >
            COMARDEN ÉVÉNEMENTS
          </motion.span>

          <h1 className="heading-xl mt-4 text-balance sm:mt-5">
            <span className="inline-flex flex-wrap gap-x-2 gap-y-2 sm:gap-x-4">
              {HEADLINE.map((w, i) => (
                <motion.span
                  key={w + i}
                  initial={{ opacity: 0, y: 40, rotateX: -25 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.15 + i * 0.08
                  }}
                  className="inline-block will-change-transform"
                >
                  {w === "pensées" ? (
                    <span className="relative inline-block">
                      <span className="relative z-10">{w}</span>
                      <motion.span
                        aria-hidden
                        className="absolute inset-x-0 -bottom-1 -z-0 h-3 origin-left rounded-full bg-accent/80"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{
                          duration: reduce ? 0.001 : 0.7,
                          ease: [0.22, 1, 0.36, 1],
                          delay: 0.9
                        }}
                      />
                    </span>
                  ) : (
                    w
                  )}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="mt-6 max-w-2xl text-sm text-white/85 sm:mt-7 sm:text-base lg:text-lg"
          >
            Bienvenue sur notre page événements, où nous voulons partager avec vous les
            événements que nous organisons. Chaque événement est pensé pour en faire un
            moment d&apos;échange, de rencontre et pour vous apporter des connaissances
            complémentaires, des conseils et des tips essentiels, tout en passant un
            moment agréable. Chaque moment est réfléchi pour que vous ne vous déplaciez
            pas pour rien.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.05 }}
            className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap"
          >
            <Button
              href="#evenements"
              variant="secondary"
              size="lg"
              className="w-full justify-center sm:w-auto"
            >
              Voir les événements
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="hidden lg:col-span-3 lg:block"
        >
          <div className="relative mx-auto aspect-square w-full max-w-xs">
            <motion.div
              className="absolute inset-0 rounded-[2.5rem] bg-accent/90 shadow-glow"
              animate={reduce ? undefined : { rotate: [0, 8, -4, 0] }}
              transition={{ duration: 14, ease: "easeInOut", repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-6 -right-6 h-32 w-32 rounded-3xl bg-white/10 ring-1 ring-white/20 backdrop-blur"
              animate={reduce ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
            />
            <div className="absolute inset-6 flex flex-col items-center justify-center text-center">
              <span className="text-6xl font-extrabold text-primary">1977</span>
              <span className="mt-2 text-xs font-bold uppercase tracking-kicker text-primary/80">
                Comarden vous couvre depuis
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#evenements"
        aria-label="Faire défiler"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 text-white/80 hover:text-accent sm:block sm:bottom-8"
      >
        <ChevronDown className="h-7 w-7 animate-bounce-soft" />
      </motion.a>
    </section>
  );
}

function BackgroundLayer({ reduce }: { reduce: boolean }) {
  return (
    <>
      <div aria-hidden className="absolute inset-0 bg-grid-soft opacity-30" />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-primary via-primary to-primary-dark"
      />
      <motion.div
        aria-hidden
        className="absolute -left-24 -top-32 h-[18rem] w-[18rem] rounded-full bg-accent/20 blur-3xl sm:h-[24rem] sm:w-[24rem] lg:h-[28rem] lg:w-[28rem]"
        animate={reduce ? undefined : { x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-32 right-0 h-[22rem] w-[22rem] rounded-full bg-primary-light/40 blur-3xl sm:h-[28rem] sm:w-[28rem] lg:h-[34rem] lg:w-[34rem]"
        animate={reduce ? undefined : { x: [0, -40, 0], y: [0, -20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <svg
        aria-hidden
        viewBox="0 0 200 200"
        className="absolute right-[6%] top-[14%] hidden h-32 w-32 text-accent/40 sm:block lg:right-[10%] lg:top-[18%] lg:h-40 lg:w-40"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <motion.path
          d="M20 140 L100 60 L180 140"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: reduce ? 1 : 1 }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
        />
      </svg>
    </>
  );
}
