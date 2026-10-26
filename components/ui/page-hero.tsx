import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BrandMark } from "./brand-mark";
import { Container } from "./container";

type Crumb = { label: string; href?: string };

/** Dark hero used at the top of every inner page. */
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  imageAlt = "",
  crumbs,
  children,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  image?: string;
  imageAlt?: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section data-tone="dark" className={cn("relative isolate overflow-hidden bg-night-900 pt-36 pb-16 sm:pt-44 sm:pb-24", className)}>
      {image && (
        <Image src={image} alt={imageAlt} fill preload sizes="100vw" quality={70} className="-z-20 object-cover opacity-35" />
      )}
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-b from-night-950/90 via-night-900/80 to-night-900" />
      <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
      <div aria-hidden className="absolute -top-40 left-1/2 -z-10 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-brand-600/30 blur-[120px]" />
      <BrandMark className="absolute top-24 -right-20 -z-10 hidden w-[26rem] text-white/[0.06] lg:block" strokeWidth={4} />

      <Container>
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/55">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex items-center gap-1.5">
                  <ChevronRight aria-hidden className="size-3.5" />
                  {c.href ? (
                    <Link href={c.href} className="hover:text-white">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-white/85">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div data-enter="" className="max-w-3xl">
          {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
          <h1 className="text-4xl leading-[1.05] font-semibold text-white sm:text-5xl lg:text-6xl">{title}</h1>
          {lead && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl">{lead}</p>}
        </div>
        {children && (
          <div data-enter="" style={{ "--reveal-delay": "150ms" } as React.CSSProperties} className="mt-10">
            {children}
          </div>
        )}
      </Container>
    </section>
  );
}
