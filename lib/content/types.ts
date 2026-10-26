// Content model for the site. These shapes mirror the collections a headless CMS
// (Payload, per the brief) would expose, so the data files in this folder can be
// swapped for CMS queries in lib/queries.ts without touching the pages.

export type EditionStage =
  | "announced"
  | "registration-open"
  | "final-week"
  | "live"
  | "concluded";

export type Venue = {
  name: string;
  address: string;
  /** Free-text query used for the embedded map and "Get directions" link. */
  mapQuery: string;
};

export type TicketType = {
  id: string;
  name: string;
  description: string;
  /** Price in the edition currency. Omit when pricing has not been published. */
  price?: number;
  earlyBirdPrice?: number;
  earlyBirdEnds?: string;
  perks: string[];
  highlighted?: boolean;
  /** Requires secretariat approval before a pass is issued. */
  approval?: boolean;
};

export type EditionFaq = { question: string; answer: string };

export type Edition = {
  slug: string;
  name: string;
  shortName: string;
  /** Display location, e.g. "Abuja, Nigeria" or "Location to be announced". */
  location: string;
  city?: string;
  country?: string;
  stage: EditionStage;
  /** ISO start with offset. Drives the countdown; omit while dates are unconfirmed. */
  startsAt?: string;
  endsAt?: string;
  /** Human label shown wherever the exact date is not yet fixed. */
  dateLabel: string;
  timezone: string;
  timezoneLabel: string;
  currency: "NGN" | "USD";
  venue?: Venue;
  theme: string;
  summary: string;
  heroImage: string;
  /** Optional per-edition accent (brief: sub-brands may add one accent each). */
  accent?: string;
  tickets: TicketType[];
  faqs?: EditionFaq[];
  livestreamUrl?: string;
  communiqueUrl?: string;
  recap?: {
    headline: string;
    body: string;
    stats: { label: string; value: number; suffix?: string }[];
    highlights: { title: string; speaker: string; body: string }[];
  };
};

export type Speaker = {
  slug: string;
  name: string;
  honorific?: string;
  role: string;
  organisation?: string;
  /** Omit when no photo is available; an initials avatar is shown instead. */
  photo?: string;
  editions: string[];
  featured?: boolean;
  /** Old WordPress slug, redirected to the new one. */
  legacySlug?: string;
  shortBio: string;
  bio: string[];
  links?: { label: string; href: string }[];
};

export type SessionFormat = "Keynote" | "Panel" | "Fireside Chat" | "Opening" | "Networking";

export type Session = {
  id: string;
  edition: string;
  day: number;
  /** Displayed slot when exact times are unknown, e.g. "Morning". */
  slot: string;
  startsAt?: string;
  endsAt?: string;
  format: SessionFormat;
  title: string;
  track?: string;
  room?: string;
  speakers: string[];
  /** Shown when a session is led by an organisation rather than named speakers. */
  ledBy?: string;
};

export type PartnerTier = "organizer" | "strategic" | "sponsor" | "supporting" | "media";

export type Partner = {
  slug: string;
  name: string;
  logo: string;
  tier: PartnerTier;
  editions: string[];
  url?: string;
};

export type PartnershipPackage = {
  id: string;
  name: string;
  tagline?: string;
  vipPasses: number;
  benefits: string[];
  highlighted?: boolean;
};

export type NewsCategory = "Press Releases" | "Insights" | "Media" | "Updates";

export type NewsPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  categories: NewsCategory[];
  image: string;
  /** Lightweight markdown: ## headings, - lists, > quotes, **bold**. */
  body: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  photo?: string;
};

export type GalleryPhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Faq = { question: string; answer: string; category: string };
