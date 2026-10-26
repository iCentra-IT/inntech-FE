import { ButtonLink } from "@/components/ui/button";
import { BrandMark } from "@/components/ui/brand-mark";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <section data-tone="dark" className="relative isolate flex min-h-[80svh] items-center overflow-hidden bg-night-950 pt-32 pb-20">
      <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
      <BrandMark className="absolute top-1/2 right-0 -z-10 w-[30rem] -translate-y-1/2 text-white/[0.06]" strokeWidth={4} />
      <Container>
        <p className="eyebrow mb-5">Error 404</p>
        <h1 className="text-5xl font-semibold text-white sm:text-6xl">This page has moved on.</h1>
        <p className="mt-5 max-w-xl text-lg text-white/70">The link may be from our old website. Try one of these instead.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/" variant="accent" arrow>Home</ButtonLink>
          <ButtonLink href="/editions" variant="outline-light">Editions</ButtonLink>
          <ButtonLink href="/speakers" variant="outline-light">Speakers</ButtonLink>
          <ButtonLink href="/news" variant="outline-light">News</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
