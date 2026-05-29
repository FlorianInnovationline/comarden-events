"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { EventPartner } from "@/types/events";
import { ContactCard } from "@/components/events/ContactCard";
import { Button } from "@/components/ui/Button";
import { LOGO_EXTENSIONS, partnerLogoSrc, nextLogoSrc } from "@/lib/partners";

export function PartnerBlock({ partner }: { partner: EventPartner }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-primary/5"
    >
      {/* Logo strip */}
      <PartnerLogo name={partner.name} />

      {/* Content */}
      <div className="flex flex-1 flex-col gap-5 p-5 sm:p-6">
        <div>
          <h3 className="text-lg font-extrabold text-primary sm:text-xl">
            {partner.name}
          </h3>
          <p className="mt-2.5 text-sm leading-relaxed text-ink-light sm:text-base">
            {partner.recap}
          </p>
        </div>

        {(partner.contactName || partner.contactEmail) && (
          <ContactCard
            name={partner.contactName ?? "Contact"}
            email={partner.contactEmail ?? ""}
            org={partner.name}
          />
        )}

        {partner.website && (
          <div className="mt-auto pt-1">
            <Button href={partner.website} variant="primary" size="sm" external>
              Visiter le site
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function PartnerLogo({ name }: { name: string }) {
  const [extIndex, setExtIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  return (
    <div className="flex h-36 shrink-0 items-center justify-center border-b border-primary/5 bg-neutral px-8 py-6">
      {failed ? (
        <div className="flex h-full w-full items-center justify-center rounded-xl border-2 border-dashed border-primary/15">
          {/* No logo file found — drop one at /public/images/logos/<slug>-logo.<ext> */}
          <span className="text-xl font-extrabold tracking-tight text-primary">
            {name}
          </span>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={LOGO_EXTENSIONS[extIndex]}
          src={partnerLogoSrc(name, LOGO_EXTENSIONS[extIndex])}
          alt={`Logo ${name}`}
          className="h-20 max-w-[260px] object-contain"
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
      )}
    </div>
  );
}
