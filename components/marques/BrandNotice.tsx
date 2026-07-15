"use client";

import { Info, Check } from "lucide-react";
import type { BrandConfig } from "@/lib/brands/config";
import Reveal from "@/components/marques/Reveal";

/**
 * Informational notice card: eyebrow + heading + explanatory text (left) and
 * an "à retenir" checklist panel (right). Rendered only when a brand defines
 * `notice` (e.g. the Danger Amiante prevention block).
 */
export default function BrandNotice({ brand }: { brand: BrandConfig }) {
  const notice = brand.notice;
  if (!notice) return null;

  return (
    <section className="bg-[var(--brand-bg)] pt-2 pb-16 sm:pb-20 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="rounded-3xl bg-white ring-1 ring-black/5 shadow-lg overflow-hidden">
            <div className="grid lg:grid-cols-5">
              {/* Text */}
              <div className="lg:col-span-3 p-7 sm:p-10">
                {notice.eyebrow && (
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-xl"
                      style={{ backgroundColor: "color-mix(in srgb, var(--brand-accent) 12%, white)" }}
                    >
                      <Info className="w-5 h-5" style={{ color: "var(--brand-accent)" }} />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-[var(--brand-accent)]">
                      {notice.eyebrow}
                    </span>
                  </div>
                )}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--brand-dark)] tracking-tight mb-4">
                  {notice.heading}
                </h2>
                <p className="text-sm sm:text-base text-[var(--brand-dark)]/75 leading-relaxed">
                  {notice.text}
                </p>
              </div>

              {/* À retenir panel */}
              <div
                className="lg:col-span-2 p-7 sm:p-10 text-white"
                style={{ backgroundColor: "var(--brand-dark)" }}
              >
                <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
                  <span
                    className="h-1.5 w-8 rounded-full"
                    style={{ backgroundColor: "var(--brand-primary)" }}
                  />
                  {notice.pointsTitle ?? "À retenir"}
                </h3>
                <ul className="space-y-3.5">
                  {notice.points.map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                        style={{ backgroundColor: "var(--brand-primary)" }}
                      >
                        <Check className="h-3 w-3" strokeWidth={3} style={{ color: "var(--brand-on-primary)" }} />
                      </span>
                      <span className="text-sm text-white/90 leading-relaxed">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
