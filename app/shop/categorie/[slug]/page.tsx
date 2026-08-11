import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PackageOpen } from "lucide-react";
import {
  getCategoryBySlug,
  getProducts,
  getGlobalDiscountPercent
} from "@/lib/shop/queries";
import { ProductCard } from "@/components/shop/ProductCard";

export const dynamic = "force-dynamic";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);
  if (!category) return { title: "Catégorie introuvable" };
  return {
    title: category.name,
    description:
      category.description ?? `Découvrez nos produits ${category.name}.`
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const category = await getCategoryBySlug(params.slug);
  if (!category) notFound();

  const [products, discountPercent] = await Promise.all([
    getProducts({ categoryId: category.id, active: true }),
    getGlobalDiscountPercent()
  ]);

  return (
    <>
      {/* Hero + breadcrumb */}
      <section className="relative isolate overflow-hidden bg-primary pb-14 pt-28 text-white sm:pb-16 sm:pt-36">
        <div aria-hidden className="absolute inset-0 bg-grid-soft opacity-30" />
        <div className="container relative z-10">
          <nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center gap-2 text-xs text-white/60 sm:text-sm">
            <Link href="/" className="transition-colors hover:text-white">
              Accueil
            </Link>
            <span aria-hidden>/</span>
            <Link href="/shop" className="transition-colors hover:text-white">
              Magasin
            </Link>
            <span aria-hidden>/</span>
            <span className="font-semibold text-white">{category.name}</span>
          </nav>

          <span className="kicker mt-6 block text-accent">Catégorie</span>
          <h1 className="heading-xl mt-2 max-w-3xl text-balance">{category.name}</h1>
          {category.description && (
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
              {category.description}
            </p>
          )}
        </div>
      </section>

      {/* Products */}
      <section className="bg-neutral py-14 sm:py-16">
        <div className="container">
          <p className="mb-8 text-sm font-semibold text-ink-light">
            {products.length} produit{products.length !== 1 ? "s" : ""} dans cette
            catégorie
          </p>

          {products.length === 0 ? (
            <div className="mx-auto max-w-md rounded-3xl bg-white p-10 text-center shadow-soft ring-1 ring-primary/5">
              <PackageOpen className="mx-auto h-10 w-10 text-primary/20" />
              <p className="mt-4 text-sm leading-relaxed text-ink-light">
                Aucun produit dans cette catégorie pour le moment.
              </p>
              <Link
                href="/shop"
                className="mt-4 inline-block text-sm font-bold text-primary underline-offset-4 hover:underline"
              >
                Retour au magasin
              </Link>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={i}
                  discountPercent={discountPercent}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
