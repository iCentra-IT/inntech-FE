import type { Metadata } from "next";
import Image from "next/image";
import { Globe2, Presentation, Rocket, Users } from "lucide-react";
import { heroPhotos } from "@/lib/content/home";
import { site } from "@/lib/content/site";
import { getEditionOptions, getFeaturedEdition } from "@/lib/queries";
import { ExhibitorForm } from "@/components/forms/forms";
import { ButtonLink } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Exhibit",
  description: "Calling Africa’s brightest startups, innovators and changemakers: showcase your technology, pitch to investors and gain continental exposure at InnTech.",
  alternates: { canonical: "/exhibit" },
};

const reasons = [
  { icon: Presentation, title: "Showcase your technology", body: "Put your product in front of policymakers, corporates and development partners looking for solutions." },
  { icon: Rocket, title: "Pitch to investors", body: "Meet investors, angel networks and corporate partners in the room." },
  { icon: Globe2, title: "Continental exposure", body: "Reach delegates, media and partners from across Africa and the diaspora." },
  { icon: Users, title: "Build partnerships", body: "Turn conversations on the floor into pilots, customers and collaborations." },
];

const steps = [
  { title: "Apply", body: "Tell us about your company and what you want to showcase." },
  { title: "Review", body: "Our exhibitions team reviews every application against the summit themes." },
  { title: "Confirm", body: "Approved exhibitors receive booth options, fees and logistics by email." },
];

export default function ExhibitPage() {
  const featured = getFeaturedEdition();
  return (
    <>
      <PageHero
        eyebrow="Become an exhibitor"
        title="Calling Africa’s brightest startups, innovators and changemakers."
        lead="Showcase your technology, pitch to investors and gain continental exposure at InnTech."
        image={heroPhotos.exhibit}
        crumbs={[{ label: "Exhibit" }]}
      >
        <ButtonLink href="#apply" variant="accent" size="lg" arrow>
          Apply to exhibit
        </ButtonLink>
      </PageHero>

      <Section>
        <SectionHeader eyebrow="Why exhibit" title="A stage for the solutions Africa needs" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={i * 80} className="rounded-3xl border border-line p-7 transition hover:border-brand-200">
              <span className="grid size-12 place-items-center rounded-2xl bg-brand-600 text-white">
                <r.icon className="size-5" />
              </span>
              <h3 className="mt-6 text-xl font-semibold">{r.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed">{r.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="dark">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
            <Image src="/images/gallery/01-15.jpg" alt="Delegates in conversation at InnTech Summit 2025" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </Reveal>
          <div>
            <Reveal>
              <p className="eyebrow mb-5">How it works</p>
              <h2 className="text-3xl leading-tight font-semibold text-white sm:text-4xl">From application to booth in three steps</h2>
            </Reveal>
            <ol className="mt-10 grid gap-6">
              {steps.map((s, i) => (
                <Reveal as="li" key={s.title} delay={i * 100} className="flex gap-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-accent-400/50 font-display font-semibold text-accent-400">{i + 1}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{s.title}</h3>
                    <p className="mt-1 text-white/70">{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
            <p className="mt-10 text-sm text-white/55">
              Booth types, sizes and fees for {featured.name} are shared with applicants. Questions? Email{" "}
              <a href={`mailto:${site.contact.partnershipEmail}`} className="text-accent-300 underline underline-offset-2">
                {site.contact.partnershipEmail}
              </a>
              .
            </p>
          </div>
        </div>
      </Section>

      <Section id="apply" tone="mist">
        <div className="mx-auto max-w-4xl">
          <SectionHeader align="center" eyebrow="Exhibitor application" title="Apply to exhibit" lead="It takes about five minutes. A pitch deck helps, but it’s optional." />
          <Reveal className="rounded-[2rem] border border-line bg-white p-6 sm:p-10">
            <ExhibitorForm editions={getEditionOptions()} defaultEdition={featured.slug} />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
