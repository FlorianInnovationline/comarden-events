export const site = {
  name: "Comarden Events",
  shortName: "COMARDEN",
  tagline: "Comarden vous couvre depuis 1977.",
  description:
    "Des rencontres pensées pour vous. Bienvenue sur la page événements de Comarden : partages, conseils d'experts et moments conviviaux.",
  url: "https://comarden-events.be",
  mainSiteUrl: "https://www.comarden.be",
  contact: {
    phone: "061 41 27 06",
    phoneHref: "tel:+3261412706",
    email: "info@comarden.be",
    locations: ["Bertrix", "Naninne"],
    country: "Belgique"
  },
  legal: {
    mentionsLegales: "https://comarden.vercel.app/mentions-legales",
    confidentialite: "https://comarden.vercel.app/confidentialite",
    cookies: "https://comarden.vercel.app/cookies"
  },
  nav: [
    { href: "/", label: "Accueil" },
    { href: "/#evenements", label: "Événements" },
    { href: "/souvenirs", label: "Souvenirs" },
    { href: "/#contact", label: "Contact" }
  ]
} as const;

export type SiteConfig = typeof site;
