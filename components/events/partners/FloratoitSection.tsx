"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Leaf } from "lucide-react";
import type { EventPartner } from "@/types/events";
import type { PartnerProfile } from "@/lib/partner-profiles";
import { ContactCard } from "@/components/events/ContactCard";
import { PartnerLogo } from "@/components/events/partners/PartnerLogo";
import { Button } from "@/components/ui/Button";

/**
 * Partner photos live in /public/images/partners/floratoit/.
 * Drop up to 2 images named 01-<desc>.jpg and 02-<desc>.jpg.
 * The component renders them automatically when present.
 */
const FLORATOIT_PHOTOS = [
  "/images/partners/floratoit/01-floratoit.jpg",
  "/images/partners/floratoit/02-floratoit.jpg",
] as const;

interface FloratoitSectionProps {
  partner: EventPartner;
  profile: PartnerProfile;
}

export function FloratoitSection({ partner, profile }: FloratoitSectionProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-primary/5"
    >
      <div className="grid sm:grid-cols-[20rem,1fr]">
        {/* ── Logo panel + photos ────────────────────────────────────────── */}
        <div className="relative flex flex-col border-b border-primary/5 bg-gradient-to-b from-green-50 to-neutral sm:border-b-0 sm:border-r">
          {/* Logo area */}
          <div className="relative flex flex-1 items-center justify-center px-8 py-10 sm:px-10">
            <span
              aria-hidden
              className="absolute left-5 top-5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-green-600/10 text-green-700"
            >
              <Leaf className="h-4 w-4" />
            </span>
            <PartnerLogo
              name={partner.name}
              imgClassName="h-24 max-w-[220px] object-contain sm:h-28 sm:max-w-[240px]"
            />
          </div>

          {/* Photo showcase — auto-hidden when images are missing */}
          <FloratoitPhotos />
        </div>

        {/* ── Content ─────────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-5 p-6 sm:p-8">
          <div>
            <span className="kicker text-green-700">Toiture végétale</span>
            <h3 className="mt-1.5 text-xl font-extrabold text-primary sm:text-2xl">
              {partner.name}
            </h3>
          </div>

          <p className="text-sm leading-relaxed text-ink-light sm:text-base">
            {partner.recap}
          </p>

          {(partner.contactName || partner.contactEmail) && (
            <ContactCard
              name={partner.contactName ?? "Contact"}
              email={partner.contactEmail ?? ""}
              org={partner.name}
            />
          )}

          {profile.showWebsiteButton && partner.website && (
            <div className="mt-auto pt-1">
              <Button
                href={partner.website}
                variant="primary"
                size="sm"
                external
              >
                Visiter le site
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/**
 * Renders 2 partner photos in a tight mosaic.
 * Each image gracefully hides itself on load error (file not yet uploaded).
 * When both are missing the entire block collapses to zero height.
 */
function FloratoitPhotos() {
  const [visible, setVisible] = useState<boolean[]>(
    () => FLORATOIT_PHOTOS.map(() => true)
  );

  const anyVisible = visible.some(Boolean);
  if (!anyVisible) return null;

  return (
    <div className="grid grid-cols-2 gap-1.5 px-4 pb-4">
      {FLORATOIT_PHOTOS.map((src, i) =>
        visible[i] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt={`Floratoit — photo ${i + 1}`}
            className="aspect-[4/3] w-full rounded-xl object-cover shadow-soft"
            loading="lazy"
            onError={() =>
              setVisible((prev) => {
                const next = [...prev];
                next[i] = false;
                return next;
              })
            }
          />
        ) : null
      )}
    </div>
  );
}
