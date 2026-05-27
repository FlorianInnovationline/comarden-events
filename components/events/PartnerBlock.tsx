"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { EventPartner } from "@/types/events";
import { ContactCard } from "@/components/events/ContactCard";
import { Button } from "@/components/ui/Button";

export function PartnerBlock({ partner }: { partner: EventPartner }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-2xl bg-white p-5 shadow-soft ring-1 ring-primary/5 sm:p-8 lg:p-10"
    >
      <span
        aria-hidden
        className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-accent/10 blur-2xl"
      />
      <div className="relative flex flex-col gap-5 md:flex-row md:items-start md:gap-10">
        <div className="flex w-full shrink-0 items-center md:w-48">
          <PartnerLogo name={partner.name} />
        </div>
        <div className="flex-1 space-y-4 sm:space-y-5">
          <h3 className="heading-md text-primary">{partner.name}</h3>
          <p className="text-sm leading-relaxed text-ink-light sm:text-base">{partner.recap}</p>

          {partner.website && (
            <Button href={partner.website} variant="primary" size="sm" external>
              Visiter le site
              <ExternalLink className="h-4 w-4" />
            </Button>
          )}

          {(partner.contactName || partner.contactEmail) && (
            <ContactCard
              name={partner.contactName ?? "Contact"}
              email={partner.contactEmail ?? ""}
              org={partner.name}
            />
          )}
        </div>
      </div>
    </motion.section>
  );
}

function PartnerLogo({ name }: { name: string }) {
  // TODO: drop the real partner logo SVGs into /public/images/partners/ and
  // wire them up here. For now we render a clean text-based badge placeholder.
  return (
    <div className="flex h-24 w-full items-center justify-center rounded-xl border-2 border-dashed border-primary/15 bg-neutral text-primary">
      <span className="text-lg font-extrabold tracking-tight">{name}</span>
    </div>
  );
}
