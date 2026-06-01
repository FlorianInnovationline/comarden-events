import { cn } from "@/lib/utils";

const LOGO_SRC = "/images/logo.png";

const maskStyle: React.CSSProperties = {
  maskImage: `url(${LOGO_SRC})`,
  WebkitMaskImage: `url(${LOGO_SRC})`,
  maskSize: "contain",
  WebkitMaskSize: "contain",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
};

/**
 * Comarden brand logo rendered from the official PNG at /images/logo.png.
 *
 * The logo is yellow (#FFD500) on a transparent background, which reads well
 * on dark surfaces (hero, footer). Set `navy` to cross-fade to a primary-blue
 * (#002D59) version for light surfaces (scrolled header).
 */
export function Logo({
  className,
  navy = false,
}: {
  className?: string;
  navy?: boolean;
}) {
  return (
    <span className={cn("relative inline-flex", className)}>
      {/* Yellow version (visible on dark backgrounds) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={LOGO_SRC}
        alt="Comarden"
        className={cn(
          "h-full w-auto object-contain transition-opacity duration-300",
          navy && "opacity-0"
        )}
      />
      {/* Navy version via CSS mask (visible on light backgrounds) */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 bg-primary transition-opacity duration-300",
          navy ? "opacity-100" : "opacity-0"
        )}
        style={maskStyle}
      />
    </span>
  );
}
