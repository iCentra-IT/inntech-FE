import type { Metadata } from "next";
import { site } from "@/lib/content/site";
import { LegalPage } from "@/components/ui/legal-page";

export const metadata: Metadata = { title: "Refund policy", alternates: { canonical: "/refunds" } };

export default function RefundsPage() {
  return (
    <LegalPage
      title="Refund policy"
      lead="How cancellations and refunds work for paid InnTech passes."
      updated="26 October 2026"
      sections={[
        { title: "Paid passes", body: ["The refund terms for each paid pass, including any deadline, are shown when you buy it and in your confirmation email."] },
        { title: "Cancelling", body: [`To cancel, email ${site.contact.registrationEmail} with your name and confirmation details as early as possible.`] },
        { title: "If we cancel", body: ["If InnTech cancels an event, paid passes are refunded in full."] },
      ]}
    />
  );
}
