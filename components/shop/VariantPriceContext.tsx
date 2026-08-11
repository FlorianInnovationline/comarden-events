"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { priceBreakdown, type PriceBreakdown } from "@/lib/shop/discount";
import type { VariantOption } from "@/lib/shop/variants";

interface VariantPriceValue {
  options: VariantOption[];
  selectedIndex: number;
  select: (index: number) => void;
  /** Price breakdown for the currently selected variant (or the base price). */
  price: PriceBreakdown;
  currency: string;
  /** True when the options carry differing prices. */
  pricedVariants: boolean;
  /** The product's own discount percentage, 0 when none. */
  discountPercent: number;
}

const VariantPriceContext = createContext<VariantPriceValue | null>(null);

interface ProviderProps {
  basePriceCents: number;
  currency: string;
  discountPercent: number;
  options: VariantOption[];
  pricedVariants: boolean;
  children: React.ReactNode;
}

/**
 * Holds the selected variant for a product page and derives the price shown by
 * the gallery overlay, the price block and the variant selector, so all three
 * stay in sync. Children may be server-rendered.
 */
export function VariantPriceProvider({
  basePriceCents,
  currency,
  discountPercent,
  options,
  pricedVariants,
  children,
}: ProviderProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const value = useMemo<VariantPriceValue>(() => {
    const selected = options[selectedIndex];
    const cents = selected ? selected.priceCents : basePriceCents;
    return {
      options,
      selectedIndex,
      select: setSelectedIndex,
      price: priceBreakdown({
        price_cents: cents,
        discount_percent: discountPercent,
      }),
      currency,
      pricedVariants,
      discountPercent,
    };
  }, [options, selectedIndex, basePriceCents, discountPercent, currency, pricedVariants]);

  return (
    <VariantPriceContext.Provider value={value}>
      {children}
    </VariantPriceContext.Provider>
  );
}

/** Returns the variant price context, or null outside a provider. */
export function useVariantPrice(): VariantPriceValue | null {
  return useContext(VariantPriceContext);
}
