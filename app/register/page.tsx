import type { Metadata } from "next";
import { Suspense } from "react";
import { BadgeCheck, Mail, Phone, Ticket, Users } from "lucide-react";
import { heroPhotos } from "@/lib/content/home";
import { site } from "@/lib/content/site";
import { getEditionOptions, getFeaturedEdition, getUpcomingEditions } from "@/lib/queries";
import { editionDate } from "@/lib/utils";
import { RegistrationForm } from "@/components/forms/forms";
import { RegistrationWithParams } from "@/components/forms/form-params";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { TicketCard } from "@/components/ui/ticket-card";

export const metadata: Metadata = {
  title: "Register",
  description: "Register for InnTech Africa 2026 and secure your pass to Africa’s premier summit on AI, the digital economy and sustainability.",
  alternates: { canonical: "/register" },
};

export default function RegisterPage() {
  const edition = getFeaturedEdition();
  const editions = getEditionOptions();
  const ticketNames = new Map(getUpcomingEditions().flatMap((e) => e.tickets.map((t) => [t.id, t.name] as const)));
  const tickets = ticketNames.size
    ? [...ticketNames].map(([value, label]) => ({ value, label }))
    : [{ value: "delegate", label: "Delegate" }];
  const waitlist = edition.stage === "announced";

  return (
    <>
      <PageHero
        eyebrow={waitlist ? "Join the waitlist" : "Register & get a pass"}
        title={<>Be part of {edition.name}.</>}
        lead={`Secure your place at ${edition.name}, ${editionDate(edition)}. Unlock inspiring talks, expert panels and networking with Africa’s innovation leaders.`}
        image={heroPhotos.registration}
        crumbs={[{ label: "Register" }]}
      />

      {edition.tickets.length > 0 && (
        <Section tone="mist">
          <SectionHeader eyebrow="Passes" title="Choose your pass" lead="Every registration is reviewed by the secretariat, who confirm your pass by email." />
          <div className="grid gap-6 lg:grid-cols-3">
            {edition.tickets.map((t, i) => (
              <Reveal key={t.id} delay={i * 80}>
                <TicketCard ticket={t} edition={edition} href={`/register?ticket=${t.id}#form`} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <Section id="form">
        <div className="grid gap-14 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="grid gap-6 lg:sticky lg:top-28">
              <Reveal>
                <p className="eyebrow mb-4">Registration</p>
                <h2 className="text-3xl font-semibold">Your details</h2>
                <p className="mt-3 leading-relaxed">It takes about three minutes. We’ll email your confirmation once the secretariat has reviewed it.</p>
              </Reveal>
              <Reveal className="rounded-3xl bg-night-900 p-7 text-white/75" data-tone="dark">
                <h3 className="text-lg font-semibold text-white">Why register early?</h3>
                <ul className="mt-5 grid gap-4 text-[0.95rem]">
                  <li className="flex gap-3"><Ticket className="mt-0.5 size-5 shrink-0 text-accent-400" /> Seats for VIP sessions and workshops are limited</li>
                  <li className="flex gap-3"><BadgeCheck className="mt-0.5 size-5 shrink-0 text-accent-400" /> Your pass is confirmed by email</li>
                  <li className="flex gap-3"><Users className="mt-0.5 size-5 shrink-0 text-accent-400" /> Free access to digital event materials</li>
                </ul>
              </Reveal>
              <Reveal className="rounded-3xl border border-line p-7">
                <h3 className="text-lg font-semibold">Need help or a group booking?</h3>
                <ul className="mt-4 grid gap-3 text-[0.95rem]">
                  <li>
                    <a href={`mailto:${site.contact.registrationEmail}`} className="flex items-center gap-3 font-medium text-brand-600 hover:text-brand-800">
                      <Mail className="size-4" /> {site.contact.registrationEmail}
                    </a>
                  </li>
                  <li>
                    <a href={site.contact.phoneHref} className="flex items-center gap-3 font-medium text-brand-600 hover:text-brand-800">
                      <Phone className="size-4" /> {site.contact.phone}
                    </a>
                  </li>
                </ul>
              </Reveal>
            </div>
          </aside>
          <Reveal className="lg:col-span-8">
            <div className="rounded-[2rem] border border-line bg-white p-6 shadow-[0_30px_80px_-50px_rgb(14_48_199/0.4)] sm:p-10">
              <Suspense fallback={<RegistrationForm editions={editions} defaultEdition={edition.slug} tickets={tickets} />}>
                <RegistrationWithParams editions={editions} defaultEdition={edition.slug} tickets={tickets} />
              </Suspense>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
