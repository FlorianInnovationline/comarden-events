"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { EventPartner } from "@/types/events";
import { ContactCard } from "@/components/events/ContactCard";
import { Button } from "@/components/ui/Button";

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
      <PartnerLogo name={partner.name} logo={partner.logo} />

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

function PartnerLogo({ name, logo }: { name: string; logo?: string }) {
  return (
    <div className="flex h-28 shrink-0 items-center justify-center border-b border-primary/5 bg-neutral p-6">
      {logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logo}
          alt={`Logo ${name}`}
          className="h-14 max-w-[180px] object-contain"
          loading="lazy"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-xl border-2 border-dashed border-primary/15">
          {/* TODO: replace with real logo — drop SVG at /public/images/partners/<name>.svg */}
          <span className="text-xl font-extrabold tracking-tight text-primary">
            {name}
          </span>
        </div>
      )}
    </div>
  );
}
