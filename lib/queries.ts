// Data access layer. Pages read content only through these functions, so moving
// to a CMS (Payload in the brief) means changing this file, not the pages.
import { sessions } from "./content/agenda";
import { editions } from "./content/editions";
import { posts } from "./content/news";
import { partners } from "./content/partners";
import { speakers } from "./content/speakers";
import type { Edition, EditionStage, Partner, Session } from "./content/types";
import { speakerName, speakerTitle } from "./utils";

const upcomingStages: EditionStage[] = ["registration-open", "final-week", "live", "announced"];

export function getEditions() {
  return editions;
}

export function getEdition(slug: string) {
  return editions.find((e) => e.slug === slug);
}

/** Editions that have not concluded, most actionable stage first. */
export function getUpcomingEditions() {
  return editions
    .filter((e) => e.stage !== "concluded")
    .sort((a, b) => upcomingStages.indexOf(a.stage) - upcomingStages.indexOf(b.stage));
}

export function getPastEditions() {
  return editions.filter((e) => e.stage === "concluded");
}

/** The edition the homepage hero and header CTA point at. */
export function getFeaturedEdition(): Edition {
  return getUpcomingEditions()[0] ?? editions[0];
}

export function getSpeakers(edition?: string) {
  return edition ? speakers.filter((s) => s.editions.includes(edition)) : speakers;
}

export function getFeaturedSpeakers() {
  return speakers.filter((s) => s.featured);
}

export function getSpeaker(slug: string) {
  return speakers.find((s) => s.slug === slug);
}

export function getSessions(edition?: string) {
  return edition ? sessions.filter((s) => s.edition === edition) : sessions;
}

export function getSessionsForSpeaker(slug: string) {
  return sessions.filter((s) => s.speakers.includes(slug));
}

export function getPartners(edition?: string) {
  return edition ? partners.filter((p) => p.editions.includes(edition)) : partners;
}

export function groupPartnersByTier(list: Partner[]) {
  const order: Partner["tier"][] = ["organizer", "strategic", "sponsor", "supporting", "media"];
  return order
    .map((tier) => ({ tier, partners: list.filter((p) => p.tier === tier) }))
    .filter((g) => g.partners.length > 0);
}

export function getPosts() {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 3) {
  const post = getPost(slug);
  if (!post) return [];
  return getPosts()
    .filter((p) => p.slug !== slug)
    .sort(
      (a, b) =>
        b.categories.filter((c) => post.categories.includes(c)).length -
        a.categories.filter((c) => post.categories.includes(c)).length,
    )
    .slice(0, limit);
}

/** Editions a visitor can still sign up for, as form options. */
export function getEditionOptions() {
  return getUpcomingEditions().map((e) => ({ value: e.slug, label: `${e.name} · ${e.dateLabel}` }));
}

export type SessionSpeaker = { slug: string; name: string; title: string; photo?: string };
export type SessionWithSpeakers = Omit<Session, "speakers"> & { speakers: SessionSpeaker[] };

/** Resolves speaker slugs to the small summary the agenda UI needs. */
export function withSpeakers(list: Session[]): SessionWithSpeakers[] {
  return list.map((s) => ({
    ...s,
    speakers: s.speakers.flatMap((slug) => {
      const sp = getSpeaker(slug);
      return sp ? [{ slug, name: speakerName(sp), title: speakerTitle(sp), photo: sp.photo }] : [];
    }),
  }));
}
