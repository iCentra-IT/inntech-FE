import type { Metadata } from "next";
import Image from "next/image";
import { Download, Images, Mail, Phone } from "lucide-react";
import { abujaGallery, heroPhotos } from "@/lib/content/home";
import { site } from "@/lib/content/site";
import { getEditionOptions, getFeaturedEdition, getPosts } from "@/lib/queries";
import { MediaAccreditationForm } from "@/components/forms/forms";
import { ButtonLink } from "@/components/ui/button";
import { NewsCard } from "@/components/ui/news-card";
import { PageHero } from "@/components/ui/page-hero";
import { PhotoGallery } from "@/components/ui/photo-gallery";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Media centre",
  description: "Press releases, brand assets, event photography and media accreditation for InnTech Summit.",
  alternates: { canonical: "/media" },
};

const assets = [
  { label: "InnTech logo (white, PNG)", href: "/images/brand/logo-white.png", preview: "/images/brand/logo-white.png", dark: true },
  { label: "InnTech logo (blue, PNG)", href: "/images/brand/logo-blue.png", preview: "/images/brand/logo-blue.png", dark: false },
  { label: "InnTech mark (PNG)", href: "/images/brand/favicon.png", preview: "/images/brand/favicon.png", dark: false },
];

export default function MediaPage() {
  const featured = getFeaturedEdition();
  const releases = getPosts().filter((p) => p.categories.includes("Press Releases"));
  return (
    <>
      <PageHero
        eyebrow="Media centre"
        title="Everything you need to cover InnTech."
        lead="Press releases, brand assets, photography and accreditation for journalists, broadcasters and content creators."
        image={heroPhotos.media}
        crumbs={[{ label: "Media centre" }]}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="#accreditation" variant="accent" size="lg" arrow>
            Apply for accreditation
          </ButtonLink>
          <ButtonLink href="#press-kit" variant="outline-light" size="lg">
            Press kit
          </ButtonLink>
        </div>
      </PageHero>

      <Section>
        <SectionHeader eyebrow="Press releases" title="Latest announcements" action={<ButtonLink href="/news" variant="outline" arrow>Newsroom</ButtonLink>} />
        <div className="grid gap-x-6 gap-y-12 md:grid-cols-3">
          {releases.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
              <NewsCard post={p} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="press-kit" tone="mist">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow mb-5">Press kit</p>
            <h2 className="text-3xl font-semibold">Brand assets</h2>
            <p className="mt-4 leading-relaxed">
              Use the white logo on dark backgrounds and the blue logo on light ones. Please don’t recolour or distort the
              mark. For vector files or an interview request, contact the secretariat.
            </p>
            <div className="mt-8 grid gap-3 text-[0.95rem]">
              <a href={`mailto:${site.contact.email}?subject=Media%20enquiry`} className="flex items-center gap-3 font-medium text-brand-600 hover:text-brand-800">
                <Mail className="size-4" /> {site.contact.email}
              </a>
              <a href={site.contact.phoneHref} className="flex items-center gap-3 font-medium text-brand-600 hover:text-brand-800">
                <Phone className="size-4" /> {site.contact.phone}
              </a>
            </div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-3 lg:col-span-8">
            {assets.map((a, i) => (
              <Reveal key={a.href} delay={i * 80}>
                <a href={a.href} download className="group/as block overflow-hidden rounded-3xl border border-line bg-white transition hover:border-brand-300">
                  <div className={a.dark ? "relative h-40 bg-night-900" : "relative h-40 bg-white"}>
                    <Image src={a.preview} alt="" fill sizes="280px" className="object-contain p-8" />
                  </div>
                  <div className="flex items-center justify-between gap-3 border-t border-line px-5 py-4 text-sm font-medium text-ink">
                    {a.label}
                    <Download className="size-4 shrink-0 text-brand-600 transition group-hover/as:translate-y-0.5" />
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section id="photos">
        <SectionHeader
          eyebrow="Photography"
          title="Abuja 2025 photo library"
          lead="Event photography for editorial use. Please credit “InnTech Summit”."
          action={<span className="inline-flex items-center gap-2 text-sm text-muted"><Images className="size-4" /> {abujaGallery.length} photos</span>}
        />
        <PhotoGallery photos={abujaGallery} initial={8} />
      </Section>

      <Section id="accreditation" tone="mist">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            align="center"
            eyebrow="Media accreditation"
            title={`Cover ${featured.name}`}
            lead="Journalists, broadcasters and content creators can apply for accreditation. Approved media receive their pass by email."
          />
          <Reveal className="rounded-[2rem] border border-line bg-white p-6 sm:p-10">
            <MediaAccreditationForm editions={getEditionOptions()} defaultEdition={featured.slug} />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
