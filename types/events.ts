export interface EventPartner {
  name: string;
  logo?: string;
  recap: string;
  contactName?: string;
  contactEmail?: string;
  website?: string;
}

export interface EventMedia {
  type: "image" | "video";
  src: string;
  alt: string;
  /** For YouTube videos, the bare 11-char ID (preferred over a full URL). */
  youtubeId?: string;
  /** Optional poster for video thumbnails. */
  poster?: string;
}

export interface ComardenEvent {
  slug: string;
  title: string;
  date: string;
  dateLabel: string;
  audience?: string;
  location?: string;
  horaires?: string;
  status: "upcoming" | "past";
  teaser: string;
  intro: string;
  partners: EventPartner[];
  media: EventMedia[];
}
