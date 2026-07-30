// ============================================================================
// Shared read-only Supabase client for the Comarden catalog.
// ----------------------------------------------------------------------------
// This site has no auth and performs no writes, so a plain anon-key client is
// enough - no @supabase/ssr, no cookies, no middleware. Safe to call from
// Server Components and Client Components alike. Singleton per runtime.
// ============================================================================

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseUrl, getSupabaseAnonKey } from "@/lib/supabase/env";
import type { Database } from "@/lib/supabase/types";

let cached: SupabaseClient<Database> | null = null;

/** Returns the shared catalog client, or null when env vars are not set. */
export function getSupabaseClient(): SupabaseClient<Database> | null {
  if (cached) return cached;
  const url = getSupabaseUrl();
  const anonKey = getSupabaseAnonKey();
  if (!url || !anonKey) return null;
  cached = createClient<Database>(url, anonKey, {
    auth: {
      // No sessions on this site - skip token persistence entirely.
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    },
    global: {
      // Next.js patches global fetch and stores GET responses in its Data
      // Cache indefinitely. Since we mirror a live shared catalog, that means
      // deleted/edited products would keep showing until the cache expires.
      // Force every catalog request to bypass the Data Cache so reads are
      // always live (the pages are already force-dynamic).
      fetch: (input, init) => fetch(input, { ...init, cache: "no-store" })
    }
  });
  return cached;
}
