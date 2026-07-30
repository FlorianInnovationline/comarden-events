"use client";

import { useState } from "react";
import Image from "next/image";
import type { BrandConfig } from "@/lib/brands/config";
import Reveal from "@/components/marques/Reveal";

/**
 * Editorial "story" section: image (left) + big heading, paragraph and a
 * numbered points list (right). Uses brand CSS variables; the image falls back
 * to a branded panel if it is missing (so it never shows a broken image).
 */
export default function BrandStory({ brand }: { brand: BrandConfig }) {
  const story = brand.story;
  const [imgFailed, setImgFailed] = useState(false);
  if (!story) return null;
  const contain = story.imageFit === "contain";

  return (
    <section className="bg-[var(--brand-bg)] py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <Reveal>
            <div className="relative aspect-square rounded-3xl overflow-hidden ring-1 ring-black/5 shadow-lg bg-white">
              {story.image && !imgFailed ? (
                <Image
                  src={story.image}
                  alt={story.heading}
                  fill
                  className={contain ? "object-contain p-5 sm:p-8" : "object-cover"}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  onError={() => setImgFailed(true)}
                />
              ) : (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-accent) 100%)" }}
                >
                  <span className="text-[var(--brand-on-primary)] text-4xl sm:text-5xl font-extrabold tracking-tight px-6 text-center">
                    {brand.name}
                  </span>
                </div>
              )}
            </div>
          </Reveal>

          {/* Content */}
          <Reveal delay={120}>
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase text-[var(--brand-dark)] tracking-tight leading-[1.05] mb-6">
                {story.heading}
              </h2>
              <p className="text-base text-[var(--brand-dark)]/70 leading-relaxed mb-8 max-w-xl">
                {story.text}
              </p>
              <ol className="space-y-0">
                {story.points.map((pt, i) => (
                  <li
                    key={pt}
                    className="flex items-start gap-4 border-t border-[var(--brand-dark)]/10 py-3.5"
                  >
                    <span
                      className="text-lg font-extrabold tabular-nums leading-none pt-0.5"
                      style={{ color: "var(--brand-accent)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-[var(--brand-dark)]">
                      {pt}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
