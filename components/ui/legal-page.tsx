import { PageHero } from "./page-hero";
import { Container } from "./container";

export type LegalSection = { title: string; body: string[] };

// Legal copy is a starting draft that describes what the site actually does.
// It must be reviewed by iCentra's legal counsel before launch.
export function LegalPage({ title, lead, updated, sections }: { title: string; lead: string; updated: string; sections: LegalSection[] }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} lead={lead} crumbs={[{ label: title }]} />
      <Container size="narrow" className="py-16 sm:py-20">
        <p className="text-sm text-muted">Last updated {updated}</p>
        <div className="prose-inntech mt-8">
          {sections.map((s) => (
            <section key={s.title}>
              <h2>{s.title}</h2>
              {s.body.map((p, i) => (
                <p key={i} className="mt-4">{p}</p>
              ))}
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
