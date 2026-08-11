// ============================================================================
// Site-wide percentage discount - READ side.
// ----------------------------------------------------------------------------
// The discount is set from the admin panel on the main Comarden site and stored
// as a single reserved row in the shared `promotions` table, identified by a
// sentinel `code`. This file mirrors that convention; keep both copies in sync
// (main repo: lib/shop/globalDiscount.ts).
//
// Business rules:
//   - only products in stock (stock > 0) are discounted
//   - "Sur devis" products (price_cents === 0) are never discounted
//   - the discount applies only when the row is active and the percent is 1..100
// ============================================================================

/** Reserved `promotions.code` marking the single site-wide discount row. */
export const GLOBAL_DISCOUNT_CODE = "__GLOBAL_DISCOUNT__";

/** Percent must be a whole number between 1 and 100. */
export function isValidPercent(percent: unknown): percent is number {
  return (
    typeof percent === "number" &&
    Number.isInteger(percent) &&
    percent > 0 &&
    percent <= 100
  );
}

/**
 * True when this product is eligible for the site-wide discount.
 *
 * Eligibility is "has a real price". The `stock` column is not maintained in
 * this catalogue (every product sits at 0 and is shown as "Sur commande"), so
 * keying off it would discount nothing. Products priced at 0 are quote-only
 * ("Sur devis") and are never discounted - there is no price to reduce.
 */
export function isDiscountable(product: { price_cents: number }): boolean {
  return product.price_cents > 0;
}

export interface PriceBreakdown {
  /** True when a discount is actually being applied to this product. */
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
 * Resolves what to display for a product given the active site-wide percent.
 * Pass percent = 0 (or an ineligible product) to get the plain price back.
 */
export function priceBreakdown(
  product: { price_cents: number },
  percent: number
): PriceBreakdown {
  const originalCents = product.price_cents;

  if (!isValidPercent(percent) || !isDiscountable(product)) {
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
