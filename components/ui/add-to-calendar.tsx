"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CalendarPlus, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Event = { title: string; start: string; end: string; location?: string; description?: string; url?: string };

const stamp = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

function googleUrl(e: Event) {
  const p = new URLSearchParams({
    action: "TEMPLATE",
    text: e.title,
    dates: `${stamp(e.start)}/${stamp(e.end)}`,
    details: [e.description, e.url].filter(Boolean).join("\n\n"),
    location: e.location ?? "",
  });
  return `https://calendar.google.com/calendar/render?${p}`;
}

function outlookUrl(e: Event) {
  const p = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: e.title,
    startdt: new Date(e.start).toISOString(),
    enddt: new Date(e.end).toISOString(),
    body: [e.description, e.url].filter(Boolean).join("\n\n"),
    location: e.location ?? "",
  });
  return `https://outlook.live.com/calendar/0/deeplink/compose?${p}`;
}

function downloadIcs(e: Event) {
  const esc = (s: string) => s.replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//InnTech Summit//EN",
    "BEGIN:VEVENT",
    `UID:${stamp(e.start)}-${e.title.replace(/\W+/g, "-").toLowerCase()}@inntechsummit.com`,
    `DTSTAMP:${stamp(new Date().toISOString())}`,
    `DTSTART:${stamp(e.start)}`,
    `DTEND:${stamp(e.end)}`,
    `SUMMARY:${esc(e.title)}`,
    e.location ? `LOCATION:${esc(e.location)}` : "",
    e.description ? `DESCRIPTION:${esc(e.description)}` : "",
    e.url ? `URL:${e.url}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");
  const href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  const a = Object.assign(document.createElement("a"), { href, download: "inntech-summit.ics" });
  a.click();
  URL.revokeObjectURL(href);
}

export function AddToCalendar({ event, tone = "dark", className }: { event: Event; tone?: "dark" | "light"; className?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  const item = "block w-full rounded-lg px-3 py-2 text-left text-sm text-ink hover:bg-mist";
  return (
    <div ref={ref} className={cn("relative inline-block", className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "inline-flex h-11 items-center gap-2 rounded-full border px-5 font-display text-[0.95rem] font-semibold transition",
          tone === "dark" ? "border-white/25 text-white hover:border-white/60 hover:bg-white/5" : "border-line text-ink hover:border-brand-300",
        )}
      >
        <CalendarPlus className="size-4" /> Add to calendar
        <ChevronDown className={cn("size-3.5 transition-transform", open && "rotate-180")} />
      </button>
      <div
        id={id}
        className={cn(
          "absolute left-0 z-20 mt-2 w-56 origin-top-left rounded-2xl border border-line bg-white p-1.5 shadow-xl transition duration-200",
          open ? "visible scale-100 opacity-100" : "invisible scale-95 opacity-0",
        )}
      >
        <a href={googleUrl(event)} target="_blank" rel="noreferrer" className={item} onClick={() => setOpen(false)}>
          Google Calendar
        </a>
        <a href={outlookUrl(event)} target="_blank" rel="noreferrer" className={item} onClick={() => setOpen(false)}>
          Outlook
        </a>
        <button type="button" className={item} onClick={() => (downloadIcs(event), setOpen(false))}>
          Apple / other (.ics)
        </button>
      </div>
    </div>
  );
}
