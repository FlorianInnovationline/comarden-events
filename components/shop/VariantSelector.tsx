"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, Layers } from "lucide-react";
import { formatPrice } from "@/lib/shop/utils";
import { priceBreakdown } from "@/lib/shop/discount";
import { useVariantPrice } from "@/components/shop/VariantPriceContext";
import { cn } from "@/lib/utils";

/**
 * Selectable variant list. Picking an option updates the price shown across the
 * page (image overlay + main price block) through the shared context.
 */
export function VariantSelector() {
  const reduce = useReducedMotion();
  const ctx = useVariantPrice();
  if (!ctx || ctx.options.length === 0) return null;

  const { options, selectedIndex, select, currency, pricedVariants, discountPercent } =
    ctx;

  return (
    <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-primary/5 sm:p-8">
      <div className="mb-1 flex items-center gap-2.5">
        <Layers className="h-5 w-5 text-accent" />
        <h2 className="text-lg font-extrabold text-primary sm:text-xl">
          Choisissez votre variante
        </h2>
      </div>
      <p className="mb-5 text-sm text-ink-light">
        {options.length} version{options.length > 1 ? "s" : ""} disponible
        {options.length > 1 ? "s" : ""}
        {pricedVariants ? " - le prix s'ajuste selon votre choix." : "."}
      </p>

      <div
        role="radiogroup"
        aria-label="Variantes disponibles"
        className="grid gap-2.5 sm:grid-cols-2"
      >
        {options.map((option, i) => {
          const active = i === selectedIndex;
          const p = priceBreakdown({
            price_cents: option.priceCents,
            discount_percent: discountPercent,
          });

          return (
            <button
              key={option.label}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => select(i)}
              className={cn(
                "group relative flex items-start gap-3 rounded-2xl p-4 text-left transition-all duration-200",
                active
                  ? "bg-primary text-white shadow-soft ring-2 ring-primary"
                  : "bg-neutral ring-1 ring-primary/10 hover:bg-white hover:ring-primary/30"
              )}
            >
              {/* Radio dot */}
              <span
                aria-hidden
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                  active
                    ? "border-accent bg-accent"
                    : "border-primary/25 group-hover:border-primary/50"
                )}
              >
                {active && <Check className="h-3 w-3 text-primary" strokeWidth={3.5} />}
              </span>

              <span className="min-w-0 flex-1">
                <span
                  className={cn(
                    "block text-sm font-semibold leading-snug",
                    active ? "text-white" : "text-primary"
                  )}
                >
                  {option.label}
                </span>

                {pricedVariants && p.finalCents > 0 && (
                  <span className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    {p.discounted && (
                      <span
                        className={cn(
                          "text-xs line-through",
                          active ? "text-white/55" : "text-ink-light/55"
                        )}
                      >
                        {formatPrice(p.originalCents, currency)}
                      </span>
                    )}
                    <span
                      className={cn(
                        "text-base font-extrabold",
                        active ? "text-accent" : "text-primary"
                      )}
                    >
                      {formatPrice(p.finalCents, currency)}
                    </span>
                  </span>
                )}
              </span>

              {/* Active underline accent */}
              {active && !reduce && (
                <motion.span
                  layoutId="variant-active"
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-accent"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
