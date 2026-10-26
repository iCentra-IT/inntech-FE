import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { site } from "@/lib/content/site";
import { getPost, getPosts, getRelatedPosts } from "@/lib/queries";
import { formatDate } from "@/lib/utils";
import { BrandMark } from "@/components/ui/brand-mark";
import { Container } from "@/components/ui/container";
import { Markdown } from "@/components/ui/markdown";
import { NewsCard } from "@/components/ui/news-card";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { ShareButtons } from "@/components/ui/share-buttons";

// Every slug is known at build time, so the whole route is served as static output.
// Navigations wait for that static page rather than showing a param-less shell,
// which would flash a fallback and shift the layout on first load.
export const ensureStatic = "navigation";
export const instant = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/news/[slug]">): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/news/${post.slug}` },
    openGraph: { type: "article", publishedTime: post.date, images: [post.image], authors: [post.author] },
  };
}

export default async function ArticlePage({ params }: PageProps<"/news/[slug]">) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const related = getRelatedPosts(post.slug);
  const url = `${site.url}/news/${post.slug}`;

  return (
    <>
      <section data-tone="dark" className="relative isolate overflow-hidden bg-night-900 pt-36 pb-40 sm:pt-44">
        <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
        <div aria-hidden className="absolute -top-40 left-1/2 -z-10 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-brand-600/30 blur-[120px]" />
        <BrandMark className="absolute top-24 -right-16 -z-10 hidden w-96 text-white/[0.05] lg:block" strokeWidth={4} />
        <Container size="narrow">
          <div data-enter="">
            <Link href="/news" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white">
              <ArrowLeft className="size-4" /> All news
            </Link>
            <div className="mt-8 flex flex-wrap items-center gap-2">
              {post.categories.map((c) => (
                <span key={c} className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-accent-300 ring-1 ring-white/15">
                  {c}
                </span>
              ))}
            </div>
            <h1 className="mt-6 text-4xl leading-[1.1] font-semibold text-white sm:text-5xl">{post.title}</h1>
            <p className="mt-6 text-white/65">
              By <span className="text-white">{post.author}</span> ·{" "}
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </p>
          </div>
        </Container>
      </section>

      <Container size="narrow" className="relative -mt-28">
        <div data-enter="" style={{ "--reveal-delay": "120ms" } as React.CSSProperties} className="relative aspect-[16/9] overflow-hidden rounded-[2rem] bg-mist shadow-[0_40px_80px_-40px_rgb(7_14_51/0.5)]">
          <Image src={post.image} alt="" fill preload sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
        </div>
      </Container>

      <Container size="narrow" className="py-16 sm:py-20">
        <article>
          <Markdown source={post.body} />
        </article>
        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display font-semibold text-ink">Share this article</p>
          <ShareButtons url={url} title={post.title} />
        </div>
      </Container>

      {related.length > 0 && (
        <Section tone="mist">
          <SectionHeader eyebrow="Keep reading" title="Related articles" />
          <div className="grid gap-x-6 gap-y-12 md:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <NewsCard post={p} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": post.categories.includes("Press Releases") ? "NewsArticle" : "Article",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            image: [`${site.url}${post.image}`],
            author: { "@type": post.author.includes("Secretariat") ? "Organization" : "Person", name: post.author.split(",")[0] },
            publisher: { "@type": "Organization", name: site.fullName, logo: { "@type": "ImageObject", url: `${site.url}/images/brand/logo-blue.png` } },
            mainEntityOfPage: url,
          }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
