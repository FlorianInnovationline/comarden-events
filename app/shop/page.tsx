import type { Metadata } from "next";
import { getProducts, getGlobalDiscountPercent } from "@/lib/shop/queries";
import { BrandsSection } from "@/components/shop/BrandsSection";
import { ShopCatalog } from "@/components/shop/ShopCatalog";
import { SectionTitle } from "@/components/ui/SectionTitle";

// Live catalog: always render from the shared DB so edits on the main site
// appear here without a redeploy.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Magasin",
  description:
    "Le catalogue Comarden en ligne : matériaux de toiture, d'isolation et accessoires. Toute la gamme, en direct de notre magasin."
};

export default async function ShopPage() {
  const [products, discountPercent] = await Promise.all([
    getProducts({ active: true }),
    getGlobalDiscountPercent()
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-primary pb-16 pt-28 text-white sm:pb-20 sm:pt-36">
        <div aria-hidden className="absolute inset-0 bg-grid-soft opacity-30" />
        <div
          aria-hidden
          className="absolute -left-24 -top-32 h-[22rem] w-[22rem] rounded-full bg-accent/15 blur-3xl"
        />
        <div className="container relative z-10">
          <span className="kicker text-accent">Magasin</span>
          <h1 className="heading-xl mt-3 max-w-3xl text-balance">
            Le catalogue Comarden en ligne
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
            Matériaux de toiture, isolation et accessoires : retrouvez toute la
            gamme disponible sur nos sites de Bertrix et Naninne.
          </p>
        </div>
      </section>

      {/* Brands */}
      <BrandsSection />

      {/* Products with brand filter + search */}
      <section className="bg-neutral py-16 sm:py-20">
        <div className="container">
          <SectionTitle
            kicker="Nos produits"
            title="Tous nos produits"
            description="Recherchez ou filtrez par marque pour trouver ce qu'il vous faut."
            align="center"
            className="mb-10 sm:mb-12"
          />
          <ShopCatalog products={products} discountPercent={discountPercent} />
        </div>
      </section>
    </>
  );
}
