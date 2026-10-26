import type { EditionStage } from "@/lib/content/types";
import { stageMeta } from "@/lib/stage";
import { cn } from "@/lib/utils";

export function StageBadge({ stage, className }: { stage: EditionStage; className?: string }) {
  const { label, tone } = stageMeta[stage];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 font-display text-xs font-semibold tracking-wide",
        tone === "open" && "bg-accent-400/15 text-accent-300 ring-1 ring-accent-400/40",
        tone === "live" && "bg-red-500/15 text-red-200 ring-1 ring-red-400/40",
        tone === "soon" && "bg-white/10 text-white/80 ring-1 ring-white/20",
        tone === "past" && "bg-white/10 text-white/70 ring-1 ring-white/15",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "size-1.5 rounded-full",
          tone === "open" && "animate-pulse-ring bg-accent-400",
          tone === "live" && "animate-pulse bg-red-400",
          (tone === "soon" || tone === "past") && "bg-white/60",
        )}
      />
      {label}
    </span>
  );
}
