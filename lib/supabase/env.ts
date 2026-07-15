// ============================================================================
// Supabase env-var resolver - single source of truth.
// ----------------------------------------------------------------------------
// This site is a READ-ONLY consumer of the shared Comarden catalog: only the
// public URL + anon key are ever used. There is deliberately NO service-role
// accessor here - this repo must never hold write credentials.
// ============================================================================

export function getSupabaseUrl(): string | null {
  // Static literal access is REQUIRED: Next.js only inlines
  // `process.env.NEXT_PUBLIC_*` into the client bundle when referenced
  // literally. Dynamic access (process.env[KEY]) is undefined in the browser.
  const v = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return v && v.length > 0 ? v : null;
}

export function getSupabaseAnonKey(): string | null {
  const v = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return v && v.length > 0 ? v : null;
}

/** True iff both NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set. */
export function isSupabaseConfigured(): boolean {
  return getSupabaseUrl() !== null && getSupabaseAnonKey() !== null;
}
