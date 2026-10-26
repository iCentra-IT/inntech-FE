import { cn } from "@/lib/utils";
import { Container } from "./container";
import { Reveal } from "./reveal";

type Tone = "light" | "mist" | "dark";

export function Section({
  tone = "light",
  className,
  containerClassName,
  children,
  bleed = false,
  ...props
}: React.ComponentProps<"section"> & { tone?: Tone; containerClassName?: string; bleed?: boolean }) {
  return (
    <section
      data-tone={tone}
      className={cn(
        "relative py-20 sm:py-28",
        tone === "light" && "bg-paper",
        tone === "mist" && "bg-mist",
        tone === "dark" && "overflow-hidden bg-night-900 text-white/75",
        className,
      )}
      {...props}
    >
      {bleed ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "light",
  action,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  tone?: Tone;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-12 flex flex-col gap-6 sm:mb-16",
        align === "center" ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
        <h2
          className={cn(
            "text-3xl leading-[1.1] font-semibold sm:text-4xl lg:text-[2.75rem]",
            tone === "dark" && "text-white",
          )}
        >
          {title}
        </h2>
        {lead && (
          <p className={cn("mt-5 text-lg leading-relaxed", tone === "dark" ? "text-white/70" : "text-body")}>
            {lead}
          </p>
        )}
      </Reveal>
      {action && <Reveal delay={120}>{action}</Reveal>}
    </div>
  );
}
