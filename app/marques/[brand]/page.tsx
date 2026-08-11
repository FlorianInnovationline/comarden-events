import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import { getBrand } from "@/lib/brands/config";
import { getProducts, getGlobalDiscountPercent } from "@/lib/shop/queries";
import type { Product } from "@/types/shop";
import BrandHero from "@/components/marques/BrandHero";
import BrandAbout from "@/components/marques/BrandAbout";
import BrandFeatures from "@/components/marques/BrandFeatures";
import BrandProductCarousel from "@/components/marques/BrandProductCarousel";
import BrandCTA from "@/components/marques/BrandCTA";
import BrandStory from "@/components/marques/BrandStory";
import BrandUseCases from "@/components/marques/BrandUseCases";
import BrandOrigin from "@/components/marques/BrandOrigin";
import BrandNotice from "@/components/marques/BrandNotice";

// Live catalog: products come from the shared DB on every request.
export const dynamic = "force-dynamic";

interface PageProps {
  params: { brand: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const brand = getBrand(params.brand);
  if (!brand) return { title: "Marque introuvable" };
  return {
    title: brand.name,
    description: brand.heroPitch
  };
}

/** Fetch products whose brand matches (case-insensitive, trimmed). */
async function fetchBrandProducts(productBrand: string | null): Promise<Product[]> {
  if (!productBrand) return [];
  const target = productBrand.trim().toLowerCase();
  const all = await getProducts({ active: true });
  return all.filter((p) => (p.brand ?? "").trim().toLowerCase() === target);
}

export default async function BrandPage({ params }: PageProps) {
  const brand = getBrand(params.brand);
  if (!brand) notFound();

  const [products, discountPercent] = await Promise.all([
    fetchBrandProducts(brand.productBrand),
    getGlobalDiscountPercent()
  ]);

  const brandVars = {
    "--brand-primary": brand.colors.primary,
    "--brand-dark": brand.colors.dark,
    "--brand-accent": brand.colors.accent,
    "--brand-bg": brand.colors.bg,
    "--brand-on-primary": brand.colors.onPrimary
  } as CSSProperties;

  return (
    <div style={brandVars} className="bg-[var(--brand-bg)]">
      <BrandHero brand={brand} />
      <BrandAbout brand={brand} />
      <BrandFeatures brand={brand} />
      <BrandProductCarousel
        brand={brand}
        products={products}
        discountPercent={discountPercent}
      />
      {brand.origin && <BrandOrigin brand={brand} />}
      {brand.story && <BrandStory brand={brand} />}
      {brand.useCases && <BrandUseCases brand={brand} />}
      {brand.notice && <BrandNotice brand={brand} />}
      <BrandCTA brand={brand} />
    </div>
  );
}
