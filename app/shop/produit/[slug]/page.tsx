import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Package,
  Truck
} from "lucide-react";
import { getProductBySlug, getProducts } from "@/lib/shop/queries";
import { formatPrice, getStockStatus, parseSpec } from "@/lib/shop/utils";
import { priceBreakdown } from "@/lib/shop/discount";
import { buildVariantOptions, hasVariantPricing } from "@/lib/shop/variants";
import { ProductGallery } from "@/components/shop/ProductGallery";
import { ProductCard } from "@/components/shop/ProductCard";
import { VariantPriceProvider } from "@/components/shop/VariantPriceContext";
import { VariantSelector } from "@/components/shop/VariantSelector";
import { ProductPriceBlock } from "@/components/shop/ProductPriceBlock";
import { OrderButton } from "@/components/shop/OrderButton";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: "Produit introuvable" };
  return {
    title: product.title,
    description: product.description ?? `Découvrez ${product.title} chez Comarden.`
  };
}

export default async function ProductPage({ params }: PageProps) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const stockStatus = getStockStatus(product.stock);
  const price = priceBreakdown(product);
  const variantOptions = buildVariantOptions(product);
  const pricedVariants = hasVariantPricing(variantOptions);
  const related = product.category_id
    ? (await getProducts({ categoryId: product.category_id, active: true }))
        .filter((p) => p.id !== product.id)
        .slice(0, 4)
    : [];


  return (
    <VariantPriceProvider
      basePriceCents={product.price_cents}
      currency={product.currency}
      discountPercent={product.discount_percent ?? 0}
     
      options={variantOptions}
      pricedVariants={pricedVariants}
    >
      {/* Breadcrumb band */}
      <section className="bg-primary pb-8 pt-24 text-white sm:pt-28">
        <div className="container">
          <nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center gap-2 text-xs text-white/60 sm:text-sm">
            <Link href="/" className="transition-colors hover:text-white">
              Accueil
            </Link>
            <span aria-hidden>/</span>
            <Link href="/shop" className="transition-colors hover:text-white">
              Magasin
            </Link>
            {product.category && (
              <>
                <span aria-hidden>/</span>
                <Link
                  href={`/shop/categorie/${product.category.slug}`}
                  className="transition-colors hover:text-white"
                >
                  {product.category.name}
                </Link>
              </>
            )}
            <span aria-hidden>/</span>
            <span className="font-semibold text-white">{product.title}</span>
          </nav>
        </div>
      </section>

      {/* Product */}
      <section className="bg-white py-12 sm:py-16">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <ProductGallery
              images={product.images}
              alt={product.title}
              price={price}
              currency={product.currency}
            />

            <div className="flex flex-col gap-5">
              <div>
                {product.category && (
                  <Link
                    href={`/shop/categorie/${product.category.slug}`}
                    className="kicker text-primary-light underline-offset-4 hover:underline"
                  >
                    {product.category.name}
                  </Link>
                )}
                <h1 className="heading-lg mt-2 text-balance text-primary">
                  {product.title}
                </h1>
                {product.brand && (
                  <span className="mt-3 inline-block rounded-full bg-primary/5 px-3 py-1 text-xs font-bold uppercase tracking-kicker text-primary ring-1 ring-primary/10">
                    {product.brand}
                  </span>
                )}
              </div>

              {product.description && (
                <p className="text-sm leading-relaxed text-ink-light sm:text-base">
                  {product.description}
                </p>
              )}

              {product.warning && (
                <div className="flex items-start gap-3 rounded-2xl bg-amber-50 p-4 ring-1 ring-amber-200">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                  <p className="text-sm leading-relaxed text-amber-800">
                    {product.warning}
                  </p>
                </div>
              )}

              {/* Price + stock - follows the selected variant */}
              <ProductPriceBlock
                stockLabel={stockStatus.label}
                stockColor={stockStatus.color}
              />

              {product.sku && (
                <p className="text-sm text-ink-light">
                  Référence : <span className="font-mono font-semibold">{product.sku}</span>
                </p>
              )}

              {/* CTAs */}
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <OrderButton
                  productId={product.id}
                  productSlug={product.slug}
                  productTitle={product.title}
                  currency={product.currency}
                  priceCents={price.finalCents}
                />
                {product.lien_produit && (
                  <Button
                    href={product.lien_produit}
                    variant="outline"
                    size="md"
                    external
                    className="w-full justify-center sm:w-auto"
                  >
                    Fiche fabricant
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Reassurance */}
              <div className="mt-2 grid gap-4 border-t border-primary/10 pt-6 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <Truck className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <p className="text-sm font-bold text-primary">Retrait et livraison</p>
                    <p className="text-xs text-ink-light">Bertrix et Naninne</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <p className="text-sm font-bold text-primary">Qualité garantie</p>
                    <p className="text-xs text-ink-light">Matériaux professionnels</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specs / avantages / variantes */}
      {((product.specs?.length ?? 0) > 0 ||
        (product.avantages?.length ?? 0) > 0 ||
        (product.variants?.length ?? 0) > 0) && (
        <section className="bg-neutral py-12 sm:py-16">
          <div className="container grid gap-6 lg:grid-cols-2">
            {product.specs && product.specs.length > 0 && (
              <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-primary/5 sm:p-8">
                <h2 className="text-lg font-extrabold text-primary sm:text-xl">
                  Caractéristiques techniques
                </h2>
                <dl className="mt-4 divide-y divide-primary/5">
                  {product.specs.map((spec) => {
                    const { label, value } = parseSpec(spec);
                    return (
                      <div
                        key={spec}
                        className="flex flex-col gap-0.5 py-2.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                      >
                        <dt className="text-sm font-semibold text-primary">{label}</dt>
                        {value && (
                          <dd className="text-sm text-ink-light sm:text-right">{value}</dd>
                        )}
                      </div>
                    );
                  })}
                </dl>
              </div>
            )}

            {product.avantages && product.avantages.length > 0 && (
              <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-primary/5 sm:p-8">
                <h2 className="text-lg font-extrabold text-primary sm:text-xl">Avantages</h2>
                <ul className="mt-4 space-y-2.5">
                  {product.avantages.map((a) => (
                    <li key={a} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-light">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {variantOptions.length > 0 && (
              <div className="lg:col-span-2">
                <VariantSelector />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-white py-12 sm:py-16">
          <div className="container">
            <div className="mb-8 flex items-center gap-3">
              <Package className="h-6 w-6 text-accent" />
              <h2 className="text-xl font-extrabold text-primary sm:text-2xl">
                Produits similaires
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p, i) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  index={i}
                 
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </VariantPriceProvider>
  );
}
