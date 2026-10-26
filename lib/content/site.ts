export const site = {
  name: "InnTech Summit",
  fullName: "Innovation & Technology Summit",
  url: "https://inntechsummit.com",
  tagline: "Inspiring Innovation. Harnessing Technology. Accelerating Transformation.",
  description:
    "The Innovation & Technology Summit (InnTech Summit) is Africa’s premier gathering for leaders, innovators, policymakers, entrepreneurs and youth, convening on AI, the Digital Economy and Sustainability.",
  organizer: { name: "iCentra", url: "https://www.icentra.com" },
  contact: {
    email: "secretariat@inntechsummit.com",
    registrationEmail: "registration@inntechsummit.com",
    partnershipEmail: "partnership@inntechsummit.com",
    phone: "+234 702 522 2110",
    phoneHref: "tel:+2347025222110",
    address: "47B Kumasi Crescent, Wuse II, Abuja 900288, Nigeria",
    mapQuery: "47B Kumasi Crescent, Wuse II, Abuja, Nigeria",
  },
  partnershipContact: {
    name: "Lum Ambe",
    phone: "+234 805 484 7288",
    phoneHref: "tel:+2348054847288",
    whatsapp: "https://wa.me/2348054847288",
  },
  // The old site rendered these icons without links. Add each profile URL here;
  // icons with an empty href are not rendered.
  socials: {
    linkedin: "",
    x: "",
    instagram: "",
    facebook: "",
    youtube: "",
  },
} as const;

export const pillars = [
  {
    key: "ai",
    title: "Artificial Intelligence",
    body: "Harnessing AI for productivity, competitiveness and inclusive growth, trained on African realities and governed responsibly.",
  },
  {
    key: "digital-economy",
    title: "Digital Economy",
    body: "Building resilient digital economies that empower citizens and businesses, from infrastructure and payments to skills.",
  },
  {
    key: "sustainability",
    title: "Sustainability",
    body: "Aligning innovation with the planet: green digital infrastructure, GreenTech and SDG-aligned transformation.",
  },
] as const;

export type NavItem = { label: string; href: string; description?: string };

export const mainNav: (NavItem & { children?: NavItem[] })[] = [
  { label: "About", href: "/about" },
  { label: "Editions", href: "/editions" },
  { label: "Agenda", href: "/agenda" },
  { label: "Speakers", href: "/speakers" },
  { label: "Partners", href: "/partners" },
  { label: "Exhibit", href: "/exhibit" },
  {
    label: "Media",
    href: "/media",
    children: [
      { label: "Media centre", href: "/media", description: "Press kit, photos and media contacts" },
      { label: "News & insights", href: "/news", description: "Press releases and thought leadership" },
      { label: "Media accreditation", href: "/media#accreditation", description: "Apply to cover the summit" },
      { label: "Gallery", href: "/editions/abuja-2025#gallery", description: "Highlights from Abuja 2025" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export const footerNav: { title: string; links: NavItem[] }[] = [
  {
    title: "Summit",
    links: [
      { label: "About InnTech", href: "/about" },
      { label: "Editions", href: "/editions" },
      { label: "Agenda", href: "/agenda" },
      { label: "Speakers", href: "/speakers" },
      { label: "Call for speakers", href: "/speak" },
    ],
  },
  {
    title: "Take part",
    links: [
      { label: "Register", href: "/register" },
      { label: "Partner with us", href: "/partners" },
      { label: "Exhibit", href: "/exhibit" },
      { label: "Media accreditation", href: "/media#accreditation" },
      { label: "FAQs", href: "/faq" },
    ],
  },
  {
    title: "Newsroom",
    links: [
      { label: "News & insights", href: "/news" },
      { label: "Media centre", href: "/media" },
      { label: "Abuja 2025 recap", href: "/editions/abuja-2025" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const legalNav: NavItem[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Refunds", href: "/refunds" },
];
