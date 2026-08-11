// ============================================================================
// Catalog data access - READ-ONLY.
// ----------------------------------------------------------------------------
// Reads the shared Comarden catalog (same Supabase project as the main site).
// Pure SELECTs: this module must never contain an insert/update/delete.
// If Supabase env vars are missing, every read returns empty data with a
// console warning so the site still builds and renders.
//
// SERVER-ONLY: keeps the query surface out of the client bundle.
// ============================================================================

import "server-only";
import { getSupabaseClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";
import type { Category, Product } from "@/types/shop";

type CategoryRow = Database["public"]["Tables"]["categories"]["Row"];
type ProductRow = Database["public"]["Tables"]["products"]["Row"];
type ProductRowWithCategory = ProductRow & { category?: CategoryRow | null };

function warnNotConfigured(fn: string): void {
  console.warn(
    `[shop] ${fn}: Supabase non configuré (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY manquants) - catalogue vide.`
  );
}

// ----- mappers ---------------------------------------------------------------
// Translate Postgres row shape -> types/shop.ts shape. Mostly identity; the
// main difference is `images` (jsonb -> string[]) and the joined category.

function toStringArray(v: unknown): string[] {
  if (Array.isArray(v)) return v.filter((x): x is string => typeof x === "string");
  if (typeof v === "string") {
    try {
      const parsed: unknown = JSON.parse(v);
      return Array.isArray(parsed)
        ? parsed.filter((x): x is string => typeof x === "string")
        : [];
    } catch {
      return [];
    }
  }
  return [];
}

/**
 * Parses the `variant_prices` jsonb into a label -> cents map.
 * Returns undefined when the product has no per-variant pricing, which means
 * every variant simply uses the product's own price.
 */
function toPriceMap(v: unknown): Record<string, number> | undefined {
  if (!v || typeof v !== "object" || Array.isArray(v)) return undefined;
  const out: Record<string, number> = {};
  for (const [label, value] of Object.entries(v as Record<string, unknown>)) {
    const cents = typeof value === "string" ? Number(value) : value;
    if (typeof cents === "number" && Number.isFinite(cents) && cents >= 0) {
      out[label] = Math.round(cents);
    }
  }
  return Object.keys(out).length > 0 ? out : undefined;
}

function mapCategory(r: CategoryRow): Category {
  return {
    id: r.id,
    name: r.name,
    slug: r.slug,
    description: r.description ?? undefined,
    image_url: r.image_url ?? undefined,
    created_at: r.created_at,
    updated_at: r.updated_at
  };
}

function mapProduct(r: ProductRowWithCategory): Product {
  const cat = r.category ?? null;
  return {
    id: r.id,
    title: r.title,
    slug: r.slug,
    description: r.description ?? undefined,
    price_cents: r.price_cents,
    currency: r.currency,
    sku: r.sku ?? undefined,
    stock: r.stock,
    is_active: r.is_active,
    category_id: r.category_id ?? undefined,
    images: toStringArray(r.images),
    tags: r.tags ?? [],
    brand: r.brand ?? undefined,
    specs: r.specs ?? undefined,
    avantages: r.avantages ?? undefined,
    variants: r.variants ?? undefined,
    variant_prices: toPriceMap(r.variant_prices),
    discount_percent:
      typeof r.discount_percent === "number" && r.discount_percent > 0
        ? r.discount_percent
        : undefined,
    lien_produit: r.lien_produit ?? undefined,
    warning: r.warning ?? undefined,
    created_at: r.created_at,
    updated_at: r.updated_at,
    category: cat ? mapCategory(cat) : undefined
  };
}

// ===========================================================================
// Categories
// ===========================================================================
export async function getCategories(): Promise<Category[]> {
  const sb = getSupabaseClient();
  if (!sb) {
    warnNotConfigured("getCategories");
    return [];
  }

  const { data, error } = await sb
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("[shop] getCategories error:", error.message);
    return [];
  }
  return (data ?? []).map(mapCategory);
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const sb = getSupabaseClient();
  if (!sb) {
    warnNotConfigured("getCategoryBySlug");
    return null;
  }

  const { data, error } = await sb
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("[shop] getCategoryBySlug error:", error.message);
    return null;
  }
  return data ? mapCategory(data) : null;
}

// ===========================================================================
// Products
// ===========================================================================
export interface ProductFilters {
  categoryId?: string;
  active?: boolean;
  search?: string;
}

export async function getProducts(filters?: ProductFilters): Promise<Product[]> {
  const sb = getSupabaseClient();
  if (!sb) {
    warnNotConfigured("getProducts");
    return [];
  }

  let query = sb
    .from("products")
    .select("*, category:categories(*)")
    .order("created_at", { ascending: false });

  if (filters?.categoryId) query = query.eq("category_id", filters.categoryId);
  if (filters?.active !== undefined) query = query.eq("is_active", filters.active);
  if (filters?.search) {
    const q = filters.search.replace(/[%_]/g, (m) => `\\${m}`);
    query = query.or(`title.ilike.%${q}%,description.ilike.%${q}%`);
  }

  const { data, error } = await query;
  if (error) {
    console.error("[shop] getProducts error:", error.message);
    return [];
  }
  return (data ?? []).map((r) => mapProduct(r as ProductRowWithCategory));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const sb = getSupabaseClient();
  if (!sb) {
    warnNotConfigured("getProductBySlug");
    return null;
  }

  const { data, error } = await sb
    .from("products")
    .select("*, category:categories(*)")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("[shop] getProductBySlug error:", error.message);
    return null;
  }
  return data ? mapProduct(data as ProductRowWithCategory) : null;
}
