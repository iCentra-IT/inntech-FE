import type { Metadata } from "next";
import { site } from "@/lib/content/site";
import { LegalPage } from "@/components/ui/legal-page";

export const metadata: Metadata = { title: "Terms of use", alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of use"
      lead="The terms that apply when you use this website or register for an InnTech event."
      updated="26 October 2026"
      sections={[
        { title: "Using this site", body: ["Content on this site is provided for information about InnTech Summit. You may share it with attribution, but not present it as your own or use the InnTech name and logo in a way that suggests endorsement."] },
        { title: "Registration", body: ["Registrations are reviewed by the secretariat. A pass is valid only once confirmed by email. We may decline or cancel a registration that is incomplete, inaccurate or in breach of these terms."] },
        { title: "Programme changes", body: ["Speakers, sessions, dates and venues may change. We will publish changes on this site and inform registered delegates."] },
        { title: "Photography", body: ["InnTech events are photographed and filmed. By attending you accept that you may appear in event media."] },
        { title: "Contact", body: [`Questions about these terms: ${site.contact.email}.`] },
      ]}
    />
  );
}
