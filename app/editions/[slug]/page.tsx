import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, Mail, MapPin, Mic, Plane, Sparkles } from "lucide-react";
import { abujaGallery, heroPhotos } from "@/lib/content/home";
import { site } from "@/lib/content/site";
import type { Edition } from "@/lib/content/types";
import {
  getEdition,
  getEditions,
  getPartners,
  getPosts,
  getSessions,
  getSpeaker,
  getSpeakers,
  getUpcomingEditions,
  groupPartnersByTier,
  withSpeakers,
} from "@/lib/queries";
import { stageCtas } from "@/lib/stage";
import { editionDate, speakerName } from "@/lib/utils";
import { tierLabels } from "@/lib/content/partners";
import { SessionList } from "@/components/sections/session-list";
import { AddToCalendar } from "@/components/ui/add-to-calendar";
import { BrandMark } from "@/components/ui/brand-mark";
import { ButtonLink, TextLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Countdown } from "@/components/ui/countdown";
import { EditionCard } from "@/components/ui/edition-card";
import { EmptyState } from "@/components/ui/empty-state";
import { FaqList } from "@/components/ui/faq-list";
import { MapEmbed } from "@/components/ui/map-embed";
import { NewsCard } from "@/components/ui/news-card";
import { PhotoGallery } from "@/components/ui/photo-gallery";
import { SpeakerPhoto } from "@/components/ui/speaker-photo";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { SpeakerCard } from "@/components/ui/speaker-card";
import { StageBadge } from "@/components/ui/stage-badge";
import { StatsBand } from "@/components/ui/stats-band";
import { TicketCard } from "@/components/ui/ticket-card";

// Every slug is known at build time, so the whole route is served as static output.
// Navigations wait for that static page rather than showing a param-less shell,
// which would flash a fallback and shift the layout on first load.
export const ensureStatic = "navigation";
export const instant = false;

export function generateStaticParams() {
  return getEditions().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/editions/[slug]">): Promise<Metadata> {
  const edition = getEdition((await params).slug);
  if (!edition) return {};
  return {
    title: edition.name,
    description: edition.summary,
    alternates: { canonical: `/editions/${edition.slug}` },
    openGraph: { images: [edition.heroImage] },
  };
}

// Galleries per edition. Move into the CMS edition model alongside the other media.
const galleries: Record<string, typeof abujaGallery> = { "abuja-2025": abujaGallery };

export default async function EditionPage({ params }: PageProps<"/editions/[slug]">) {
  const edition = getEdition((await params).slug);
  if (!edition) notFound();

  const concluded = edition.stage === "concluded";
  const ctas = stageCtas(edition);
  const sessions = getSessions(edition.slug);
  const speakers = getSpeakers(edition.slug);
  const partners = getPartners(edition.slug);
  const gallery = galleries[edition.slug];
  const next = getUpcomingEditions()[0];
  const coverage = concluded ? getPosts().filter((p) => p.categories.includes("Press Releases")) : [];

  return (
    <>
      <EditionHero
        edition={edition}
        primary={concluded ? { label: "See highlights", href: "#gallery" } : ctas.primary}
        secondary={concluded ? { label: "Read the recap", href: "#recap" } : ctas.secondary}
      />

      {edition.stage === "live" && edition.livestreamUrl && (
        <Section id="live" tone="dark">
          <SectionHeader tone="dark" eyebrow="Live now" title="Watch the livestream" />
          <div className="aspect-video overflow-hidden rounded-3xl bg-black">
            <iframe src={edition.livestreamUrl} title={`${edition.name} livestream`} allowFullScreen className="size-full" />
          </div>
        </Section>
      )}

      {concluded && edition.recap && (
        <Section id="recap">
          <div className="grid gap-14 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <p className="eyebrow mb-5">Recap</p>
              <h2 className="text-3xl leading-tight font-semibold sm:text-4xl">{edition.recap.headline}</h2>
            </Reveal>
            <Reveal delay={100} className="lg:col-span-6 lg:col-start-7">
              <p className="text-lg leading-relaxed">{edition.recap.body}</p>
              {edition.communiqueUrl && (
                <ButtonLink href={edition.communiqueUrl} variant="primary" className="mt-8" arrow>
                  Read the policy communiqué
                </ButtonLink>
              )}
            </Reveal>
          </div>
          <StatsBand stats={edition.recap.stats} caption={`${edition.name} · ${edition.dateLabel} · ${edition.location}`} className="mt-16" />
        </Section>
      )}

      {concluded && edition.recap && (
        <Section tone="dark">
          <SectionHeader tone="dark" eyebrow="Top moments" title="Keynotes and conversations" />
          <div className="grid gap-5 md:grid-cols-2">
            {edition.recap.highlights.map((h, i) => {
              const sp = getSpeaker(h.speaker);
              return (
                <Reveal key={h.title} delay={(i % 2) * 100} className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-9">
                  <p className="font-display text-sm font-semibold text-accent-400">{h.title}</p>
                  <p className="mt-4 flex-1 text-lg leading-relaxed text-white/80">{h.body}</p>
                  {sp && (
                    <Link href={`/speakers/${sp.slug}`} className="group/h mt-8 flex items-center gap-4">
                      <span className="relative size-14 shrink-0 overflow-hidden rounded-full bg-linear-to-b from-brand-200 to-brand-500">
                        <SpeakerPhoto photo={sp.photo} name={sp.name} sizes="56px" />
                      </span>
                      <span>
                        <span className="block font-display font-semibold text-white group-hover/h:text-accent-300">{speakerName(sp)}</span>
                        <span className="text-sm text-white/55">
                          {sp.role}, {sp.organisation}
                        </span>
                      </span>
                    </Link>
                  )}
                </Reveal>
              );
            })}
          </div>
        </Section>
      )}

      {!concluded && (
        <Section>
          <div className="grid gap-14 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <p className="eyebrow mb-5">Overview</p>
              <h2 className="text-3xl leading-tight font-semibold sm:text-4xl">Theme: {edition.theme}</h2>
            </Reveal>
            <Reveal delay={100} className="lg:col-span-6 lg:col-start-7">
              <p className="text-lg leading-relaxed">{edition.summary}</p>
              <p className="mt-5 leading-relaxed text-muted">
                Expect keynote addresses, expert panels, fireside chats, exhibitions and curated networking with
                leaders from government, industry, academia and development institutions.
              </p>
            </Reveal>
          </div>
        </Section>
      )}

      {!concluded && edition.tickets.length > 0 && (
        <Section id="tickets" tone="mist">
          <SectionHeader
            eyebrow="Passes"
            title="Choose your pass"
            lead="Every registration is reviewed by the secretariat, who confirm your pass by email."
            action={<TextLink href="/faq">Registration FAQs</TextLink>}
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {edition.tickets.map((t, i) => (
              <Reveal key={t.id} delay={i * 80}>
                <TicketCard ticket={t} edition={edition} href={`/register?ticket=${t.id}`} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <Section id="agenda">
        <SectionHeader
          eyebrow="Agenda"
          title={concluded ? "The programme" : "Programme"}
          action={sessions.length > 0 ? <ButtonLink href={`/agenda?edition=${edition.slug}`} variant="outline" arrow>Full agenda</ButtonLink> : undefined}
        />
        {sessions.length > 0 ? (
          <SessionList sessions={withSpeakers(sessions)} />
        ) : (
          <EmptyState
            icon={<Mic className="size-6" />}
            title="The programme is being curated"
            body={`Sessions for ${edition.name} will be published here as speakers are confirmed. Have something to share with the InnTech audience?`}
            action={<ButtonLink href="/speak" variant="primary" arrow>Apply to speak</ButtonLink>}
          />
        )}
      </Section>

      {speakers.length > 0 && (
        <Section tone="mist">
          <SectionHeader
            eyebrow="Speakers"
            title={concluded ? "Who took the stage" : "Confirmed speakers"}
            action={<ButtonLink href={`/speakers?edition=${edition.slug}`} variant="outline" arrow>All speakers</ButtonLink>}
          />
          <ul className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {speakers.slice(0, 8).map((s, i) => (
              <Reveal as="li" key={s.slug} delay={(i % 4) * 70}>
                <SpeakerCard speaker={s} />
              </Reveal>
            ))}
          </ul>
        </Section>
      )}

      {gallery && (
        <Section id="gallery">
          <SectionHeader eyebrow="Gallery" title="Highlights from the day" />
          <PhotoGallery photos={gallery} initial={16} />
        </Section>
      )}

      {!concluded && (
        <Section id="venue" tone="mist">
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <p className="eyebrow mb-5">Venue & travel</p>
              <h2 className="text-3xl leading-tight font-semibold sm:text-4xl">
                {edition.venue ? edition.venue.name : "Venue to be announced"}
              </h2>
              <p className="mt-5 text-lg leading-relaxed">
                {edition.venue
                  ? edition.venue.address
                  : `We’ll announce the venue for ${edition.name} here and email everyone who has registered.`}
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <InfoTile icon={<CalendarDays className="size-5" />} label="Date" value={editionDate(edition)} />
                <InfoTile icon={<Clock className="size-5" />} label="Time zone" value={edition.timezoneLabel} />
                <InfoTile icon={<Plane className="size-5" />} label="Travel & accommodation" value="Details to follow" />
                <InfoTile icon={<Mail className="size-5" />} label="Visa letters" value="Contact the secretariat" />
              </div>
            </Reveal>
            <Reveal delay={100}>
              {edition.venue ? (
                <MapEmbed query={edition.venue.mapQuery} title={edition.venue.name} />
              ) : (
                <div className="relative grid aspect-[16/11] place-items-center overflow-hidden rounded-3xl bg-night-900 text-center text-white">
                  <Image src={heroPhotos.audience} alt="" fill sizes="50vw" className="object-cover opacity-25" />
                  <div className="relative px-8">
                    <MapPin className="mx-auto size-8 text-accent-400" />
                    <p className="mt-4 font-display text-2xl font-semibold">{edition.location}</p>
                    <p className="mt-2 text-white/65">Register to be the first to know.</p>
                  </div>
                </div>
              )}
            </Reveal>
          </div>
        </Section>
      )}

      {concluded && edition.venue && (
        <Section id="venue" tone="mist">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <p className="eyebrow mb-5">Venue</p>
              <h2 className="text-3xl font-semibold sm:text-4xl">{edition.venue.name}</h2>
              <p className="mt-4 text-lg">{edition.venue.address}</p>
            </Reveal>
            <Reveal delay={100}>
              <MapEmbed query={edition.venue.mapQuery} title={edition.venue.name} />
            </Reveal>
          </div>
        </Section>
      )}

      {partners.length > 0 && (
        <Section>
          <SectionHeader
            eyebrow={concluded ? "Thank you to our partners" : "Partners"}
            title={concluded ? "The partners who made it happen" : "Partners of this edition"}
            action={<ButtonLink href="/partners" variant="outline" arrow>Partner with us</ButtonLink>}
          />
          <div className="grid gap-10">
            {groupPartnersByTier(partners).map((g) => (
              <div key={g.tier}>
                <h3 className="mb-4 text-sm font-semibold tracking-wide text-muted uppercase">{tierLabels[g.tier]}</h3>
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  {g.partners.map((p) => (
                    <li key={p.slug} className="relative h-24 rounded-2xl border border-line bg-white">
                      <Image src={p.logo} alt={p.name} fill sizes="200px" className="object-contain p-5" />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      )}

      {!concluded && partners.length <= 1 && (
        <Section tone="dark">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <Reveal className="max-w-2xl">
              <p className="eyebrow mb-4">Partner prospectus</p>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">Put your brand at the centre of {edition.shortName}.</h2>
              <p className="mt-4 text-lg text-white/70">Seven partnership packages, from Platinum title recognition to accreditation branding.</p>
            </Reveal>
            <Reveal delay={100} className="flex flex-wrap gap-3">
              <ButtonLink href="/partners#packages" variant="accent" size="lg" arrow>
                View packages
              </ButtonLink>
              <ButtonLink href="/exhibit" variant="outline-light" size="lg">
                Exhibit
              </ButtonLink>
            </Reveal>
          </div>
        </Section>
      )}

      {coverage.length > 0 && (
        <Section tone="mist">
          <SectionHeader eyebrow="Press coverage" title="In the news" action={<ButtonLink href="/news" variant="outline" arrow>Newsroom</ButtonLink>} />
          <div className="grid gap-x-6 gap-y-12 md:grid-cols-3">
            {coverage.slice(0, 3).map((p) => (
              <Reveal key={p.slug}>
                <NewsCard post={p} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {edition.faqs && edition.faqs.length > 0 && (
        <Section>
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow mb-5">FAQs</p>
              <h2 className="text-3xl font-semibold">Good to know</h2>
              <TextLink href="/faq" className="mt-6">
                All FAQs
              </TextLink>
            </Reveal>
            <Reveal delay={100} className="lg:col-span-8">
              <FaqList items={edition.faqs} />
            </Reveal>
          </div>
        </Section>
      )}

      {concluded && next && (
        <Section tone="dark">
          <SectionHeader tone="dark" eyebrow="Up next" title="Join us at the next edition" />
          <Reveal>
            <EditionCard edition={next} size="large" />
          </Reveal>
        </Section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd(edition)).replace(/</g, "\\u003c") }}
      />
    </>
  );
}

function EditionHero({
  edition,
  primary,
  secondary,
}: {
  edition: Edition;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
}) {
  const upcoming = edition.stage !== "concluded" && edition.stage !== "live";
  return (
    <section data-tone="dark" className="relative isolate overflow-hidden bg-night-950 pt-36 pb-16 sm:pt-44 sm:pb-20">
      <Image src={edition.heroImage} alt="" fill preload sizes="100vw" quality={70} className="-z-20 object-cover opacity-40" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-t from-night-950 via-night-950/80 to-night-950/40" />
      <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
      <BrandMark className="absolute top-28 -right-24 -z-10 hidden w-[30rem] text-white/[0.06] lg:block" strokeWidth={4} />
      <Container>
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-white/55">
          <Link href="/" className="hover:text-white">Home</Link> <span aria-hidden>/</span>{" "}
          <Link href="/editions" className="hover:text-white">Editions</Link> <span aria-hidden>/</span>{" "}
          <span aria-current="page" className="text-white/85">{edition.shortName}</span>
        </nav>
        <div data-enter="" className="max-w-4xl">
          <StageBadge stage={edition.stage} />
          <h1 className="mt-6 text-5xl leading-[0.98] font-semibold tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl">{edition.name}</h1>
          <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-white/85">
            <div className="flex items-center gap-2.5">
              <dt className="sr-only">Date</dt>
              <CalendarDays aria-hidden className="size-4.5 text-accent-400" />
              <dd>{editionDate(edition)}</dd>
            </div>
            <div className="flex items-center gap-2.5">
              <dt className="sr-only">Location</dt>
              <MapPin aria-hidden className="size-4.5 text-accent-400" />
              <dd>{edition.venue ? `${edition.venue.name}, ${edition.location}` : edition.location}</dd>
            </div>
            <div className="flex items-center gap-2.5">
              <dt className="sr-only">Theme</dt>
              <Sparkles aria-hidden className="size-4.5 text-accent-400" />
              <dd>{edition.theme}</dd>
            </div>
          </dl>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={primary.href} variant="accent" size="lg" arrow>
              {primary.label}
            </ButtonLink>
            {upcoming && edition.startsAt && edition.endsAt ? (
              <AddToCalendar
                event={{
                  title: edition.name,
                  start: edition.startsAt,
                  end: edition.endsAt,
                  location: edition.venue?.address ?? edition.location,
                  description: `${edition.theme}. ${edition.summary}`,
                  url: `${site.url}/editions/${edition.slug}`,
                }}
              />
            ) : (
              <ButtonLink href={secondary.href} variant="outline-light" size="lg">
                {secondary.label}
              </ButtonLink>
            )}
          </div>
        </div>
        {upcoming && edition.startsAt && (
          <div data-enter="" style={{ "--reveal-delay": "150ms" } as React.CSSProperties} className="mt-12 border-t border-white/10 pt-8">
            <Countdown to={edition.startsAt} />
          </div>
        )}
      </Container>
    </section>
  );
}

function InfoTile({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5">
      <span className="text-brand-600">{icon}</span>
      <p className="mt-3 text-sm text-muted">{label}</p>
      <p className="mt-1 font-display font-semibold text-ink">{value}</p>
    </div>
  );
}

function eventJsonLd(e: Edition) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.name,
    description: e.summary,
    ...(e.startsAt && { startDate: e.startsAt }),
    ...(e.endsAt && { endDate: e.endsAt }),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    image: [`${site.url}${e.heroImage}`],
    url: `${site.url}/editions/${e.slug}`,
    location: e.venue
      ? { "@type": "Place", name: e.venue.name, address: e.venue.address }
      : { "@type": "Place", name: e.location, address: e.location },
    organizer: { "@type": "Organization", name: site.organizer.name, url: site.organizer.url },
  };
}
