"use client";

import { useState } from "react";
import Image from "next/image";

interface BrandLogoProps {
  name: string;
  logo: string | null;
  /** Rendered height utility for the <img> (e.g. "h-16 w-auto") */
  imgClassName?: string;
  /** Classes for the text wordmark fallback */
  textClassName?: string;
}

/**
 * Renders the brand logo, falling back to a styled text wordmark when the file
 * is missing or fails to load - so brand pages never show a broken image.
 */
export default function BrandLogo({
  name,
  logo,
  imgClassName = "h-16 w-auto object-contain",
  textClassName = "text-4xl font-extrabold tracking-tight",
}: BrandLogoProps) {
  const [failed, setFailed] = useState(false);

  if (!logo || failed) {
    return <span className={textClassName}>{name}</span>;
  }

  return (
    <Image
      src={logo}
      alt={name}
      width={320}
      height={96}
      className={imgClassName}
      onError={() => setFailed(true)}
      unoptimized
      priority
    />
  );
}
