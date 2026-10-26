import type { Metadata } from "next";
import { Suspense } from "react";
import { heroPhotos } from "@/lib/content/home";
import { getEditions, getSpeakers } from "@/lib/queries";
import { CtaBand } from "@/components/sections/cta-band";
import { SpeakerDirectory, SpeakerGrid, type DirectorySpeaker } from "@/components/sections/speaker-directory";
import { ButtonLink } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Speakers",
  description: "Meet the regulators, executives, founders and investors driving Africa’s innovation and technology future on the InnTech stage.",
  alternates: { canonical: "/speakers" },
};

export default function SpeakersPage() {
  // Bios stay on the profile pages; the directory only needs the card fields.
  const speakers: DirectorySpeaker[] = getSpeakers().map((s) => ({
    slug: s.slug,
    name: s.name,
    honorific: s.honorific,
    role: s.role,
    organisation: s.organisation,
    photo: s.photo,
    editions: s.editions,
    shortBio: s.shortBio,
  }));
  const editions = getEditions().map((e) => ({ slug: e.slug, name: e.name }));
  return (
    <>
      <PageHero
        eyebrow="Speakers"
        title="Meet the thought leaders driving Africa’s future."
        lead="Policymakers, regulators, executives, founders and investors who bring the InnTech agenda to life."
        image={heroPhotos.podium}
        crumbs={[{ label: "Speakers" }]}
      >
        <ButtonLink href="/speak" variant="accent" arrow>
          Apply to speak
        </ButtonLink>
      </PageHero>
      <Section>
        <Suspense fallback={<SpeakerGrid speakers={speakers} />}>
          <SpeakerDirectory speakers={speakers} editions={editions} />
        </Suspense>
      </Section>
      <CtaBand title="Want to share the stage with these leaders?" />
    </>
  );
}
