"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Printer } from "lucide-react";
import Link from "next/link";
import type { SessionWithSpeakers } from "@/lib/queries";
import { cn } from "@/lib/utils";
import { buttonStyles } from "@/components/ui/button";
import { SessionList } from "./session-list";

export type AgendaEdition = {
  slug: string;
  name: string;
  dateLabel: string;
  venue?: string;
  timezone: string;
  sessions: SessionWithSpeakers[];
};

export function AgendaView({ editions, defaultEdition }: { editions: AgendaEdition[]; defaultEdition: string }) {
  const params = useSearchParams();
  const fromUrl = params.get("edition");
  const [selected, setSelected] = useState<string | null>(null);
  const active = editions.find((e) => e.slug === (selected ?? fromUrl)) ?? editions.find((e) => e.slug === defaultEdition)!;

  const [format, setFormat] = useState("All");
  const [track, setTrack] = useState("All");
  const formats = useMemo(() => ["All", ...new Set(active.sessions.map((s) => s.format))], [active]);
  const tracks = useMemo(() => ["All", ...new Set(active.sessions.flatMap((s) => (s.track ? [s.track] : [])))], [active]);
  const shown = active.sessions.filter((s) => (format === "All" || s.format === format) && (track === "All" || s.track === track));

  return (
    <div>
      <div role="tablist" aria-label="Edition" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 print:hidden">
        {editions.map((e) => (
          <button
            key={e.slug}
            role="tab"
            type="button"
            aria-selected={e.slug === active.slug}
            onClick={() => {
              setSelected(e.slug);
              setFormat("All");
              setTrack("All");
              window.history.replaceState(null, "", `?edition=${e.slug}`);
            }}
            className={cn(
              "shrink-0 rounded-full border px-5 py-2.5 text-left font-display text-sm font-semibold transition",
              e.slug === active.slug ? "border-brand-600 bg-brand-600 text-white" : "border-line text-ink hover:border-brand-300",
            )}
          >
            {e.name}
            <span className={cn("ml-2 font-normal", e.slug === active.slug ? "text-white/70" : "text-muted")}>{e.dateLabel}</span>
          </button>
        ))}
      </div>

      <div role="tabpanel" className="mt-10">
        <div className="flex flex-col gap-6 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-3xl font-semibold">{active.name}</h2>
            <p className="mt-2 text-muted">
              {active.dateLabel}
              {active.venue && <> · {active.venue}</>}
            </p>
          </div>
          {active.sessions.length > 0 && (
            <div className="flex flex-wrap items-end gap-3 print:hidden">
              <Filter label="Format" value={format} options={formats} onChange={setFormat} />
              {tracks.length > 2 && <Filter label="Track" value={track} options={tracks} onChange={setTrack} />}
              <button type="button" onClick={() => window.print()} className={buttonStyles({ variant: "outline", size: "md" })}>
                <Printer className="size-4" /> Save as PDF
              </button>
            </div>
          )}
        </div>

        <div className="mt-10">
          {active.sessions.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-brand-200 bg-brand-50/40 p-10">
              <h3 className="text-2xl font-semibold">The programme is being curated</h3>
              <p className="mt-2 max-w-xl">
                Sessions for {active.name} will appear here as speakers are confirmed. Want to be on the programme?
              </p>
              <Link href="/speak" className={buttonStyles({ variant: "primary", className: "mt-6" })}>
                Apply to speak
              </Link>
            </div>
          ) : shown.length === 0 ? (
            <p className="text-muted">No sessions match these filters.</p>
          ) : (
            <SessionList sessions={shown} timeZone={active.timezone} />
          )}
        </div>
      </div>
    </div>
  );
}

function Filter({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <label className="grid gap-1.5 text-xs font-medium text-muted">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 rounded-full border border-line bg-white px-4 pr-8 text-sm font-medium text-ink outline-none focus:border-brand-500"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}
