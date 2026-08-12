import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { allBrands } from "@/lib/brands/config";
import BrandLogo from "@/components/marques/BrandLogo";
import Reveal from "@/components/marques/Reveal";

/**
 * "Nos marques" - brand logo strip on /shop. Each card links to the brand's
 * dedicated /marques/<slug> page. Logos fall back to a styled wordmark.
 */
// Some logos carry a lot of internal whitespace and render small at a uniform
// size — bump those individually so every logo reads at a comparable weight.
const LOGO_SIZE: Record<string, string> = {
  "solid-john": "max-h-16",
  rockpanel: "max-h-[4.5rem]",
  "danger-amiante": "max-h-[4.5rem]"
};
const DEFAULT_LOGO_SIZE = "max-h-14";

export function BrandsSection() {
  const brands = allBrands();

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container">
        <Reveal>
          <div className="mx-auto mb-10 flex max-w-3xl flex-col items-center gap-4 text-center sm:mb-12">
            <span className="kicker">Nos marques</span>
            <h2 className="heading-lg text-balance text-primary">
              Les grandes marques que nous distribuons
            </h2>
            <span aria-hidden className="block h-1 w-16 rounded-full bg-accent" />
            <p className="max-w-2xl text-base text-ink-light sm:text-lg">
              Cliquez sur une marque pour explorer son univers et ses produits.
            </p>
          </div>
        </Reveal>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
          {brands.map((b, i) => (
            <div key={b.slug} className="w-[160px] sm:w-[195px]">
              <Reveal delay={i * 60}>
                <Link
                  href={`/marques/${b.slug}`}
                  className="group block"
                  aria-label={b.name}
                  data-track={`marque:${b.slug}`}
                >
                  <div
                    className="relative flex h-28 items-center justify-center overflow-hidden rounded-2xl p-5 shadow-soft ring-1 ring-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow sm:h-32"
                    style={{
                      color: b.logoNeedsDark ? b.colors.onPrimary : b.colors.dark,
                      backgroundColor: b.logoNeedsDark ? b.colors.primary : "#ffffff"
                    }}
                  >
                    <BrandLogo
                      name={b.name}
                      logo={b.logo}
                      imgClassName={`${LOGO_SIZE[b.slug] ?? DEFAULT_LOGO_SIZE} max-w-full w-auto object-contain`}
                      textClassName="text-base sm:text-lg font-extrabold tracking-tight text-center leading-tight"
                    />
                    <span
                      className="absolute bottom-0 left-0 right-0 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                      style={{ backgroundColor: b.colors.primary }}
                    />
                  </div>
                  <p className="mt-2 flex items-center justify-center gap-1 text-xs font-semibold text-ink-light transition-colors group-hover:text-primary">
                    Découvrir
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </p>
                </Link>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
