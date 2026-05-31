/**
 * lib/partner-profiles.ts — editorial data for the dedicated partner sections.
 *
 * Each event partner (see lib/events.ts) is matched to a richer "profile" here,
 * keyed by the partner's slug (derived from its display name via nameToSlug).
 * The profile drives the bespoke layouts:
 *   - ELEVATE  → rich section (documents list, PFAS note, cahier des charges CTA)
 *   - FLORATOIT → slim spotlight section (website button only)
 *
 * Partners with no profile fall back to the generic <PartnerBlock />.
 *
 * ── ADDING A DOCUMENT ────────────────────────────────────────────────────────
 *  1. Add a PartnerDocument entry below with the EXACT filename you will upload.
 *  2. Drop the PDF in public/documents/<slug>/ (e.g. public/documents/elevate/).
 *  3. Commit it. On the next build the "Télécharger" button activates
 *     automatically — until the file exists, the row shows "Bientôt disponible".
 *
 * This file is plain data (no fs, no server-only) so it can be imported from
 * both server and client components. The actual file-presence check lives in
 * lib/partner-documents.ts (server-only).
 */

import { nameToSlug } from "@/lib/partners";

/** A downloadable document offered by a partner. */
export interface PartnerDocument {
  /** Exact filename expected under public/documents/<slug>/. */
  filename: string;
  /** Human-readable title shown in the documents list. */
  title: string;
  /** Optional one-line description shown under the title. */
  description?: string;
  /** Optional audience hint (e.g. "Valable pour Architectes & Couvreurs"). */
  audienceNote?: string;
}

/** Collapsible informational note (used for the PFAS explainer). */
export interface PartnerInfoNote {
  title: string;
  body: string;
}

/** A call-to-action that links out to an external partner service. */
export interface PartnerExternalCta {
  eyebrow: string;
  title: string;
  body: string;
  buttonLabel: string;
  href: string;
}

/** Full editorial profile for a partner. */
export interface PartnerProfile {
  /** Canonical display name. */
  name: string;
  /** Folder slug under public/documents/ and the profile key. */
  slug: string;
  /** Downloadable documents (may be empty). */
  documents: PartnerDocument[];
  /** Optional collapsible info note (PFAS explainer for ELEVATE). */
  infoNote?: PartnerInfoNote;
  /** Optional external service CTA (cahier des charges for ELEVATE). */
  externalCta?: PartnerExternalCta;
  /** Whether to render the partner's website button (from event data). */
  showWebsiteButton: boolean;
}

const PARTNER_PROFILES: Record<string, PartnerProfile> = {
  elevate: {
    name: "ELEVATE",
    slug: "elevate",
    documents: [
      {
        filename: "01-test-longevite-membranes-epdm-elevate.pdf",
        title: "Test de longévité des membranes EPDM ELEVATE",
        audienceNote: "Valable pour Architectes & Couvreurs",
      },
      {
        filename: "02-demande-calcul-charge-vent-epdm-elevate.pdf",
        title: "Demande de calcul de charge due au vent",
        description: "EPDM Elevate.",
      },
      {
        filename: "03-certifications-fm-elevate-resista-ak-rf.pdf",
        title: "Certifications FM (soulèvement au vent)",
        description: "Elevate RESISTA AK-RF.",
      },
      {
        filename: "04-attestation-fabricant-pfas-epdm-elevate.pdf",
        title: "Attestation fabricant : absence d'ajout intentionnel de PFAS",
        description: "EPDM ELEVATE.",
      },
      {
        filename: "05-membrane-epdm-rubbergard-eau-pluie-domestique.pdf",
        title:
          "Membrane EPDM RubberGard : eau de pluie conforme à un usage domestique",
      },
      {
        filename: "06-elevate-firescreen-sa-protection-feu-tpo.pdf",
        title:
          "Elevate Firescreen SA : protection feu autocollante pour toiture TPO",
      },
    ],
    infoNote: {
      title: "Qu'est-ce que les PFAS ?",
      body:
        "Les PFAS (de l'anglais per- and polyfluoroalkyl substances, soit " +
        "« substances per- et polyfluoroalkylées ») sont une grande famille de " +
        "plusieurs milliers de composés chimiques fabriqués par l'homme, réputés " +
        "très persistants dans l'environnement.",
    },
    externalCta: {
      eyebrow: "Cahier des charges",
      title:
        "Générez votre cahier des charges directement sur le site d'ELEVATE",
      body:
        "Obtenez des descriptifs techniques adaptés à votre chantier. Un " +
        "véritable gain de temps.",
      buttonLabel: "Accéder au service",
      href: "https://buildingandroofmanagement.be/fr/service-de-cahier-des-charges-2/",
    },
    showWebsiteButton: false,
  },
  floratoit: {
    name: "FLORATOIT",
    slug: "floratoit",
    documents: [],
    showWebsiteButton: true,
  },
};

/**
 * Returns the editorial profile for a partner by name (case-insensitive),
 * or undefined if the partner has no dedicated profile.
 */
export function getPartnerProfile(
  partnerName: string
): PartnerProfile | undefined {
  return PARTNER_PROFILES[nameToSlug(partnerName)];
}
