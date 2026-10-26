import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import type { Edition } from "@/lib/content/types";
import { cn, editionDate } from "@/lib/utils";
import { StageBadge } from "./stage-badge";

export function EditionCard({ edition, size = "default", className }: { edition: Edition; size?: "default" | "large"; className?: string }) {
  return (
    <Link
      href={`/editions/${edition.slug}`}
      data-tone="dark"
      className={cn(
        "group/ed relative isolate flex flex-col justify-end overflow-hidden rounded-[2rem] bg-night-800 p-7 text-white sm:p-9",
        size === "large" ? "min-h-[30rem]" : "min-h-[24rem]",
        className,
      )}
    >
      <Image
        src={edition.heroImage}
        alt=""
        fill
        sizes={size === "large" ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 40vw, 100vw"}
        className="-z-20 object-cover opacity-60 transition duration-[1.2s] ease-(--ease-out-expo) group-hover/ed:scale-105 group-hover/ed:opacity-70"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-t from-night-950 via-night-950/70 to-night-950/10" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-tr from-brand-700/40 to-transparent opacity-0 transition duration-700 group-hover/ed:opacity-100"
      />

      <div className="absolute top-7 right-7 left-7 flex items-start justify-between sm:top-9 sm:right-9 sm:left-9">
        <StageBadge stage={edition.stage} className="backdrop-blur" />
        <span className="grid size-12 place-items-center rounded-full border border-white/25 transition duration-500 ease-(--ease-out-expo) group-hover/ed:rotate-45 group-hover/ed:border-accent-400 group-hover/ed:bg-accent-400 group-hover/ed:text-night-950">
          <ArrowUpRight className="size-5" />
        </span>
      </div>

      <h3 className={cn("font-semibold text-white", size === "large" ? "text-4xl sm:text-5xl" : "text-3xl")}>{edition.name}</h3>
      <p className="mt-3 max-w-lg text-white/70">{edition.summary}</p>
      <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/85">
        <div className="flex items-center gap-2">
          <dt className="sr-only">Date</dt>
          <CalendarDays aria-hidden className="size-4 text-accent-400" />
          <dd>{editionDate(edition)}</dd>
        </div>
        <div className="flex items-center gap-2">
          <dt className="sr-only">Location</dt>
          <MapPin aria-hidden className="size-4 text-accent-400" />
          <dd>{edition.location}</dd>
        </div>
      </dl>
    </Link>
  );
}
