import type { Metadata } from "next";
import { Cpu, Leaf, Network } from "lucide-react";
import { heroPhotos } from "@/lib/content/home";
import { pillars } from "@/lib/content/site";
import { getEditionOptions, getFeaturedEdition } from "@/lib/queries";
import { SpeakerApplicationForm } from "@/components/forms/forms";
import { ButtonLink } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Call for speakers",
  description: "Apply to speak at InnTech. We’re looking for keynotes, panellists and fireside guests on AI, the digital economy and sustainability.",
  alternates: { canonical: "/speak" },
};

const icons = { ai: Cpu, "digital-economy": Network, sustainability: Leaf } as const;
const lookingFor = [
  "Evidence and lived experience, not product pitches",
  "African context: local data, languages, markets and policy",
  "A clear takeaway the audience can act on",
  "Diverse voices: public sector, founders, researchers, youth",
];

export default function SpeakPage() {
  const featured = getFeaturedEdition();
  return (
    <>
      <PageHero
        eyebrow="Call for speakers"
        title="Bring your ideas to the InnTech stage."
        lead={`We’re building the programme for ${featured.name}. Propose a keynote, panel, fireside chat, workshop or startup pitch.`}
        image={heroPhotos.speak}
        crumbs={[{ label: "Call for speakers" }]}
      >
        <ButtonLink href="#apply" variant="accent" size="lg" arrow>
          Submit a proposal
        </ButtonLink>
      </PageHero>

      <Section>
        <SectionHeader eyebrow="Themes" title="What we want to hear about" />
        <div className="grid gap-5 md:grid-cols-3">
          {pillars.map((p, i) => {
            const Icon = icons[p.key];
            return (
              <Reveal key={p.key} delay={i * 80} className="rounded-3xl border border-line p-8">
                <Icon className="size-7 text-brand-600" />
                <h3 className="mt-6 text-xl font-semibold">{p.title}</h3>
                <p className="mt-3 leading-relaxed">{p.body}</p>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="mt-10 rounded-3xl bg-mist p-8 sm:p-10">
          <h3 className="text-xl font-semibold">What makes a strong proposal</h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {lookingFor.map((l) => (
              <li key={l} className="flex gap-3">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-600" />
                {l}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section id="apply" tone="mist">
        <div className="mx-auto max-w-4xl">
          <SectionHeader align="center" eyebrow="Speaker application" title="Submit your proposal" lead="The programme committee reviews every application and replies by email." />
          <Reveal className="rounded-[2rem] border border-line bg-white p-6 sm:p-10">
            <SpeakerApplicationForm editions={getEditionOptions()} defaultEdition={featured.slug} />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
