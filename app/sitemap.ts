import type { MetadataRoute } from "next";
import { site } from "@/lib/content/site";
import { getEditions, getPosts, getSpeakers } from "@/lib/queries";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/editions", "/agenda", "/speakers", "/speak", "/register", "/partners", "/exhibit", "/media", "/news", "/faq", "/contact", "/privacy", "/terms", "/refunds"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}` })),
    ...getEditions().map((e) => ({ url: `${site.url}/editions/${e.slug}` })),
    ...getSpeakers().map((s) => ({ url: `${site.url}/speakers/${s.slug}` })),
    ...getPosts().map((p) => ({ url: `${site.url}/news/${p.slug}`, lastModified: p.date })),
  ];
}
