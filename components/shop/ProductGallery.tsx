"use client";

import { useState } from "react";
import Image from "next/image";
import { Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { usableProductImages } from "@/components/shop/productImages";

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

/** Main image + clickable thumbnails. Styled placeholder when no image usable. */
export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const imgs = usableProductImages(images);
  const [active, setActive] = useState(0);
  const main = imgs[Math.min(active, Math.max(imgs.length - 1, 0))];

  if (!main) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-3xl bg-neutral ring-1 ring-primary/5">
        <div className="flex flex-col items-center gap-3 text-ink-light/50">
          <Package className="h-16 w-16" />
          <span className="text-sm font-semibold">Photo à venir</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-primary/5">
        <Image
          src={main}
          alt={alt}
          fill
          className="object-contain p-6"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>

      {imgs.length > 1 && (
        <div className="grid grid-cols-5 gap-3">
          {imgs.slice(0, 5).map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Voir l'image ${i + 1}`}
              className={cn(
                "relative aspect-square overflow-hidden rounded-xl bg-white ring-1 transition-all",
                i === active
                  ? "ring-2 ring-accent"
                  : "ring-primary/10 hover:ring-primary/30"
              )}
            >
              <Image
                src={img}
                alt={`${alt} - vue ${i + 1}`}
                fill
                className="object-contain p-2"
                sizes="120px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
