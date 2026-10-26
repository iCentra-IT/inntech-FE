import Image from "next/image";
import type { Partner } from "@/lib/content/types";
import { cn } from "@/lib/utils";

/** Infinite, CSS-only partner logo strip. Pauses on hover; static for reduced motion. */
export function LogoMarquee({ partners, className }: { partners: Partner[]; className?: string }) {
  const row = [...partners, ...partners];
  return (
    <div className={cn("marquee-mask group/marquee relative overflow-hidden", className)}>
      <ul
        className="flex w-max animate-marquee gap-4 group-hover/marquee:[animation-play-state:paused] motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center"
        style={{ "--marquee-duration": `${partners.length * 4}s` } as React.CSSProperties}
      >
        {row.map((p, i) => (
          <li
            key={`${p.slug}-${i}`}
            aria-hidden={i >= partners.length || undefined}
            className={cn(
              "relative flex h-24 w-48 shrink-0 items-center justify-center rounded-2xl border border-line bg-white px-6 sm:w-56",
              i >= partners.length && "motion-reduce:hidden",
            )}
          >
            <Image
              src={p.logo}
              alt={i >= partners.length ? "" : p.name}
              fill
              sizes="224px"
              className="object-contain p-5 grayscale-[35%] transition duration-500 hover:grayscale-0"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
