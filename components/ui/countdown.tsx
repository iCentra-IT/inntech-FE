"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function partsUntil(target: number): Parts | null {
  const diff = target - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

/**
 * Live countdown to `to`. Renders nothing on the server (the time is request
 * data) and hides itself once the start time has passed, per the brief.
 */
export function Countdown({ to, className }: { to: string; className?: string }) {
  const target = new Date(to).getTime();
  const [parts, setParts] = useState<Parts | null | undefined>(undefined);

  useEffect(() => {
    const tick = () => setParts(partsUntil(target));
    const first = requestAnimationFrame(tick);
    const id = setInterval(tick, 1000);
    return () => {
      cancelAnimationFrame(first);
      clearInterval(id);
    };
  }, [target]);

  if (parts === null) return null;

  const units: [keyof Parts, string][] = [
    ["days", "Days"],
    ["hours", "Hours"],
    ["minutes", "Minutes"],
    ["seconds", "Seconds"],
  ];

  return (
    <div
      role="timer"
      aria-label={parts ? `${parts.days} days, ${parts.hours} hours and ${parts.minutes} minutes to go` : "Countdown"}
      className={cn("flex gap-2 sm:gap-3", className)}
    >
      {units.map(([key, label]) => (
        <div
          key={key}
          className="flex min-w-[4.25rem] flex-col items-center rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-3 backdrop-blur-sm sm:min-w-20 sm:px-4"
        >
          <span aria-hidden className="font-display text-3xl font-semibold text-white tabular-nums sm:text-4xl">
            {parts ? String(parts[key]).padStart(2, "0") : "––"}
          </span>
          <span aria-hidden className="mt-1 text-[0.65rem] font-semibold tracking-[0.18em] text-white/50 uppercase">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
