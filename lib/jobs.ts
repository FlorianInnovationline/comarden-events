// TODO (backend): job applications must be sent by email to adebondt@comarden.be
// with info@comarden.be in BCC. Wired up in a later prompt with Resend + Supabase.

import type { JobPosting } from "@/types/jobs";

const JOBS: JobPosting[] = [
  // ── POSTING 1 — Commercial·e interne, Naninne ───────────────────────────────
  {
    slug: "commercial-interne-naninne",
    title: "Technico-commercial·e interne (F/H/X) — Naninne",
    shortTitle: "Commercial·e interne — Naninne",
    location: "Naninne (Namur)",
    contractType: "CDI temps plein",
    workType: "Sédentaire",
    teaser: "Vente et conseil au comptoir sur notre site de Naninne (Namur).",
    subtitle:
      "Vente de matériaux de toiture, de façade et d'isolation | CDI temps plein | Naninne",
    companyIntro:
      "Implanté à Bertrix et à Namur, Comarden est un négoce spécialisé en matériaux de toiture et d'isolation en Belgique francophone. Notre équipe d'experts accompagne ses clients avec une gamme complète de produits de haute qualité pour toitures plates et inclinées. Pour soutenir notre croissance, nous recherchons un·e technico-commercial·e interne sur notre site de Naninne.",
    roleOverview:
      "En tant que technico-commercial·e interne, vous assurez la vente et le conseil au comptoir. Vous êtes l'image de Comarden auprès de nos clients et incarnez l'entreprise et ses valeurs.",
    responsibilities: [
      "Prendre en charge le client au comptoir comme par téléphone : accueil, identification des besoins, analyse de la demande et conseils techniques.",
      "Gérer les appels, les e-mails, les offres de prix et les tâches administratives commerciales, et en assurer le suivi jusqu'à leur conclusion.",
      "Piloter le cycle de vente complet, de l'approche du client à la finalisation du contrat (devis, commande, demande de livraison, etc.).",
      "Accompagner le client dans la compréhension de son besoin afin de proposer les solutions les plus adaptées.",
      "Entretenir proactivement votre connaissance des produits et rester attentif·ve aux innovations du marché.",
      "Assurer la mise en valeur et l'animation du négoce et de la salle d'exposition.",
      "Passer régulièrement commande auprès de nos fournisseurs habituels.",
    ],
    profile: [
      "Rigoureux·se et organisé·e pour gérer l'aspect multitâche de la fonction (comptoir, téléphone, e-mails).",
      "Proactif·ve et capable de prendre des initiatives.",
      "Aisance relationnelle permettant de nouer de véritables partenariats avec clients et fournisseurs.",
      "Une expérience en vente au comptoir dans le secteur de la construction est un sérieux atout.",
    ],
    horaires: "7h30 – 17h00, avec système de récupération",
    benefits: [
      "Un contrat à durée indéterminée (CDI) dans une PME familiale en pleine croissance.",
      "Un temps plein, du lundi au vendredi.",
      "Des opportunités d'apprentissage régulières.",
      "Salaire brut mensuel attractif avec perspectives d'évolution.",
      "Chèques-repas de 8 €/jour.",
      "250 € d'éco-chèques/an.",
      "Assurance hospitalisation et assurance soins de santé ambulatoires (budget de 2 500 €/an).",
    ],
    isActive: true,
  },

  // ── POSTING 2 — Commercial·e interne, Bertrix ───────────────────────────────
  {
    slug: "commercial-interne-bertrix",
    title: "Technico-commercial·e interne (F/H/X) — Bertrix",
    shortTitle: "Commercial·e interne — Bertrix",
    location: "Bertrix (Luxembourg belge)",
    contractType: "CDI temps plein",
    workType: "Sédentaire",
    teaser:
      "Vente et conseil au comptoir sur notre site de Bertrix (province de Luxembourg).",
    subtitle:
      "Vente de matériaux de toiture, de façade et d'isolation | CDI temps plein | Bertrix",
    companyIntro:
      "Implanté à Bertrix et à Namur, Comarden est un négoce spécialisé en matériaux de toiture et d'isolation en Belgique francophone. Notre équipe d'experts accompagne ses clients avec une gamme complète de produits de haute qualité pour toitures plates et inclinées. Pour soutenir notre croissance, nous recherchons un·e technico-commercial·e interne sur notre site de Bertrix.",
    roleOverview:
      "En tant que technico-commercial·e interne, vous assurez la vente et le conseil au comptoir. Vous êtes l'image de Comarden auprès de nos clients et incarnez l'entreprise et ses valeurs.",
    responsibilities: [
      "Prendre en charge le client au comptoir comme par téléphone : accueil, identification des besoins, analyse de la demande et conseils techniques.",
      "Gérer les appels, les e-mails, les offres de prix et les tâches administratives commerciales, et en assurer le suivi jusqu'à leur conclusion.",
      "Piloter le cycle de vente complet, de l'approche du client à la finalisation du contrat (devis, commande, demande de livraison, etc.).",
      "Accompagner le client dans la compréhension de son besoin afin de proposer les solutions les plus adaptées.",
      "Entretenir proactivement votre connaissance des produits et rester attentif·ve aux innovations du marché.",
      "Assurer la mise en valeur et l'animation du négoce et de la salle d'exposition.",
      "Passer régulièrement commande auprès de nos fournisseurs habituels.",
    ],
    profile: [
      "Rigoureux·se et organisé·e pour gérer l'aspect multitâche de la fonction (comptoir, téléphone, e-mails).",
      "Proactif·ve et capable de prendre des initiatives.",
      "Aisance relationnelle permettant de nouer de véritables partenariats avec clients et fournisseurs.",
      "Une expérience en vente au comptoir dans le secteur de la construction est un sérieux atout.",
    ],
    horaires: "7h30 – 17h00, avec système de récupération",
    benefits: [
      "Un contrat à durée indéterminée (CDI) dans une PME familiale en pleine croissance.",
      "Un temps plein, du lundi au vendredi.",
      "Des opportunités d'apprentissage régulières.",
      "Salaire brut mensuel attractif avec perspectives d'évolution.",
      "Chèques-repas de 8 €/jour.",
      "250 € d'éco-chèques/an.",
      "Assurance hospitalisation et assurance soins de santé ambulatoires (budget de 2 500 €/an).",
    ],
    isActive: true,
  },

  // ── POSTING 3 — Commercial·e externe, Wallonie ──────────────────────────────
  {
    slug: "commercial-externe-wallonie",
    title: "Commercial·e externe (F/H/X) — Wallonie",
    shortTitle: "Commercial·e externe — Wallonie",
    location: "Wallonie (itinérant)",
    contractType: "CDI temps plein",
    workType: "Itinérant",
    teaser:
      "Poste itinérant en Wallonie : fidéliser les clients existants et conquérir de nouveaux marchés.",
    subtitle:
      "Vente de matériaux de toiture et d'isolation | CDI temps plein | Itinérant — Wallonie",
    companyIntro:
      "Implanté à Bertrix et à Namur, Comarden est un négoce spécialisé en matériaux de toiture et d'isolation en Belgique francophone. Notre équipe d'experts accompagne ses clients avec une gamme complète de produits de haute qualité pour toitures plates et inclinées. Pour soutenir notre croissance, nous recherchons un·e commercial·e externe pour la Wallonie.",
    roleOverview:
      "En tant que commercial·e externe, vous êtes sur le terrain, à la rencontre de nos clients aux quatre coins de la Wallonie. Véritable ambassadeur·rice de Comarden, vous développez le chiffre d'affaires en fidélisant notre clientèle existante et en conquérant de nouveaux marchés.",
    responsibilities: [
      "Entretenir et développer le réseau de clients existants : visites régulières, suivi de la relation, identification de nouveaux besoins et fidélisation sur le long terme.",
      "Conquérir de nouveaux clients : prospection active, ouverture de portes et développement du portefeuille sur l'ensemble du territoire wallon.",
      "Conseiller les clients sur les solutions techniques en toiture, façade et isolation, et proposer les produits les plus adaptés à leurs chantiers.",
      "Négocier les offres de prix et assurer le suivi commercial complet, de la prise de contact à la concrétisation de la vente.",
      "Assurer le reporting de votre activité et travailler en étroite collaboration avec les équipes internes (comptoir, logistique).",
      "Rester à l'écoute du marché et des innovations afin de vous positionner comme un·e conseiller·ère de confiance.",
    ],
    profile: [
      "Dynamique, persévérant·e et à l'aise pour décrocher de nouveaux clients.",
      "Aisance relationnelle permettant de nouer des partenariats durables.",
      "Organisé·e et autonome dans la gestion de votre secteur et de votre planning de visites.",
      "Des connaissances techniques en toiture, façade ou isolation sont un sérieux atout.",
      "Une expérience en vente externe ou dans le secteur de la construction est appréciée.",
      "Permis B obligatoire (déplacements quotidiens en Wallonie).",
    ],
    benefits: [
      "Un contrat à durée indéterminée (CDI) dans une PME familiale en pleine croissance.",
      "Un temps plein, du lundi au vendredi.",
      "Un véhicule de société et les outils nécessaires à votre fonction.",
      "Une grande autonomie dans la gestion de votre secteur.",
      "Des opportunités d'apprentissage régulières.",
      "Salaire brut mensuel attractif avec perspectives d'évolution.",
      "Chèques-repas de 8 €/jour.",
      "250 € d'éco-chèques/an.",
      "Assurance hospitalisation et assurance soins de santé ambulatoires (budget de 2 500 €/an).",
    ],
    permisBRequired: true,
    vehicleProvided: true,
    isActive: true,
  },
];

/** Returns all active job postings. Swap this body for a remote/Supabase call later. */
export async function getJobs(): Promise<JobPosting[]> {
  return JOBS.filter((j) => j.isActive);
}

/** Returns a single job posting by slug, or undefined if not found. */
export async function getJobBySlug(
  slug: string
): Promise<JobPosting | undefined> {
  return JOBS.find((j) => j.slug === slug);
}

/** Returns { prev, next } active postings relative to the given slug. */
export async function getAdjacentJobs(
  slug: string
): Promise<{ prev: JobPosting | null; next: JobPosting | null }> {
  const active = JOBS.filter((j) => j.isActive);
  const idx = active.findIndex((j) => j.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? active[idx - 1] : null,
    next: idx < active.length - 1 ? active[idx + 1] : null,
  };
}
