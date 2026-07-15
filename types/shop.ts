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
  lien_produit?: string;
  warning?: string;
  created_at: string;
  updated_at: string;
  category?: Category;
}
