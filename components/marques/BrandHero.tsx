import type { BrandConfig } from "@/lib/brands/config";
import BrandLogo from "./BrandLogo";
import { ArrowDown } from "lucide-react";

/**
 * Full-width brand-coloured hero. Sits below the (fixed) Comarden navbar, so it
 * carries top padding to clear it. Text colour adapts via --brand-on-primary.
 */
export default function BrandHero({ brand }: { brand: BrandConfig }) {
  return (
    <section className="relative overflow-hidden bg-[var(--brand-primary)] text-[var(--brand-on-primary)]">
      {/* subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 text-center">
        <div className="inline-flex items-center justify-center mb-8">
          {brand.logoNeedsLight ? (
            <span className="inline-flex rounded-2xl bg-white px-8 py-6 shadow-lg">
              <BrandLogo
                name={brand.name}
                logo={brand.logo}
                imgClassName="h-20 sm:h-24 lg:h-28 w-auto object-contain"
                textClassName="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--brand-primary)]"
              />
            </span>
          ) : (
            <BrandLogo
              name={brand.name}
              logo={brand.logo}
              imgClassName="h-28 sm:h-36 lg:h-44 w-auto object-contain"
              textClassName="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight"
            />
          )}
        </div>

        <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] opacity-80 mb-5">
          {brand.tagline}
        </p>

        <p className="text-lg sm:text-xl lg:text-2xl font-medium leading-relaxed max-w-3xl mx-auto">
          {brand.heroPitch}
        </p>

        <div className="mt-10">
          <a
            href="#produits"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-dark)] text-white font-semibold px-7 py-3.5 text-sm sm:text-base transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            {brand.productsCtaLabel}
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* bottom wave into the page background */}
      <div className="relative">
        <svg viewBox="0 0 1440 60" className="w-full block" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60V28C240 8 480 0 720 0C960 0 1200 8 1440 28V60H0Z" fill="var(--brand-bg)" />
        </svg>
      </div>
    </section>
  );
}
