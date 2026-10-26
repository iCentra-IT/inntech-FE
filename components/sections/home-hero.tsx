import Image from "next/image";
import { CalendarDays, MapPin, Sparkles } from "lucide-react";
import type { Edition } from "@/lib/content/types";
import { stageCtas } from "@/lib/stage";
import { editionDate } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { BrandMark } from "@/components/ui/brand-mark";
import { Container } from "@/components/ui/container";
import { Countdown } from "@/components/ui/countdown";
import { StageBadge } from "@/components/ui/stage-badge";

export function HomeHero({ edition }: { edition: Edition }) {
  const ctas = stageCtas(edition);
  const showCountdown = edition.startsAt && edition.stage !== "concluded" && edition.stage !== "live";

  return (
    <section data-tone="dark" className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-night-950 pt-32 pb-14 sm:pb-20">
      <Image
        src={edition.heroImage}
        alt=""
        fill
        preload
        sizes="100vw"
        quality={70}
        className="-z-30 scale-105 object-cover object-[50%_35%] opacity-40"
      />
      {/* Layered wash: keeps text at AA contrast over any photo. */}
      <div aria-hidden className="absolute inset-0 -z-20 bg-linear-to-t from-night-950 via-night-950/75 to-night-950/40" />
      <div aria-hidden className="absolute inset-0 -z-20 bg-linear-to-r from-night-950/90 via-night-950/40 to-transparent" />
      <div aria-hidden className="bg-grid absolute inset-0 -z-10 opacity-70" />
      <div aria-hidden className="absolute -top-56 -left-40 -z-10 size-[44rem] animate-float rounded-full bg-brand-600/35 blur-[140px]" />
      <div aria-hidden className="absolute -right-40 bottom-0 -z-10 size-[32rem] animate-float rounded-full bg-accent-400/15 blur-[120px] [animation-delay:-4s]" />
      <BrandMark className="absolute top-28 right-[-6rem] -z-10 hidden w-[36rem] text-white/[0.07] lg:block xl:right-0" strokeWidth={3} />

      <Container className="relative">
        <div className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-3" data-enter="">
            <StageBadge stage={edition.stage} />
            <span className="text-sm font-medium text-white/60">{ctas.kicker}</span>
          </div>

          {/* No entrance animation: the headline is the LCP element and must paint at once. */}
          <h1
            className="mt-7 text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.95] font-semibold tracking-[-0.035em] text-white"
          >
            {edition.shortName}
            <span className="text-gradient block">{edition.name.match(/\d{4}/)?.[0]}</span>
          </h1>

          <p
            data-enter=""
            style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
            className="mt-7 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl"
          >
            {edition.summary}
          </p>

          <dl
            data-enter=""
            style={{ "--reveal-delay": "220ms" } as React.CSSProperties}
            className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[0.95rem] text-white/85"
          >
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

          <div
            data-enter=""
            style={{ "--reveal-delay": "280ms" } as React.CSSProperties}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <ButtonLink href={ctas.primary.href} variant="accent" size="lg" arrow>
              {ctas.primary.label}
            </ButtonLink>
            <ButtonLink href={ctas.secondary.href} variant="outline-light" size="lg">
              {ctas.secondary.label}
            </ButtonLink>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-8 border-t border-white/10 pt-8 lg:flex-row lg:items-end lg:justify-between">
          {showCountdown ? (
            <div data-enter="" style={{ "--reveal-delay": "340ms" } as React.CSSProperties}>
              <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-white/50 uppercase">The countdown has begun</p>
              <Countdown to={edition.startsAt!} />
            </div>
          ) : (
            <span />
          )}
          <p
            data-enter=""
            style={{ "--reveal-delay": "400ms" } as React.CSSProperties}
            className="max-w-sm font-display text-sm leading-relaxed text-white/55 lg:text-right"
          >
            Inspiring Innovation. Harnessing Technology. <span className="text-accent-400">Accelerating Transformation.</span>
          </p>
        </div>
      </Container>
    </section>
  );
}
