import Image from "next/image";
import Link from "next/link";
import type { NewsPost } from "@/lib/content/types";
import { cn, formatDate } from "@/lib/utils";

export function NewsCard({ post, featured = false, className }: { post: NewsPost; featured?: boolean; className?: string }) {
  return (
    <article className={cn("group/n relative flex flex-col", featured && "lg:flex-row lg:items-center lg:gap-12", className)}>
      <div className={cn("relative aspect-[16/10] overflow-hidden rounded-3xl bg-mist", featured && "lg:w-3/5 lg:shrink-0")}>
        <Image
          src={post.image}
          alt=""
          fill
          sizes={featured ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
          className="object-cover transition duration-700 ease-(--ease-out-expo) group-hover/n:scale-[1.04]"
        />
      </div>
      <div className={cn("pt-6", featured && "lg:pt-0")}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          <span className="font-display font-semibold text-brand-600">{post.categories[0]}</span>
          <span aria-hidden className="size-1 rounded-full bg-line" />
          <time dateTime={post.date} className="text-muted">
            {formatDate(post.date)}
          </time>
        </div>
        <h3 className={cn("mt-3 leading-snug font-semibold", featured ? "text-2xl sm:text-3xl" : "text-xl")}>
          <Link href={`/news/${post.slug}`} className="after:absolute after:inset-0 group-hover/n:text-brand-700">
            {post.title}
          </Link>
        </h3>
        <p className={cn("mt-3 leading-relaxed text-body", !featured && "line-clamp-3")}>{post.excerpt}</p>
      </div>
    </article>
  );
}
