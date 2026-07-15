import type { BrandConfig } from "@/lib/brands/config";
import { ArrowRight, Phone } from "lucide-react";
import { site } from "@/lib/site";
import Reveal from "@/components/marques/Reveal";

/**
 * Comarden CTA band - re-anchors the Comarden identity at the bottom of every
 * brand page. Navy Comarden background with a brand-accent action button.
 */
export default function BrandCTA({ brand }: { brand: BrandConfig }) {
  return (
    <section className="bg-primary text-white py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-25"
        style={{
          background:
            "radial-gradient(ellipse at top right, var(--brand-primary), transparent 60%)",
        }}
      />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-accent mb-4">
            Distribué par Comarden depuis 1977
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4">
            {brand.name} chez Comarden
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            Conseil technique, disponibilité produit et façonnage sur mesure sur nos
            deux sites de Bertrix et Naninne. Demandez votre devis personnalisé.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`mailto:${site.contact.email}?subject=${encodeURIComponent(`Demande de devis - ${brand.name}`)}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-primary font-semibold px-8 py-3.5 text-base transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              Demander un devis
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href={site.contact.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 text-white font-semibold px-8 py-3.5 text-base border border-white/20 hover:bg-white/20 transition-colors"
            >
              <Phone className="w-5 h-5" />
              {site.contact.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
