"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Layers } from "lucide-react";
import type { Category } from "@/types/shop";

interface CategoryCardProps {
  category: Category;
  productCount?: number;
  index?: number;
}

export function CategoryCard({ category, productCount, index = 0 }: CategoryCardProps) {
  const reduce = useReducedMotion();
  const imageUrl = category.image_url?.trim();
  const hasRemoteImage =
    !!imageUrl && (imageUrl.startsWith("https://") || imageUrl.startsWith("http://"));

  return (
    <motion.article
      initial={{ opacity: 0, y: reduce ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay: Math.min(index * 0.08, 0.4)
      }}
      whileHover={reduce ? undefined : { y: -6 }}
      className="group h-full overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-primary/5 [transition:box-shadow_0.22s_ease] hover:shadow-glow"
    >
      <Link
        href={`/shop/categorie/${category.slug}`}
        className="flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
        aria-label={`Voir la catégorie : ${category.name}`}
      >
        <div className="relative h-40 overflow-hidden bg-primary sm:h-44">
          {hasRemoteImage ? (
            <>
              <Image
                src={imageUrl}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/25 to-transparent" />
            </>
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary to-primary-dark">
              <Layers className="h-10 w-10 text-accent/70" />
            </div>
          )}
          {productCount !== undefined && (
            <span className="absolute bottom-3 left-4 rounded-full bg-accent px-3 py-1 text-xs font-bold text-primary">
              {productCount} produit{productCount > 1 ? "s" : ""}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2 p-5">
          <h3 className="text-lg font-extrabold text-primary sm:text-xl">{category.name}</h3>
          {category.description && (
            <p className="line-clamp-2 text-sm leading-relaxed text-ink-light">
              {category.description}
            </p>
          )}
          <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-bold text-primary transition-colors group-hover:text-primary-light">
            Voir les produits
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
