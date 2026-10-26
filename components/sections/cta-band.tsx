import { getFeaturedEdition } from "@/lib/queries";
import { stageCtas } from "@/lib/stage";
import { editionDate } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { BrandMark } from "@/components/ui/brand-mark";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

/** Closing call to action for the featured edition. */
export function CtaBand({ title, lead }: { title?: string; lead?: string }) {
  const edition = getFeaturedEdition();
  const ctas = stageCtas(edition);
  return (
    <section data-tone="dark" className="relative isolate overflow-hidden bg-brand-700 py-20 sm:py-28">
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-br from-brand-600 via-brand-700 to-night-800" />
      <div aria-hidden className="absolute -top-32 -right-32 -z-10 size-[30rem] rounded-full bg-accent-400/25 blur-[110px]" />
      <BrandMark className="absolute -bottom-28 -left-16 -z-10 w-96 text-white/10" strokeWidth={4} />
      <Container>
        <Reveal className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow mb-5 text-accent-300!">
              {edition.name} · {editionDate(edition)}
            </p>
            <h2 className="text-4xl leading-[1.05] font-semibold text-white sm:text-5xl">
              {title ?? "Be in the room where Africa’s digital future is decided."}
            </h2>
            {lead && <p className="mt-5 text-lg text-white/75">{lead}</p>}
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={ctas.primary.href} variant="accent" size="lg" arrow>
              {ctas.primary.label}
            </ButtonLink>
            <ButtonLink href="/partners" variant="outline-light" size="lg">
              Become a partner
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
