// ============================================================================
// Per-product discounts.
// ----------------------------------------------------------------------------
// Each product carries its own `discount_percent` (1..100), set from the
// Discounts page in the admin panel on the main Comarden site. Different
// products can therefore run different promotions at the same time.
//
// Rules:
//   - a product is discountable when it has a real price (price_cents > 0);
//     "Sur devis" products are never discounted, there is no price to reduce
//   - a missing, zero or out-of-range percent means "no discount"
// ============================================================================

export interface Discountable {
  price_cents: number;
  discount_percent?: number;
}

/** Percent must be a whole number between 1 and 100. */
export function isValidPercent(percent: unknown): percent is number {
  return (
    typeof percent === "number" &&
    Number.isInteger(percent) &&
    percent > 0 &&
    percent <= 100
  );
}

/** True when this product has a price that a discount could apply to. */
export function isDiscountable(product: { price_cents: number }): boolean {
  return product.price_cents > 0;
}

export interface PriceBreakdown {
  /** True when a discount is actually being applied. */
  discounted: boolean;
  /** Catalogue price before any discount, in cents. */
  originalCents: number;
  /** Price the customer pays, in cents. Equals originalCents when not discounted. */
  finalCents: number;
  /** Amount saved, in cents. Zero when not discounted. */
  savingCents: number;
  /** Percent applied, or 0. */
  percent: number;
}

/**
 * Resolves what to display for a product.
 *
 * `overridePriceCents` lets a caller price a specific variant while keeping the
 * product's own discount percentage.
 */
export function priceBreakdown(
  product: Discountable,
  overridePriceCents?: number
): PriceBreakdown {
  const originalCents = overridePriceCents ?? product.price_cents;
  const percent = product.discount_percent;

  if (!isValidPercent(percent) || !isDiscountable({ price_cents: originalCents })) {
    return {
      discounted: false,
      originalCents,
      finalCents: originalCents,
      savingCents: 0,
      percent: 0,
    };
  }

  const finalCents = Math.round(originalCents * (1 - percent / 100));
  return {
    discounted: true,
    originalCents,
    finalCents,
    savingCents: originalCents - finalCents,
    percent,
  };
}
