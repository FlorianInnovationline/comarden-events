import type { BrandConfig } from "@/lib/brands/config";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Reveal from "@/components/marques/Reveal";

/**
 * "Pourquoi <brand>" - 3 to 5 icon cards in brand colours, plus an optional
 * spec callout (specGroups).
 */
export default function BrandFeatures({ brand }: { brand: BrandConfig }) {
  return (
    <section className="bg-[var(--brand-bg)] pb-16 sm:pb-20 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--brand-dark)] tracking-tight text-center mb-12">
            Pourquoi {brand.name} ?
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {brand.features.map((f, i) => {
            const Icon =
              ((Icons[f.icon as keyof typeof Icons] as unknown) as LucideIcon) ||
              Icons.Sparkles;
            return (
              <Reveal key={f.title} delay={i * 90}>
                <div className="h-full bg-white rounded-2xl p-6 shadow-sm ring-1 ring-black/5 hover:shadow-lg transition-shadow duration-300">
                  <div className="w-12 h-12 rounded-xl bg-[var(--brand-primary)] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[var(--brand-on-primary)]" strokeWidth={2} />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--brand-dark)] mb-2">
                    {f.title}
                  </h3>
                  <p className="text-sm text-[var(--brand-dark)]/70 leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {brand.specGroups && brand.specGroups.length > 0 && (
          <Reveal delay={120}>
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {brand.specGroups.map((g) => (
                <div
                  key={g.title}
                  className="rounded-2xl p-6 ring-1 ring-black/5 bg-[var(--brand-dark)] text-white"
                >
                  <h3 className="text-base font-bold mb-3 text-[var(--brand-accent)]">
                    {g.title}
                  </h3>
                  <ul className="space-y-1.5">
                    {g.items.map((it) => (
                      <li key={it} className="text-sm text-white/80 leading-relaxed flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--brand-accent)] flex-shrink-0" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
