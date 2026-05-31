"use client";

import { motion } from "framer-motion";
import { ExternalLink, Leaf } from "lucide-react";
import type { EventPartner } from "@/types/events";
import type { PartnerProfile } from "@/lib/partner-profiles";
import { ContactCard } from "@/components/events/ContactCard";
import { PartnerLogo } from "@/components/events/partners/PartnerLogo";
import { Button } from "@/components/ui/Button";

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
      <div className="grid sm:grid-cols-[16rem,1fr]">
        {/* ── Logo panel ──────────────────────────────────────────────────── */}
        <div className="relative flex items-center justify-center border-b border-primary/5 bg-gradient-to-b from-green-50 to-neutral px-8 py-10 sm:border-b-0 sm:border-r sm:px-10">
          <span
            aria-hidden
            className="absolute left-5 top-5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-green-600/10 text-green-700"
          >
            <Leaf className="h-4 w-4" />
          </span>
          <PartnerLogo
            name={partner.name}
            imgClassName="h-16 max-w-[190px] object-contain"
          />
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
