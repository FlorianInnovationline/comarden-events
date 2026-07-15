"use client";

import { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import type { BrandConfig } from "@/lib/brands/config";
import Reveal from "@/components/marques/Reveal";

/** Clean, crisp Belgian flag (three vertical bands). */
function BelgianFlag({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 90 60"
      className={className}
      role="img"
      aria-label="Drapeau belge"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0" width="30" height="60" fill="#2D2926" />
      <rect x="30" width="30" height="60" fill="#F4CF1F" />
      <rect x="60" width="30" height="60" fill="#ED2939" />
    </svg>
  );
}

/**
 * "Made in <country>" origin section: editorial copy + advantages list on the
 * left, a country flag and a context photo on the right. Config-driven via
 * `brand.origin`; the photo falls back to a branded panel when missing.
 */
export default function BrandOrigin({ brand }: { brand: BrandConfig }) {
  const origin = brand.origin;
  const [imgFailed, setImgFailed] = useState(false);
  if (!origin) return null;
  const hasImage = Boolean(origin.image) && !imgFailed;

  return (
    <section className="bg-[var(--brand-bg)] pt-2 pb-16 sm:pb-20 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start lg:items-center">
          {/* Left: copy + advantages */}
          <Reveal>
            <div>
              {origin.flag === "be" && (
                <div className="inline-flex items-center gap-2.5 rounded-full bg-white ring-1 ring-black/5 shadow-sm pl-1.5 pr-4 py-1.5 mb-6">
                  <span className="inline-flex overflow-hidden rounded-[3px] ring-1 ring-black/10">
                    <BelgianFlag className="h-4 w-6 block" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--brand-dark)]">
                    {origin.badge}
                  </span>
                </div>
              )}

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--brand-dark)] tracking-tight leading-tight mb-5">
                {origin.heading}
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-[var(--brand-dark)]/75 leading-relaxed">
                {origin.paragraphs.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--brand-accent)] mb-4">
                  {origin.advantagesTitle}
                </h3>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                  {origin.advantages.map((a) => (
                    <li key={a} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--brand-primary)]">
                        <Check className="h-3 w-3 text-[var(--brand-on-primary)]" strokeWidth={3} />
                      </span>
                      <span className="text-sm font-medium text-[var(--brand-dark)]/85">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Right: flag + photo (+ optional stat) */}
          <Reveal delay={120}>
            <div className="space-y-5">
              {origin.flag === "be" && (
                <div className="overflow-hidden rounded-2xl ring-1 ring-black/5 shadow-lg">
                  <BelgianFlag className="w-full h-24 sm:h-28 block" />
                </div>
              )}

              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-black/5 shadow-lg bg-white">
                {hasImage ? (
                  <Image
                    src={origin.image as string}
                    alt={origin.heading}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    onError={() => setImgFailed(true)}
                  />
                ) : (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-accent) 100%)" }}
                  >
                    <span className="text-[var(--brand-on-primary)] text-2xl font-extrabold tracking-tight px-6 text-center">
                      {brand.name}
                    </span>
                  </div>
                )}

                {origin.stat && (
                  <div className="absolute bottom-4 left-4 rounded-xl bg-white/95 backdrop-blur px-4 py-3 shadow-lg ring-1 ring-black/5">
                    <div className="text-2xl font-extrabold text-[var(--brand-primary)] leading-none">
                      {origin.stat.value}
                    </div>
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-[var(--brand-dark)]/70 mt-1 max-w-[9rem] leading-tight">
                      {origin.stat.label}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
