"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Gift, Package, Plus } from "lucide-react";
import type { Product } from "@/types/shop";
import { formatPrice } from "@/lib/shop/utils";
import { usableProductImages } from "@/components/shop/productImages";
import { bundlePriceCents } from "@/lib/shop/bundles";

interface BundleOfferCardProps {
  /** The other product in the bundle, shown in the card. */
  partner: Product;
  percent: number;
  /**
   * "unlock"  - the page's product is the discounted one; buying `partner`
   *             unlocks the reduction on the product being viewed.
   * "reward"  - the page's product is the required one; buying it makes
   *             `partner` cheaper.
   */
  mode: "unlock" | "reward";
  /** Catalogue price of whichever product is discounted, in cents. */
  discountedPriceCents: number;
  currency: string;
}

/**
 * Cross-sell card for a conditional bundle offer. Shown on both sides of the
 * pair so the condition is always stated explicitly.
 */
export function BundleOfferCard({
  partner,
  percent,
  mode,
  discountedPriceCents,
  currency,
}: BundleOfferCardProps) {
  const reduce = useReducedMotion();
  const image = usableProductImages(partner.images)[0];
  const finalCents = bundlePriceCents(discountedPriceCents, percent);
  const saving = discountedPriceCents - finalCents;

  const heading =
    mode === "unlock"
      ? `Obtenez -${percent}% sur ce produit`
      : `Profitez de -${percent}% sur l'accessoire`;

  const explanation =
    mode === "unlock"
      ? "Cette remise s'applique uniquement à l'achat du produit ci-dessous."
      : "À l'achat de ce produit, l'accessoire ci-dessous bénéficie de la remise.";

  const priceLabel =
    mode === "unlock" ? "Ce produit vous revient à" : `${partner.title} vous revient à`;

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-accent/40"
    >
      {/* Header */}
      <div className="flex items-start gap-3 bg-accent/15 px-6 py-4 sm:px-8">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent">
          <Gift className="h-5 w-5 text-primary" />
        </span>
        <div className="min-w-0">
          <span className="kicker text-accent-dark">Offre combinée</span>
          <h2 className="mt-0.5 text-lg font-extrabold leading-snug text-primary sm:text-xl">
            {heading}
          </h2>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <p className="text-sm leading-relaxed text-ink-light">{explanation}</p>

        {/* Partner product */}
        <Link
          href={`/shop/produit/${partner.slug}`}
          data-track={`bundle:${partner.slug}`}
          className="group mt-5 flex items-center gap-4 rounded-2xl bg-neutral p-4 ring-1 ring-primary/5 transition-all hover:bg-white hover:shadow-soft hover:ring-primary/20"
        >
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-white ring-1 ring-primary/5">
            {image ? (
              <Image
                src={image}
                alt={partner.title}
                fill
                className="object-contain p-1.5"
                sizes="80px"
              />
            ) : (
              <span className="flex h-full items-center justify-center">
                <Package className="h-7 w-7 text-primary/20" />
              </span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <span className="text-[0.65rem] font-bold uppercase tracking-kicker text-ink-light/60">
              {mode === "unlock" ? "Produit à acheter" : "Accessoire en promotion"}
            </span>
            <p className="mt-0.5 line-clamp-2 text-sm font-extrabold leading-snug text-primary">
              {partner.title}
            </p>
            {partner.price_cents > 0 && (
              <p className="mt-1 text-sm font-bold text-primary">
                {formatPrice(partner.price_cents, partner.currency)}
              </p>
            )}
          </div>

          <ArrowRight className="h-5 w-5 shrink-0 text-primary transition-transform group-hover:translate-x-0.5" />
        </Link>

        {/* Resulting price */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-primary px-5 py-4 text-white">
          <div className="flex items-center gap-2 text-sm font-semibold text-white/80">
            <Plus className="h-4 w-4 text-accent" />
            {priceLabel}
          </div>
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-sm text-white/60 line-through">
              {formatPrice(discountedPriceCents, currency)}
            </span>
            <span className="text-2xl font-extrabold text-accent">
              {formatPrice(finalCents, currency)}
            </span>
            <span className="rounded-full bg-red-600 px-2 py-0.5 text-[0.65rem] font-extrabold">
              -{percent}%
            </span>
          </div>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-ink-light/70">
          Économie de {formatPrice(saving, currency)}. Indiquez les deux produits dans
          votre commande pour en bénéficier.
        </p>
      </div>
    </motion.div>
  );
}
