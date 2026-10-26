import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { site } from "@/lib/content/site";
import { getEdition, getSessionsForSpeaker, getSpeaker, getSpeakers, withSpeakers } from "@/lib/queries";
import { speakerName, speakerTitle } from "@/lib/utils";
import { SessionList } from "@/components/sections/session-list";
import { BrandMark } from "@/components/ui/brand-mark";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SpeakerPhoto } from "@/components/ui/speaker-photo";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { SpeakerCard } from "@/components/ui/speaker-card";

// Every slug is known at build time, so the whole route is served as static output.
// Navigations wait for that static page rather than showing a param-less shell,
// which would flash a fallback and shift the layout on first load.
export const ensureStatic = "navigation";
export const instant = false;

export function generateStaticParams() {
  return getSpeakers().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/speakers/[slug]">): Promise<Metadata> {
  const s = getSpeaker((await params).slug);
  if (!s) return {};
  return {
    title: `${speakerName(s)}, ${speakerTitle(s)}`,
    description: s.shortBio.slice(0, 160),
    alternates: { canonical: `/speakers/${s.slug}` },
    openGraph: { ...(s.photo && { images: [s.photo] }), type: "profile" },
  };
}

export default async function SpeakerPage({ params }: PageProps<"/speakers/[slug]">) {
  const speaker = getSpeaker((await params).slug);
  if (!speaker) notFound();

  const sessions = withSpeakers(getSessionsForSpeaker(speaker.slug));
  const editions = speaker.editions.flatMap((slug) => getEdition(slug) ?? []);
  const others = getSpeakers()
    .filter((s) => s.slug !== speaker.slug && s.editions.some((e) => speaker.editions.includes(e)))
    .slice(0, 4);

  return (
    <>
      <section data-tone="dark" className="relative isolate overflow-hidden bg-night-900 pt-32 sm:pt-40">
        <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
        <div aria-hidden className="absolute -top-40 -left-40 -z-10 size-[40rem] rounded-full bg-brand-600/35 blur-[140px]" />
        <Container>
          <Link href="/speakers" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white">
            <ArrowLeft className="size-4" /> All speakers
          </Link>
          <div className="mt-8 grid items-end gap-10 lg:grid-cols-12">
            <div data-enter="" className="pb-14 lg:col-span-7 lg:pb-20">
              <div className="flex flex-wrap gap-2">
                {editions.map((e) => (
                  <Link key={e.slug} href={`/editions/${e.slug}`} className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 ring-1 ring-white/15 hover:bg-white/15">
                    {e.name}
                  </Link>
                ))}
              </div>
              <h1 className="mt-6 text-5xl leading-[1] font-semibold tracking-[-0.03em] text-white sm:text-6xl">{speakerName(speaker)}</h1>
              <p className="mt-5 max-w-xl text-xl text-white/75">
                {speaker.role}
                {speaker.organisation && <span className="text-accent-300">, {speaker.organisation}</span>}
              </p>
            </div>
            <div data-enter="" style={{ "--reveal-delay": "120ms" } as React.CSSProperties} className="relative mx-auto w-full max-w-sm lg:col-span-4 lg:col-start-9">
              <BrandMark className="absolute -top-6 -left-10 w-[115%] text-accent-400/25" strokeWidth={6} />
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-[2.5rem] bg-linear-to-b from-brand-500/60 to-brand-800/40">
                <SpeakerPhoto photo={speaker.photo} name={speaker.name} alt={speakerName(speaker)} preload sizes="(min-width: 1024px) 30vw, 90vw" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <p className="eyebrow">Biography</p>
          </Reveal>
          <Reveal delay={80} className="lg:col-span-8">
            <div className="prose-inntech max-w-3xl text-lg first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:leading-[0.85] first-letter:font-semibold first-letter:text-brand-600">
              {speaker.bio.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            {speaker.links && speaker.links.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3">
                {speaker.links.map((l) => (
                  <ButtonLink key={l.href} href={l.href} variant="outline" target="_blank" rel="noreferrer">
                    {l.label}
                  </ButtonLink>
                ))}
              </div>
            )}
          </Reveal>
        </div>
      </Section>

      {sessions.length > 0 && (
        <Section tone="mist">
          <SectionHeader eyebrow="Sessions" title={`${speaker.name.split(" ")[0]} on the programme`} />
          <SessionList sessions={sessions} />
        </Section>
      )}

      {others.length > 0 && (
        <Section>
          <SectionHeader
            eyebrow="More speakers"
            title="Also on the InnTech stage"
            action={<ButtonLink href="/speakers" variant="outline" arrow>All speakers</ButtonLink>}
          />
          <ul className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
            {others.map((s, i) => (
              <Reveal as="li" key={s.slug} delay={i * 70}>
                <SpeakerCard speaker={s} />
              </Reveal>
            ))}
          </ul>
        </Section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: speaker.name,
            honorificPrefix: speaker.honorific,
            jobTitle: speaker.role,
            ...(speaker.organisation && { worksFor: { "@type": "Organization", name: speaker.organisation } }),
            ...(speaker.photo && { image: `${site.url}${speaker.photo}` }),
            description: speaker.shortBio,
            url: `${site.url}/speakers/${speaker.slug}`,
          }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
