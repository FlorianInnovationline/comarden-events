"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, PackageSearch, X } from "lucide-react";
import type { Product } from "@/types/shop";
import { ProductCard } from "@/components/shop/ProductCard";
import { getBrand, getBrandSlugForProductBrand } from "@/lib/brands/config";
import { cn } from "@/lib/utils";

interface ShopCatalogProps {
  products: Product[];
}

/** Nicely-cased label for a raw products.brand value (e.g. "MG BOUW" -> "MG Bouw"). */
function brandLabel(raw: string): string {
  const slug = getBrandSlugForProductBrand(raw);
  if (slug) {
    const b = getBrand(slug);
    if (b) return b.name;
  }
  return raw
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Client-side catalog: instant text search + brand filter over the full product
 * list. All filtering happens in the browser, so it stays snappy with no extra
 * requests. The product data itself is fetched live server-side.
 */
export function ShopCatalog({ products }: ShopCatalogProps) {
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState<string>("all");

  // Distinct brands present, with product counts, sorted by label.
  const brands = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of products) {
      const b = (p.brand ?? "").trim();
      if (b) counts.set(b, (counts.get(b) ?? 0) + 1);
    }
    return [...counts.entries()]
      .map(([value, count]) => ({ value, count, label: brandLabel(value) }))
      .sort((a, b) => a.label.localeCompare(b.label, "fr"));
  }, [products]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (brand !== "all" && (p.brand ?? "").trim() !== brand) return false;
      if (!q) return true;
      const haystack = [
        p.title,
        p.description ?? "",
        p.brand ?? "",
        p.sku ?? "",
        ...(p.tags ?? [])
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [products, query, brand]);

  const hasFilter = query.trim() !== "" || brand !== "all";

  return (
    <div>
      {/* Toolbar */}
      <div className="mx-auto mb-8 max-w-3xl">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-light/50" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un produit, une référence, une marque..."
            className="w-full rounded-full bg-white py-3.5 pl-12 pr-11 text-sm text-primary shadow-soft ring-1 ring-primary/10 placeholder:text-ink-light/50 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Effacer la recherche"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-ink-light/60 transition-colors hover:bg-primary/5 hover:text-primary"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Brand filter chips */}
      <div className="mb-4 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-kicker text-ink-light/60">
        <SlidersHorizontal className="h-3.5 w-3.5" />
        Filtrer par marque
      </div>
      <div className="mb-10 flex flex-wrap justify-center gap-2 sm:mb-12">
        <FilterChip
          active={brand === "all"}
          onClick={() => setBrand("all")}
          label="Toutes les marques"
          count={products.length}
        />
        {brands.map((b) => (
          <FilterChip
            key={b.value}
            active={brand === b.value}
            onClick={() => setBrand(b.value)}
            label={b.label}
            count={b.count}
          />
        ))}
      </div>

      {/* Results */}
      <p className="mb-6 text-center text-sm font-semibold text-ink-light">
        {filtered.length} produit{filtered.length !== 1 ? "s" : ""}
        {hasFilter && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setBrand("all");
            }}
            className="ml-3 text-primary underline-offset-4 hover:underline"
          >
            Réinitialiser
          </button>
        )}
      </p>

      {filtered.length === 0 ? (
        <div className="mx-auto max-w-md rounded-3xl bg-white p-10 text-center shadow-soft ring-1 ring-primary/5">
          <PackageSearch className="mx-auto h-10 w-10 text-primary/20" />
          <p className="mt-4 text-sm leading-relaxed text-ink-light">
            Aucun produit ne correspond à votre recherche.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
  count
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition-all",
        active
          ? "bg-primary text-white shadow-soft"
          : "bg-white text-primary ring-1 ring-primary/10 hover:ring-primary/30"
      )}
    >
      {label}
      <span
        className={cn(
          "rounded-full px-1.5 py-0.5 text-[0.65rem] font-bold tabular-nums",
          active ? "bg-white/20 text-white" : "bg-primary/5 text-ink-light"
        )}
      >
        {count}
      </span>
    </button>
  );
}
