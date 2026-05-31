import { cn } from "@/lib/utils";

/**
 * Comarden brand logo rendered from the official PNG at /images/logo.png.
 *
 * The logo is yellow (#FFD500) on a transparent background, which reads well
 * on dark surfaces (hero, footer). On light surfaces (scrolled header), pass
 * `brightness-0` via className to render it as a dark silhouette.
 */
export function Logo({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/logo.png"
      alt="Comarden"
      className={cn("h-7 w-auto object-contain", className)}
    />
  );
}
