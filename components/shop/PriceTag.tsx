"use client";

import { motion, useReducedMotion } from "framer-motion";
import { formatPrice } from "@/lib/shop/utils";
import { priceBreakdown } from "@/lib/shop/discount";
import { cn } from "@/lib/utils";

interface PriceTagProps {
  product: { price_cents: number; currency: string; discount_percent?: number };
  /** "sm" for cards and carousels, "lg" for the product page. */
  size?: "sm" | "lg";
  className?: string;
}

/**
 * Price display that folds in the site-wide discount: the catalogue price is
 * struck through and the discounted price is shown next to it, with a small
 * animated "-X%" pill. Falls back to a plain price when nothing applies.
 */
export function PriceTag({ product, size = "sm", className }: PriceTagProps) {
  const reduce = useReducedMotion();
  const p = priceBreakdown(product);
  const large = size === "lg";

  if (!p.discounted) {
    return (
      <span
        className={cn(
          "font-extrabold text-primary",
          large ? "text-3xl sm:text-4xl" : "text-lg",
          className
        )}
      >
        {formatPrice(p.finalCents, product.currency)}
      </span>
    );
  }

  return (
    <span className={cn("flex flex-wrap items-baseline gap-x-2 gap-y-1", className)}>
      {/* Original price, struck through */}
      <span
        className={cn(
          "relative font-semibold text-ink-light/60",
          large ? "text-lg sm:text-xl" : "text-sm"
        )}
      >
        <span className="line-through decoration-[1.5px] decoration-ink-light/50">
          {formatPrice(p.originalCents, product.currency)}
        </span>
      </span>

      {/* Discounted price */}
      <motion.span
        key={p.finalCents}
        initial={reduce ? false : { opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "font-extrabold text-primary",
          large ? "text-3xl sm:text-4xl" : "text-lg"
        )}
      >
        {formatPrice(p.finalCents, product.currency)}
      </motion.span>

      {/* Percent pill */}
      <motion.span
        initial={reduce ? false : { opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 420, damping: 20, delay: 0.08 }}
        className={cn(
          "inline-flex items-center rounded-full bg-red-600 font-extrabold text-white",
          large ? "px-3 py-1 text-sm" : "px-2 py-0.5 text-[0.65rem]"
        )}
      >
        -{p.percent}%
      </motion.span>
    </span>
  );
}
