"use client";

import { motion, useReducedMotion } from "framer-motion";
import { formatPrice } from "@/lib/shop/utils";
import type { PriceBreakdown } from "@/lib/shop/discount";

interface DiscountImageOverlayProps {
  price: PriceBreakdown;
  currency: string;
}

/**
 * Floating overlay shown on the product image: the catalogue price struck
 * through plus an animated "-X%" pill. Purely decorative, so it is hidden from
 * assistive tech (the same numbers are announced in the price block below).
 */
export function DiscountImageOverlay({ price, currency }: DiscountImageOverlayProps) {
  const reduce = useReducedMotion();
  if (!price.discounted) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-4 top-4 flex items-start justify-between gap-3"
    >
      {/* Catalogue price */}
      <motion.div
        initial={reduce ? false : { opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="rounded-full bg-white/85 px-3.5 py-1.5 shadow-soft ring-1 ring-primary/10 backdrop-blur"
      >
        <span className="block text-[0.55rem] font-bold uppercase tracking-kicker text-ink-light/70">
          Prix catalogue
        </span>
        <span className="block text-sm font-bold text-ink-light/70 line-through decoration-[1.5px]">
          {formatPrice(price.originalCents, currency)}
        </span>
      </motion.div>

      {/* Percent pill */}
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.5, rotate: -12 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 17, delay: 0.28 }}
        className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-full bg-red-600 text-white shadow-glow ring-4 ring-white/70 sm:h-[4.5rem] sm:w-[4.5rem]"
      >
        <span className="text-lg font-extrabold leading-none sm:text-xl">
          -{price.percent}%
        </span>
        <span className="mt-0.5 text-[0.5rem] font-bold uppercase tracking-kicker opacity-90">
          Remise
        </span>
      </motion.div>
    </div>
  );
}
