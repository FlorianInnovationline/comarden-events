"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CalendarDays } from "lucide-react";

/**
 * Validity window for the current shop conditions. Sits between the hero and
 * the brand strip so it is seen before any price.
 */
export function PromoValidity() {
  const reduce = useReducedMotion();

  return (
    <div className="bg-white pt-10 sm:pt-14">
      <div className="container">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto flex max-w-3xl flex-col items-center gap-3 overflow-hidden rounded-2xl bg-primary px-6 py-5 text-center shadow-soft sm:flex-row sm:gap-5 sm:text-left"
        >
          {/* Accent edge */}
          <span aria-hidden className="absolute inset-y-0 left-0 w-1.5 bg-accent" />

          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent">
            <CalendarDays className="h-5 w-5 text-primary" />
          </span>

          <p className="text-sm leading-relaxed text-white sm:text-base">
            <span className="block text-[0.65rem] font-bold uppercase tracking-kicker text-accent">
              Offres en cours
            </span>
            Conditions valables du{" "}
            <strong className="font-extrabold text-white">24 août</strong> au{" "}
            <strong className="font-extrabold text-white">28 août 2026</strong>.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
