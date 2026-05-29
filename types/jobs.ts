export interface JobPosting {
  slug: string;
  title: string;
  /** Short display name, e.g. "Naninne" */
  location: string;
  /** Full location string shown in the modal, e.g. "Naninne (Namur)" */
  locationDetail: string;
  /** One-line teaser shown on the card */
  description: string;
  /** Array of paragraphs shown in the detail modal */
  fullDescription: string[];
  contractType: string;
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
