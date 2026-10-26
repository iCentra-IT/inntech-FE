import type { Metadata } from "next";
import { site } from "@/lib/content/site";
import { LegalPage } from "@/components/ui/legal-page";

export const metadata: Metadata = { title: "Privacy policy", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      lead="How InnTech Summit and iCentra collect and use your personal data, in line with the Nigeria Data Protection Act 2023."
      updated="26 October 2026"
      sections={[
        { title: "Who we are", body: [`InnTech Summit is convened by iCentra, ${site.contact.address}. For any privacy question, email ${site.contact.email}.`] },
        { title: "What we collect", body: ["We collect the details you give us in our forms: registration, partnership interest, exhibitor, speaker and media accreditation applications, contact messages and newsletter signups. This can include your name, contact details, organisation, job title, dietary and accessibility needs, and any files you upload."] },
        { title: "Why we use it", body: ["To process your registration or application, communicate with you about the summit, arrange accessibility support, and, if you opt in, send you news and updates. We rely on your consent and on the steps needed to provide the service you asked for."] },
        { title: "Sharing", body: ["We do not sell your data. We share it only with service providers that help us run the summit (for example hosting, email and payment providers), under agreements that protect it, or where the law requires us to."] },
        { title: "Retention", body: ["We keep your data only as long as needed for the purpose it was collected, and then delete or anonymise it."] },
        { title: "Your rights", body: [`Under the Nigeria Data Protection Act you can ask to access, correct or delete your data, withdraw consent, or object to processing. Email ${site.contact.email} and we will respond within the time the law requires. You may also complain to the Nigeria Data Protection Commission.`] },
        { title: "Cookies", body: ["This site uses only the cookies needed for it to work. If we add analytics, we will ask for your consent first."] },
      ]}
    />
  );
}
