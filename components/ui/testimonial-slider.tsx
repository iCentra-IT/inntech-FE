"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Testimonial } from "@/lib/content/types";
import { cn } from "@/lib/utils";

export function TestimonialSlider({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = useCallback((dir: number) => setIndex((i) => (i + dir + items.length) % items.length), [items.length]);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="What speakers said"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative"
    >
      <div className="grid">
        {items.map((t, i) => (
          <figure
            key={t.name}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${items.length}`}
            aria-hidden={i !== index}
            className={cn(
              "col-start-1 row-start-1 transition-all duration-700 ease-(--ease-out-expo)",
              i === index ? "visible translate-y-0 opacity-100" : "invisible translate-y-3 opacity-0",
            )}
          >
            <blockquote className="font-display text-2xl leading-snug font-medium text-white sm:text-3xl lg:text-[2.1rem]">
              <span className="text-accent-400">“</span>
              {t.quote}
              <span className="text-accent-400">”</span>
            </blockquote>
            <figcaption className="mt-10 flex items-center gap-4">
              {t.photo && (
                <span className="relative size-14 overflow-hidden rounded-full bg-linear-to-b from-brand-200 to-brand-400 ring-2 ring-white/15">
                  <Image src={t.photo} alt="" fill sizes="56px" className="object-cover object-top" />
                </span>
              )}
              <span>
                <span className="block font-display text-lg font-semibold text-white">{t.name}</span>
                <span className="text-white/60">{t.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-12 flex items-center gap-6">
        <div className="flex gap-2">
          <button type="button" onClick={() => go(-1)} aria-label="Previous quote" className={navBtn}>
            <ArrowLeft className="size-4" />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next quote" className={navBtn}>
            <ArrowRight className="size-4" />
          </button>
        </div>
        <div className="flex flex-1 gap-2" role="group" aria-label="Choose a quote">
          {items.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Quote from ${t.name}`}
              aria-current={i === index || undefined}
              className="group/dot relative h-8 flex-1"
            >
              <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 overflow-hidden rounded-full bg-white/15">
                {i === index && (
                  <span
                    className="block h-full origin-left animate-[progress_8s_linear_forwards] rounded-full bg-accent-400 motion-reduce:animate-none"
                    style={{ animationPlayState: paused ? "paused" : "running" }}
                    // The progress bar is the timer: auto-advance when it fills.
                    onAnimationEnd={() => go(1)}
                  />
                )}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const navBtn =
  "grid size-11 place-items-center rounded-full border border-white/20 text-white transition hover:border-accent-400 hover:bg-accent-400 hover:text-night-950";
