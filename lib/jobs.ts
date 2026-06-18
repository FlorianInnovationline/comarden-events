// TODO (backend): job applications must be sent by email to adebondt@comarden.be
// with info@comarden.be in BCC. Wired up in a later prompt with Resend + Supabase.

import type { JobPosting } from "@/types/jobs";

const JOBS: JobPosting[] = [
  // ── POSTING 1 — Commercial·e interne, Bertrix ─────────────────────────────
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

  // ── POSTING 3 — Magasinier·ère, Naninne ─────────────────────────────────────
  {
    slug: "magasinier-naninne",
    title: "Magasinier·ère (F/H/X) — CDI — Naninne",
    shortTitle: "Magasinier·ère — Naninne",
    location: "Naninne (Namur)",
    contractType: "CDI temps plein",
    workType: "Sédentaire",
    teaser:
      "Gestion du dépôt et des opérations logistiques sur notre site de Naninne (Namur).",
    subtitle:
      "Dépôt de Naninne (Namur) | CDI temps plein | Logistique & gestion de stock",
    companyIntro:
      "Comarden, négoce spécialisé en matériaux de toiture et d'isolation en Belgique francophone, est présent à Bertrix et à Namur (Naninne). Notre équipe d'experts propose à ses clients une gamme complète de produits pour toitures plates et inclinées, sélectionnés pour leur haute qualité. Dans le cadre de notre croissance, nous recrutons un·e magasinier·ère pour notre dépôt de Naninne.",
    roleOverview:
      "En tant que magasinier·ère, vous jouez un rôle clé dans le bon fonctionnement du dépôt et la fluidité de nos opérations logistiques. Organisé·e et rigoureux·se, vous assurez la gestion complète des marchandises, de leur réception à leur expédition.",
    responsibilities: [
      "Stockage et expédition : mise en stock selon les procédures établies, préparation et conditionnement des commandes, vérification des bons de commande et de livraison, établissement des documents de chargement et d'enlèvement.",
      "Réception des marchandises : déchargement, identification, contrôles quantitatifs et qualitatifs, acceptation ou émission de réserves auprès du transporteur ou de l'expéditeur.",
      "Gestion des stocks : enregistrement des entrées et sorties, réapprovisionnement, gestion des retours clients et fournisseurs, réintégration des produits, préparation et réalisation des inventaires.",
      "Conduite et sécurité : respect strict de la réglementation routière et des autres usagers, entretien du véhicule (nettoyage, contrôle technique, état des pneus) et remontée des informations au chef de dépôt.",
      "Support logistique : participation à la préparation du centre de formation.",
    ],
    profile: [
      "Vous êtes motivé·e et prêt·e à relever un nouveau challenge riche en apprentissage.",
      "Le domaine technique vous intéresse et vous souhaitez approfondir vos connaissances en matériaux de construction.",
      "Vous êtes proactif·ve et prenez naturellement des initiatives.",
      "Vous avez un excellent sens de la collaboration et une bonne humeur communicative.",
      "Vous faites preuve de flexibilité horaire.",
      "Le permis cariste est un atout précieux.",
    ],
    benefits: [
      "Un contrat à durée indéterminée (CDI) au sein d'une PME familiale en pleine croissance.",
      "Un temps plein, du lundi au vendredi.",
      "Des opportunités de formation et d'évolution régulières.",
      "Package salarial attractif (barèmes de la CP 124).",
      "Chèques-repas de 8 €/jour.",
      "Éco-chèques.",
      "Assurance hospitalisation (CP 124).",
      "Assurance soins de santé ambulatoire : budget de 2 500 €/an.",
    ],
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
