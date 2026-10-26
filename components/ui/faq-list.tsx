"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function FaqList({ items, className }: { items: { question: string; answer: string }[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();
  return (
    <ul className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.question}>
            <h3>
              <button
                type="button"
                id={`${id}-q${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-a${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group/q flex w-full items-center justify-between gap-6 py-6 text-left font-display text-lg font-medium text-ink transition-colors hover:text-brand-700"
              >
                {item.question}
                <span
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-full border border-line transition duration-500 ease-(--ease-out-expo)",
                    isOpen ? "rotate-45 border-brand-600 bg-brand-600 text-white" : "text-brand-600 group-hover/q:border-brand-300",
                  )}
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>
            <div
              id={`${id}-a${i}`}
              role="region"
              aria-labelledby={`${id}-q${i}`}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-500 ease-(--ease-out-expo)",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden" inert={!isOpen}>
                <p className="max-w-3xl pb-6 leading-relaxed text-body">{item.answer}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
