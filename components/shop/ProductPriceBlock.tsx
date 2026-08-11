"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { formatPrice } from "@/lib/shop/utils";
import { useVariantPrice } from "@/components/shop/VariantPriceContext";

interface ProductPriceBlockProps {
  stockLabel: string;
  stockColor: string;
}

/**
 * Main price block on the product page. Reads the selected variant's price from
 * context so it animates whenever the customer picks a different variant.
 */
export function ProductPriceBlock({ stockLabel, stockColor }: ProductPriceBlockProps) {
  const reduce = useReducedMotion();
  const ctx = useVariantPrice();
  if (!ctx) return null;

  const { price, currency } = ctx;

  return (
    <div className="border-y border-primary/10 py-5">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
        {price.discounted && (
          <span className="text-lg font-semibold text-ink-light/60 line-through decoration-[1.5px] sm:text-xl">
            {formatPrice(price.originalCents, currency)}
          </span>
        )}

        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={price.finalCents}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl font-extrabold text-primary sm:text-4xl"
          >
            {formatPrice(price.finalCents, currency)}
          </motion.span>
        </AnimatePresence>

        {price.discounted && (
          <motion.span
            initial={reduce ? false : { opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 420, damping: 20, delay: 0.06 }}
            className="inline-flex items-center rounded-full bg-red-600 px-3 py-1 text-sm font-extrabold text-white"
          >
            -{price.percent}%
          </motion.span>
        )}

        <span className={`text-sm font-bold ${stockColor}`}>{stockLabel}</span>
      </div>

      {price.discounted && (
        <p className="mt-2 text-sm font-bold text-green-700">
          Vous économisez {formatPrice(price.savingCents, currency)}
        </p>
      )}
    </div>
  );
}
