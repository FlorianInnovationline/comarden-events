// ============================================================================
// Conditional bundle offers.
// ----------------------------------------------------------------------------
// Some discounts only apply when another product is bought alongside. Those are
// deliberately NOT stored as `products.discount_percent`: that column drives the
// unconditional "-X%" shown on cards, carousels and the price block, which would
// promise a reduction the customer cannot get on its own.
//
// Instead the relationship is declared here and surfaced as a cross-sell card on
// both product pages.
// ============================================================================

export interface BundleOffer {
  /** Slug of the product that must be purchased to unlock the offer. */
  requiredSlug: string;
  /** Slug of the product that becomes discounted. */
  discountedSlug: string;
  /** Whole percent off the discounted product, 1..100. */
  percent: number;
}

export const BUNDLE_OFFERS: BundleOffer[] = [
  {
    requiredSlug: "stratogrip-t300-22l",
    discountedSlug: "pistolet-t300-tuyau-2m",
    percent: 63,
  },
];

/** The offer unlocking a discount ON this product, if any. */
export function offerForDiscounted(slug: string): BundleOffer | undefined {
  return BUNDLE_OFFERS.find((o) => o.discountedSlug === slug);
}

/** The offer this product UNLOCKS on another product, if any. */
export function offerForRequired(slug: string): BundleOffer | undefined {
  return BUNDLE_OFFERS.find((o) => o.requiredSlug === slug);
}

/** Price in cents once the bundle discount is applied. */
export function bundlePriceCents(priceCents: number, percent: number): number {
  return Math.round(priceCents * (1 - percent / 100));
}
