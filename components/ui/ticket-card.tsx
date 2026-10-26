import { Check } from "lucide-react";
import type { Edition, TicketType } from "@/lib/content/types";
import { cn, formatDate, formatPrice } from "@/lib/utils";
import { ButtonLink } from "./button";

export function TicketCard({ ticket, edition, href }: { ticket: TicketType; edition: Edition; href: string }) {
  const hl = ticket.highlighted;
  return (
    <div
      data-tone={hl ? "dark" : "light"}
      className={cn(
        "relative flex flex-col rounded-[2rem] p-8 transition duration-500 ease-(--ease-out-expo) hover:-translate-y-1",
        hl
          ? "bg-night-900 text-white/75 shadow-[0_30px_80px_-30px_rgb(14_48_199/0.6)] ring-1 ring-brand-500/50"
          : "border border-line bg-white hover:border-brand-200 hover:shadow-[0_24px_60px_-30px_rgb(14_48_199/0.35)]",
      )}
    >
      {hl && (
        <span className="absolute -top-3 left-8 rounded-full bg-accent-400 px-3 py-1 font-display text-xs font-semibold text-night-950">
          Most popular
        </span>
      )}
      <h3 className={cn("text-2xl font-semibold", hl && "text-white")}>{ticket.name}</h3>
      <p className="mt-2 text-[0.95rem]">{ticket.description}</p>
      <div className="mt-7 border-y border-current/10 py-6">
        {ticket.price !== undefined ? (
          <>
            <p className={cn("font-display text-4xl font-semibold", hl ? "text-white" : "text-ink")}>
              {formatPrice(ticket.earlyBirdPrice ?? ticket.price, edition.currency)}
            </p>
            {ticket.earlyBirdPrice !== undefined && ticket.earlyBirdEnds && (
              <p className="mt-1 text-sm">
                Early bird until {formatDate(ticket.earlyBirdEnds)}, then {formatPrice(ticket.price, edition.currency)}
              </p>
            )}
          </>
        ) : (
          <>
            <p className={cn("font-display text-2xl font-semibold", hl ? "text-white" : "text-ink")}>Pricing to be announced</p>
            <p className="mt-1 text-sm">{ticket.approval ? "Register now; the secretariat confirms your pass." : "Register your interest now."}</p>
          </>
        )}
      </div>
      <ul className="mt-6 grid flex-1 gap-3 text-[0.95rem]">
        {ticket.perks.map((perk) => (
          <li key={perk} className="flex gap-3">
            <Check className={cn("mt-0.5 size-4.5 shrink-0", hl ? "text-accent-400" : "text-brand-600")} />
            {perk}
          </li>
        ))}
      </ul>
      <ButtonLink href={href} variant={hl ? "accent" : "primary"} className="mt-8 w-full" arrow>
        Choose {ticket.name}
      </ButtonLink>
    </div>
  );
}
