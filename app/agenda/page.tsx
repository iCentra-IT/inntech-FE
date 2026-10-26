import type { Metadata } from "next";
import { Suspense } from "react";
import { heroPhotos } from "@/lib/content/home";
import { getEditions, getFeaturedEdition, getSessions, withSpeakers } from "@/lib/queries";
import { AgendaView, type AgendaEdition } from "@/components/sections/agenda-view";
import { CtaBand } from "@/components/sections/cta-band";
import { SessionList } from "@/components/sections/session-list";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Agenda",
  description: "Keynotes, panels and fireside chats at InnTech: the full programme for every edition.",
  alternates: { canonical: "/agenda" },
};

export default function AgendaPage() {
  const editions: AgendaEdition[] = getEditions().map((e) => ({
    slug: e.slug,
    name: e.name,
    dateLabel: e.dateLabel,
    venue: e.venue?.name,
    timezone: e.timezone,
    sessions: withSpeakers(getSessions(e.slug)),
  }));
  // Open on the next edition only once it has sessions; otherwise show the latest programme.
  const featured = getFeaturedEdition();
  const defaultEdition = editions.find((e) => e.slug === featured.slug)?.sessions.length
    ? featured.slug
    : (editions.find((e) => e.sessions.length > 0)?.slug ?? featured.slug);

  return (
    <>
      <PageHero
        eyebrow="Agenda"
        title="The programme"
        lead="Keynotes, policy dialogues, panels and fireside chats on AI, the digital economy and sustainability."
        image={heroPhotos.podium}
        crumbs={[{ label: "Agenda" }]}
      />
      <Section>
        {/* The view reads ?edition= on the client; the fallback keeps the default programme in the static HTML. */}
        <Suspense fallback={<SessionList sessions={editions.find((e) => e.slug === defaultEdition)?.sessions ?? []} />}>
          <AgendaView editions={editions} defaultEdition={defaultEdition} />
        </Suspense>
      </Section>
      <CtaBand />
    </>
  );
}
