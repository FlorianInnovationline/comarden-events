"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronDown,
  Clock,
  Download,
  FileText,
  Info,
} from "lucide-react";
import type { EventPartner } from "@/types/events";
import type {
  PartnerDocument,
  PartnerInfoNote,
  PartnerProfile,
} from "@/lib/partner-profiles";
import { ContactCard } from "@/components/events/ContactCard";
import { PartnerLogo } from "@/components/events/partners/PartnerLogo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface ElevateSectionProps {
  partner: EventPartner;
  profile: PartnerProfile;
  /** Filenames actually present in public/documents/elevate/ (build-time scan). */
  availableDocuments: string[];
}

export function ElevateSection({
  partner,
  profile,
  availableDocuments,
}: ElevateSectionProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-primary/5"
    >
      {/* ── Header strip ──────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary-dark px-6 py-8 sm:px-8 sm:py-10">
        <div
          aria-hidden
          className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/20 blur-3xl"
        />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
          <div className="flex h-20 w-44 shrink-0 items-center justify-center rounded-2xl bg-white px-5 shadow-sm">
            <PartnerLogo
              name={partner.name}
              imgClassName="max-h-12 max-w-[150px] object-contain"
              fallbackClassName="text-lg"
            />
          </div>
          <div className="min-w-0">
            <span className="kicker text-accent">Partenaire technique</span>
            <h3 className="mt-1.5 text-2xl font-extrabold text-white sm:text-3xl">
              {partner.name}
            </h3>
          </div>
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-7 p-6 sm:p-8 lg:p-10">
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

        {profile.documents.length > 0 && (
          <div>
            <div className="flex items-center gap-2.5">
              <FileText className="h-5 w-5 shrink-0 text-primary" />
              <h4 className="text-base font-extrabold text-primary sm:text-lg">
                Documents techniques
              </h4>
            </div>
            <ul className="mt-4 space-y-3">
              {profile.documents.map((doc) => (
                <DocumentRow
                  key={doc.filename}
                  doc={doc}
                  slug={profile.slug}
                  available={availableDocuments.includes(doc.filename)}
                />
              ))}
            </ul>
          </div>
        )}

        {profile.infoNote && <InfoNoteCard note={profile.infoNote} />}

        {profile.externalCta && (
          <div className="relative overflow-hidden rounded-2xl bg-primary p-5 text-white sm:p-6">
            <div
              aria-hidden
              className="absolute -bottom-12 -right-10 h-40 w-40 rounded-full bg-accent/15 blur-3xl"
            />
            <div className="relative">
              <span className="kicker text-accent">
                {profile.externalCta.eyebrow}
              </span>
              <h4 className="mt-2 text-lg font-extrabold sm:text-xl">
                {profile.externalCta.title}
              </h4>
              <p className="mt-2 max-w-xl text-sm text-white/80">
                {profile.externalCta.body}
              </p>
              <div className="mt-5">
                <Button
                  href={profile.externalCta.href}
                  variant="secondary"
                  size="sm"
                  external
                >
                  {profile.externalCta.buttonLabel}
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {profile.showWebsiteButton && partner.website && (
          <div>
            <Button href={partner.website} variant="primary" size="sm" external>
              Visiter le site
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </motion.article>
  );
}

function DocumentRow({
  doc,
  slug,
  available,
}: {
  doc: PartnerDocument;
  slug: string;
  available: boolean;
}) {
  return (
    <li className="flex flex-col gap-3 rounded-2xl border border-primary/10 bg-neutral p-4 transition hover:border-accent/40 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-5">
      <div className="min-w-0">
        <p className="text-sm font-bold text-primary sm:text-base">
          {doc.title}
        </p>
        {doc.description && (
          <p className="mt-0.5 text-xs text-ink-light sm:text-sm">
            {doc.description}
          </p>
        )}
        {doc.audienceNote && (
          <span className="mt-2 inline-flex items-center rounded-full bg-primary/5 px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-kicker text-primary/70">
            {doc.audienceNote}
          </span>
        )}
      </div>

      {available ? (
        <a
          href={`/documents/${slug}/${doc.filename}`}
          download
          target="_blank"
          rel="noopener"
          className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-primary-light hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          <Download className="h-4 w-4" />
          Télécharger
        </a>
      ) : (
        <span
          aria-disabled
          className="inline-flex min-h-[44px] shrink-0 cursor-not-allowed items-center justify-center gap-2 rounded-full border border-primary/15 px-5 py-2.5 text-sm font-semibold text-ink-light/70"
        >
          <Clock className="h-4 w-4" />
          Bientôt disponible
        </span>
      )}
    </li>
  );
}

function InfoNoteCard({ note }: { note: PartnerInfoNote }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <div className="rounded-2xl border border-accent/30 bg-accent/5 p-4 sm:p-5">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex min-h-[44px] w-full items-center justify-between gap-3 text-left"
      >
        <span className="inline-flex items-center gap-2 text-sm font-bold text-primary sm:text-base">
          <Info className="h-4 w-4 shrink-0 text-accent-dark" />
          {note.title}
        </span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-primary transition-transform duration-300",
            open && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: reduce ? 0.001 : 0.32,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="overflow-hidden"
          >
            <p className="pt-3 text-sm leading-relaxed text-ink-light">
              {note.body}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
