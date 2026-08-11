import type { BrandConfig } from "@/lib/brands/config";
import type { Product } from "@/types/shop";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Package, Phone } from "lucide-react";
import { usableProductImages } from "@/components/shop/productImages";
import { priceBreakdown } from "@/lib/shop/globalDiscount";
import { PriceTag } from "@/components/shop/PriceTag";
import { site } from "@/lib/site";
import Reveal from "@/components/marques/Reveal";

interface Props {
  brand: BrandConfig;
  products: Product[];
  /** Active site-wide discount percentage, 0 when none. */
  discountPercent?: number;
}

/**
 * "Nos produits <brand>" - horizontal product carousel from the shared catalog.
 *   - productBrand === null -> catalogue "à venir"
 *   - 0 matching products    -> "disponibles sur demande" CTA
 *   - >0 products            -> scroll-snap carousel (read-only: no cart)
 */
export default function BrandProductCarousel({
  brand,
  products,
  discountPercent = 0,
}: Props) {
  return (
    <section id="produits" className="bg-[var(--brand-bg)] py-16 sm:py-20 lg:py-24 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--brand-dark)] tracking-tight text-center mb-12">
            {brand.productsTitle}
          </h2>
        </Reveal>

        {brand.productBrand === null ? (
          <Reveal>
            <Placeholder
              title="Catalogue à venir"
              text={`Les produits ${brand.name} arrivent bientôt chez Comarden. Contactez-nous pour le catalogue et la disponibilité.`}
            />
          </Reveal>
        ) : products.length === 0 ? (
          <Reveal>
            <Placeholder
              title="Produits disponibles sur demande"
              text="Contactez-nous : notre équipe vous renseigne sur la gamme et les disponibilités."
            />
          </Reveal>
        ) : (
          <Reveal>
            <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:thin]">
              {products.map((p) => {
                const img = usableProductImages(p.images)[0];
                const price = priceBreakdown(p, discountPercent);
                return (
                  <div
                    key={p.id}
                    className="group snap-start shrink-0 w-[260px] sm:w-[280px] bg-white rounded-2xl ring-1 ring-black/5 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                  >
                    <Link href={`/shop/produit/${p.slug}`} className="block">
                      <div className="relative aspect-square bg-neutral overflow-hidden">
                        {price.discounted && (
                          <span className="absolute left-3 top-3 z-10 rounded-full bg-red-600 px-2.5 py-1 text-[0.65rem] font-extrabold text-white shadow-sm">
                            -{price.percent}%
                          </span>
                        )}
                        {img ? (
                          <Image
                            src={img}
                            alt={p.title}
                            fill
                            className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                            sizes="280px"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <Package className="h-10 w-10 text-[var(--brand-dark)]/15" />
                          </div>
                        )}
                      </div>
                    </Link>
                    <div className="p-5 flex flex-col flex-1">
                      {p.brand && (
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--brand-accent)] mb-1.5">
                          {p.brand}
                        </span>
                      )}
                      <Link href={`/shop/produit/${p.slug}`}>
                        <h3 className="text-sm font-bold text-[var(--brand-dark)] leading-snug mb-2 line-clamp-2 hover:underline">
                          {p.title}
                        </h3>
                      </Link>
                      {p.description && (
                        <p className="text-xs text-[var(--brand-dark)]/65 leading-relaxed line-clamp-2 mb-4">
                          {p.description}
                        </p>
                      )}
                      <div className="mt-auto space-y-2 pt-2">
                        <PriceTag product={p} discountPercent={discountPercent} />
                        <Link
                          href={`/shop/produit/${p.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--brand-dark)] group-hover:text-[var(--brand-accent)] transition-colors"
                        >
                          Voir le produit
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function Placeholder({ title, text }: { title: string; text: string }) {
  return (
    <div className="max-w-2xl mx-auto text-center rounded-3xl bg-white ring-1 ring-black/5 p-10 sm:p-14 shadow-sm">
      <h3 className="text-xl sm:text-2xl font-bold text-[var(--brand-dark)] mb-3">{title}</h3>
      <p className="text-sm sm:text-base text-[var(--brand-dark)]/70 leading-relaxed mb-8">{text}</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href={`mailto:${site.contact.email}`}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-dark)] text-white font-semibold px-6 py-3 text-sm transition-transform duration-300 hover:scale-105"
        >
          Nous contacter
          <ArrowRight className="w-4 h-4" />
        </a>
        <a
          href={site.contact.phoneHref}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-primary)] text-[var(--brand-on-primary)] font-semibold px-6 py-3 text-sm transition-transform duration-300 hover:scale-105"
        >
          <Phone className="w-4 h-4" />
          {site.contact.phone}
        </a>
      </div>
    </div>
  );
}
