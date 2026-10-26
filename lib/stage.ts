import type { Edition, EditionStage } from "./content/types";

export const stageMeta: Record<EditionStage, { label: string; tone: "live" | "open" | "soon" | "past" }> = {
  announced: { label: "Announced", tone: "soon" },
  "registration-open": { label: "Registration open", tone: "open" },
  "final-week": { label: "Final week", tone: "open" },
  live: { label: "Happening now", tone: "live" },
  concluded: { label: "Concluded", tone: "past" },
};

type Cta = { label: string; href: string };

/** Homepage hero copy and calls to action for each lifecycle stage (brief §1). */
export function stageCtas(e: Edition): { kicker: string; primary: Cta; secondary: Cta } {
  const page = `/editions/${e.slug}`;
  switch (e.stage) {
    case "announced":
      return {
        kicker: "Save the date",
        primary: { label: "Join the waitlist", href: "/register" },
        secondary: { label: "Become a partner", href: "/partners" },
      };
    case "registration-open":
      return {
        kicker: "Secure your seat",
        primary: { label: "Register now", href: "/register" },
        secondary: { label: "Explore the edition", href: page },
      };
    case "final-week":
      return {
        kicker: "Last passes available",
        primary: { label: "Get your pass", href: "/register" },
        secondary: { label: "Get directions", href: `${page}#venue` },
      };
    case "live":
      return {
        kicker: "Live now",
        primary: { label: "Watch live", href: `${page}#live` },
        secondary: { label: "Today’s agenda", href: "/agenda" },
      };
    case "concluded":
      return {
        kicker: "Thank you",
        primary: { label: "See highlights", href: page },
        secondary: { label: "Read the recap", href: `${page}#recap` },
      };
  }
}
