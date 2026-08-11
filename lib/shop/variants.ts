// ============================================================================
// Product variants.
// ----------------------------------------------------------------------------
// A product keeps a plain list of variant labels in `variants`. Per-variant
// pricing is optional: when `variant_prices` is absent, every variant is sold
// at the product's own price (the admin toggle "prix différents" is off).
// ============================================================================

export interface VariantOption {
  /** The variant label exactly as stored. */
  label: string;
  /** Price in cents for this variant, before any site-wide discount. */
  priceCents: number;
  /** True when this price comes from `variant_prices` rather than the base price. */
  hasOwnPrice: boolean;
}

/**
 * Builds the selectable variant list for a product.
 * Returns [] when the product has no variants at all.
 */
export function buildVariantOptions(product: {
  price_cents: number;
  variants?: string[];
  variant_prices?: Record<string, number>;
}): VariantOption[] {
  const labels = product.variants ?? [];
  if (labels.length === 0) return [];

  const prices = product.variant_prices;
  return labels.map((label) => {
    const own = prices?.[label];
    const hasOwnPrice = typeof own === "number" && own > 0;
    return {
      label,
      priceCents: hasOwnPrice ? own : product.price_cents,
      hasOwnPrice,
    };
  });
}

/** True when at least two variants differ in price - worth showing prices per option. */
export function hasVariantPricing(options: VariantOption[]): boolean {
  if (options.length < 2) return options.some((o) => o.hasOwnPrice);
  const first = options[0].priceCents;
  return options.some((o) => o.priceCents !== first);
}
