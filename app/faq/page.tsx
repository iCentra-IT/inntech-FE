import type { Metadata } from "next";
import { faqs } from "@/lib/content/faqs";
import { site } from "@/lib/content/site";
import { ButtonLink } from "@/components/ui/button";
import { FaqList } from "@/components/ui/faq-list";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Answers about attending InnTech: registration, passes, refunds, travel, accessibility, partnerships and media.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const categories = [...new Set(faqs.map((f) => f.category))];
  return (
    <>
      <PageHero eyebrow="Help" title="Frequently asked questions" lead="Everything you need to know before you join us." crumbs={[{ label: "FAQs" }]} />
      <Section>
        <div className="grid gap-14 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <nav aria-label="FAQ categories" className="grid gap-1">
                {categories.map((c) => (
                  <a key={c} href={`#${c.toLowerCase()}`} className="rounded-xl px-4 py-2.5 font-display font-medium text-ink hover:bg-mist">
                    {c}
                  </a>
                ))}
              </nav>
              <div className="mt-8 rounded-3xl bg-night-900 p-7 text-white/75" data-tone="dark">
                <h2 className="text-xl font-semibold text-white">Still have a question?</h2>
                <p className="mt-2 text-[0.95rem]">The secretariat is happy to help.</p>
                <ButtonLink href="/contact" variant="accent" className="mt-6" arrow>Contact us</ButtonLink>
                <p className="mt-4 text-sm">{site.contact.email}</p>
              </div>
            </div>
          </aside>
          <div className="grid gap-14 lg:col-span-8">
            {categories.map((c) => (
              <Reveal key={c} id={c.toLowerCase()}>
                <h2 className="mb-2 text-2xl font-semibold">{c}</h2>
                <FaqList items={faqs.filter((f) => f.category === c)} />
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
          }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
