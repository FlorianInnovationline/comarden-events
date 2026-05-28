/**
 * Partner logo auto-resolution helpers.
 *
 * Logos live in /public/images/logos/ and follow the naming convention:
 *   <slug>-logo.<ext>
 *
 * The slug is derived from the partner name: lowercase, accents stripped,
 * non-alphanumeric chars → hyphens, leading/trailing hyphens trimmed.
 *
 * Extension fallback order (tried client-side via onError): PNG → SVG → WEBP → JPG.
 */

/** Extensions tried in order, starting from the most likely. */
export const LOGO_EXTENSIONS = ["png", "svg", "webp", "jpg"] as const;
export type LogoExtension = (typeof LOGO_EXTENSIONS)[number];

/**
 * Convert a partner name to the logo slug used in the filename.
 *
 * Examples:
 *   "ELEVATE"     → "elevate"
 *   "FLORATOIT"   → "floratoit"
 *   "Iko Belgium" → "iko-belgium"
 *   "Siplast S.A."→ "siplast-sa"
 */
export function nameToSlug(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip combining accents
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")    // non-alphanumeric → hyphen
    .replace(/^-+|-+$/g, "");        // trim leading/trailing hyphens
}

/**
 * Return the first URL to try for a partner logo.
 * Subsequent URLs (after onError) are obtained by calling `nextLogoSrc`.
 */
export function partnerLogoSrc(
  name: string,
  ext: LogoExtension = LOGO_EXTENSIONS[0]
): string {
  return `/images/logos/${nameToSlug(name)}-logo.${ext}`;
}

/**
 * Given the current extension index, return the src for the next fallback,
 * or `null` if all extensions have been tried.
 */
export function nextLogoSrc(
  name: string,
  currentIndex: number
): string | null {
  const nextIndex = currentIndex + 1;
  if (nextIndex >= LOGO_EXTENSIONS.length) return null;
  return partnerLogoSrc(name, LOGO_EXTENSIONS[nextIndex]);
}
