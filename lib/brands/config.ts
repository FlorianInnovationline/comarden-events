// ============================================================================
// Brand pages config - /marques/<slug>
// ----------------------------------------------------------------------------
// QR-only landing pages (NOT linked anywhere on the site, noindex). Each brand
// shares the same component template but injects its own palette + content.
// Colours are applied via CSS variables set on the page root (see the route),
// so we don't need per-brand Tailwind configs.
// ============================================================================

export interface BrandColors {
  /** Hero / primary brand colour */
  primary: string;
  /** Ink colour for text on light backgrounds */
  dark: string;
  /** Deeper shade for hover / CTAs */
  accent: string;
  /** Page background (light) */
  bg: string;
  /** Legible text colour to place ON the primary colour (hero) */
  onPrimary: string;
}

export interface BrandFeature {
  /** lucide-react icon name */
  icon: string;
  title: string;
  description: string;
}

export interface BrandSpecGroup {
  title: string;
  items: string[];
}

/** Optional editorial "story" section: image (left) + heading + numbered points. */
export interface BrandStory {
  heading: string;
  text: string;
  /** Public image path (left column); null falls back to a branded panel. */
  image: string | null;
  points: string[];
}

/** Optional "use cases" section: heading + image cards (e.g. Façade / Crépi / …). */
export interface BrandUseCases {
  heading: string;
  cards: { label: string; image: string | null }[];
  /** True when the cards hold photos (full-bleed cover) rather than product shots */
  coverImages?: boolean;
}

export interface BrandNotice {
  eyebrow?: string;
  heading: string;
  text: string;
  /** "À retenir" bullet list */
  pointsTitle?: string;
  points: string[];
}

export interface BrandOrigin {
  /** Small eyebrow label shown next to the flag, e.g. "Fabriqué en Belgique" */
  badge: string;
  heading: string;
  paragraphs: string[];
  advantagesTitle: string;
  advantages: string[];
  /** Optional highlighted figure, e.g. { value: "60 %", label: "de parts de marché" } */
  stat?: { value: string; label: string };
  /** Context photo (right column); null → branded fallback panel */
  image?: string | null;
  /** Render a country flag block. Currently only the Belgian flag ("be"). */
  flag?: "be";
}

export interface BrandConfig {
  slug: string;
  /** Display name (may contain ™ / ®) */
  name: string;
  /** Public logo path, or null to fall back to a styled wordmark */
  logo: string | null;
  /**
   * True when the logo artwork is light/white (designed for a dark header) and
   * therefore needs a dark backing chip when shown on light surfaces (the /shop
   * strip, the "about" section). It already sits on the dark hero unchanged.
   */
  logoNeedsDark?: boolean;
  /**
   * True when the logo artwork is dark/coloured and needs a light (white) chip
   * on the coloured hero. It already sits fine on the light strip/about.
   */
  logoNeedsLight?: boolean;
  tagline: string;
  heroPitch: string;
  aboutTitle: string;
  aboutText: string;
  /** Optional photo for the "Qui est…" section; null → branded panel */
  aboutImage?: string | null;
  features: BrandFeature[];
  productsTitle: string;
  /** Label of the hero / features CTA that jumps to the product section */
  productsCtaLabel: string;
  /**
   * Value to match against products.brand in Supabase (case-insensitive, trimmed).
   * null → no products in the DB yet (shows an "à venir" placeholder).
   */
  productBrand: string | null;
  /** Optional spec callout (e.g. Solid John) rendered under the features */
  specGroups?: BrandSpecGroup[];
  /** Optional editorial story section rendered under the product carousel */
  story?: BrandStory;
  /** Optional "use cases" image-card section rendered under the story */
  useCases?: BrandUseCases;
  /** Optional "made in <country>" origin section rendered under the products */
  origin?: BrandOrigin;
  /** Optional informational notice card (e.g. prevention "à retenir" block) */
  notice?: BrandNotice;
  /** Allow search engines to index this page (brand pages are noindex by default) */
  indexable?: boolean;
  colors: BrandColors;
}

export const BRANDS: Record<string, BrandConfig> = {
  algimouss: {
    slug: "algimouss",
    name: "Algimouss",
    logo: "/images/logos/algimouss-logo.png",
    logoNeedsLight: true,
    tagline: "Spécialiste du nettoyage, du traitement et de la protection",
    heroPitch:
      "Depuis 1978, Algimouss conçoit des solutions pour nettoyer, traiter et protéger toitures, façades, terrasses et bois, et lutter durablement contre les dépôts verts. Distribué chez Comarden.",
    aboutTitle: "Algimouss vous accompagne depuis plus de 45 ans dans l'entretien de votre maison.",
    aboutText:
      "Inventeur du premier traitement anti-dépôts verts en 1978, Algimouss développe des produits permettant de lutter contre la prolifération des végétaux parasites (algues, mousses, lichens) tout en prolongeant la durée de vie des matériaux qui composent votre habitat. Avec plus de 45 ans d'expérience dans l'entretien extérieur des bâtiments, la volonté de la marque est de concevoir des solutions toujours plus simples d'utilisation et respectueuses. Comarden distribue la gamme Algimouss en Belgique.",
    aboutImage: "/images/marques/algimouss/about.jpg",
    features: [
      {
        icon: "Leaf",
        title: "Anti-dépôts verts",
        description: "Élimine algues, mousses et lichens et prévient leur réapparition.",
      },
      {
        icon: "History",
        title: "Depuis 1978",
        description: "Inventeur du premier traitement anti-dépôts verts, plus de 45 ans d'expertise.",
      },
      {
        icon: "SprayCan",
        title: "Nettoyer, traiter, protéger",
        description: "Une gamme complète pour toitures, façades, terrasses et bois.",
      },
      {
        icon: "ShieldCheck",
        title: "Protection durable",
        description: "Hydrofuges et traitements qui prolongent la vie des matériaux.",
      },
    ],
    productsTitle: "Nos produits Algimouss",
    productsCtaLabel: "Voir nos produits Algimouss",
    productBrand: "ALGIMOUSS",
    useCases: {
      heading: "Nettoyer, traiter, protéger : la méthode Algimouss",
      cards: [
        { label: "Nettoyage", image: "/images/marques/algimouss/nettoyage.jpg" },
        { label: "Traitement", image: "/images/marques/algimouss/traitement.jpg" },
        { label: "Protection", image: "/images/marques/algimouss/protection.jpg" },
      ],
    },
    colors: {
      primary: "#0E7A66",
      dark: "#0A4A3C",
      accent: "#8CC63F",
      bg: "#F1F8E9",
      onPrimary: "#FFFFFF",
    },
  },
  faynot: {
    slug: "faynot",
    name: "FAYNOT",
    logo: "/images/logos/faynot-logo.png",
    tagline: "Enveloppe du bâtiment - Système breveté",
    heroPitch:
      "FAYNOT, expert en isolation thermique par l'extérieur (ITE) de la toiture. Le système Easy-Sarking, breveté, offre la solution la plus performante pour isoler par l'extérieur sans dérangement intérieur.",
    aboutTitle: "Qui est FAYNOT ?",
    aboutText:
      "FAYNOT est un fabricant français spécialisé dans l'enveloppe du bâtiment, reconnu pour son expertise en isolation thermique par l'extérieur (ITE) de la toiture. Sa solution phare, le système Easy-Sarking breveté, permet d'isoler les toitures par l'extérieur tout en préservant l'espace intérieur. FAYNOT propose également une gamme complète de visserie et fixations de qualité industrielle, distribuée chez Comarden depuis de nombreuses années.",
    aboutImage: null,
    features: [
      {
        icon: "ShieldCheck",
        title: "Système Breveté",
        description: "Easy-Sarking, solution ITE couverture protégée par brevet.",
      },
      {
        icon: "ThermometerSun",
        title: "Performance Thermique",
        description: "R jusqu'à 8,75 m².K/W (label BBC) avec le pilier H120.",
      },
      {
        icon: "Hammer",
        title: "Acier Galvanisé Z275",
        description: "Piliers ultra-durables, fixation sur chevrons existants.",
      },
      {
        icon: "Award",
        title: "Avis Technique CSTB",
        description: "Validé par essais CSTB N° AC12-26041687/2.",
      },
    ],
    productsTitle: "Nos produits FAYNOT",
    productsCtaLabel: "Voir nos produits FAYNOT",
    productBrand: "FAYNOT",
    colors: {
      primary: "#FFCC00",
      dark: "#221F20",
      accent: "#C8A800",
      bg: "#FFFDF5",
      onPrimary: "#221F20",
    },
  },

  "mg-bouw": {
    slug: "mg-bouw",
    name: "MG Bouw",
    logo: "/images/logos/mg-bouw-logo.png",
    logoNeedsDark: true,
    tagline: "Build to last - Bouwen voor morgen",
    heroPitch:
      "Meuwissen Gerritsen (MG Bouw) - depuis 1954, leader néerlandais des films techniques pour le bâtiment. Plus de 1200 points de vente, 4 générations d'expertise familiale.",
    aboutTitle: "Qui est MG Bouw ?",
    aboutText:
      "Meuwissen Gerritsen est une entreprise familiale néerlandaise fondée en 1954, aujourd'hui dirigée par la quatrième génération. Marché leader des films techniques pour le bâtiment aux Pays-Bas, MG Bouw commercialise des marques reconnues comme Miofol®, Polytex®, Taftex®, VASTR®, Alkreflex® et est distributeur de Tyvek®. Leur engagement : protéger chaque construction contre les éléments pour les générations à venir.",
    aboutImage: null,
    features: [
      { icon: "History", title: "Depuis 1954", description: "Plus de 70 ans d'expertise dans les films techniques." },
      { icon: "Store", title: "1200+ points de vente", description: "Distribution étendue à travers le Benelux." },
      { icon: "Tags", title: "Marques propres", description: "Miofol, Polytex, Taftex, VASTR, Alkreflex." },
      { icon: "FlaskConical", title: "Qualité contrôlée", description: "Laboratoire interne à Haarlem, certification KOMO." },
    ],
    productsTitle: "Nos produits MG Bouw",
    productsCtaLabel: "Demander information",
    productBrand: "MG BOUW",
    colors: {
      primary: "#003D7A",
      dark: "#001F3D",
      accent: "#0066CC",
      bg: "#F4F8FC",
      onPrimary: "#FFFFFF",
    },
  },

  tyvek: {
    slug: "tyvek",
    name: "Tyvek®",
    logo: "/images/logos/tyvek-logo.png",
    tagline: "L'enveloppe technique de référence depuis 1955",
    heroPitch:
      "DuPont™ Tyvek® - la marque de référence mondiale pour les membranes pare-pluie, pare-vapeur et solutions d'étanchéité à l'air. Performance durable, distribuée chez Comarden.",
    aboutTitle: "Qui est Tyvek ?",
    aboutText:
      "Tyvek® est une marque emblématique de DuPont, leader mondial des matériaux haute performance depuis 1955. La technologie Tyvek® utilise des fibres de polyéthylène haute densité filées-liées sans liant, créant une matière unique : imperméable à l'eau et au vent, perméable à la vapeur, ultra-résistante et durable. Tyvek® est la référence internationale des pare-pluie et solutions d'étanchéité à l'air pour murs, façades et toitures.",
    aboutImage: null,
    features: [
      { icon: "Atom", title: "Filé-Lié HDPE", description: "Technologie unique de fibres polyéthylène sans liant." },
      { icon: "Wind", title: "Pare-Pluie & Étanche à l'Air", description: "Imperméable mais perméable à la vapeur." },
      { icon: "Sun", title: "Résistance UV", description: "Tenue exceptionnelle aux intempéries." },
      { icon: "Globe", title: "Référence Mondiale", description: "Standard de l'industrie depuis 70 ans." },
    ],
    productsTitle: "Nos produits Tyvek",
    productsCtaLabel: "Voir nos produits Tyvek",
    productBrand: "TYVEK DUPONT",
    colors: {
      primary: "#DA291C",
      dark: "#1A1A1A",
      accent: "#B81E14",
      bg: "#FAFAFA",
      onPrimary: "#FFFFFF",
    },
  },

  express: {
    slug: "express",
    name: "EXPRESS",
    logo: "/images/logos/express-logo.png",
    tagline: "Outillage et solutions professionnelles du couvreur",
    heroPitch:
      "EXPRESS - Le spécialiste français de l'outillage et des solutions techniques pour les professionnels de la toiture et de l'étanchéité.",
    aboutTitle: "Qui est EXPRESS ?",
    aboutText:
      "EXPRESS conçoit et distribue depuis des décennies une gamme complète d'outillage professionnel et de consommables techniques destinés aux couvreurs, étancheurs et zingueurs. Reconnue pour la fiabilité et la robustesse de ses produits, la marque accompagne les artisans sur les chantiers les plus exigeants.",
    aboutImage: null,
    features: [
      { icon: "Flag", title: "Made in France", description: "Conception et production françaises." },
      { icon: "HardHat", title: "Spécialiste Couverture", description: "Outillage et consommables dédiés au métier." },
      { icon: "Wrench", title: "Robustesse Professionnelle", description: "Conçu pour les chantiers exigeants." },
      { icon: "Users", title: "Réseau Reconnu", description: "Distribué par les principaux acteurs du bâtiment." },
    ],
    productsTitle: "Nos produits EXPRESS",
    productsCtaLabel: "Voir nos produits EXPRESS",
    productBrand: "EXPRESS",
    colors: {
      primary: "#E30613",
      dark: "#1A1A1A",
      accent: "#B30410",
      bg: "#F7F5F3",
      onPrimary: "#FFFFFF",
    },
  },

  "solid-john": {
    slug: "solid-john",
    name: "Solid John",
    logo: "/images/logos/solid-john-logo.png",
    tagline: "Never average - Le bétonplex durable en conditions humides",
    heroPitch:
      "Solid John - Le contreplaqué bétonplex spécialement conçu pour les conditions humides, garanti 10 ans. Une nouvelle référence pour les toitures plates et la rive de toit.",
    aboutTitle: "Qui est Solid John ?",
    aboutText:
      "Solid John est une marque belge basée à Izegem, dédiée à un seul objectif : produire le bétonplex le plus durable du marché en conditions humides. Sélection rigoureuse des bois, encollage Classe 3 (WBP), garantie 10 ans transparente - pas de petits caractères. Solid John propose une gamme intégrée : bétonplex 15mm, polymère hybride pour collage en environnement humide, et vis de rive de toit en acier galvanisé inoxydable.",
    aboutImage: "/images/marques/solid-john/about.png",
    features: [
      { icon: "ShieldCheck", title: "Garantie 10 ans", description: "Contre gonflage, putréfaction, décollement." },
      { icon: "Droplets", title: "100% Humidité", description: "Bois sélectionnés, encollage Classe 3 WBP." },
      { icon: "TreePine", title: "Bois Durable", description: "Issu de forêts gérées durablement (replantation)." },
      { icon: "Boxes", title: "Système Intégré", description: "Bétonplex + colle polymère + vis rive de toit." },
    ],
    specGroups: [
      {
        title: "Bétonplex",
        items: ["122 cm × 244 cm × 15 mm", "Norme EN 636-3", "Densité 550-650 kg/m³", "Réaction au feu D-s2,d0"],
      },
      {
        title: "Polymère hybride",
        items: ["Polymère MS", "Application -5 °C à +40 °C", "Coloris RAL 9005", "Cartouches 290 ml ou 600 ml"],
      },
      {
        title: "Vis rive de toit",
        items: ["Acier galvanisé Ø 4,2 mm", "Tête plate PH12", "Versions 16 mm et 25 mm", "500 pièces / boîte"],
      },
    ],
    productsTitle: "La gamme Solid John",
    productsCtaLabel: "Voir nos produits Solid John",
    productBrand: "SOLID JOHN",
    story: {
      heading: "Ce n'est pas un hasard s'il est résistant à l'humidité et performant",
      text: "Pendant des années, nos experts ont travaillé sur le développement d'un bétonplex résistant à l'humidité. En Indonésie, nous avons trouvé des bois qui résistent au vent et aux intempéries. Ce bois dur tropical est reconnu pour sa capacité portante exceptionnelle. Les deux atouts répondent parfaitement aux exigences de qualité les plus élevées que nous avons fixées chez Solid John.",
      image: "/images/marques/solid-john/humidite.png",
      points: [
        "Le bon mélange de bois sélectionnés",
        "Encollage WBP garanti (résiste à l'ébullition de l'eau)",
        "Efficace et robuste avec une épaisseur de 15 mm ou 21 mm",
        "Vaste durabilité",
      ],
    },
    useCases: {
      heading: "La base parfaite pour les constructions de toiture et le revêtement de façade",
      cards: [
        { label: "Façade", image: "/images/marques/solid-john/usecase-facade.png" },
        { label: "Crépi", image: "/images/marques/solid-john/usecase-crepi.png" },
        { label: "Revêtement de façade", image: "/images/marques/solid-john/usecase-revetement.png" },
      ],
    },
    colors: {
      primary: "#1A1A1A",
      dark: "#000000",
      accent: "#C8A055",
      bg: "#FBF8F2",
      onPrimary: "#FFFFFF",
    },
  },

  "strato-grip": {
    slug: "strato-grip",
    name: "Strato Grip",
    logo: "/images/logos/strato-grip-logo.png",
    tagline: "Vous allez aimer coller - Colles contact tous matériaux",
    heroPitch:
      "Strato Grip - Le spécialiste français des colles contact industrielles en bonbonne sous pression. Bois, aluminium, cuir, mousses, EPDM : une solution de collage pour chaque matériau.",
    aboutTitle: "Qui est Strato Grip ?",
    aboutText:
      "Strato Grip est une marque française d'Ardemat, experts en solutions de collage industriel. Leurs colles contact type néoprène en bonbonne sous pression et en spray sont conçues pour l'agencement, la menuiserie, la tapisserie, les sols, l'étanchéité EPDM et bien d'autres secteurs. Adhésion instantanée, application rapide, performance exceptionnelle - le tout avec démonstrations et formations gratuites sur site.",
    aboutImage: null,
    features: [
      { icon: "SprayCan", title: "Bonbonne Sous Pression", description: "Application rapide, rendement maximal." },
      { icon: "Layers", title: "Tous Matériaux", description: "Bois, alu, cuir, mousses, EPDM, mélaminé." },
      { icon: "GraduationCap", title: "Démos Gratuites", description: "Formation et démonstration sur vos chantiers." },
      { icon: "Flag", title: "Made in France", description: "Conception et production à Saint-Agrève." },
    ],
    productsTitle: "Nos produits Strato Grip",
    productsCtaLabel: "Voir nos produits Strato Grip",
    productBrand: "STRATO GRIP",
    colors: {
      primary: "#FF6B00",
      dark: "#221F20",
      accent: "#E85A00",
      bg: "#FFF8F2",
      onPrimary: "#221F20",
    },
  },

  soprema: {
    slug: "soprema",
    name: "SOPREMA",
    logo: "/images/logos/soprema-logo.png",
    tagline: "Spécialiste mondial de l'étanchéité depuis 1908",
    heroPitch:
      "SOPREMA - référence mondiale de l'étanchéité, de l'isolation et de la toiture. Membranes bitumineuses, résines ALSAN, systèmes EPDM et solutions végétalisées, distribuées chez Comarden.",
    aboutTitle: "Qui est SOPREMA ?",
    aboutText:
      "Fondée en 1908 à Strasbourg, SOPREMA est un groupe français devenu une référence mondiale dans la production de matériaux d'étanchéité, d'isolation, d'insonorisation et de végétalisation pour le bâtiment et le génie civil. SOPREMA développe des solutions complètes pour les toitures plates et inclinées : membranes bitumineuses SBS, résines liquides ALSAN, systèmes EPDM, isolants PIR et toitures végétalisées. Comarden distribue la gamme SOPREMA en Belgique, avec conseil technique et disponibilité produit sur ses deux sites de Bertrix et Naninne.",
    aboutImage: null,
    features: [
      { icon: "History", title: "Depuis 1908", description: "Plus d'un siècle d'expertise en étanchéité du bâtiment." },
      { icon: "Globe", title: "Référence mondiale", description: "Présent sur tous les continents, leader du secteur." },
      { icon: "Layers", title: "Gamme complète", description: "Membranes SBS, résines ALSAN, EPDM, isolants PIR." },
      { icon: "Leaf", title: "Solutions durables", description: "Toitures végétalisées et performance énergétique." },
    ],
    productsTitle: "Nos produits SOPREMA",
    productsCtaLabel: "Voir nos produits SOPREMA",
    productBrand: "SOPREMA",
    origin: {
      badge: "Fabriqué en Belgique",
      heading: "Bitume SOPREMA : l'étanchéité durable fabriquée en Belgique",
      paragraphs: [
        "Leader du marché belge avec près de 60 % de parts de marché, SOPREMA conçoit et fabrique en Belgique des membranes d'étanchéité bitumineuses reconnues pour leur fiabilité, leur durabilité et leurs performances techniques. Développées à base de bitume modifié SBS, elles offrent une excellente résistance aux intempéries, aux UV, aux variations de température et au vieillissement, garantissant une protection durable des toitures plates.",
        "Chez Comarden, nous mettons à votre disposition une gamme complète de solutions SOPREMA pour les toitures neuves, les rénovations, les bâtiments résidentiels, industriels et tertiaires. Nos spécialistes vous conseillent dans le choix du système d'étanchéité le plus adapté à votre projet et vous accompagnent avec un support technique de qualité ainsi qu'une livraison rapide en Wallonie, à Bruxelles et au Luxembourg.",
      ],
      advantagesTitle: "Les avantages du bitume SOPREMA",
      advantages: [
        "Fabriqué en Belgique",
        "Leader du marché belge avec près de 60 % de parts de marché",
        "Membranes bitumineuses SBS haute performance",
        "Étanchéité durable et fiable",
        "Excellente résistance aux UV, au gel et aux intempéries",
        "Compatible avec les toitures végétalisées et les installations photovoltaïques",
        "Solutions adaptées aux constructions neuves et aux rénovations",
        "Recommandé par les professionnels de la toiture",
      ],
      stat: { value: "≈ 60 %", label: "de parts de marché en Belgique" },
      image: "/images/marques/soprema/bitume-belgique.jpg",
      flag: "be",
    },
    colors: {
      primary: "#003366",
      dark: "#00203F",
      accent: "#0083CA",
      bg: "#F4F8FB",
      onPrimary: "#FFFFFF",
    },
  },

  rockpanel: {
    slug: "rockpanel",
    name: "Rockpanel",
    logo: "/images/logos/rockpanel-logo.png",
    logoNeedsLight: true,
    tagline: "Panneaux de façade durables pour bardage ventilé",
    heroPitch:
      "ROCKPANEL, marque du groupe ROCKWOOL : des panneaux de façade fabriqués à base de roche volcanique pour le bardage ventilé, la rénovation de façade et la construction neuve. Coloris disponibles en stock chez Comarden à Namur et Bertrix.",
    aboutTitle: "Qui est ROCKPANEL ?",
    aboutText:
      "Les panneaux de façade ROCKPANEL sont une solution moderne pour le bardage ventilé, la rénovation de façade et les projets de construction neuve. Fabriqués à base de roche volcanique (basalte), ils combinent l'aspect esthétique d'un panneau de façade haut de gamme avec une excellente durabilité, une grande résistance aux intempéries et un entretien réduit. Marque du groupe ROCKWOOL, ROCKPANEL affiche une durée de vie de 50 ans et 98 % de produits certifiés Cradle to Cradle Certified®. Chez Comarden, nous proposons des solutions ROCKPANEL pour façades, rives, habillages extérieurs et détails architecturaux, avec des coloris disponibles en stock à Namur et Bertrix pour les professionnels et particuliers en Wallonie. ROCKPANEL chez Comarden : le choix idéal pour une façade durable, esthétique et facile à poser.",
    aboutImage: "/images/marques/rockpanel/about.jpg",
    features: [
      {
        icon: "Mountain",
        title: "Roche volcanique",
        description: "Panneaux fabriqués à base de basalte : l'esthétique d'un panneau haut de gamme, la force de la pierre.",
      },
      {
        icon: "Flame",
        title: "Sécurité incendie",
        description: "Aucun compromis : des solutions certifiées jusqu'aux bâtiments élevés et à risque.",
      },
      {
        icon: "History",
        title: "50 ans de durée de vie",
        description: "Résiste aux UV, à l'humidité et aux variations de température, avec un entretien réduit.",
      },
      {
        icon: "Recycle",
        title: "Cradle to Cradle",
        description: "98 % des produits certifiés Cradle to Cradle : démontables, réutilisables et recyclables.",
      },
    ],
    productsTitle: "Nos solutions ROCKPANEL",
    productsCtaLabel: "Voir nos solutions ROCKPANEL",
    productBrand: "ROCKPANEL",
    story: {
      heading: "Facile à poser, prêt à durer",
      text:
        "Les panneaux ROCKPANEL se travaillent comme le bois : découpe directement sur le chantier, sans pré-perçage, et pose possible sur les structures existantes. Légers et faciles à manipuler, ils permettent une installation rapide en bardage ventilé, aussi bien en rénovation qu'en construction neuve. Une fois posés, ils protègent la façade pendant des décennies : les coloris restent stables face aux UV et le panneau résiste à l'humidité comme aux variations de température.",
      image: "/images/marques/rockpanel/story.jpg",
      points: [
        "Découpe sur chantier, sans pré-perçage",
        "Pose possible sur les structures existantes",
        "Fixation par vis ou clous inox",
        "Entretien réduit, coloris stables aux UV",
      ],
    },
    useCases: {
      heading: "Des solutions pour chaque projet de façade",
      coverImages: true,
      cards: [
        { label: "Façades", image: "/images/marques/rockpanel/facades.png" },
        { label: "Rives et habillages extérieurs", image: "/images/marques/rockpanel/rives-habillages.jpg" },
        { label: "Détails architecturaux", image: "/images/marques/rockpanel/details-architecturaux.jpg" },
      ],
    },
    colors: {
      primary: "#14294C",
      dark: "#0B1B33",
      accent: "#C8102E",
      bg: "#F4F6FA",
      onPrimary: "#FFFFFF",
    },
  },

  "danger-amiante": {
    slug: "danger-amiante",
    name: "Danger Amiante",
    logo: "/images/logos/danger-amiante-logo.png",
    logoNeedsLight: true,
    tagline: "Matériaux de remplacement et équipements de protection",
    heroPitch:
      "Une toiture amiantée à remplacer ? Comarden fournit les professionnels : équipements de protection, accessoires et matériaux de remplacement pour préparer l'après-désamiantage, en Wallonie, à Bruxelles et en province du Luxembourg.",
    aboutTitle: "Une toiture amiantée à remplacer ? Comarden fournit les professionnels.",
    aboutText:
      "Les rénovations de toitures contenant de l'amiante demandent rigueur, anticipation et matériaux adaptés. Pour les couvreurs, ardoisiers et entrepreneurs actifs en Wallonie, à Bruxelles et en province du Luxembourg, Comarden est le partenaire de confiance pour préparer l'après-désamiantage : choix de la nouvelle couverture, isolation, étanchéité, accessoires, façonnage et livraison sur chantier. Notre équipe vous conseille sur les solutions les plus adaptées à vos projets : remplacement de plaques ondulées, rénovation de bâtiments agricoles ou industriels, nouvelles couvertures en ardoises, tuiles, tôles ou panneaux sandwich. Avec Comarden, vous disposez d'un interlocuteur spécialisé, proche du terrain, capable de vous aider à gagner du temps et à sécuriser vos approvisionnements.",
    aboutImage: "/images/marques/danger-amiante/about.jpg",
    features: [
      {
        icon: "EyeOff",
        title: "Fibres invisibles",
        description: "Invisibles à l'œil nu, les fibres se libèrent lors des travaux de toiture, découpe, perçage ou nettoyage.",
      },
      {
        icon: "HeartPulse",
        title: "Maladies graves",
        description: "Asbestose, cancer du poumon et mésothéliome peuvent apparaître des dizaines d'années après l'exposition.",
      },
      {
        icon: "HardHat",
        title: "Vigilance chantier",
        description: "Une simple intervention sur une toiture ancienne peut libérer des fibres dangereuses.",
      },
      {
        icon: "ShieldCheck",
        title: "Protection adaptée",
        description: "Masque P3, combinaison jetable, gants, lunettes, big bag amiante et procédure de décontamination.",
      },
    ],
    productsTitle: "La gamme amiante",
    productsCtaLabel: "Découvrir la gamme",
    productBrand: "AMIANTE",
    indexable: true,
    story: {
      heading: "Danger amiante !",
      text:
        "L'amiante est un matériau extrêmement dangereux lorsqu'il libère des fibres dans l'air. Invisibles à l'œil nu, ces fibres peuvent être inhalées lors des travaux de toiture, de rénovation, de découpe, de perçage, de nettoyage ou de manipulation de plaques en amiante-ciment. Une fois inhalées, elles peuvent rester durablement dans les poumons et provoquer, parfois plusieurs dizaines d'années après l'exposition, des maladies graves comme l'asbestose, le cancer du poumon ou le mésothéliome. Avant toute intervention sur une toiture ancienne, il est indispensable d'identifier les matériaux à risque, de respecter la réglementation amiante en vigueur et d'utiliser les équipements de protection adaptés.",
      image: "/images/marques/danger-amiante/danger.jpg",
      points: [
        "Masque P3",
        "Combinaison jetable, gants et lunettes",
        "Big bag amiante homologué",
        "Procédure de décontamination",
      ],
    },
    notice: {
      eyebrow: "Prévention",
      heading: "L'amiante expliqué simplement",
      text:
        "L'amiante est une matière que l'on utilisait autrefois dans certaines maisons, surtout dans les toitures, les murs ou les vieux bâtiments. Le problème, c'est que quand l'amiante est abîmé, cassé ou découpé, il peut envoyer dans l'air de toutes petites poussières invisibles. Ces poussières peuvent entrer dans les poumons quand on respire et rendre les personnes malades, parfois longtemps après. C'est pour cela qu'il ne faut jamais toucher, casser ou jouer avec de vieux morceaux de toiture, de plaques ou de matériaux que l'on ne connaît pas. Si tu vois un vieux matériau cassé ou suspect, il faut prévenir un adulte et ne pas y toucher.",
      pointsTitle: "À retenir",
      points: [
        "On ne touche pas aux vieux matériaux cassés",
        "On ne joue pas près de plaques ou morceaux suspects",
        "On prévient toujours un adulte",
        "Seuls les professionnels équipés peuvent intervenir en sécurité",
      ],
    },
    colors: {
      primary: "#F7B500",
      dark: "#1A1A1A",
      accent: "#D71920",
      bg: "#FFFBEF",
      onPrimary: "#1A1A1A",
    },
  },
};

export const BRAND_SLUGS = Object.keys(BRANDS);

export function getBrand(slug: string): BrandConfig | null {
  return BRANDS[slug] ?? null;
}

export function allBrands(): BrandConfig[] {
  return BRAND_SLUGS.map((s) => BRANDS[s]);
}

/** Maps a products.brand value (e.g. "SOPREMA") to its /marques slug, or null. */
export function getBrandSlugForProductBrand(brandValue?: string | null): string | null {
  if (!brandValue) return null;
  const v = brandValue.trim().toLowerCase();
  const found = allBrands().find(
    (b) => (b.productBrand ?? "").trim().toLowerCase() === v
  );
  return found ? found.slug : null;
}
