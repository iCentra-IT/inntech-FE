import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "accent" | "outline" | "outline-light" | "ghost" | "ghost-light" | "white";
type Size = "sm" | "md" | "lg";

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(
    "group/btn relative inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-display font-semibold tracking-tight",
    "transition-[background-color,color,box-shadow,transform,border-color] duration-300 ease-(--ease-out-expo)",
    "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60",
    size === "sm" && "h-9 px-4 text-sm",
    size === "md" && "h-11 px-5 text-[0.95rem]",
    size === "lg" && "h-13 px-7 text-base",
    variant === "primary" &&
      "bg-brand-600 text-white shadow-[0_8px_24px_-10px_rgb(14_48_199/0.7)] hover:bg-brand-700 hover:shadow-[0_12px_30px_-10px_rgb(14_48_199/0.8)]",
    variant === "accent" &&
      "bg-accent-400 text-night-950 shadow-[0_8px_28px_-10px_rgb(57_203_226/0.8)] hover:bg-accent-300",
    variant === "white" && "bg-white text-brand-700 hover:bg-brand-50",
    variant === "outline" && "border border-line bg-white text-ink hover:border-brand-300 hover:text-brand-700",
    variant === "outline-light" && "border border-white/25 text-white hover:border-white/60 hover:bg-white/5",
    variant === "ghost" && "text-brand-700 hover:bg-brand-50",
    variant === "ghost-light" && "text-white hover:bg-white/10",
    className,
  );
}

type ButtonLinkProps = React.ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
};

export function ButtonLink({ variant, size, arrow, className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonStyles({ variant, size, className })} {...props}>
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-300 ease-(--ease-out-expo) group-hover/btn:translate-x-0.5"
        />
      )}
    </Link>
  );
}

export function TextLink({ className, children, ...props }: React.ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        "group/link inline-flex items-center gap-1.5 font-display font-semibold text-brand-600 hover:text-brand-800",
        className,
      )}
      {...props}
    >
      {children}
      <ArrowRight
        aria-hidden
        className="size-4 transition-transform duration-300 ease-(--ease-out-expo) group-hover/link:translate-x-1"
      />
    </Link>
  );
}
