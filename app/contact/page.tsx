import type { Metadata } from "next";
import { Handshake, Mail, MapPin, Megaphone, Phone, Ticket } from "lucide-react";
import { heroPhotos } from "@/lib/content/home";
import { site } from "@/lib/content/site";
import { ContactForm } from "@/components/forms/forms";
import { MapEmbed } from "@/components/ui/map-embed";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact the InnTech Summit secretariat in Abuja for registration, partnerships, media and general enquiries.",
  alternates: { canonical: "/contact" },
};

const desks = [
  { icon: Ticket, title: "Registration", body: "Passes, group bookings and attendance", href: `mailto:${site.contact.registrationEmail}`, label: site.contact.registrationEmail },
  { icon: Handshake, title: "Partnerships", body: `${site.partnershipContact.name}, ${site.partnershipContact.phone}`, href: `mailto:${site.contact.partnershipEmail}`, label: site.contact.partnershipEmail },
  { icon: Megaphone, title: "Media", body: "Interviews, press kit and accreditation", href: "/media#accreditation", label: "Media centre" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to the secretariat."
        lead="General questions, accessibility, partnerships or on-site assistance: we’re here to help."
        image={heroPhotos.contact}
        crumbs={[{ label: "Contact" }]}
      />
      <Section>
        <div className="grid gap-5 md:grid-cols-3">
          {desks.map((d, i) => (
            <Reveal key={d.title} delay={i * 80} className="rounded-3xl border border-line p-7">
              <d.icon className="size-6 text-brand-600" />
              <h2 className="mt-5 text-xl font-semibold">{d.title}</h2>
              <p className="mt-1 text-[0.95rem] text-muted">{d.body}</p>
              <a href={d.href} className="mt-5 inline-block font-display font-semibold text-brand-600 hover:text-brand-800">{d.label}</a>
            </Reveal>
          ))}
        </div>
        <div className="mt-16 grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="rounded-[2rem] border border-line bg-white p-6 sm:p-10">
              <ContactForm />
            </div>
          </Reveal>
          <Reveal delay={100} className="grid content-start gap-6 lg:col-span-5">
            <div className="rounded-3xl bg-night-900 p-7 text-white/75" data-tone="dark">
              <h2 className="text-xl font-semibold text-white">InnTech Secretariat</h2>
              <ul className="mt-5 grid gap-4">
                <li className="flex gap-3"><MapPin className="mt-0.5 size-5 shrink-0 text-accent-400" />{site.contact.address}</li>
                <li><a href={site.contact.phoneHref} className="flex gap-3 hover:text-white"><Phone className="size-5 shrink-0 text-accent-400" />{site.contact.phone}</a></li>
                <li><a href={`mailto:${site.contact.email}`} className="flex gap-3 hover:text-white"><Mail className="size-5 shrink-0 text-accent-400" />{site.contact.email}</a></li>
              </ul>
            </div>
            <MapEmbed query={site.contact.mapQuery} title="the InnTech Secretariat" />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
