"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { mainNav, type NavItem } from "@/lib/content/site";
import { cn } from "@/lib/utils";
import { buttonStyles } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

export type HeaderEdition = { slug: string; name: string; meta: string; status: string };

type Props = { editions: HeaderEdition[]; registerLabel: string };

export function SiteHeader(props: Props) {
  return <HeaderInner {...props} pathname={usePathname()} />;
}

/** Same header without the active-route state; used as the Suspense fallback. */
export function SiteHeaderFallback(props: Props) {
  return <HeaderInner {...props} pathname={null} />;
}

function isActive(pathname: string | null, href: string) {
  if (!pathname) return false;
  const base = href.split("#")[0];
  return base === "/" ? pathname === "/" : pathname === base || pathname.startsWith(`${base}/`);
}

function HeaderInner({ editions, registerLabel, pathname }: Props & { pathname: string | null }) {
  const [scrolled, setScrolled] = useState(false);
  // Remember which path the menu was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null | undefined>(undefined);
  const mobileOpen = openOn !== undefined && openOn === pathname;
  const setMobileOpen = (open: boolean | ((o: boolean) => boolean)) =>
    setOpenOn((typeof open === "function" ? open(mobileOpen) : open) ? pathname : undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu when the route is hidden by <Activity>.
  useLayoutEffect(() => () => setOpenOn(undefined), []);

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(undefined);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const editionItems: NavItem[] = [
    ...editions.map((e) => ({ label: e.name, href: `/editions/${e.slug}`, description: `${e.status} · ${e.meta}` })),
    { label: "All editions", href: "/editions", description: "Upcoming summits and the past-editions archive" },
  ];

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-accent-400 px-4 py-2 font-semibold text-night-950 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <header
        data-tone="dark"
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-500",
          "border-b",
          scrolled || mobileOpen
            ? "border-white/10 bg-night-950/80 shadow-[0_10px_30px_-15px_rgb(0_0_0/0.5)] backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-18 max-w-[90rem] items-center gap-6 px-5 sm:px-8">
          <Link href="/" aria-label="InnTech Summit home" className="shrink-0">
            <Logo eager className="h-8 sm:h-9" />
          </Link>

          <nav aria-label="Main" className="ml-auto hidden xl:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => {
                const children = item.label === "Editions" ? editionItems : item.children;
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    {children ? (
                      <NavDropdown label={item.label} items={children} active={active} />
                    ) : (
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(navLinkClass, active && "text-white")}
                      >
                        {item.label}
                        <ActiveDot active={active} />
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2 xl:ml-2">
            <Link href="/register" className={buttonStyles({ variant: "accent", size: "sm", className: "hidden sm:inline-flex" })}>
              {registerLabel}
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="grid size-10 place-items-center rounded-full text-white transition hover:bg-white/10 xl:hidden"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      <MobileNav
        open={mobileOpen}
        pathname={pathname}
        editionItems={editionItems}
        registerLabel={registerLabel}
        onNavigate={() => setMobileOpen(false)}
      />
    </>
  );
}

const navLinkClass =
  "relative inline-flex h-10 items-center gap-1 rounded-full px-3 font-display text-[0.92rem] font-medium text-white/75 transition-colors hover:text-white";

function ActiveDot({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-accent-400 transition-all duration-300",
        active ? "scale-100 opacity-100" : "scale-0 opacity-0",
      )}
    />
  );
}

function NavDropdown({ label, items, active }: { label: string; items: NavItem[]; active: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  useLayoutEffect(() => () => setOpen(false), []);

  return (
    <div
      ref={ref}
      className="relative"
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        clearTimeout(closeTimer.current);
        setOpen(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        closeTimer.current = setTimeout(() => setOpen(false), 120);
      }}
      onBlur={(e) => !ref.current?.contains(e.relatedTarget as Node) && setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className={cn(navLinkClass, (active || open) && "text-white")}
      >
        {label}
        <ChevronDown className={cn("size-3.5 transition-transform duration-300", open && "rotate-180")} />
        <ActiveDot active={active} />
      </button>
      <div
        id={id}
        className={cn(
          "absolute top-full left-1/2 w-80 -translate-x-1/2 pt-3 transition-all duration-300 ease-(--ease-out-expo)",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
        )}
      >
        <ul className="rounded-2xl border border-white/10 bg-night-900/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="group/item flex items-start justify-between gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-white/[0.06]"
              >
                <span>
                  <span className="block font-display text-[0.95rem] font-medium text-white">{item.label}</span>
                  {item.description && <span className="mt-0.5 block text-sm text-white/55">{item.description}</span>}
                </span>
                <ArrowRight className="mt-1 size-4 shrink-0 text-accent-400 opacity-0 transition-all duration-300 group-hover/item:translate-x-0.5 group-hover/item:opacity-100" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MobileNav({
  open,
  pathname,
  editionItems,
  registerLabel,
  onNavigate,
}: {
  open: boolean;
  pathname: string | null;
  editionItems: NavItem[];
  registerLabel: string;
  onNavigate: () => void;
}) {
  return (
    <div
      id="mobile-nav"
      data-tone="dark"
      inert={!open}
      className={cn(
        "fixed inset-0 z-40 overflow-y-auto bg-night-950/98 pt-18 backdrop-blur-xl transition-[opacity,visibility] duration-500 xl:hidden",
        open ? "visible opacity-100" : "invisible opacity-0",
      )}
    >
      <nav aria-label="Mobile" className="mx-auto max-w-xl px-5 pt-6 pb-16 sm:px-8">
        <ul className="divide-y divide-white/10 border-y border-white/10">
          {mainNav.map((item, i) => {
            const children = item.label === "Editions" ? editionItems : item.children;
            return (
              <li
                key={item.href}
                className={cn(
                  "transition-all duration-500 ease-(--ease-out-expo)",
                  open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                )}
                style={{ transitionDelay: open ? `${60 + i * 35}ms` : "0ms" }}
              >
                {children ? (
                  <details className="group/d">
                    <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-display text-2xl font-medium text-white [&::-webkit-details-marker]:hidden">
                      {item.label}
                      <ChevronDown className="size-5 text-white/50 transition-transform group-open/d:rotate-180" />
                    </summary>
                    <ul className="grid gap-1 pb-4">
                      {children.map((c) => (
                        <li key={c.href}>
                          <Link href={c.href} onClick={onNavigate} className="block rounded-lg px-3 py-2 text-white/70 hover:bg-white/5 hover:text-white">
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className="flex items-center justify-between py-4 font-display text-2xl font-medium text-white aria-[current=page]:text-accent-400"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
        <Link
          href="/register"
          onClick={onNavigate}
          className={buttonStyles({ variant: "accent", size: "lg", className: "mt-8 w-full" })}
        >
          {registerLabel}
        </Link>
      </nav>
    </div>
  );
}
