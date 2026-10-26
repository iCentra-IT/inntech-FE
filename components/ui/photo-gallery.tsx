"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import type { GalleryPhoto } from "@/lib/content/types";
import { cn } from "@/lib/utils";

/** Bento-style photo grid (pattern repeats every 8 photos) with a keyboard-friendly lightbox. */
export function PhotoGallery({ photos, initial = 8 }: { photos: GalleryPhoto[]; initial?: number }) {
  const [open, setOpen] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const visible = showAll ? photos : photos.slice(0, initial);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open !== null && !d.open) d.showModal();
    if (open === null && d.open) d.close();
  }, [open]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % photos.length));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, photos.length]);

  return (
    <>
      <ul className="grid auto-rows-[11rem] grid-cols-2 gap-3 sm:auto-rows-[13rem] md:grid-cols-4">
        {visible.map((p, i) => (
          <li
            key={p.src}
            className={cn(
              "group/ph relative overflow-hidden rounded-2xl bg-night-800",
              i % 8 === 0 && "col-span-2 row-span-2",
              i % 8 === 5 && "md:col-span-2",
            )}
          >
            <button type="button" onClick={() => setOpen(i)} className="absolute inset-0 cursor-zoom-in" aria-label={`View photo: ${p.alt}`}>
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes={i % 8 === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                className="object-cover transition duration-700 ease-(--ease-out-expo) group-hover/ph:scale-[1.04]"
              />
              <span className="absolute inset-0 bg-linear-to-t from-night-950/60 via-transparent to-transparent opacity-0 transition duration-500 group-hover/ph:opacity-100" />
              <Expand className="absolute right-3 bottom-3 size-5 text-white opacity-0 transition duration-500 group-hover/ph:opacity-100" />
            </button>
          </li>
        ))}
      </ul>
      {!showAll && photos.length > initial && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="rounded-full border border-current/20 px-5 py-2.5 font-display text-sm font-semibold transition hover:border-current/50"
          >
            Show all {photos.length} photos
          </button>
        </div>
      )}

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === e.currentTarget && setOpen(null)}
        aria-label="Photo viewer"
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-night-950/95 p-0 backdrop:bg-transparent"
      >
        {open !== null && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-5 py-4 text-sm text-white/70">
              <span className="tabular-nums">
                {open + 1} / {photos.length}
              </span>
              <button type="button" onClick={() => setOpen(null)} aria-label="Close" className={lbBtn}>
                <X className="size-5" />
              </button>
            </div>
            <div className="relative flex-1" onClick={(e) => e.target === e.currentTarget && setOpen(null)}>
              <Image
                key={photos[open].src}
                src={photos[open].src}
                alt={photos[open].alt}
                fill
                sizes="100vw"
                quality={85}
                className="animate-[fade-in_400ms_ease-out] object-contain px-4 sm:px-20"
              />
              <button type="button" onClick={() => setOpen((open - 1 + photos.length) % photos.length)} aria-label="Previous photo" className={cn(lbBtn, "absolute top-1/2 left-3 -translate-y-1/2 sm:left-6")}>
                <ArrowLeft className="size-5" />
              </button>
              <button type="button" onClick={() => setOpen((open + 1) % photos.length)} aria-label="Next photo" className={cn(lbBtn, "absolute top-1/2 right-3 -translate-y-1/2 sm:right-6")}>
                <ArrowRight className="size-5" />
              </button>
            </div>
            <p className="px-5 py-5 text-center text-sm text-white/70">{photos[open].alt}</p>
          </div>
        )}
      </dialog>
    </>
  );
}

const lbBtn = "grid size-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20";
