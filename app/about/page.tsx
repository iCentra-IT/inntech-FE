import type { Metadata } from "next";
import Image from "next/image";
import { Compass, HeartHandshake, Lightbulb, Users } from "lucide-react";
import { heroPhotos } from "@/lib/content/home";
import { pillars, site } from "@/lib/content/site";
import { getEdition, getPartners } from "@/lib/queries";
import { CtaBand } from "@/components/sections/cta-band";
import { ButtonLink } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { StatCounter } from "@/components/ui/stat-counter";

export const metadata: Metadata = {
  title: "About",
  description:
    "InnTech is Africa’s premier platform for innovation, technology and transformation, convening leaders on AI, the digital economy and sustainability. Powered by iCentra.",
  alternates: { canonical: "/about" },
};

const values = [
  { icon: Users, title: "Built for every stakeholder", body: "Policymakers, corporate leaders, development partners, entrepreneurs, academia and youth in one room." },
  { icon: HeartHandshake, title: "Inclusive by design", body: "Digital transformation that serves not just economies, but also people and the planet." },
  { icon: Lightbulb, title: "Ideas that become action", body: "Dialogues, thought leadership, exhibitions and partnerships that inspire collective action." },
  { icon: Compass, title: "Policy-grade credibility", body: "A trusted convening platform for conversations that matter across public and private sectors." },
];

export default function AboutPage() {
  const recap = getEdition("abuja-2025")?.recap;
  const organizer = getPartners().find((p) => p.tier === "organizer");

  return (
    <>
      <PageHero
        eyebrow="About InnTech"
        title={<>Built for innovators, doers and thinkers alike.</>}
        lead="The Innovation and Technology Summit is Africa’s premier platform for innovation, technology and transformation, where visionaries, leaders and changemakers converge to shape the continent’s digital and sustainable future."
        image={heroPhotos.about}
        crumbs={[{ label: "About" }]}
      />

      <Section>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <Image src={heroPhotos.stage} alt="Speakers and partners on the InnTech Summit 2025 stage" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </div>
            <div className="absolute -right-4 -bottom-8 w-56 rounded-3xl bg-night-900 p-6 text-white shadow-2xl sm:-right-8 sm:w-64">
              <p className="font-display text-5xl font-semibold">
                <StatCounter value={300} suffix="+" />
              </p>
              <p className="mt-2 text-sm text-white/70">leaders, innovators and stakeholders at the first edition in Abuja</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow mb-5">Our story</p>
            <h2 className="text-3xl leading-tight font-semibold sm:text-4xl">More than a conference, a movement.</h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed">
              <p>
                InnTech bridges ideas, industries and impact. It convenes policymakers, corporate leaders, development
                partners, entrepreneurs, academia and innovators to explore how emerging technologies and
                forward-thinking solutions can accelerate Africa’s growth and resilience.
              </p>
              <p>
                At its core, InnTech champions inclusive innovation, ensuring that digital transformation serves not
                just economies, but also people and the planet. Through dialogues, thought leadership, exhibitions and
                strategic partnerships, the summit inspires collective action across public and private sectors.
              </p>
              <p>
                The first edition, on 25 November 2025 at the Shehu Musa Yar’Adua Centre in Abuja, convened more than
                300 leaders around the theme “AI, Digital Economy and Sustainability”. In 2026, InnTech expands to
                InnTech Africa and InnTech Dallas.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="mist">
        <SectionHeader eyebrow="What makes InnTech different" title="A convening platform with purpose" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 80} className="rounded-3xl border border-line bg-white p-7">
              <v.icon className="size-7 text-brand-600" />
              <h3 className="mt-6 text-xl font-semibold">{v.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed">{v.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="dark">
        <SectionHeader tone="dark" eyebrow="Theme pillars" title="AI · Digital Economy · Sustainability" />
        <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.key} delay={i * 80} className="bg-night-900 p-8 sm:p-10">
              <span className="font-display text-sm font-semibold text-accent-400">0{i + 1}</span>
              <h3 className="mt-5 text-2xl font-semibold text-white">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-white/70">{p.body}</p>
            </Reveal>
          ))}
        </div>
        {recap && (
          <dl className="mt-16 grid grid-cols-2 gap-8 lg:grid-cols-4">
            {recap.stats.map((s) => (
              <Reveal key={s.label}>
                <dd className="font-display text-5xl font-semibold text-white">
                  <StatCounter value={s.value} suffix={s.suffix} />
                </dd>
                <dt className="mt-2 text-white/60">{s.label} at Abuja 2025</dt>
              </Reveal>
            ))}
          </dl>
        )}
      </Section>

      <Section>
        <div className="grid items-center gap-12 rounded-[2rem] border border-line p-8 sm:p-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            {organizer && (
              <div className="relative mx-auto aspect-[3/1] w-full max-w-xs">
                <Image src={organizer.logo} alt="iCentra" fill sizes="320px" className="object-contain" />
              </div>
            )}
          </Reveal>
          <Reveal delay={100} className="lg:col-span-8">
            <p className="eyebrow mb-4">Organiser</p>
            <h2 className="text-3xl font-semibold">Powered by iCentra</h2>
            <p className="mt-4 text-lg leading-relaxed">
              InnTech is convened by iCentra, a transformation, technology and project consultancy founded in Abuja with
              a presence in Texas and London, together with its strategic partners. iCentra’s CEO, Taopheek Babayeju,
              is the convener of the summit.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/speakers/taopheek-babayeju" variant="primary" arrow>
                Meet the convener
              </ButtonLink>
              <ButtonLink href={site.organizer.url} variant="outline" target="_blank" rel="noreferrer">
                Visit icentra.com
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
