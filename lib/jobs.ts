import type { JobPosting } from "@/types/jobs";

/**
 * Job postings data.
 * All reads go through getJobs / getJobBySlug so the source can be swapped
 * to Supabase (or another remote API) in a single place later.
 */
const JOBS: JobPosting[] = [
  {
    slug: "commercial-interne-naninne",
    title: "Commercial·e interne (F/H/X)",
    location: "Naninne",
    locationDetail: "Naninne (Namur)",
    contractType: "CDI, temps plein",
    description:
      "Vente et conseil au comptoir sur notre site de Naninne (Namur) : accueil client, analyse des besoins, conseils techniques et suivi commercial complet.",
    fullDescription: [
      "Au sein de notre équipe de Naninne, vous êtes le premier contact de nos clients professionnels (couvreurs, entrepreneurs, architectes). Vous accueillez, conseillez et fidélisez la clientèle au comptoir en proposant des solutions adaptées issues de notre gamme toiture plate, toiture inclinée et isolation.",
      "Vos missions principales : accueil et conseil client au comptoir, analyse des besoins, élaboration de devis et suivi des commandes, veille à la satisfaction et à la fidélisation de la clientèle.",
      "Profil recherché : vous avez le sens du contact et une vraie fibre commerciale. Une connaissance des matériaux de construction ou de la toiture est un atout. Permis B requis.",
      "Ce que nous offrons : CDI temps plein du lundi au vendredi, package salarial attractif (chèques-repas, éco-chèques, assurance hospitalisation et soins de santé).",
    ],
  },
  {
    slug: "commercial-interne-bertrix",
    title: "Commercial·e interne (F/H/X)",
    location: "Bertrix",
    locationDetail: "Bertrix (Luxembourg belge)",
    contractType: "CDI, temps plein",
    description:
      "Vente et conseil au comptoir sur notre site de Bertrix (province de Luxembourg) : accueil client, analyse des besoins, conseils techniques et suivi commercial complet.",
    fullDescription: [
      "Au sein de notre équipe de Bertrix, vous êtes le premier contact de nos clients professionnels (couvreurs, entrepreneurs, architectes). Vous accueillez, conseillez et fidélisez la clientèle au comptoir en proposant des solutions adaptées issues de notre gamme toiture plate, toiture inclinée et isolation.",
      "Vos missions principales : accueil et conseil client au comptoir, analyse des besoins, élaboration de devis et suivi des commandes, veille à la satisfaction et à la fidélisation de la clientèle.",
      "Profil recherché : vous avez le sens du contact et une vraie fibre commerciale. Une connaissance des matériaux de construction ou de la toiture est un atout. Permis B requis.",
      "Ce que nous offrons : CDI temps plein du lundi au vendredi, package salarial attractif (chèques-repas, éco-chèques, assurance hospitalisation et soins de santé).",
    ],
  },
  {
    slug: "commercial-externe-wallonie",
    title: "Commercial·e externe (F/H/X)",
    location: "Wallonie",
    locationDetail: "Wallonie (itinérant)",
    contractType: "CDI, temps plein",
    description:
      "Poste itinérant couvrant principalement le Brabant wallon, la province de Namur et la province de Luxembourg : fidélisation du réseau de clients existants et conquête de nouveaux marchés sur le terrain.",
    fullDescription: [
      "En tant que commercial·e externe, vous développez et fidélisez un portefeuille de clients professionnels (couvreurs, entreprises générales, architectes) sur votre secteur : Brabant wallon, province de Namur et province de Luxembourg.",
      "Vos missions principales : prospection active de nouveaux clients, visites régulières du portefeuille existant, présentation des gammes de produits, élaboration de devis en collaboration avec l'équipe interne, reporting régulier.",
      "Profil recherché : autonome, organisé·e et doté·e d'une expérience commerciale terrain. La connaissance du secteur de la construction ou de la couverture est un atout. Permis B obligatoire (véhicule de société fourni).",
      "Ce que nous offrons : CDI temps plein, véhicule de société, package salarial attractif (chèques-repas, éco-chèques, assurance hospitalisation et soins de santé).",
    ],
  },
];

/** Returns all job postings. Swap this body for a remote/Supabase call later. */
export async function getJobs(): Promise<JobPosting[]> {
  return JOBS;
}

/** Returns a single job posting by slug, or undefined if not found. */
export async function getJobBySlug(
  slug: string
): Promise<JobPosting | undefined> {
  return JOBS.find((j) => j.slug === slug);
}
