"use client";

import { useState } from "react";
import Image from "next/image";
import type { BrandConfig } from "@/lib/brands/config";
import Reveal from "@/components/marques/Reveal";
import BrandLogo from "./BrandLogo";

/**
 * "Qui est <brand>" identity section. Full-width text by default; when the brand
 * has an `aboutImage`, shows a clean round image alongside (in-flow, so it never
 * overlaps the hero).
 */
export default function BrandAbout({ brand }: { brand: BrandConfig }) {
  const [imgFailed, setImgFailed] = useState(false);
  const hasImage = Boolean(brand.aboutImage) && !imgFailed;
  const contain = brand.aboutImageFit === "contain";
  const rounded = brand.aboutImageShape === "rounded";

  return (
    <section className="bg-[var(--brand-bg)] py-16 sm:py-20 lg:py-24">
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${brand.aboutImage ? "max-w-7xl" : "max-w-4xl"}`}>
        <div className={brand.aboutImage ? "grid lg:grid-cols-2 gap-10 lg:gap-16 items-center" : ""}>
          <Reveal>
            <div>
              <div className="mb-6" style={{ color: "var(--brand-dark)" }}>
                {brand.logoNeedsDark ? (
                  <span className="inline-flex rounded-xl bg-[var(--brand-primary)] px-5 py-3">
                    <BrandLogo
                      name={brand.name}
                      logo={brand.logo}
                      imgClassName="h-14 sm:h-16 lg:h-20 w-auto object-contain"
                      textClassName="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--brand-on-primary)]"
                    />
                  </span>
                ) : (
                  <BrandLogo
                    name={brand.name}
                    logo={brand.logo}
                    imgClassName="h-16 sm:h-20 lg:h-24 w-auto object-contain"
                    textClassName="text-3xl sm:text-4xl font-extrabold tracking-tight"
                  />
                )}
              </div>
              <div className="flex items-center gap-3 mb-5">
                <span className="h-1.5 w-10 rounded-full bg-[var(--brand-primary)]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--brand-accent)]">
                  La marque
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[var(--brand-dark)] tracking-tight mb-6">
                {brand.aboutTitle}
              </h2>
              <p className="text-base sm:text-lg text-[var(--brand-dark)]/75 leading-relaxed">
                {brand.aboutText}
              </p>
            </div>
          </Reveal>

          {brand.aboutImage && (
            <Reveal delay={120}>
              <div className="flex justify-center lg:justify-end">
                <div
                  className={`relative w-full max-w-md overflow-hidden ring-1 ring-black/5 shadow-xl bg-white ${
                    rounded ? "aspect-[4/3] rounded-3xl" : "aspect-square rounded-full"
                  }`}
                >
                  {hasImage ? (
                    <Image
                      src={brand.aboutImage as string}
                      alt={brand.name}
                      fill
                      className={contain ? "object-contain p-4" : "object-cover"}
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      onError={() => setImgFailed(true)}
                    />
                  ) : (
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-accent) 100%)" }}
                    >
                      <span className="text-[var(--brand-on-primary)] text-3xl font-extrabold tracking-tight px-6 text-center">
                        {brand.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
