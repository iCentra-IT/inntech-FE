import type { GalleryPhoto, Testimonial } from "./types";

export const testimonials: Testimonial[] = [
  {
    quote:
      "Africa is not waiting to be invited into the future; Africa is building the future. And together we can ensure that our digital revolution is smart, inclusive, and most importantly, sustainable.",
    name: "Taopheek Babayeju",
    role: "CEO, iCentra",
    photo: "/images/speakers/taopheek-babayeju.png",
  },
  {
    quote:
      "In the next 30 years, one in four people will be African. If we don’t find a way to adapt to AI and make it speak our language, we risk being left behind.",
    name: "Lola Adey",
    role: "CEO, PIPA",
    photo: "/images/speakers/lola-adey.png",
  },
  {
    quote:
      "Innovation knows no boundaries and is ever-expanding, living within all of us. Young people must continue to fan the embers, think outside the box and discover their core.",
    name: "Barr. Olumide Bidemi",
    role: "CEO, TaxTech",
    photo: "/images/speakers/olumide-bidemi.png",
  },
  {
    quote:
      "Paying attention to the African Continental Free Trade Area (AfCFTA) is vital for building AI businesses that can scale. A unified market supports talent retention and enables mobility at national and continental levels.",
    name: "Anna Ekeledo",
    role: "Executive Director, AfriLabs",
    photo: "/images/speakers/anna-ekeledo.png",
  },
];

export const outcomes = [
  {
    title: "Policy communiqué",
    body: "A policy communiqué for African digital growth, shaped by regulators, industry and development partners.",
  },
  {
    title: "SDG-aligned innovation",
    body: "Innovations aligned with the Sustainable Development Goals, surfaced and showcased to decision-makers.",
  },
  {
    title: "Partnerships & investment",
    body: "New partnerships and investment pipelines between founders, corporates, investors and government.",
  },
  {
    title: "Green Digital Africa",
    body: "The launch of Green Digital Africa, an agenda for sustainable, low-carbon digital transformation.",
  },
];

const photo = (file: string, alt: string, height = 1333): GalleryPhoto => ({
  src: `/images/gallery/${file}.jpg`,
  alt,
  width: 2000,
  height,
});

// Abuja 2025 event photography (uploaded to the old site in December 2025).
export const abujaGallery: GalleryPhoto[] = [
  photo("022-38", "Delegates fill the hall as a speaker takes a selfie with the audience"),
  photo("022-8", "Speakers and partners on stage in front of the InnTech Summit 2025 backdrop"),
  photo("02-71", "A speaker delivers remarks at the InnTech lectern"),
  photo("02-98", "Panellists in conversation beneath the summit theme"),
  photo("01-19", "Panel discussion on the main stage"),
  photo("02-24", "A full auditorium listening to a session"),
  photo("01-68", "The InnTech volunteer team at the welcome wall"),
  photo("022-39", "Speakers pose together after a session"),
  photo("02-60", "Delegates gather in front of the partner wall"),
  photo("02-92", "Delegates celebrate during an interactive moment"),
  photo("01-47", "Delegates seated in the main auditorium"),
  photo("02-48", "A delegate asks a question from the floor"),
  photo("MRKARLIII-12", "Delegates at the Welcome to InnTech Summit 2025 wall"),
  photo("02-26", "A partner receives a certificate of appreciation"),
  photo("01-48", "Guests exchange greetings at the summit"),
  photo("022-30", "A speaker addresses delegates in front of the partner wall"),
  photo("02-15", "A delegate follows a session from the audience"),
  photo("MRKARLIII", "The delegate registration desk"),
  photo("01-14", "Registration volunteers help delegates check in"),
  photo("02-32", "Partners recognised on stage"),
  photo("01-4", "A panel in session on the main stage"),
  photo("02-42", "Young delegates take a selfie in the audience"),
  photo("MRKARLIII-34", "Delegates in conversation during a break"),
  photo("01-39", "Panellists listen during a discussion"),
];

export const heroPhotos = {
  home: "/images/gallery/022-38.jpg",
  about: "/images/gallery/01-19.jpg",
  stage: "/images/gallery/022-8.jpg",
  podium: "/images/gallery/02-71.jpg",
  fireside: "/images/gallery/02-98.jpg",
  audience: "/images/gallery/02-24.jpg",
  registration: "/images/gallery/MRKARLIII.jpg",
  partners: "/images/gallery/02-60.jpg",
  exhibit: "/images/gallery/01-14.jpg",
  media: "/images/gallery/01-68.jpg",
  speak: "/images/gallery/02-48.jpg",
  contact: "/images/gallery/MRKARLIII-34.jpg",
  news: "/images/gallery/02-92.jpg",
} as const;
