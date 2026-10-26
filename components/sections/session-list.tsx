import Link from "next/link";
import { MapPin } from "lucide-react";
import type { SessionWithSpeakers } from "@/lib/queries";
import { SpeakerPhoto } from "@/components/ui/speaker-photo";
import { cn, formatDate } from "@/lib/utils";

const formatTone: Record<string, string> = {
  Keynote: "bg-brand-600 text-white",
  Panel: "bg-accent-400/20 text-brand-800",
  "Fireside Chat": "bg-night-900 text-white",
  Opening: "bg-brand-50 text-brand-700",
  Networking: "bg-mist text-ink",
};

/** Timeline of sessions grouped by slot. Presentational: safe in server and client trees. */
export function SessionList({ sessions, timeZone = "Africa/Lagos" }: { sessions: SessionWithSpeakers[]; timeZone?: string }) {
  const slots = [...new Set(sessions.map((s) => s.slot))];
  return (
    <div className="grid gap-12">
      {slots.map((slot) => (
        <div key={slot} className="grid gap-4 lg:grid-cols-[10rem_1fr] lg:gap-10">
          <h3 className="font-display text-sm font-semibold tracking-[0.18em] text-brand-600 uppercase lg:sticky lg:top-28 lg:self-start lg:pt-7">
            {slot}
          </h3>
          <ol className="relative grid gap-4 before:absolute before:top-4 before:bottom-4 before:left-[0.6rem] before:w-px before:bg-line lg:before:hidden">
            {sessions
              .filter((s) => s.slot === slot)
              .map((s) => (
                <li key={s.id} className="relative pl-8 lg:pl-0">
                  <span aria-hidden className="absolute top-8 left-1.5 size-2.5 rounded-full bg-brand-600 ring-4 ring-white lg:hidden" />
                  <article className="group/s rounded-3xl border border-line bg-white p-6 transition duration-500 ease-(--ease-out-expo) hover:border-brand-200 hover:shadow-[0_20px_50px_-30px_rgb(14_48_199/0.35)] sm:p-7">
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      <span className={cn("rounded-full px-3 py-1 font-display text-xs font-semibold", formatTone[s.format])}>{s.format}</span>
                      {s.track && <span className="rounded-full border border-line px-3 py-1 text-xs text-muted">{s.track}</span>}
                      {s.startsAt && (
                        <time dateTime={s.startsAt} className="font-medium text-ink">
                          {formatDate(s.startsAt, { hour: "2-digit", minute: "2-digit" }, timeZone)}
                          {s.endsAt && `–${formatDate(s.endsAt, { hour: "2-digit", minute: "2-digit" }, timeZone)}`}
                        </time>
                      )}
                      {s.room && (
                        <span className="ml-auto inline-flex items-center gap-1.5 text-muted">
                          <MapPin className="size-3.5" /> {s.room}
                        </span>
                      )}
                    </div>
                    <h4 className="mt-4 text-xl leading-snug font-semibold sm:text-[1.35rem]">{s.title}</h4>
                    {(s.speakers.length > 0 || s.ledBy) && (
                      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
                        {s.speakers.map((sp) => (
                          <Link key={sp.slug} href={`/speakers/${sp.slug}`} className="group/sp flex items-center gap-3">
                            <span className="relative size-11 shrink-0 overflow-hidden rounded-full bg-linear-to-b from-brand-100 to-brand-300">
                              <SpeakerPhoto photo={sp.photo} name={sp.name} sizes="44px" />
                            </span>
                            <span className="text-sm">
                              <span className="block font-semibold text-ink group-hover/sp:text-brand-700">{sp.name}</span>
                              <span className="text-muted">{sp.title}</span>
                            </span>
                          </Link>
                        ))}
                        {s.ledBy && <p className="text-sm text-muted">Led by <span className="font-semibold text-ink">{s.ledBy}</span></p>}
                      </div>
                    )}
                  </article>
                </li>
              ))}
          </ol>
        </div>
      ))}
    </div>
  );
}
