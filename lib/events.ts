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

const placeholderImage = (seed: string, w = 1200, h = 800) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

// ─────────────────────────────────────────────────────────────────────────────
// EVENT DATA
// ─────────────────────────────────────────────────────────────────────────────
const eventsData: ComardenEvent[] = [
  // ── PAST EVENTS ────────────────────────────────────────────────────────────
  {
    slug: "epdm-toiture-vegetale-architectes",
    title: "Toiture Plate (ELEVATE) & Toiture Végétale",
    date: "2026-05-21",
    dateLabel: "21 Mai 2026",
    audience: "Architectes",
    location: "Comarden — Bertrix",
    horaires: "9h00 – 17h00",
    status: "past",
    teaser:
      "Une journée dédiée aux toitures plates EPDM et aux toitures végétales, pensée pour les architectes.",
    intro:
      "Toute l'équipe Comarden vous remercie d'être venus si nombreux et pour tous vos échanges. Cerise sur le gâteau : on a même eu le grand soleil avec nous !",
    partners: [
      {
        name: "ELEVATE",
        // TODO: drop the real ELEVATE logo at /public/images/partners/elevate.svg
        logo: "/images/partners/elevate.svg",
        recap:
          "Un grand merci à Koen et Glenn d'ELEVATE pour leurs explications. Merci aussi à Gil, notre formateur EPDM, pour ses rappels sur le placement et la gestion de la qualité, ainsi qu'à Sébastien pour ses interventions toujours passionnantes, qui font le pont entre la théorie et la pratique. Vous trouverez ci-dessous un lien vers le site d'ELEVATE, où vous aurez accès aux descriptions techniques et à la possibilité d'obtenir des cahiers des charges adaptés à vos besoins et à votre chantier.",
        contactName: "Sébastien Devresse",
        contactEmail: "sdevresse@comarden.be",
        // TODO: confirm the exact ELEVATE URL with the client
        website: "https://www.elevate-roofing.com"
      },
      {
        name: "FLORATOIT",
        // TODO: drop the real FLORATOIT logo at /public/images/partners/floratoit.svg
        logo: "/images/partners/floratoit.svg",
        recap:
          "Merci à Simon de Floratoit pour ses explications sur la solution de toiture végétale mise en œuvre sur le site de la Confluence, mais aussi sur les autres solutions disponibles sur le marché.",
        contactName: "Simon Fernandez",
        contactEmail: "sfe@floratoit.be",
        // TODO: confirm the exact FLORATOIT URL with the client
        website: "https://www.floratoit.be"
      }
    ],
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
    title: "Toiture Plate (ELEVATE) & Toiture Végétale",
    date: "2026-05-21",
    dateLabel: "21 Mai 2026",
    audience: "Couvreurs",
    location: "Comarden — Bertrix",
    horaires: "9h00 – 17h00",
    status: "past",
    teaser:
      "Une journée pratique autour de l'EPDM et de la toiture végétale, pensée pour les couvreurs.",
    // TODO: client may want to tailor this intro per audience (Couvreurs vs Architectes)
    intro:
      "Toute l'équipe Comarden vous remercie d'être venus si nombreux et pour tous vos échanges. Cerise sur le gâteau : on a même eu le grand soleil avec nous !",
    partners: [
      {
        name: "ELEVATE",
        logo: "/images/partners/elevate.svg",
        recap:
          "Un grand merci à Koen et Glenn d'ELEVATE pour leurs explications. Merci aussi à Gil, notre formateur EPDM, pour ses rappels sur le placement et la gestion de la qualité, ainsi qu'à Sébastien pour ses interventions toujours passionnantes, qui font le pont entre la théorie et la pratique. Vous trouverez ci-dessous un lien vers le site d'ELEVATE, où vous aurez accès aux descriptions techniques et à la possibilité d'obtenir des cahiers des charges adaptés à vos besoins et à votre chantier.",
        contactName: "Sébastien Devresse",
        contactEmail: "sdevresse@comarden.be",
        website: "https://www.elevate-roofing.com"
      },
      {
        name: "FLORATOIT",
        logo: "/images/partners/floratoit.svg",
        recap:
          "Merci à Simon de Floratoit pour ses explications sur la solution de toiture végétale mise en œuvre sur le site de la Confluence, mais aussi sur les autres solutions disponibles sur le marché.",
        contactName: "Simon Fernandez",
        contactEmail: "sfe@floratoit.be",
        website: "https://www.floratoit.be"
      }
    ],
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

  // ── UPCOMING EVENTS ────────────────────────────────────────────────────────
  {
    slug: "formation-epdm-avance-architectes",
    title: "Formation EPDM Avancé",
    date: "2026-06-18",
    dateLabel: "18 Juin 2026",
    audience: "Architectes",
    location: "Comarden — Naninne",
    horaires: "9h00 – 17h00",
    status: "upcoming",
    teaser:
      "Approfondissez vos connaissances sur les systèmes EPDM pour toiture plate : dimensionnement, détails de rives et retours, cahiers des charges.",
    intro:
      "Cette formation avancée est destinée aux architectes souhaitant maîtriser en détail les systèmes de toiture plate en EPDM. Au programme : dimensionnement, gestion des évacuations, détails de rives et prescriptions dans les cahiers des charges.",
    partners: [
      {
        name: "ELEVATE",
        logo: "/images/partners/elevate.svg",
        recap:
          "ELEVATE interviendra pour présenter ses nouveaux systèmes EPDM et les outils d'aide à la prescription destinés aux architectes.",
        contactName: "Sébastien Devresse",
        contactEmail: "sdevresse@comarden.be",
        website: "https://www.elevate-roofing.com"
      }
    ],
    media: [
      { type: "image", src: placeholderImage("epdm-adv-1", 1200, 800), alt: "Atelier EPDM avancé" },
      { type: "image", src: placeholderImage("epdm-adv-2", 1200, 800), alt: "Détails de rive EPDM" },
      { type: "image", src: placeholderImage("epdm-adv-3", 1200, 800), alt: "Présentation technique" },
      { type: "image", src: placeholderImage("epdm-adv-4", 1200, 800), alt: "Échanges entre architectes" },
      { type: "image", src: placeholderImage("epdm-adv-5", 1200, 800), alt: "Visite du chantier école" },
      { type: "image", src: placeholderImage("epdm-adv-6", 1200, 800), alt: "Session questions-réponses" }
    ]
  },
  {
    slug: "journee-facade-parement-couvreurs",
    title: "Journée Façade & Parement",
    date: "2026-07-09",
    dateLabel: "9 Juillet 2026",
    audience: "Couvreurs",
    location: "Comarden — Bertrix",
    horaires: "9h00 – 16h30",
    status: "upcoming",
    teaser:
      "Techniques de pose de bardages, systèmes de façades ventilées et finitions de parement — une journée pratique pensée pour les couvreurs.",
    intro:
      "Rejoignez-nous pour une journée entièrement dédiée aux systèmes de façade et de parement. Démonstrations pratiques, astuces de pose et focus sur les nouvelles solutions disponibles chez Comarden.",
    partners: [],
    media: [
      { type: "image", src: placeholderImage("facade-1", 1200, 800), alt: "Pose de bardage" },
      { type: "image", src: placeholderImage("facade-2", 1200, 800), alt: "Système façade ventilée" },
      { type: "image", src: placeholderImage("facade-3", 1200, 800), alt: "Démonstration pratique" },
      { type: "image", src: placeholderImage("facade-4", 1200, 800), alt: "Finitions de parement" },
      { type: "image", src: placeholderImage("facade-5", 1200, 800), alt: "Matériaux exposés" },
      { type: "image", src: placeholderImage("facade-6", 1200, 800), alt: "Moment d'échange" }
    ]
  },
  {
    slug: "toiture-pente-ardoises-tuiles-architectes",
    title: "Toiture en Pente : Ardoises & Tuiles",
    date: "2026-09-17",
    dateLabel: "17 Septembre 2026",
    audience: "Architectes",
    location: "Comarden — Naninne",
    horaires: "9h00 – 17h00",
    status: "upcoming",
    teaser:
      "Sélection des matériaux, règles de pose et spécifications dans les cahiers des charges pour les toitures en pente — ardoises naturelles et tuiles.",
    intro:
      "Cette journée est consacrée aux matériaux de couverture en pente : ardoises naturelles, ardoises fibrociment et tuiles. Les intervenants aborderont les règles de pose, les compatibilités avec l'isolation et les sous-toitures, ainsi que la rédaction des cahiers des charges.",
    partners: [],
    media: [
      { type: "image", src: placeholderImage("ardoises-1", 1200, 800), alt: "Ardoises naturelles" },
      { type: "image", src: placeholderImage("ardoises-2", 1200, 800), alt: "Échantillons de tuiles" },
      { type: "image", src: placeholderImage("ardoises-3", 1200, 800), alt: "Démonstration de pose" },
      { type: "image", src: placeholderImage("ardoises-4", 1200, 800), alt: "Détails de noue" },
      { type: "image", src: placeholderImage("ardoises-5", 1200, 800), alt: "Présentation technique" },
      { type: "image", src: placeholderImage("ardoises-6", 1200, 800), alt: "Visite du showroom" }
    ]
  },
  {
    slug: "formation-etancheite-bitumineuse-couvreurs",
    title: "Formation Étanchéité Bitumineuse",
    date: "2026-10-08",
    dateLabel: "8 Octobre 2026",
    audience: "Couvreurs",
    location: "Comarden — Bertrix",
    horaires: "9h00 – 17h00",
    status: "upcoming",
    teaser:
      "Maîtrisez les systèmes d'étanchéité bitumineuse : multicouches, bicouches soudés et solutions d'autoprotection.",
    intro:
      "Formation technique sur les membranes bitumineuses pour toiture plate : choix des systèmes, préparation du support, mise en œuvre et contrôle qualité. Une journée complète orientée pratique.",
    partners: [],
    media: [
      { type: "image", src: placeholderImage("bitu-1", 1200, 800), alt: "Membrane bitumineuse" },
      { type: "image", src: placeholderImage("bitu-2", 1200, 800), alt: "Soudage au chalumeau" },
      { type: "image", src: placeholderImage("bitu-3", 1200, 800), alt: "Contrôle qualité" },
      { type: "image", src: placeholderImage("bitu-4", 1200, 800), alt: "Détail d'évacuation" },
      { type: "image", src: placeholderImage("bitu-5", 1200, 800), alt: "Atelier pratique" },
      { type: "image", src: placeholderImage("bitu-6", 1200, 800), alt: "Matériaux présentés" }
    ]
  },
  {
    slug: "journee-bois-ossature-bois",
    title: "Journée Bois & Ossature Bois",
    date: "2026-11-12",
    dateLabel: "12 Novembre 2026",
    audience: "Architectes & Couvreurs",
    location: "Comarden — Naninne",
    horaires: "9h00 – 17h00",
    status: "upcoming",
    teaser:
      "Construction en ossature bois, isolation et couverture bois — une journée transversale pour architectes et couvreurs.",
    intro:
      "La construction bois est en plein essor. Cette journée réunit architectes et couvreurs autour des systèmes constructifs en ossature bois : de la structure à la couverture, en passant par les solutions d'isolation et d'étanchéité à l'air.",
    partners: [],
    media: [
      { type: "image", src: placeholderImage("bois-1", 1200, 800), alt: "Ossature bois" },
      { type: "image", src: placeholderImage("bois-2", 1200, 800), alt: "Isolation en ouate de cellulose" },
      { type: "image", src: placeholderImage("bois-3", 1200, 800), alt: "Détail de toiture bois" },
      { type: "image", src: placeholderImage("bois-4", 1200, 800), alt: "Atelier montage" },
      { type: "image", src: placeholderImage("bois-5", 1200, 800), alt: "Présentation matériaux" },
      { type: "image", src: placeholderImage("bois-6", 1200, 800), alt: "Discussion technique" }
    ]
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
  return eventsData;
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
