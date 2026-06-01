/**
 * COMARDEN EVENTS — single source of truth for all event data.
 *
 * ── HOW TO ADD AN EVENT ──────────────────────────────────────────────────────
 *  1. Copy one of the objects in the `eventsData` array below.
 *  2. Give it a unique, lowercase, dash-separated `slug` — this becomes the URL
 *     at /evenements/<slug>. Once set, never change the slug (bookmarks break).
 *  3. Fill in title / date / dateLabel / audience / location / horaires /
 *     status / teaser / intro / partners / media.
 *  4. Run `npm run dev` — the detail page at /evenements/<slug> is automatically
 *     generated with zero extra code. No imports, no registration needed.
 *
 * ── FUTURE SYNC WITH THE MAIN SITE ──────────────────────────────────────────
 * All data access goes through the async functions below (getEvents, etc.).
 * To switch to a live remote source later, replace the body of `getEvents()`:
 *
 *   // Option A — shared REST API (main site exposes /api/events):
 *   const res = await fetch(process.env.NEXT_PUBLIC_EVENTS_API_URL!, {
 *     next: { revalidate: 300 },
 *   });
 *   return res.json() as Promise<ComardenEvent[]>;
 *
 *   // Option B — shared Supabase table (recommended — main site already has it):
 *   import { createClient } from "@supabase/supabase-js";
 *   const supabase = createClient(
 *     process.env.NEXT_PUBLIC_SUPABASE_URL!,
 *     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
 *   );
 *   const { data } = await supabase
 *     .from("events")
 *     .select("*")
 *     .order("date", { ascending: false });
 *   return (data ?? []) as ComardenEvent[];
 *
 * The ComardenEvent type (types/events.ts) is the contract — the remote source
 * must return objects matching that shape.
 */

import type { ComardenEvent } from "@/types/events";
import { getMediaFromFolder } from "@/lib/event-media";

const placeholderImage = (seed: string, w = 1200, h = 800) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

// ─────────────────────────────────────────────────────────────────────────────
// EVENT DATA
// ─────────────────────────────────────────────────────────────────────────────
const eventsData: ComardenEvent[] = [
  // ── PAST EVENTS ────────────────────────────────────────────────────────────
  {
    slug: "epdm-toiture-vegetale-architectes",
    kind: "event",
    title: "Toiture Plate (ELEVATE) & Toiture Végétale",
    date: "2026-05-21",
    dateLabel: "21 Mai 2026",
    audience: "Architectes",
    location: "Comarden — Bertrix",
    horaires: "10h30 – 14h00",
    status: "past",
    teaser:
      "Une journée dédiée aux toitures plates EPDM et aux toitures végétales, pensée pour les architectes.",
    intro:
      "Toute l'équipe Comarden vous remercie d'être venus si nombreux et pour tous vos échanges. Cerise sur le gâteau : on a même eu le grand soleil avec nous !",
    partners: [
      {
        name: "ELEVATE",
        recap:
          "Un grand merci à Koen et Glenn d'ELEVATE pour leurs explications. Merci aussi à Gil, notre formateur EPDM, pour ses rappels sur le placement et la gestion de la qualité, ainsi qu'à Sébastien pour ses interventions toujours passionnantes, qui font le pont entre la théorie et la pratique. Vous trouverez ci-dessous un lien vers le site d'ELEVATE, où vous aurez accès aux descriptions techniques et à la possibilité d'obtenir des cahiers des charges adaptés à vos besoins et à votre chantier.",
        contactName: "Sébastien Devresse",
        contactEmail: "sdevresse@comarden.be",
        // TODO: confirm the exact ELEVATE URL with the client
        website: "https://www.elevate-roofing.com"
      },
      {
        name: "FLORATOIT",
        recap:
          "Merci à Simon de Floratoit pour ses explications sur la solution de toiture végétale mise en œuvre sur le site de la Confluence, mais aussi sur les autres solutions disponibles sur le marché.",
        contactName: "Simon Fernandez",
        contactEmail: "sfe@floratoit.be",
        // TODO: confirm the exact FLORATOIT URL with the client
        website: "https://www.floratoit.be"
      }
    ],
    // media: fallback used when public/images/events/epdm-toiture-vegetale-architectes/ is empty.
    // When real photos are dropped into that folder, they take precedence automatically.
    // Eventually this will be replaced by Supabase Storage URLs (event-media bucket).
    media: [
      { type: "image", src: placeholderImage("comarden-archi-1"), alt: "Vue d'ensemble de la journée architectes" },
      { type: "image", src: placeholderImage("comarden-archi-2"), alt: "Démonstration EPDM" },
      { type: "image", src: placeholderImage("comarden-archi-3"), alt: "Présentation ELEVATE" },
      { type: "image", src: placeholderImage("comarden-archi-4"), alt: "Échange avec les architectes" },
      { type: "image", src: placeholderImage("comarden-archi-5"), alt: "Toiture végétale — exemple" },
      { type: "image", src: placeholderImage("comarden-archi-6"), alt: "Moment convivial" },
      { type: "image", src: placeholderImage("comarden-archi-7"), alt: "Démonstration FLORATOIT" },
      { type: "image", src: placeholderImage("comarden-archi-8"), alt: "Équipe Comarden" },
      // TODO: replace with the real recap video once available
      { type: "video", src: "", youtubeId: "ScMzIvxBSi4", alt: "Récap vidéo — journée architectes" }
    ]
  },
  {
    slug: "epdm-toiture-vegetale-couvreurs",
    kind: "event",
    title: "Toiture Plate (ELEVATE) & Toiture Végétale",
    date: "2026-05-21",
    dateLabel: "21 Mai 2026",
    audience: "Couvreurs",
    location: "Comarden — Bertrix",
    horaires: "17h00 – 21h30",
    status: "past",
    teaser:
      "Une journée pratique autour de l'EPDM et de la toiture végétale, pensée pour les couvreurs.",
    // TODO: client may want to tailor this intro per audience (Couvreurs vs Architectes)
    intro:
      "Toute l'équipe Comarden vous remercie d'être venus si nombreux et pour tous vos échanges. Cerise sur le gâteau : on a même eu le grand soleil avec nous !",
    partners: [
      {
        name: "ELEVATE",
        recap:
          "Un grand merci à Koen et Glenn d'ELEVATE pour leurs explications. Merci aussi à Gil, notre formateur EPDM, pour ses rappels sur le placement et la gestion de la qualité, ainsi qu'à Sébastien pour ses interventions toujours passionnantes, qui font le pont entre la théorie et la pratique. Vous trouverez ci-dessous un lien vers le site d'ELEVATE, où vous aurez accès aux descriptions techniques et à la possibilité d'obtenir des cahiers des charges adaptés à vos besoins et à votre chantier.",
        contactName: "Sébastien Devresse",
        contactEmail: "sdevresse@comarden.be",
        website: "https://www.elevate-roofing.com"
      },
      {
        name: "FLORATOIT",
        recap:
          "Merci à Simon de Floratoit pour ses explications sur la solution de toiture végétale mise en œuvre sur le site de la Confluence, mais aussi sur les autres solutions disponibles sur le marché.",
        contactName: "Simon Fernandez",
        contactEmail: "sfe@floratoit.be",
        website: "https://www.floratoit.be"
      }
    ],
    // media: fallback used when public/images/events/epdm-toiture-vegetale-couvreurs/ is empty.
    // When real photos are dropped into that folder, they take precedence automatically.
    // Eventually this will be replaced by Supabase Storage URLs (event-media bucket).
    media: [
      { type: "image", src: placeholderImage("comarden-couv-1"), alt: "Atelier EPDM couvreurs" },
      { type: "image", src: placeholderImage("comarden-couv-2"), alt: "Mise en œuvre EPDM" },
      { type: "image", src: placeholderImage("comarden-couv-3"), alt: "Démo pratique" },
      { type: "image", src: placeholderImage("comarden-couv-4"), alt: "Échange entre couvreurs" },
      { type: "image", src: placeholderImage("comarden-couv-5"), alt: "Toiture végétale — atelier" },
      { type: "image", src: placeholderImage("comarden-couv-6"), alt: "Moment convivial" },
      { type: "image", src: placeholderImage("comarden-couv-7"), alt: "Équipe Comarden" },
      { type: "video", src: "", youtubeId: "ScMzIvxBSi4", alt: "Récap vidéo — journée couvreurs" }
    ]
  },

  // ── UPCOMING — FORMATIONS & TEASER ──────────────────────────────────────────
  // Order is intentional. `date` only drives sorting (ascending in À venir):
  // Couvreurs (05-01) → Architectes (05-02) → SOPREMA teaser (08-31).
  // Formations are ongoing offerings (no calendar marker); the teaser is a real
  // event whose exact date is not yet public.
  {
    slug: "formations-sur-mesure-couvreurs",
    kind: "formation",
    status: "upcoming",
    title: "Formations sur mesure — Couvreurs",
    date: "2026-05-01", // for sorting only, NOT shown as a day
    dateLabel: "Mai → Octobre 2026",
    audience: "Couvreurs",
    coverage: "Partout en Belgique",
    location: "Partout en Belgique",
    teaser:
      "Des formations à la demande et sur mesure pour les couvreurs, partout en Belgique, de mai à octobre 2026.",
    intro:
      "Vous êtes couvreur et souhaitez monter en compétence sur l'EPDM, la toiture végétale ou les solutions de façade ? Nous organisons des formations à la demande et sur mesure, partout en Belgique, de mai à octobre. Nos formations « à la demande » et personnalisées sont adaptées à votre niveau et à vos chantiers.",
    program: {
      modules: [
        { title: "EPDM Niveau 1", description: "initiation à la pose de membrane EPDM" },
        { title: "EPDM Niveau 2", description: "perfectionnement et techniques avancées" },
        { title: "Stacbond", description: "mise en œuvre de façade" },
        { title: "Toiture végétale", description: "solutions de végétalisation" },
        { title: "Soudobrasage", description: "techniques de soudobrasage pour toiture" }
      ]
    },
    process: [
      {
        title: "Vous nous contactez",
        description: "Décrivez-nous vos besoins, votre niveau et vos chantiers actuels."
      },
      {
        title: "On définit ensemble",
        description: "Nous bâtissons un programme sur mesure adapté à votre équipe."
      },
      {
        title: "On organise la session",
        description: "Formation chez vous, sur chantier ou sur nos sites, partout en Belgique."
      }
    ],
    contactCta: {
      label: "Organiser une formation",
      mailto: "mailto:info@comarden.be?subject=Demande%20de%20formation%20Couvreurs"
    },
    partners: [],
    media: []
  },
  {
    slug: "formations-sur-mesure-architectes",
    kind: "formation",
    status: "upcoming",
    title: "Formations sur mesure — Architectes",
    date: "2026-05-02", // sorted right after Couvreurs
    dateLabel: "Toute l'année 2026",
    audience: "Architectes",
    coverage: "Partout en Belgique",
    location: "Partout en Belgique",
    teaser:
      "Des formations à la demande spécialement conçues pour les architectes, toute l'année.",
    intro:
      "Nous organisons également des formations à la demande spécialement conçues pour les architectes. Au préalable, nous vous envoyons un document permettant de recueillir vos attentes précises. Nous préparons ainsi la formation à partir d'un socle de base, que nous adaptons et complétons pour répondre exactement à vos besoins.",
    program: {
      customNote:
        "Le programme est défini avec vous, en fonction de vos projets et des thématiques que vous souhaitez approfondir.",
      modules: [
        {
          title: "EPDM & toitures plates",
          description: "spécifications techniques, dimensionnement, cahiers des charges"
        },
        {
          title: "Toiture végétale",
          description: "principes, mise en œuvre, intégration paysagère"
        },
        { title: "Solutions de façade", description: "Stacbond et systèmes ventilés" },
        { title: "Sur demande", description: "thématiques personnalisées selon vos projets" }
      ]
    },
    process: [
      {
        title: "Vous nous contactez",
        description: "Un premier échange pour comprendre vos besoins."
      },
      {
        title: "Document de cadrage",
        description: "Nous vous envoyons un document pour recueillir vos attentes précises."
      },
      {
        title: "Formation sur mesure",
        description:
          "Nous bâtissons la session à partir d'un socle de base, adaptée à vos projets."
      }
    ],
    contactCta: {
      label: "Demander une formation",
      mailto: "mailto:info@comarden.be?subject=Demande%20de%20formation%20Architectes"
    },
    partners: [],
    media: []
  },
  {
    slug: "evenement-exclusif-soprema-2026",
    kind: "teaser",
    status: "upcoming",
    title: "Événement exclusif SOPREMA",
    date: "2026-08-31", // approximate end-of-August
    dateLabel: "Fin août 2026",
    dateRevealed: false,
    location: "Naninne & Bertrix",
    teaser:
      "Une journée 100% dédiée à la gamme SOPREMA, sur nos deux sites. Date complète révélée prochainement.",
    intro:
      "Dans quelques jours, nous vous dévoilerons la date d'une journée exceptionnelle organisée sur nos sites de Naninne et de Bertrix. Une journée 100% dédiée à la gamme complète SOPREMA : découverte des produits, formations techniques, conseils d'experts et inspiration pour vos chantiers.",
    program: {
      modules: [
        {
          title: "Visite des deux sites",
          description: "Naninne et Bertrix en une seule journée"
        },
        {
          title: "Formations & démonstrations",
          description: "sur l'ensemble de la gamme SOPREMA"
        },
        {
          title: "Échanges avec nos experts",
          description: "questions, conseils et retours d'expérience"
        }
      ]
    },
    callout: "Une surprise de taille… à découvrir très prochainement !",
    contactCta: {
      label: "Recevoir les détails",
      mailto:
        "mailto:info@comarden.be?subject=Informations%20%C3%A9v%C3%A9nement%20SOPREMA"
    },
    partners: [
      {
        name: "SOPREMA",
        recap:
          "Référence européenne en étanchéité, isolation, couverture et solutions végétales. Plus d'un siècle d'innovation au service des professionnels de la toiture.",
        website: "https://www.soprema.be"
      }
    ],
    media: []
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// DATA ACCESS FUNCTIONS
// All consumers import these — never import eventsData directly.
// To switch to a remote source: replace the body of getEvents() only.
// ─────────────────────────────────────────────────────────────────────────────

export async function getEvents(): Promise<ComardenEvent[]> {
  // ── SWAP THIS TO FETCH REMOTELY ───────────────────────────────────────────
  // Option A (REST API):
  //   const res = await fetch(process.env.NEXT_PUBLIC_EVENTS_API_URL!, {
  //     next: { revalidate: 300 },
  //   });
  //   return res.json() as Promise<ComardenEvent[]>;
  //
  // Option B (shared Supabase — recommended):
  //   import { createClient } from "@supabase/supabase-js";
  //   const supabase = createClient(
  //     process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  //   );
  //   const { data } = await supabase
  //     .from("events").select("*").order("date", { ascending: false });
  //   return (data ?? []) as ComardenEvent[];
  // ─────────────────────────────────────────────────────────────────────────

  // Merge auto-scanned folder media over the placeholder media array.
  // Rule: if public/images/events/<slug>/ contains real photos, those win.
  //       Otherwise the event's `media` array (picsum placeholders) is used.
  // This means: drop photos in the folder → they appear on next build/dev.
  // No code changes needed.
  return eventsData.map((event) => {
    const folderMedia = getMediaFromFolder(event.slug);
    return folderMedia.length > 0
      ? { ...event, media: folderMedia }
      : event;
  });
}

export async function getEventBySlug(slug: string): Promise<ComardenEvent | undefined> {
  const events = await getEvents();
  return events.find((e) => e.slug === slug);
}

export async function getUpcomingEvents(): Promise<ComardenEvent[]> {
  const events = await getEvents();
  return events
    .filter((e) => e.status === "upcoming")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export async function getPastEvents(): Promise<ComardenEvent[]> {
  const events = await getEvents();
  return events
    .filter((e) => e.status === "past")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getAdjacentEvents(
  slug: string
): Promise<{ prev: ComardenEvent | undefined; next: ComardenEvent | undefined }> {
  const events = await getEvents();
  const idx = events.findIndex((e) => e.slug === slug);
  if (idx === -1) return { prev: undefined, next: undefined };
  return {
    prev: idx > 0 ? events[idx - 1] : undefined,
    next: idx < events.length - 1 ? events[idx + 1] : undefined
  };
}

export async function getAllMedia() {
  const events = await getEvents();
  return events.flatMap((e) =>
    e.media.map((m) => ({
      ...m,
      eventSlug: e.slug,
      eventTitle: e.title,
      audience: e.audience
    }))
  );
}
