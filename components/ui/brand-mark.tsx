import { cn } from "@/lib/utils";

/**
 * Outline of the InnTech "i·n" mark (redrawn from InnTech-watermark.png) so it
 * stays crisp at any size and can take the current colour.
 */
export function BrandMark({ className, strokeWidth = 6 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 775 800"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      aria-hidden
      className={cn("pointer-events-none", className)}
    >
      <circle cx="89" cy="100" r="85" />
      <path d="M257 4h490a22 22 0 0 1 22 22v222a22 22 0 0 1-22 22H352A115 115 0 0 1 237 155V24a20 20 0 0 1 20-20Z" />
      <path d="M26 266h316c235 0 427 198 427 434v72a22 22 0 0 1-22 22H531a22 22 0 0 1-22-22v-30c0-128-100-218-240-220v250a22 22 0 0 1-22 22H26a22 22 0 0 1-22-22V288a22 22 0 0 1 22-22Z" />
    </svg>
  );
}

/** Solid version of the mark for small decorative use. */
export function BrandGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 775 800" aria-hidden className={cn("pointer-events-none", className)}>
      <circle cx="89" cy="100" r="85" fill="#39cbe2" />
      <path
        fill="currentColor"
        d="M257 4h490a22 22 0 0 1 22 22v222a22 22 0 0 1-22 22H352A115 115 0 0 1 237 155V24a20 20 0 0 1 20-20ZM26 266h316c235 0 427 198 427 434v72a22 22 0 0 1-22 22H531a22 22 0 0 1-22-22v-30c0-128-100-218-240-220v250a22 22 0 0 1-22 22H26a22 22 0 0 1-22-22V288a22 22 0 0 1 22-22Z"
      />
    </svg>
  );
}
