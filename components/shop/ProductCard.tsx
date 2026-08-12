"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Package, ArrowRight } from "lucide-react";
import type { Product } from "@/types/shop";
import { getStockStatus } from "@/lib/shop/utils";
import { usableProductImages } from "@/components/shop/productImages";
import { PriceTag } from "@/components/shop/PriceTag";
import { priceBreakdown } from "@/lib/shop/discount";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const reduce = useReducedMotion();
  const stockStatus = getStockStatus(product.stock);
  const imageUrl = usableProductImages(product.images)[0];
  const price = priceBreakdown(product);

  return (
    <motion.article
      initial={{ opacity: 0, y: reduce ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay: Math.min(index * 0.05, 0.4)
      }}
      whileHover={reduce ? undefined : { y: -6 }}
      className="group h-full overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-primary/5 [transition:box-shadow_0.22s_ease] hover:shadow-glow"
    >
      <Link
        href={`/shop/produit/${product.slug}`}
        className="flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
        aria-label={`Voir le produit : ${product.title}`}
        data-track={`produit:${product.slug}`}
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-neutral">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.title}
              fill
              className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Package className="h-12 w-12 text-primary/20" />
            </div>
          )}
          <span
            className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-kicker ${
              stockStatus.available
                ? "bg-primary/90 text-white"
                : "bg-white/90 text-primary ring-1 ring-primary/15"
            }`}
          >
            {stockStatus.label}
          </span>

          {/* Discount flag */}
          {price.discounted && (
            <motion.span
              initial={reduce ? false : { opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 420, damping: 18, delay: 0.1 }}
              className="absolute left-3 top-3 rounded-full bg-red-600 px-2.5 py-1 text-[0.65rem] font-extrabold text-white shadow-sm"
            >
              -{price.percent}%
            </motion.span>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-2 p-5">
          {product.category && (
            <span className="text-[0.65rem] font-bold uppercase tracking-kicker text-ink-light/60">
              {product.category.name}
            </span>
          )}
          <h3 className="text-base font-extrabold leading-snug text-primary sm:text-lg">
            {product.title}
          </h3>
          {product.description && (
            <p className="line-clamp-2 text-sm leading-relaxed text-ink-light">
              {product.description}
            </p>
          )}

          <div className="mt-auto flex items-end justify-between gap-3 pt-4">
            <PriceTag product={product} />
            <span className="inline-flex shrink-0 items-center gap-1.5 pb-0.5 text-sm font-bold text-primary transition-colors group-hover:text-primary-light">
              Voir
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
