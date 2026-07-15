// Image URL resolution for catalog products (shared by card + gallery).
//
// The shared DB stores two kinds of image entries:
//   - absolute Supabase Storage URLs (https://<ref>.supabase.co/storage/...)
//     -> usable everywhere, including this site
//   - legacy local paths ("/images/products/<slug>/...") that only exist in
//     the MAIN site's public folder -> would 404 here, so they are dropped.

export function usableProductImages(images: string[] | undefined | null): string[] {
  return (images ?? [])
    .map((s) => (typeof s === "string" ? s.trim() : ""))
    .filter((s) => s.startsWith("https://") || s.startsWith("http://"));
}
