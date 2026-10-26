"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import type { NewsCategory, NewsPost } from "@/lib/content/types";
import { cn } from "@/lib/utils";
import { NewsCard } from "@/components/ui/news-card";

const categories: ("All" | NewsCategory)[] = ["All", "Press Releases", "Insights", "Media", "Updates"];

export function NewsBrowser({ posts }: { posts: NewsPost[] }) {
  const initial = useSearchParams().get("category");
  const [category, setCategory] = useState<string>(categories.includes(initial as NewsCategory) ? initial! : "All");
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const shown = posts.filter(
    (p) =>
      (category === "All" || p.categories.includes(category as NewsCategory)) &&
      (!q || `${p.title} ${p.excerpt} ${p.body}`.toLowerCase().includes(q)),
  );
  const [lead, ...rest] = shown;

  return (
    <>
      <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div role="group" aria-label="Filter by category" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 font-display text-sm font-semibold transition",
                category === c ? "border-brand-600 bg-brand-600 text-white" : "border-line text-ink hover:border-brand-300",
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="relative block md:w-80">
          <span className="sr-only">Search articles</span>
          <Search aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search news and insights"
            className="h-11 w-full rounded-full border border-line bg-white pr-4 pl-11 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15"
          />
        </label>
      </div>
      <p role="status" className="sr-only">{shown.length} articles shown</p>
      {shown.length === 0 ? (
        <p className="rounded-3xl bg-mist p-10 text-center text-muted">No articles match your search.</p>
      ) : (
        <NewsList lead={lead} rest={rest} />
      )}
    </>
  );
}

export function NewsList({ lead, rest }: { lead: NewsPost; rest: NewsPost[] }) {
  return (
    <div className="grid gap-16">
      <NewsCard post={lead} featured />
      {rest.length > 0 && (
        <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <NewsCard key={p.slug} post={p} />
          ))}
        </div>
      )}
    </div>
  );
}
