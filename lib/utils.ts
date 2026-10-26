import type { Edition, Speaker } from "./content/types";

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function speakerName(s: Pick<Speaker, "name" | "honorific">) {
  return s.honorific ? `${s.honorific} ${s.name}` : s.name;
}

export function speakerTitle(s: Pick<Speaker, "role" | "organisation">) {
  return s.organisation ? `${s.role}, ${s.organisation}` : s.role;
}

/** Formats a YYYY-MM-DD or ISO date in a fixed zone so server and client agree. */
export function formatDate(
  value: string,
  opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" },
  timeZone = "Africa/Lagos",
) {
  const date = value.length === 10 ? new Date(`${value}T12:00:00Z`) : new Date(value);
  return new Intl.DateTimeFormat("en-GB", { ...opts, timeZone }).format(date);
}

export function editionDate(e: Edition) {
  return e.startsAt
    ? formatDate(e.startsAt, { day: "numeric", month: "long", year: "numeric" }, e.timezone)
    : e.dateLabel;
}

export function formatPrice(amount: number, currency: Edition["currency"]) {
  return new Intl.NumberFormat(currency === "NGN" ? "en-NG" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function mapsLink(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function mapsEmbed(query: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}
