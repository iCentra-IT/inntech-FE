import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Cpu, FileText, Handshake, Leaf, Mic, Network, Rocket, Sprout, Store, Ticket, TrendingUp } from "lucide-react";
import { abujaGallery, heroPhotos, outcomes, testimonials } from "@/lib/content/home";
import { pillars, site } from "@/lib/content/site";
import {
  getEdition,
  getFeaturedEdition,
  getFeaturedSpeakers,
  getPartners,
  getPastEditions,
  getPosts,
  getUpcomingEditions,
} from "@/lib/queries";
import { HomeHero } from "@/components/sections/home-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { ButtonLink, TextLink } from "@/components/ui/button";
import { BrandMark } from "@/components/ui/brand-mark";
import { EditionCard } from "@/components/ui/edition-card";
import { LogoMarquee } from "@/components/ui/logo-marquee";
import { NewsCard } from "@/components/ui/news-card";
import { PhotoGallery } from "@/components/ui/photo-gallery";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { SpeakerCard } from "@/components/ui/speaker-card";
import { StatsBand } from "@/components/ui/stats-band";
import { TestimonialSlider } from "@/components/ui/testimonial-slider";

const pillarIcons = { ai: Cpu, "digital-economy": Network, sustainability: Leaf } as const;
const outcomeIcons = [FileText, Sprout, TrendingUp, Leaf];

export default function HomePage() {
  const featured = getFeaturedEdition();
  const upcoming = getUpcomingEditions();
  const past = getPastEditions();
  const recap = getEdition("abuja-2025")?.recap;
  const speakers = getFeaturedSpeakers().slice(0, 8);
  const partners = getPartners("abuja-2025");
  const posts = getPosts().slice(0, 3);

  return (
    <>
      <HomeHero edition={featured} />

      {/* About + numbers */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow mb-5">About the summit</p>
            <h2 className="text-3xl leading-[1.12] font-semibold sm:text-4xl lg:text-[2.75rem]">
              Africa’s premier gathering for the people building its{" "}
              <span className="text-brand-600">digital and sustainable</span> future.
            </h2>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-5 lg:col-start-8">
            <p className="text-lg leading-relaxed">
              InnTech convenes policymakers, corporate leaders, development partners, entrepreneurs, academia and young
              innovators to explore how artificial intelligence, the digital economy and sustainability can drive
              inclusive growth and green transformation for Africa.
            </p>
            <p className="mt-5 leading-relaxed text-muted">
              More than a conference, it is a movement that bridges ideas, industries and impact, powered by iCentra
              and its strategic partners.
            </p>
            <TextLink href="/about" className="mt-8">
              Our story
            </TextLink>
          </Reveal>
        </div>

        {recap && (
          <StatsBand stats={recap.stats} caption="InnTech Summit 2025 · Shehu Musa Yar’Adua Centre, Abuja" className="mt-20" />
        )}
      </Section>

      {/* Theme pillars */}
      <Section tone="mist">
        <SectionHeader
          eyebrow="Three pillars"
          title="One agenda for Africa’s next chapter"
          lead="Every InnTech conversation sits where these three forces meet."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {pillars.map((p, i) => {
            const Icon = pillarIcons[p.key];
            return (
              <Reveal
                key={p.key}
                delay={i * 100}
                className="group/p relative overflow-hidden rounded-3xl border border-line bg-white p-8 transition duration-500 ease-(--ease-out-expo) hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_24px_60px_-30px_rgb(14_48_199/0.35)] sm:p-10"
              >
                <span className="font-display text-sm font-semibold text-brand-300">0{i + 1}</span>
                <span className="mt-8 grid size-14 place-items-center rounded-2xl bg-brand-600 text-white shadow-[0_10px_30px_-10px_rgb(14_48_199/0.8)] transition duration-500 group-hover/p:bg-accent-400 group-hover/p:text-night-950">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-8 text-2xl font-semibold">{p.title}</h3>
                <p className="mt-3 leading-relaxed">{p.body}</p>
                <BrandMark className="absolute -right-10 -bottom-12 w-40 text-brand-600/[0.06] transition duration-700 group-hover/p:text-brand-600/[0.12]" strokeWidth={10} />
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Editions */}
      <Section tone="dark">
        <div aria-hidden className="absolute top-0 left-1/2 h-[28rem] w-[56rem] -translate-x-1/2 rounded-full bg-brand-600/25 blur-[140px]" />
        <div className="relative">
          <SectionHeader
            tone="dark"
            eyebrow="Where it’s happening"
            title={<>From Abuja to the world.</>}
            lead="Following the success of InnTech Summit 2025, the platform is expanding across new continents to deepen the conversation on AI, digital transformation and sustainability."
            action={
              <ButtonLink href="/editions" variant="outline-light" arrow>
                All editions
              </ButtonLink>
            }
          />
          <div className="grid gap-5 lg:grid-cols-5">
            {upcoming.map((e, i) => (
              <Reveal key={e.slug} delay={i * 100} className={i === 0 ? "lg:col-span-3" : "lg:col-span-2"}>
                <EditionCard edition={e} size={i === 0 ? "large" : "default"} className="h-full" />
              </Reveal>
            ))}
          </div>
          {past.map((e) => (
            <Reveal key={e.slug} className="mt-5">
              <Link
                href={`/editions/${e.slug}`}
                className="group/past flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 transition hover:border-white/25 hover:bg-white/[0.05] sm:flex-row sm:items-center sm:p-9"
              >
                <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-2xl sm:w-56">
                  <Image src={e.heroImage} alt="" fill sizes="224px" className="object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-accent-400">Past edition · {e.dateLabel}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">{e.recap?.headline ?? e.name}</h3>
                  <p className="mt-2 text-white/65">{e.summary}</p>
                </div>
                <span className="inline-flex items-center gap-2 font-display font-semibold text-white">
                  See highlights
                  <ArrowUpRight className="size-4 transition group-hover/past:translate-x-0.5 group-hover/past:-translate-y-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Speakers */}
      <Section>
        <SectionHeader
          eyebrow="Speakers & panellists"
          title="Voices shaping Africa’s digital future"
          lead="Regulators, founders, investors and executives who took the InnTech stage in 2025."
          action={
            <ButtonLink href="/speakers" variant="outline" arrow>
              All speakers
            </ButtonLink>
          }
        />
        <ul className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {speakers.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={(i % 4) * 80}>
              <SpeakerCard speaker={s} />
            </Reveal>
          ))}
        </ul>
        <Reveal className="mt-14 flex flex-col items-start gap-5 rounded-3xl bg-linear-to-r from-brand-600 to-brand-800 p-8 text-white sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div className="flex items-center gap-5">
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/10">
              <Mic className="size-6 text-accent-300" />
            </span>
            <div>
              <h3 className="text-2xl font-semibold text-white">Have something to say?</h3>
              <p className="mt-1 text-white/75">The call for speakers is open for {featured.shortName}.</p>
            </div>
          </div>
          <ButtonLink href="/speak" variant="white" arrow>
            Apply to speak
          </ButtonLink>
        </Reveal>
      </Section>

      {/* Testimonials */}
      <section data-tone="dark" className="relative isolate overflow-hidden bg-night-900 py-24 sm:py-32">
        <Image src={heroPhotos.fireside} alt="" fill sizes="100vw" quality={70} className="-z-20 object-cover opacity-20" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-r from-night-950 via-night-950/90 to-night-900/70" />
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow mb-5">Real stories. Real impact.</p>
            <h2 className="text-3xl leading-tight font-semibold text-white sm:text-4xl">What was said on the InnTech stage</h2>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-8">
            <TestimonialSlider items={testimonials} />
          </Reveal>
        </div>
      </section>

      {/* Outcomes */}
      <Section>
        <SectionHeader
          align="center"
          eyebrow="Expected outcomes"
          title="Conversations that end in commitments"
          lead="InnTech is designed to leave a mark beyond the day itself."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {outcomes.map((o, i) => {
            const Icon = outcomeIcons[i];
            return (
              <Reveal key={o.title} delay={i * 80} className="rounded-3xl border border-line p-7 transition duration-500 hover:border-brand-200 hover:bg-brand-50/40">
                <Icon className="size-7 text-brand-600" />
                <h3 className="mt-6 text-xl font-semibold">{o.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed">{o.body}</p>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Partners */}
      <Section tone="mist" bleed>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeader
            eyebrow="Sponsors & partners"
            title="In good company"
            lead="InnTech is convened by iCentra with the support of public institutions, companies and media partners."
            action={
              <ButtonLink href="/partners" variant="primary" arrow>
                Partner with us
              </ButtonLink>
            }
          />
        </div>
        <Reveal>
          <LogoMarquee partners={partners} />
        </Reveal>
      </Section>

      {/* Gallery */}
      <Section>
        <SectionHeader
          eyebrow="Highlights from Abuja 2025"
          title="The room, the energy, the people"
          action={
            <ButtonLink href="/editions/abuja-2025#gallery" variant="outline" arrow>
              Full recap
            </ButtonLink>
          }
        />
        <Reveal>
          <PhotoGallery photos={abujaGallery} />
        </Reveal>
      </Section>

      {/* Take part */}
      <Section tone="mist">
        <SectionHeader
          align="center"
          eyebrow="Take part"
          title="Choose the role that fits your goals"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Ticket, title: "Attend", body: "Keynotes, panels, fireside chats and networking with Africa’s innovation leaders.", href: "/register", cta: "Register" },
            { icon: Handshake, title: "Partner", body: "Brand visibility before global delegates and access to decision-makers and investors.", href: "/partners", cta: "View packages" },
            { icon: Store, title: "Exhibit", body: "Showcase your technology, pitch to investors and gain continental exposure.", href: "/exhibit", cta: "Apply to exhibit" },
            { icon: Rocket, title: "Speak", body: "Share your expertise with policymakers, executives and young innovators.", href: "/speak", cta: "Apply to speak" },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <Link
                href={c.href}
                className="group/tp flex h-full flex-col rounded-3xl border border-line bg-white p-7 transition duration-500 ease-(--ease-out-expo) hover:-translate-y-1 hover:border-brand-300 hover:shadow-[0_24px_60px_-30px_rgb(14_48_199/0.4)]"
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition duration-500 group-hover/tp:bg-brand-600 group-hover/tp:text-white">
                  <c.icon className="size-5" />
                </span>
                <h3 className="mt-6 text-xl font-semibold">{c.title}</h3>
                <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed">{c.body}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 font-display font-semibold text-brand-600">
                  {c.cta}
                  <ArrowUpRight className="size-4 transition group-hover/tp:translate-x-0.5 group-hover/tp:-translate-y-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* News */}
      <Section>
        <SectionHeader
          eyebrow="Media & updates"
          title="News and insights"
          action={
            <ButtonLink href="/news" variant="outline" arrow>
              All articles
            </ButtonLink>
          }
        />
        <div className="grid gap-x-6 gap-y-14 md:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
              <NewsCard post={p} />
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: site.fullName,
            alternateName: site.name,
            url: site.url,
            logo: `${site.url}/images/brand/logo-blue.png`,
            email: site.contact.email,
            telephone: site.contact.phone,
            address: { "@type": "PostalAddress", streetAddress: "47B Kumasi Crescent, Wuse II", addressLocality: "Abuja", postalCode: "900288", addressCountry: "NG" },
            parentOrganization: { "@type": "Organization", name: site.organizer.name, url: site.organizer.url },
          }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
