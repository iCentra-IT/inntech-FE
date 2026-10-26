import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Check, Download, Mail, MessageCircle, Phone } from "lucide-react";
import { heroPhotos } from "@/lib/content/home";
import { packages, partnerBenefits, tierLabels } from "@/lib/content/partners";
import { site } from "@/lib/content/site";
import { getEdition, getEditionOptions, getFeaturedEdition, getPartners, groupPartnersByTier } from "@/lib/queries";
import { cn } from "@/lib/utils";
import { PartnershipForm } from "@/components/forms/forms";
import { PartnershipWithParams } from "@/components/forms/form-params";
import { ButtonLink } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { StatCounter } from "@/components/ui/stat-counter";

export const metadata: Metadata = {
  title: "Sponsors & Partners",
  description: "Partner with InnTech: brand visibility before global delegates, access to decision-makers and investors, and seven partnership packages.",
  alternates: { canonical: "/partners" },
};

const audience = ["Policymakers & regulators", "Corporate executives", "Development partners", "Investors", "Founders & innovators", "Academia & youth"];

export default function PartnersPage() {
  const featured = getFeaturedEdition();
  const recap = getEdition("abuja-2025")?.recap;
  const groups = groupPartnersByTier(getPartners("abuja-2025"));
  const prospectusHref = `mailto:${site.contact.partnershipEmail}?subject=${encodeURIComponent(`Partnership prospectus: ${featured.name}`)}`;

  return (
    <>
      <PageHero
        eyebrow="Sponsors & partners"
        title="Align with Africa’s most forward-looking summit."
        lead="Put your brand before global delegates and meet the decision-makers and investors shaping Africa’s digital economy."
        image={heroPhotos.partners}
        crumbs={[{ label: "Partners" }]}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="#partreg" variant="accent" size="lg" arrow>
            Become a partner
          </ButtonLink>
          <ButtonLink href={prospectusHref} variant="outline-light" size="lg">
            <Download className="size-4" /> Request the prospectus
          </ButtonLink>
        </div>
      </PageHero>

      <Section>
        <SectionHeader eyebrow="Why partner with us" title="Reach the people who move Africa’s digital agenda" />
        <div className="grid gap-5 md:grid-cols-3">
          {partnerBenefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 80} className="rounded-3xl border border-line p-8">
              <span className="font-display text-sm font-semibold text-brand-300">0{i + 1}</span>
              <h3 className="mt-6 text-xl font-semibold">{b.title}</h3>
              <p className="mt-3 leading-relaxed">{b.body}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-16 grid gap-10 rounded-[2rem] bg-night-900 p-8 text-white/75 sm:p-12 lg:grid-cols-2" data-tone="dark">
          <Reveal>
            <p className="eyebrow mb-4">The audience</p>
            <h3 className="text-2xl font-semibold text-white sm:text-3xl">Who you’ll meet</h3>
            <ul className="mt-6 flex flex-wrap gap-2">
              {audience.map((a) => (
                <li key={a} className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/85">{a}</li>
              ))}
            </ul>
          </Reveal>
          {recap && (
            <Reveal delay={100} className="grid grid-cols-2 gap-6">
              {recap.stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-4xl font-semibold text-white sm:text-5xl">
                    <StatCounter value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-1 text-sm text-white/60">{s.label} at Abuja 2025</p>
                </div>
              ))}
            </Reveal>
          )}
        </div>
      </Section>

      <Section id="packages" tone="mist">
        <SectionHeader
          eyebrow="Partnership packages"
          title="Seven ways to partner"
          lead="Every package can be tailored. Pricing is shared on request by our partnerships team."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((p, i) => (
            <Reveal
              key={p.id}
              delay={(i % 3) * 80}
              data-tone={p.highlighted ? "dark" : undefined}
              className={cn(
                "flex flex-col rounded-[2rem] p-8 transition duration-500 ease-(--ease-out-expo) hover:-translate-y-1",
                p.highlighted
                  ? "bg-linear-to-b from-brand-600 to-brand-800 text-white/80 shadow-[0_30px_80px_-30px_rgb(14_48_199/0.7)]"
                  : "border border-line bg-white hover:border-brand-200",
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className={cn("text-2xl font-semibold", p.highlighted && "text-white")}>{p.name}</h3>
                  {p.tagline && <p className={cn("mt-1 text-sm", p.highlighted ? "text-accent-200" : "text-muted")}>{p.tagline}</p>}
                </div>
                <span className={cn("shrink-0 rounded-full px-3 py-1 text-xs font-semibold", p.highlighted ? "bg-white/15 text-white" : "bg-brand-50 text-brand-700")}>
                  {p.vipPasses} VIP {p.vipPasses === 1 ? "pass" : "passes"}
                </span>
              </div>
              <ul className="mt-7 grid flex-1 content-start gap-3 text-[0.95rem]">
                {p.benefits.map((b) => (
                  <li key={b} className="flex gap-3">
                    <Check className={cn("mt-0.5 size-4.5 shrink-0", p.highlighted ? "text-accent-300" : "text-brand-600")} />
                    {b}
                  </li>
                ))}
              </ul>
              <ButtonLink
                href={`/partners?package=${p.name.split(" ")[0]}#partreg`}
                variant={p.highlighted ? "accent" : "outline"}
                className="mt-8 w-full"
                arrow
              >
                Enquire about {p.name.split(" ")[0]}
              </ButtonLink>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Past partners" title="Organisations that partnered with InnTech 2025" />
        <div className="grid gap-10">
          {groups.map((g) => (
            <div key={g.tier}>
              <h3 className="mb-4 text-sm font-semibold tracking-wide text-muted uppercase">{tierLabels[g.tier]}</h3>
              <ul className={cn("grid gap-3", g.tier === "organizer" ? "grid-cols-1 sm:max-w-xs" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5")}>
                {g.partners.map((p) => (
                  <li key={p.slug} className="relative h-28 rounded-2xl border border-line bg-white transition hover:border-brand-200 hover:shadow-sm">
                    {p.url ? (
                      <Link href={p.url} target="_blank" rel="noreferrer" aria-label={p.name} className="absolute inset-0">
                        <Image src={p.logo} alt={p.name} fill sizes="240px" className="object-contain p-6" />
                      </Link>
                    ) : (
                      <Image src={p.logo} alt={p.name} fill sizes="240px" className="object-contain p-6" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section id="partreg" tone="mist">
        <div className="grid gap-14 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="grid gap-6 lg:sticky lg:top-28">
              <Reveal>
                <p className="eyebrow mb-4">Partnership interest form</p>
                <h2 className="text-3xl font-semibold">Let’s build something together</h2>
                <p className="mt-3 leading-relaxed">Tell us about your organisation and goals. Our partnerships team will tailor a package for you.</p>
              </Reveal>
              <Reveal className="rounded-3xl border border-line bg-white p-7">
                <p className="text-sm text-muted">Partnerships lead</p>
                <p className="mt-1 font-display text-xl font-semibold text-ink">{site.partnershipContact.name}</p>
                <ul className="mt-5 grid gap-3 text-[0.95rem]">
                  <li>
                    <a href={site.partnershipContact.phoneHref} className="flex items-center gap-3 font-medium text-brand-600 hover:text-brand-800">
                      <Phone className="size-4" /> {site.partnershipContact.phone}
                    </a>
                  </li>
                  <li>
                    <a href={site.partnershipContact.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-3 font-medium text-brand-600 hover:text-brand-800">
                      <MessageCircle className="size-4" /> Chat on WhatsApp
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${site.contact.partnershipEmail}`} className="flex items-center gap-3 font-medium text-brand-600 hover:text-brand-800">
                      <Mail className="size-4" /> {site.contact.partnershipEmail}
                    </a>
                  </li>
                </ul>
              </Reveal>
            </div>
          </aside>
          <Reveal className="lg:col-span-8">
            <div className="rounded-[2rem] border border-line bg-white p-6 sm:p-10">
              <Suspense fallback={<PartnershipForm editions={getEditionOptions()} defaultEdition={featured.slug} />}>
                <PartnershipWithParams editions={getEditionOptions()} defaultEdition={featured.slug} />
              </Suspense>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
