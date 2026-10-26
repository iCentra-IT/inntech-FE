import { cn } from "@/lib/utils";

type RevealProps<T extends React.ElementType> = {
  as?: T;
  /** Stagger in milliseconds; converted to a scroll offset for the CSS timeline. */
  delay?: number;
} & Omit<React.ComponentProps<T>, "as">;

/** Fades content up as it scrolls into view (CSS scroll-driven animation). */
export function Reveal<T extends React.ElementType = "div">({
  as,
  delay = 0,
  className,
  style,
  ...props
}: RevealProps<T>) {
  const Tag = as ?? "div";
  return (
    <Tag
      data-reveal=""
      className={cn(className)}
      style={{ ...style, "--reveal-offset": `${Math.round(delay * 0.25)}px` } as React.CSSProperties}
      {...props}
    />
  );
}

/** Fades content up once on page load. Use for above-the-fold hero content. */
export function Enter<T extends React.ElementType = "div">({
  as,
  delay = 0,
  className,
  style,
  ...props
}: RevealProps<T>) {
  const Tag = as ?? "div";
  return (
    <Tag
      data-enter=""
      className={cn(className)}
      style={{ ...style, "--reveal-delay": `${delay}ms` } as React.CSSProperties}
      {...props}
    />
  );
}
