"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import type { Speaker } from "@/lib/content/types";
import { cn } from "@/lib/utils";
import { SpeakerCard } from "@/components/ui/speaker-card";

export type DirectorySpeaker = Omit<Speaker, "bio">;

export function SpeakerDirectory({ speakers, editions }: { speakers: DirectorySpeaker[]; editions: { slug: string; name: string }[] }) {
  const params = useSearchParams();
  const [edition, setEdition] = useState(params.get("edition") ?? "all");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const shown = speakers.filter(
    (s) =>
      (edition === "all" || s.editions.includes(edition)) &&
      (!q || `${s.name} ${s.role} ${s.organisation ?? ""}`.toLowerCase().includes(q)),
  );

  return (
    <>
      <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div role="group" aria-label="Filter by edition" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5">
          {[{ slug: "all", name: "All speakers" }, ...editions].map((e) => (
            <button
              key={e.slug}
              type="button"
              aria-pressed={edition === e.slug}
              onClick={() => setEdition(e.slug)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 font-display text-sm font-semibold transition",
                edition === e.slug ? "border-brand-600 bg-brand-600 text-white" : "border-line text-ink hover:border-brand-300",
              )}
            >
              {e.name}
            </button>
          ))}
        </div>
        <label className="relative block md:w-80">
          <span className="sr-only">Search speakers</span>
          <Search aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or organisation"
            className="h-11 w-full rounded-full border border-line bg-white pr-4 pl-11 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15"
          />
        </label>
      </div>
      <p role="status" className="sr-only">
        {shown.length} speakers shown
      </p>
      {shown.length === 0 ? (
        <p className="rounded-3xl bg-mist p-10 text-center text-muted">
          {edition !== "all" && speakers.every((s) => !s.editions.includes(edition))
            ? "Speakers for this edition will be announced soon."
            : "No speakers match your search."}
        </p>
      ) : (
        <SpeakerGrid speakers={shown} />
      )}
    </>
  );
}

export function SpeakerGrid({ speakers }: { speakers: DirectorySpeaker[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
      {speakers.map((s, i) => (
        <li key={s.slug}>
          <SpeakerCard speaker={s} priority={i < 4} />
        </li>
      ))}
    </ul>
  );
}
