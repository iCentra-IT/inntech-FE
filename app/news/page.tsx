import type { Metadata } from "next";
import { Suspense } from "react";
import { getPosts } from "@/lib/queries";
import { NewsBrowser, NewsList } from "@/components/sections/news-browser";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "News & insights",
  description: "Press releases, announcements and thought leadership on AI, the digital economy and sustainability in Africa.",
  alternates: { canonical: "/news" },
};

export default function NewsPage() {
  const posts = getPosts();
  return (
    <>
      <PageHero
        eyebrow="Stay informed"
        title="News & insights"
        lead="Announcements, press releases and perspectives on AI, the digital economy and sustainability in Africa."
        crumbs={[{ label: "News" }]}
      />
      <Section>
        <Suspense fallback={<NewsList lead={posts[0]} rest={posts.slice(1)} />}>
          <NewsBrowser posts={posts} />
        </Suspense>
      </Section>
    </>
  );
}
