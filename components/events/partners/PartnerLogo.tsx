"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { LOGO_EXTENSIONS, partnerLogoSrc, nextLogoSrc } from "@/lib/partners";

interface PartnerLogoProps {
  name: string;
  /** Classes applied to the <img>. */
  imgClassName?: string;
  /** Classes applied to the text fallback when no logo file is found. */
  fallbackClassName?: string;
}

/**
 * Renders a partner logo from /public/images/logos/<slug>-logo.<ext>, trying
 * each extension in turn (PNG → SVG → WEBP → JPG) and falling back to the
 * partner name as text if none resolve.
 *
 * Shared by PartnerBlock and the dedicated partner sections so the resolution
 * logic lives in exactly one place.
 */
export function PartnerLogo({
  name,
  imgClassName,
  fallbackClassName,
}: PartnerLogoProps) {
  const [extIndex, setExtIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        className={cn(
          "text-xl font-extrabold tracking-tight text-primary",
          fallbackClassName
        )}
      >
        {name}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={LOGO_EXTENSIONS[extIndex]}
      src={partnerLogoSrc(name, LOGO_EXTENSIONS[extIndex])}
      alt={`Logo ${name}`}
      className={cn("h-20 max-w-[260px] object-contain", imgClassName)}
      loading="lazy"
      onError={() => {
        const next = nextLogoSrc(name, extIndex);
        if (next) {
          setExtIndex((i) => i + 1);
        } else {
          setFailed(true);
        }
      }}
    />
  );
}
