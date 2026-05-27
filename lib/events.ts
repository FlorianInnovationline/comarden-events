import type { ComardenEvent } from "@/types/events";

// To add a new event: copy one of the objects below, change the slug/title/date,
// and fill in the partners + media arrays. The slug becomes the URL at
// /evenements/<slug>, so keep it lowercase, dash-separated, and stable.

// TODO: replace placeholder images in media[] with the real event photos
//   (drop them into /public/images/events/<event-slug>/ and update src).
// TODO: replace partner website URLs once confirmed with the client.

const placeholderImage = (seed: string, w = 1200, h = 800) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const events: ComardenEvent[] = [
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
  }

  // Example of an upcoming event — uncomment and adapt to add one.
  // {
  //   slug: "exemple-evenement-a-venir",
  //   title: "Titre de l'événement",
  //   date: "2026-10-15",
  //   dateLabel: "15 Octobre 2026",
  //   audience: "Architectes",
  //   location: "Comarden — Naninne",
  //   horaires: "9h00 – 17h00",
  //   status: "upcoming",
  //   teaser: "Description courte pour la carte d'événement.",
  //   intro: "Texte d'introduction (sera utilisé sur la page détail).",
  //   partners: [],
  //   media: []
  // }
];

export function getEventBySlug(slug: string): ComardenEvent | undefined {
  return events.find((e) => e.slug === slug);
}

export function getAdjacentEvents(slug: string) {
  const idx = events.findIndex((e) => e.slug === slug);
  if (idx === -1) return { prev: undefined, next: undefined };
  return {
    prev: idx > 0 ? events[idx - 1] : undefined,
    next: idx < events.length - 1 ? events[idx + 1] : undefined
  };
}

export function getAllMedia() {
  return events.flatMap((e) =>
    e.media.map((m) => ({ ...m, eventSlug: e.slug, eventTitle: e.title, audience: e.audience }))
  );
}
