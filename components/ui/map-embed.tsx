import { MapPin } from "lucide-react";
import { mapsEmbed, mapsLink } from "@/lib/utils";

/** Lazy Google Maps embed (no API key needed) with a directions link. */
export function MapEmbed({ query, title }: { query: string; title: string }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-mist">
      <iframe
        title={`Map: ${title}`}
        src={mapsEmbed(query)}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="aspect-[16/10] w-full grayscale-[30%]"
      />
      <a
        href={mapsLink(query)}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 border-t border-line bg-white px-5 py-4 font-display text-sm font-semibold text-brand-600 hover:text-brand-800"
      >
        <MapPin className="size-4" /> Get directions to {title}
      </a>
    </div>
  );
}
