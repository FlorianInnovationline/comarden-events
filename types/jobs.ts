export interface JobPosting {
  slug: string;
  /** Full title used on the detail page, e.g. "Technico-commercial·e interne (F/H/X) — Naninne" */
  title: string;
  /** Shorter title used on the card, e.g. "Commercial·e interne — Naninne" */
  shortTitle: string;
  /** Full location string, e.g. "Naninne (Namur)" */
  location: string;
  contractType: string;
  /** "Sédentaire" | "Itinérant" */
  workType: string;
  /** 1–2 lines used on the card */
  teaser: string;
  /** Subtitle / one-liner shown beneath the hero title */
  subtitle: string;
  /** "À propos de Comarden" intro paragraph */
  companyIntro: string;
  /** "En tant que..." paragraph */
  roleOverview: string;
  responsibilities: string[];
  profile: string[];
  /** e.g. "7h30 – 17h00, avec système de récupération" — optional */
  horaires?: string;
  benefits: string[];
  permisBRequired?: boolean;
  vehicleProvided?: boolean;
  isActive: boolean;
}

export type DriverLicense = "oui" | "non";

export type SkillLevel =
  | "Très bonnes"
  | "Bonnes"
  | "Moyennes"
  | "Faibles"
  | "";

export interface ApplicationFormValues {
  // Step 1 — Poste souhaité
  position: string;

  // Step 2 — Coordonnées
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  city: string;
  postalCode: string;
  birthDate: string; // optional

  // Step 3 — Situation et expérience
  currentPosition: string; // optional
  availableFrom: string;
  hasDriverLicense: DriverLicense | "";
  salesSkills: SkillLevel; // optional
  technicalKnowledge: SkillLevel; // required
  yearsCounterSales: string; // optional, number as string
  yearsFieldSales: string; // optional, number as string

  // Step 4 — Documents et message
  cv: File | null;
  coverLetter: File | null;
  message: string; // optional, max 1000
  gdprConsent: boolean;
}

export type FormErrors = Partial<
  Record<keyof ApplicationFormValues, string>
>;

/** Serialisable payload logged/sent on submit (files → name + size). */
export interface ApplicationPayload {
  position: string;
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  city: string;
  postalCode: string;
  birthDate: string;
  currentPosition: string;
  availableFrom: string;
  hasDriverLicense: DriverLicense | "";
  salesSkills: SkillLevel;
  technicalKnowledge: SkillLevel;
  yearsCounterSales: string;
  yearsFieldSales: string;
  cvFileName: string;
  cvFileSize: number;
  coverLetterFileName: string;
  coverLetterFileSize: number;
  message: string;
  gdprConsent: boolean;
}
