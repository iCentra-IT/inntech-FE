import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Speaker } from "@/lib/content/types";
import { SpeakerPhoto } from "@/components/ui/speaker-photo";
import { cn, speakerName } from "@/lib/utils";

type CardSpeaker = Pick<Speaker, "slug" | "name" | "honorific" | "role" | "organisation" | "photo">;

export function SpeakerCard({ speaker, priority = false, className }: { speaker: CardSpeaker; priority?: boolean; className?: string }) {
  return (
    <Link
      href={`/speakers/${speaker.slug}`}
      className={cn("group/sp block rounded-3xl focus-visible:outline-offset-4", className)}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-linear-to-b from-brand-100 via-brand-50 to-white">
        <div aria-hidden className="absolute inset-x-6 bottom-0 h-2/3 rounded-t-full bg-linear-to-t from-brand-200/80 to-transparent transition duration-700 group-hover/sp:from-accent-300/70" />
        <SpeakerPhoto
          photo={speaker.photo}
          name={speaker.name}
          alt={speakerName(speaker)}
          preload={priority}
          sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 50vw"
          className="transition duration-700 ease-(--ease-out-expo) group-hover/sp:scale-[1.04]"
        />
        <span className="absolute top-4 right-4 grid size-10 place-items-center rounded-full bg-white/90 text-brand-700 opacity-0 shadow-lg backdrop-blur transition duration-500 ease-(--ease-out-expo) group-hover/sp:opacity-100 group-focus-visible/sp:opacity-100">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
      <div className="px-1 pt-5">
        <h3 className="text-lg leading-tight font-semibold transition-colors group-hover/sp:text-brand-700">
          {speakerName(speaker)}
        </h3>
        <p className="mt-1.5 text-sm leading-snug text-muted">
          {speaker.role}
          {speaker.organisation && <>, {speaker.organisation}</>}
        </p>
      </div>
    </Link>
  );
}
