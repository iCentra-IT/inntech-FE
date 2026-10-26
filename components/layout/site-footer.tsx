import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { footerNav, legalNav, site } from "@/lib/content/site";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { BrandMark } from "@/components/ui/brand-mark";
import { SocialLinks } from "@/components/ui/social-icons";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { CopyrightYear } from "./copyright-year";

export function SiteFooter() {
  return (
    <footer data-tone="dark" className="relative overflow-hidden bg-night-950 text-white/65">
      <BrandMark className="absolute -right-24 -bottom-40 w-[34rem] text-white/[0.035]" strokeWidth={4} />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent-400/50 to-transparent" />

      <Container className="relative">
        <div className="grid gap-14 py-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Link href="/" aria-label="InnTech Summit home" className="inline-block">
              <Logo />
            </Link>
            <p className="mt-6 max-w-sm leading-relaxed">{site.description}</p>
            <p className="mt-6 font-display text-sm font-medium tracking-wide text-accent-400">{site.tagline}</p>
            <SocialLinks className="mt-8" />
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-5">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h2 className="font-display text-sm font-semibold tracking-wide text-white">{group.title}</h2>
                <ul className="mt-5 grid gap-3 text-[0.94rem]">
                  {group.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="transition-colors hover:text-accent-400">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="lg:col-span-3">
            <h2 className="font-display text-sm font-semibold tracking-wide text-white">Stay updated</h2>
            <p className="mt-5 text-[0.94rem] leading-relaxed">
              Speaker reveals, edition announcements and insights, straight to your inbox.
            </p>
            <NewsletterForm className="mt-5" />
            <ul className="mt-8 grid gap-3 text-[0.94rem]">
              <li>
                <a href={site.contact.phoneHref} className="flex items-center gap-3 hover:text-white">
                  <Phone className="size-4 text-accent-400" /> {site.contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.contact.email}`} className="flex items-center gap-3 hover:text-white">
                  <Mail className="size-4 text-accent-400" /> {site.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 size-4 shrink-0 text-accent-400" /> {site.contact.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> InnTech Summit. Convened by{" "}
            <a href={site.organizer.url} target="_blank" rel="noreferrer" className="text-white hover:text-accent-400">
              iCentra
            </a>
            .
          </p>
          <ul className="flex gap-6">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
