import Image from "next/image";
import { cn } from "@/lib/utils";

/** Fills its (relative) parent with the speaker photo, or initials when there is none. */
export function SpeakerPhoto({
  photo,
  name,
  alt = "",
  sizes,
  preload,
  className,
}: {
  photo?: string;
  name: string;
  alt?: string;
  sizes: string;
  preload?: boolean;
  className?: string;
}) {
  if (photo) {
    return <Image src={photo} alt={alt} fill sizes={sizes} preload={preload} className={cn("object-cover object-top", className)} />;
  }
  const initials = name
    .split(" ")
    .filter((w) => !w.endsWith("."))
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    <span
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      className="absolute inset-0 grid place-items-center bg-linear-to-br from-brand-500 to-brand-800 font-display font-semibold text-white/90 [container-type:size]"
    >
      <span aria-hidden className="text-[38cqmin]">{initials}</span>
    </span>
  );
}
