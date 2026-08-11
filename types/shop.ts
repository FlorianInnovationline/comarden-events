// Shared Comarden catalog types - read-only subset (no orders/cart/promotions).

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description?: string;
  price_cents: number;
  currency: string;
  sku?: string;
  stock: number;
  is_active: boolean;
  category_id?: string;
  images: string[];
  tags?: string[];
  brand?: string;
  specs?: string[];
  avantages?: string[];
  variants?: string[];
  /** Optional price in cents per variant label. Keys match `variants` entries. */
  variant_prices?: Record<string, number>;
  /** Discount applied to this product, in whole percent (1-100). 0 = none. */
  discount_percent?: number;
  lien_produit?: string;
  warning?: string;
  created_at: string;
  updated_at: string;
  category?: Category;
}
