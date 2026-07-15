"use client";

import { useState } from "react";
import Image from "next/image";
import type { BrandConfig } from "@/lib/brands/config";
import Reveal from "@/components/marques/Reveal";

function CardImage({ src, label, cover }: { src: string | null; label: string; cover?: boolean }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white ring-1 ring-black/5 shadow-sm">
      {src && !failed ? (
        <Image
          src={src}
          alt={label}
          fill
          className={cover ? "object-cover" : "object-contain p-4"}
          sizes="(max-width: 1024px) 100vw, 33vw"
          onError={() => setFailed(true)}
        />
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-accent) 100%)" }}
        >
          <span className="text-[var(--brand-on-primary)] text-sm font-bold uppercase tracking-wide px-4 text-center">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}

/**
 * "Use cases" section: a bold heading and image cards (e.g. Façade / Crépi /
 * Revêtement de façade). Rendered only when a brand defines `useCases`.
 */
export default function BrandUseCases({ brand }: { brand: BrandConfig }) {
  const uc = brand.useCases;
  if (!uc) return null;

  return (
    <section className="bg-[var(--brand-bg)] pt-2 pb-16 sm:pb-20 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase text-[var(--brand-dark)] tracking-tight text-center mb-12 max-w-3xl mx-auto leading-tight">
            {uc.heading}
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
          {uc.cards.map((c, i) => (
            <Reveal key={c.label} delay={i * 90}>
              <div className="text-center">
                <CardImage src={c.image} label={c.label} cover={uc.coverImages} />
                <p className="mt-4 text-sm font-bold uppercase tracking-wide text-[var(--brand-dark)]">
                  {c.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
