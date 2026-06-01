export interface EventPartner {
  name: string;
  logo?: string;
  recap: string;
  contactName?: string;
  contactEmail?: string;
  website?: string;
}

export interface EventMedia {
  type: "image" | "video";
  src: string;
  alt: string;
  /** For YouTube videos, the bare 11-char ID (preferred over a full URL). */
  youtubeId?: string;
  /** Optional poster for video thumbnails. */
  poster?: string;
}

/**
 * The three shapes an entry can take:
 *  - "event"     — a dated, single-day event (calendar marker + day badge).
 *  - "formation" — an ongoing on-demand training offering (no calendar marker,
 *                  "FORMATION SUR MESURE" badge instead of a day number).
 *  - "teaser"    — a real event whose exact date is not yet public (calendar
 *                  marker with an "approximate" indicator).
 */
export type EventKind = "event" | "formation" | "teaser";

/** A single curriculum item shown in a formation / teaser programme. */
export interface FormationModule {
  /** e.g. "EPDM Niveau 1" */
  title: string;
  /** e.g. "initiation à la pose de membrane EPDM" */
  description: string;
}

export interface FormationProgram {
  modules: FormationModule[];
  /** Optional one-liner shown above the modules list. */
  customNote?: string;
}

/** A numbered "Comment ça marche ?" step. */
export interface ProcessStep {
  title: string;
  description: string;
}

/** Contact CTA shown on detail pages for formations and teasers. */
export interface EventContactCta {
  /** e.g. "Organiser une formation". */
  label: string;
  /** Full mailto: URI with subject pre-filled. */
  mailto: string;
}

export interface ComardenEvent {
  slug: string;
  title: string;
  /** ISO date — used for sorting and calendar placement. */
  date: string;
  dateLabel: string;
  /** Discriminates the visual treatment. Legacy past events use "event". */
  kind: EventKind;
  audience?: string;
  location?: string;
  horaires?: string;
  status: "upcoming" | "past";
  teaser: string;
  intro: string;
  partners: EventPartner[];
  media: EventMedia[];

  // ── Formation-specific ─────────────────────────────────────────────────────
  /** Curriculum, rendered as "Le programme" on the detail page. */
  program?: FormationProgram;
  /** Rendered as "Comment ça marche ?" — typically 3 numbered steps. */
  process?: ProcessStep[];
  /** e.g. "Partout en Belgique". */
  coverage?: string;

  // ── Teaser-specific ────────────────────────────────────────────────────────
  /** Inviting tease line, e.g. "Une surprise de taille…". */
  callout?: string;
  /** When false, the date is approximate — show an "à confirmer" indicator. */
  dateRevealed?: boolean;

  // ── Shared (formations + teasers) ──────────────────────────────────────────
  contactCta?: EventContactCta;
}
