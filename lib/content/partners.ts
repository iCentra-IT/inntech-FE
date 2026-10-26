import type { Partner, PartnershipPackage } from "./types";

export const partners: Partner[] = [
  { slug: "icentra", name: "iCentra", logo: "/images/partners/icentra.png", tier: "organizer", editions: ["abuja-2025", "africa-2026", "dallas-2026"], url: "https://www.icentra.com" },
  { slug: "ndpc", name: "Nigeria Data Protection Commission", logo: "/images/partners/NDPC-Nigeria.jpg", tier: "strategic", editions: ["abuja-2025"] },
  { slug: "pic", name: "Policy Innovation Centre", logo: "/images/partners/PIC-02.jpg", tier: "strategic", editions: ["abuja-2025"] },
  { slug: "nesg", name: "Nigerian Economic Summit Group", logo: "/images/partners/nesg.png", tier: "strategic", editions: ["abuja-2025"] },
  { slug: "verraki", name: "Verraki Partners", logo: "/images/partners/veraki.png", tier: "sponsor", editions: ["abuja-2025"] },
  { slug: "microvis", name: "Microvis Microfinance Bank", logo: "/images/partners/microvis.png", tier: "sponsor", editions: ["abuja-2025"] },
  { slug: "steady-anchor", name: "Steady Anchor", logo: "/images/partners/steady.png", tier: "sponsor", editions: ["abuja-2025"] },
  { slug: "management-edge", name: "Management Edge", logo: "/images/partners/Partners-40-1.jpg", tier: "supporting", editions: ["abuja-2025"] },
  { slug: "taxtech", name: "TaxTech", logo: "/images/partners/Partners-34.jpg", tier: "supporting", editions: ["abuja-2025"] },
  { slug: "ipnx", name: "ipNX", logo: "/images/partners/Partners-38.jpg", tier: "supporting", editions: ["abuja-2025"] },
  { slug: "hotspot", name: "Hotspot Network Limited", logo: "/images/partners/hotspot.png", tier: "supporting", editions: ["abuja-2025"] },
  { slug: "moneyline", name: "MoneyLine with Nancy on AIT", logo: "/images/partners/Partners-32.jpg", tier: "supporting", editions: ["abuja-2025"] },
  { slug: "whyfinite", name: "WhyFinite", logo: "/images/partners/Partners-37.jpg", tier: "supporting", editions: ["abuja-2025"] },
  { slug: "clasier", name: "Clasier", logo: "/images/partners/Partners-35.jpg", tier: "supporting", editions: ["abuja-2025"] },
  { slug: "takeout-media", name: "Takeout Media", logo: "/images/partners/Partners-36.jpg", tier: "supporting", editions: ["abuja-2025"] },
  { slug: "midlothian", name: "Midlothian Angel Network", logo: "/images/partners/Partners-40.jpg", tier: "supporting", editions: ["abuja-2025"] },
];

export const tierLabels: Record<Partner["tier"], string> = {
  organizer: "Organiser",
  strategic: "Strategic partners",
  sponsor: "Sponsors",
  supporting: "Supporting partners",
  media: "Media partners",
};

export const partnerBenefits = [
  {
    title: "Brand visibility before global delegates",
    body: "Put your brand in front of policymakers, executives, investors and innovators across Africa and the diaspora.",
  },
  {
    title: "Access to decision-makers and investors",
    body: "Meet the regulators, corporate leaders and development partners shaping Africa’s digital economy.",
  },
  {
    title: "Align with Africa’s most forward-looking summit",
    body: "Position your organisation at the centre of the conversation on AI, the digital economy and sustainability.",
  },
];

// Packages and benefits as published on the old /sponsors-partners page.
// Prices are an open question in the brief and are not shown.
export const packages: PartnershipPackage[] = [
  {
    id: "platinum",
    name: "Platinum Partner",
    tagline: "Title recognition across the summit",
    vipPasses: 6,
    highlighted: true,
    benefits: [
      "Title recognition (co-branding across all event assets)",
      "Keynote speaking slot (subject to agenda fit)",
      "Logo lock-up on main stage backdrop, step-and-repeat wall and media board",
      "Feature story in pre-event press release and post-event report",
      "Priority interview window with media partners and official photo-ops",
      "Recognition and mention before, during and after the event",
      "Digital visibility: website, newsletter feature and social spotlights",
      "Premium exhibition booth",
    ],
  },
  {
    id: "gold",
    name: "Gold Partner",
    tagline: "A voice on stage and prominent branding",
    vipPasses: 4,
    benefits: [
      "Speaking slot (panel or fireside; subject to agenda fit)",
      "Prominent branding onsite (screens and banners) and across digital channels",
      "Recognition and mention before, during and after the event",
      "Inclusion in press materials and media interviews (as available)",
      "Large exhibition booth",
    ],
  },
  {
    id: "silver",
    name: "Silver Partner",
    tagline: "Visibility and a seat at the table",
    vipPasses: 3,
    benefits: [
      "Speaking slot (shared panel; subject to agenda fit)",
      "Recognition and mention before, during and after the event",
      "Logo visibility on website, stage screens and printed materials",
      "Exhibition booth",
    ],
  },
  {
    id: "venue",
    name: "Venue Partner",
    tagline: "Own the room",
    vipPasses: 3,
    benefits: [
      "Prominent branding in the event hall",
      "Logo visibility on website, stage screens and printed materials",
      "Recognition and mention before, during and after the event",
      "Exhibition booth",
    ],
  },
  {
    id: "refreshments",
    name: "Refreshments Partner",
    tagline: "Lunch and tea breaks",
    vipPasses: 2,
    benefits: [
      "Sole branding of lunch and tea areas (table-toppers, tent cards, screen mentions)",
      "Logo visibility on website, stage screens and printed materials",
      "Recognition and mention before, during and after the event",
      "Exhibition booth",
    ],
  },
  {
    id: "accreditation",
    name: "Accreditation Partner",
    tagline: "Process, name badges and lanyards",
    vipPasses: 1,
    benefits: [
      "Branding of name badges and lanyards",
      "Logo visibility on website, stage screens and printed materials",
      "Recognition and mention before, during and after the event",
    ],
  },
  {
    id: "supporting",
    name: "Supporting Partner",
    tagline: "Custom collaboration",
    vipPasses: 1,
    benefits: [
      "Bespoke branding and engagement aligned to your interests",
      "Recognition and mention before, during and after the event",
    ],
  },
];
