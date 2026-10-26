import { BrandMark } from "./brand-mark";
import { Reveal } from "./reveal";
import { StatCounter } from "./stat-counter";

type Stat = { label: string; value: number; suffix?: string };

/** High-contrast navy panel of headline numbers. Revealed as one unit so no cell rests half-faded. */
export function StatsBand({ stats, caption, className }: { stats: Stat[]; caption?: string; className?: string }) {
  return (
    <Reveal className={className}>
      <div data-tone="dark" className="relative isolate overflow-hidden rounded-[2rem] bg-night-900 shadow-[0_30px_80px_-40px_rgb(14_48_199/0.6)]">
        <div aria-hidden className="absolute -top-24 -left-24 -z-10 size-80 rounded-full bg-brand-600/40 blur-[90px]" />
        <div aria-hidden className="absolute -right-20 -bottom-28 -z-10 size-72 rounded-full bg-accent-400/20 blur-[90px]" />
        <BrandMark className="absolute top-1/2 right-6 -z-10 hidden w-40 -translate-y-1/2 text-white/[0.06] lg:block" strokeWidth={8} />
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={[
                "flex flex-col-reverse gap-3 p-7 sm:p-9",
                i % 2 === 1 ? "border-l border-white/10" : "",
                i >= 2 ? "border-t border-white/10 lg:border-t-0" : "",
                i === 2 ? "lg:border-l" : "",
              ].join(" ")}
            >
              <dt className="flex items-center gap-2 text-sm font-medium text-white/75">
                <span aria-hidden className="h-0.5 w-4 rounded-full bg-accent-400" />
                {s.label}
              </dt>
              <dd className="font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                <StatCounter value={s.value} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
        {caption && <p className="border-t border-white/10 px-7 py-4 text-sm text-white/60 sm:px-9">{caption}</p>}
      </div>
    </Reveal>
  );
}
