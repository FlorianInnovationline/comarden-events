import type { Metadata } from "next";
import { Search, ShoppingBag } from "lucide-react";
import { getCategories, getProducts } from "@/lib/shop/queries";
import { CategoryCard } from "@/components/shop/CategoryCard";
import { ProductCard } from "@/components/shop/ProductCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

// Live catalog: always render from the shared DB so edits on the main site
// appear here without a redeploy.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Magasin",
  description:
    "Le catalogue Comarden en ligne : matériaux de toiture, d'isolation et accessoires. Toute la gamme, en direct de notre magasin."
};

interface PageProps {
  searchParams: { search?: string };
}

export default async function ShopPage({ searchParams }: PageProps) {
  const search = searchParams.search?.trim() || undefined;
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts({ active: true, search })
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

          {/* Search */}
          <form action="/shop" method="get" className="relative mt-8 max-w-xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />
            <input
              type="text"
              name="search"
              defaultValue={search ?? ""}
              placeholder="Rechercher un produit..."
              className="w-full rounded-full bg-white/10 py-3.5 pl-12 pr-32 text-sm text-white placeholder-white/50 ring-1 ring-white/20 backdrop-blur focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-accent px-5 py-2 text-sm font-bold text-primary transition-transform hover:scale-[1.03]"
            >
              Rechercher
            </button>
          </form>
        </div>
      </section>

      {/* Categories */}
      {!search && categories.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className="container">
            <SectionTitle
              kicker="Catégories"
              title="Parcourez par catégorie"
              align="center"
              className="mb-10 sm:mb-12"
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category, i) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  productCount={
                    products.filter((p) => p.category_id === category.id).length
                  }
                  index={i}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products */}
      <section className="bg-neutral py-16 sm:py-20">
        <div className="container">
          <SectionTitle
            kicker={search ? "Recherche" : "Nos produits"}
            title={search ? `Résultats pour « ${search} »` : "Tous nos produits"}
            description={`${products.length} produit${products.length !== 1 ? "s" : ""} disponible${products.length !== 1 ? "s" : ""}`}
            align="center"
            className="mb-10 sm:mb-12"
          />

          {products.length === 0 ? (
            <div className="mx-auto max-w-md rounded-3xl bg-white p-10 text-center shadow-soft ring-1 ring-primary/5">
              <ShoppingBag className="mx-auto h-10 w-10 text-primary/20" />
              <p className="mt-4 text-sm leading-relaxed text-ink-light">
                {search
                  ? "Aucun produit ne correspond à votre recherche."
                  : "Le catalogue est en cours de chargement. Revenez bientôt."}
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
