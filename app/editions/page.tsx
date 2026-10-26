import type { Metadata } from "next";
import { getPastEditions, getUpcomingEditions } from "@/lib/queries";
import { CtaBand } from "@/components/sections/cta-band";
import { EditionCard } from "@/components/ui/edition-card";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Editions",
  description: "InnTech Africa (November 2026), InnTech Dallas and the archive of past editions, starting with InnTech Summit 2025 in Abuja.",
  alternates: { canonical: "/editions" },
};

export default function EditionsPage() {
  const upcoming = getUpcomingEditions();
  const past = getPastEditions();
  return (
    <>
      <PageHero
        eyebrow="Editions"
        title="One summit. Many cities."
        lead="InnTech is expanding beyond Abuja and stepping onto the global stage, convening leaders, innovators and visionaries across continents."
        crumbs={[{ label: "Editions" }]}
      />
      <Section>
        <SectionHeader eyebrow="Upcoming" title="Where we’re heading next" />
        <div className="grid gap-5 lg:grid-cols-2">
          {upcoming.map((e, i) => (
            <Reveal key={e.slug} delay={i * 100}>
              <EditionCard edition={e} size="large" className="h-full" />
            </Reveal>
          ))}
        </div>
      </Section>
      <Section tone="mist">
        <SectionHeader eyebrow="Archive" title="Past editions" lead="Recaps, galleries, speakers and outcomes from every InnTech summit." />
        <div className="grid gap-5 lg:grid-cols-2">
          {past.map((e) => (
            <Reveal key={e.slug}>
              <EditionCard edition={e} size="large" />
            </Reveal>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
