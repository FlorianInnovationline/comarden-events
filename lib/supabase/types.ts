// ============================================================================
// Supabase `Database` type - shared Comarden catalog, READ-ONLY subset.
// ----------------------------------------------------------------------------
// Copied from the main Comarden repo (lib/supabase/types.ts) and trimmed to
// the two tables this site reads: `categories` and `products`. The column
// shapes MUST stay identical to the main site's schema - if the main repo
// regenerates its types, mirror the changes here.
// ============================================================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      promotions: {
        Row: {
          id: string;
          title: string;
          code: string | null;
          description: string | null;
          discount_type: "percent" | "fixed";
          discount_value: number;
          starts_at: string | null;
          ends_at: string | null;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          code?: string | null;
          description?: string | null;
          discount_type: "percent" | "fixed";
          discount_value: number;
          starts_at?: string | null;
          ends_at?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          code?: string | null;
          description?: string | null;
          discount_type?: "percent" | "fixed";
          discount_value?: number;
          starts_at?: string | null;
          ends_at?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      products: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string | null;
          price_cents: number;
          currency: string;
          sku: string | null;
          stock: number;
          is_active: boolean;
          category_id: string | null;
          images: Json;
          tags: string[];
          brand: string | null;
          specs: string[] | null;
          avantages: string[] | null;
          variants: string[] | null;
          variant_prices: Json | null;
          discount_percent: number | null;
          lien_produit: string | null;
          warning: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description?: string | null;
          price_cents?: number;
          currency?: string;
          sku?: string | null;
          stock?: number;
          is_active?: boolean;
          category_id?: string | null;
          images?: Json;
          tags?: string[];
          brand?: string | null;
          specs?: string[] | null;
          avantages?: string[] | null;
          variants?: string[] | null;
          variant_prices?: Json | null;
          discount_percent?: number | null;
          lien_produit?: string | null;
          warning?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string | null;
          price_cents?: number;
          currency?: string;
          sku?: string | null;
          stock?: number;
          is_active?: boolean;
          category_id?: string | null;
          images?: Json;
          tags?: string[];
          brand?: string | null;
          specs?: string[] | null;
          avantages?: string[] | null;
          variants?: string[] | null;
          variant_prices?: Json | null;
          discount_percent?: number | null;
          lien_produit?: string | null;
          warning?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
}
