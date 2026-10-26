import type { Edition, TicketType } from "./types";

// Ticket perks come from the old site's "Register to Attend" card. Prices are an
// open question in the brief, so they are left unset and render as "to be announced".
const africaTickets: TicketType[] = [
  {
    id: "delegate",
    name: "Delegate",
    description: "Full access to the main conference experience.",
    perks: [
      "All keynote sessions",
      "All panel discussions and fireside chats",
      "Networking sessions",
      "Event kit and delegate badge",
    ],
    highlighted: true,
    approval: true,
  },
  {
    id: "group",
    name: "Group",
    description: "For organisations registering five or more delegates together.",
    perks: [
      "Everything in Delegate",
      "One point of contact for your team",
      "Group invoicing through the secretariat",
    ],
    approval: true,
  },
  {
    id: "vip",
    name: "VIP",
    description: "For invited guests, partners and dignitaries.",
    perks: ["Everything in Delegate", "Issued by invitation or partnership package"],
    approval: true,
  },
];

export const editions: Edition[] = [
  {
    slug: "africa-2026",
    name: "InnTech Africa 2026",
    shortName: "InnTech Africa",
    location: "Location to be announced",
    stage: "registration-open",
    // Taken from the countdown widget on the old homepage. Confirm before launch.
    startsAt: "2026-11-25T09:00:00+01:00",
    endsAt: "2026-11-25T17:00:00+01:00",
    dateLabel: "November 2026",
    timezone: "Africa/Lagos",
    timezoneLabel: "WAT",
    currency: "NGN",
    theme: "AI, Digital Economy and Sustainability",
    summary:
      "The second edition of InnTech brings Africa’s policymakers, executives, development partners, founders and young innovators back together to turn the conversations of Abuja 2025 into action on AI, the digital economy and sustainability.",
    heroImage: "/images/gallery/022-38.jpg",
    tickets: africaTickets,
    faqs: [
      {
        question: "Where will InnTech Africa 2026 hold?",
        answer:
          "The venue will be announced here and sent to everyone who registers. Register now to be first to receive venue, agenda and travel details.",
      },
      {
        question: "How much does a pass cost?",
        answer:
          "Pass pricing will be published on the registration page. Registrations are reviewed by the secretariat, who will confirm your pass and any fee by email.",
      },
    ],
  },
  {
    slug: "dallas-2026",
    name: "InnTech Dallas 2026",
    shortName: "InnTech Dallas",
    location: "Dallas, Texas, USA",
    city: "Dallas",
    country: "United States",
    stage: "announced",
    dateLabel: "Summer 2026",
    timezone: "America/Chicago",
    timezoneLabel: "CT",
    currency: "USD",
    theme: "AI, Digital Economy and Sustainability",
    summary:
      "InnTech takes the conversation global, connecting Africa’s innovators and leaders with the diaspora, investors and partners in the United States.",
    heroImage: "/images/editions/dallas.jpg",
    accent: "#39cbe2",
    tickets: [],
  },
  {
    slug: "abuja-2025",
    name: "InnTech Summit 2025",
    shortName: "Abuja 2025",
    location: "Abuja, Nigeria",
    city: "Abuja",
    country: "Nigeria",
    stage: "concluded",
    startsAt: "2025-11-25T09:00:00+01:00",
    endsAt: "2025-11-25T17:00:00+01:00",
    dateLabel: "25 November 2025",
    timezone: "Africa/Lagos",
    timezoneLabel: "WAT",
    currency: "NGN",
    venue: {
      name: "Shehu Musa Yar’Adua Centre",
      address: "Main Auditorium, Shehu Musa Yar’Adua Centre, Abuja, Nigeria",
      mapQuery: "Shehu Musa Yar'Adua Centre, Abuja, Nigeria",
    },
    theme: "AI, Digital Economy and Sustainability",
    summary:
      "The inaugural InnTech Summit convened more than 300 leaders, innovators and stakeholders at the Shehu Musa Yar’Adua Centre to chart Africa’s digital and sustainable future.",
    heroImage: "/images/gallery/022-8.jpg",
    tickets: [],
    recap: {
      headline: "InnTech Summit 2025 successfully concluded in Abuja",
      body: "Thank you to the 300+ leaders, innovators and stakeholders who joined us to shape Africa’s digital and sustainable future. Convened by iCentra, the summit spotlighted the often-overlooked sustainability implications of emerging technologies and the generation of African innovators reshaping markets, institutions and governance.",
      stats: [
        { label: "Attendees", value: 300, suffix: "+" },
        { label: "Speakers", value: 20, suffix: "+" },
        { label: "Sessions", value: 7 },
        { label: "Partners", value: 16 },
      ],
      highlights: [
        {
          title: "Opening keynote",
          speaker: "niyi-yusuf",
          body: "A compelling keynote on AI’s transformative potential: boosting productivity, enhancing competitiveness and fostering inclusive growth, and the coordinated public–private action needed to secure Africa’s place in the global AI landscape.",
        },
        {
          title: "Welcome address",
          speaker: "taopheek-babayeju",
          body: "The convener described Africa as “the world’s fastest-growing digital economy”, facing energy constraints, digital divides and climate vulnerabilities, yet home to a rising generation of innovators reshaping markets, institutions and governance.",
        },
        {
          title: "Nigeria’s green digital economy",
          speaker: "kashifu-inuwa-abdullahi",
          body: "Represented by Dr. Aristotle Onumo, NITDA shared a roadmap for sustainable innovation, GreenTech opportunities and resilient, environmentally conscious digital infrastructure across the continent.",
        },
        {
          title: "Fireside chat: AI and data governance",
          speaker: "vincent-olatunji",
          body: "Regulatory and ethical frameworks for AI: data privacy, algorithmic transparency, trust frameworks and Africa’s emerging AI regulatory architecture.",
        },
      ],
    },
  },
];
