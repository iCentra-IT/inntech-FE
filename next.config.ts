import type { NextConfig } from "next";
import { posts } from "./lib/content/news";
import { speakers } from "./lib/content/speakers";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  env: {
    NEXT_PUBLIC_BUILD_YEAR: String(new Date().getFullYear()),
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75, 85],
  },
  // Keep every URL from the WordPress site working (brief: 301 old URLs).
  async redirects() {
    return [
      { source: "/sponsors-partners", destination: "/partners", permanent: true },
      { source: "/exhibition", destination: "/exhibit", permanent: true },
      { source: "/registration", destination: "/register", permanent: true },
      { source: "/category/press-releases", destination: "/news?category=Press%20Releases", permanent: true },
      { source: "/category/insights-blog", destination: "/news?category=Insights", permanent: true },
      { source: "/category/media", destination: "/news", permanent: true },
      { source: "/category/updates", destination: "/news", permanent: true },
      { source: "/category/:slug/feed", destination: "/news", permanent: true },
      { source: "/new/speakers/:path*", destination: "/speakers/:path*", permanent: true },
      ...speakers
        .filter((s) => s.legacySlug)
        .map((s) => ({ source: `/speakers/${s.legacySlug}`, destination: `/speakers/${s.slug}`, permanent: true })),
      ...posts.map((p) => ({ source: `/${p.slug}`, destination: `/news/${p.slug}`, permanent: true })),
    ];
  },
};

export default nextConfig;
