"use client";

import { useState } from "react";
import { LOGO_EXTENSIONS, partnerLogoSrc, nextLogoSrc } from "@/lib/partners";

interface PartnerChipLogoProps {
  name: string;
}

/**
 * Tiny inline logo for partner chips (EventCard, EventTimeline).
 * Tries PNG → SVG → WEBP → JPG via onError, then hides itself if all fail.
 * Rendered at 16 px tall so it fits neatly inside the chip pill.
 */
export function PartnerChipLogo({ name }: PartnerChipLogoProps) {
  const [extIndex, setExtIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={LOGO_EXTENSIONS[extIndex]}
      src={partnerLogoSrc(name, LOGO_EXTENSIONS[extIndex])}
      alt=""
      aria-hidden
      className="h-4 w-auto object-contain"
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
