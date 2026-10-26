"use client";

import {
  applyForAccreditation,
  applyToExhibit,
  applyToSpeak,
  registerAttendee,
  sendContactMessage,
  submitPartnershipInterest,
} from "@/app/actions";
import { ActionForm, ChoiceGroup, Consent, FileField, FormSection, SelectField, TextArea, TextField } from "./fields";

export type EditionOption = { value: string; label: string };

const heardFrom = ["Social media", "Email newsletter", "Colleague / friend", "Official invitation", "Press / media", "Other"];
const sectors = [
  "Technology",
  "Construction / Infrastructure",
  "Finance / Banking",
  "Energy / Oil & Gas",
  "Consulting / Professional Services",
  "NGO / Development Partner",
  "Government / Public sector",
  "Academia / Research",
  "Other",
];

export function RegistrationForm({
  editions,
  defaultEdition,
  tickets,
  defaultTicket,
}: {
  editions: EditionOption[];
  defaultEdition: string;
  tickets: EditionOption[];
  defaultTicket?: string;
}) {
  return (
    <ActionForm action={registerAttendee} submitLabel="Complete registration" successTitle="You’re registered">
      <FormSection title="Your pass">
        <SelectField name="edition" label="Edition" options={editions} defaultValue={defaultEdition} />
        <SelectField name="ticket" label="Pass type" options={tickets} defaultValue={defaultTicket ?? tickets[0]?.value} />
        <TextField name="groupSize" label="Number of delegates" type="number" min={1} optional hint="For group passes" />
      </FormSection>
      <FormSection title="About you">
        <TextField name="firstName" label="First name" autoComplete="given-name" />
        <TextField name="lastName" label="Last name" autoComplete="family-name" />
        <TextField name="email" label="Email address" type="email" autoComplete="email" />
        <TextField name="phone" label="Phone / WhatsApp" type="tel" autoComplete="tel" placeholder="+234…" />
        <TextField name="organisation" label="Organisation" autoComplete="organization" />
        <TextField name="jobTitle" label="Job title" autoComplete="organization-title" />
        <SelectField name="sector" label="Sector" options={sectors} />
        <TextField name="country" label="Country" autoComplete="country-name" />
        <TextField name="city" label="City" autoComplete="address-level2" />
      </FormSection>
      <FormSection title="Your visit" description="Help us make the day work for you.">
        <TextField name="dietary" label="Dietary requirements" optional />
        <TextField name="accessibility" label="Accessibility needs" optional />
        <SelectField name="heardFrom" label="How did you hear about InnTech?" options={heardFrom} full />
      </FormSection>
      <Consent />
    </ActionForm>
  );
}

export function PartnershipForm({ editions, defaultEdition, defaultPackage }: { editions: EditionOption[]; defaultEdition: string; defaultPackage?: string }) {
  return (
    <ActionForm action={submitPartnershipInterest} submitLabel="Submit partnership interest" successTitle="Thank you for your interest">
      <FormSection title="Organisation">
        <TextField name="organisation" label="Organisation / company name" autoComplete="organization" full />
        <SelectField name="sector" label="Industry sector" options={sectors} />
        <TextField name="website" label="Company website" type="url" placeholder="https://" optional />
        <TextField name="socialLinks" label="Social media links" optional />
        <TextField name="officeLocation" label="Registered office (city & state)" />
      </FormSection>
      <FormSection title="Contact person">
        <TextField name="firstName" label="First name" autoComplete="given-name" />
        <TextField name="lastName" label="Last name" autoComplete="family-name" />
        <TextField name="jobTitle" label="Position / job title" autoComplete="organization-title" />
        <TextField name="email" label="Email address" type="email" autoComplete="email" />
        <TextField name="phone" label="Phone / WhatsApp" type="tel" autoComplete="tel" />
        <SelectField name="edition" label="Edition" options={editions} defaultValue={defaultEdition} />
      </FormSection>
      <FormSection title="Partnership interest">
        <ChoiceGroup
          name="category"
          label="Which partnership category interests you?"
          columns={3}
          defaultValue={defaultPackage}
          options={["Platinum", "Gold", "Silver", "Venue", "Refreshments", "Accreditation", "Supporting", "Other"]}
        />
        <ChoiceGroup
          name="contribution"
          label="Preferred form of contribution"
          multiple
          columns={3}
          options={["Financial sponsorship", "In-kind support", "Media / publicity partnership"]}
        />
        <ChoiceGroup
          name="benefits"
          label="Expected benefits or outcomes"
          multiple
          options={[
            "Brand visibility & awareness",
            "Market positioning as an innovation leader",
            "Product / service showcase",
            "Networking & deal-making",
            "Policy advocacy & collaboration",
            "ESG / sustainability positioning",
            "Youth empowerment & skills development",
            "Other",
          ]}
        />
        <ChoiceGroup name="requestCall" label="Would you like a call with our partnerships team?" options={["Yes", "No"]} />
        <SelectField name="heardFrom" label="How did you hear about InnTech?" options={heardFrom} full />
      </FormSection>
      <Consent />
    </ActionForm>
  );
}

export function ExhibitorForm({ editions, defaultEdition }: { editions: EditionOption[]; defaultEdition: string }) {
  return (
    <ActionForm action={applyToExhibit} submitLabel="Submit application" successTitle="Application received">
      <FormSection title="Your company">
        <TextField name="company" label="Company name" autoComplete="organization" />
        <TextField name="website" label="Website" type="url" placeholder="https://" optional />
        <SelectField
          name="productCategory"
          label="Product category"
          options={["AI & data", "Fintech", "Climate & cleantech", "Agritech", "Healthtech", "Edtech", "Govtech", "Connectivity & infrastructure", "Other"]}
        />
        <SelectField name="stage" label="Company stage" options={["Idea / pre-seed", "Seed", "Series A+", "Established SME", "Corporate", "Non-profit / research"]} />
      </FormSection>
      <FormSection title="Contact">
        <TextField name="contactName" label="Contact name" autoComplete="name" />
        <TextField name="email" label="Email address" type="email" autoComplete="email" />
        <TextField name="phone" label="Phone / WhatsApp" type="tel" autoComplete="tel" />
        <SelectField name="edition" label="Edition" options={editions} defaultValue={defaultEdition} />
      </FormSection>
      <FormSection title="Your showcase">
        <SelectField
          name="boothType"
          label="Booth preference"
          options={["Startup showcase table", "Standard booth", "Premium booth", "Not sure yet"]}
          full
        />
        <TextArea name="description" label="What will you showcase?" hint="Your product, who it serves and what visitors will see." />
        <FileField name="pitchDeck" label="Pitch deck" optional accept="application/pdf" hint="PDF, up to 15 MB" />
      </FormSection>
      <Consent />
    </ActionForm>
  );
}

export function MediaAccreditationForm({ editions, defaultEdition }: { editions: EditionOption[]; defaultEdition: string }) {
  return (
    <ActionForm action={applyForAccreditation} submitLabel="Apply for accreditation" successTitle="Application received">
      <FormSection title="You and your outlet">
        <TextField name="fullName" label="Full name" autoComplete="name" />
        <TextField name="outlet" label="Media outlet" />
        <TextField name="role" label="Role" placeholder="Reporter, editor, photographer…" />
        <TextField name="outletUrl" label="Outlet website or profile" type="url" placeholder="https://" optional />
        <TextField name="email" label="Email address" type="email" autoComplete="email" />
        <TextField name="phone" label="Phone / WhatsApp" type="tel" autoComplete="tel" />
        <SelectField name="edition" label="Edition" options={editions} defaultValue={defaultEdition} full />
      </FormSection>
      <FormSection title="Coverage">
        <TextArea name="coverage" label="How do you plan to cover the summit?" rows={4} />
        <FileField name="pressCard" label="Press card or ID" accept="image/jpeg,image/png,application/pdf" hint="JPG, PNG or PDF, up to 8 MB" />
      </FormSection>
      <Consent />
    </ActionForm>
  );
}

export function SpeakerApplicationForm({ editions, defaultEdition }: { editions: EditionOption[]; defaultEdition: string }) {
  return (
    <ActionForm action={applyToSpeak} submitLabel="Submit proposal" successTitle="Proposal received">
      <FormSection title="About you">
        <TextField name="fullName" label="Full name" autoComplete="name" />
        <TextField name="email" label="Email address" type="email" autoComplete="email" />
        <TextField name="role" label="Role / title" autoComplete="organization-title" />
        <TextField name="organisation" label="Organisation" autoComplete="organization" />
        <TextField name="phone" label="Phone / WhatsApp" type="tel" autoComplete="tel" optional />
        <TextField name="links" label="LinkedIn or website" optional />
        <TextArea name="bio" label="Short bio" rows={4} hint="Two or three sentences, written in the third person." />
        <FileField name="photo" label="Headshot" optional accept="image/jpeg,image/png,image/webp" hint="JPG, PNG or WebP, up to 8 MB" />
      </FormSection>
      <FormSection title="Your session">
        <SelectField name="edition" label="Edition" options={editions} defaultValue={defaultEdition} />
        <SelectField name="format" label="Session format" options={["Keynote", "Panel", "Fireside chat", "Workshop", "Startup pitch"]} />
        <TextField name="topic" label="Proposed topic or title" full />
        <TextArea name="abstract" label="What will the audience take away?" rows={5} />
      </FormSection>
      <Consent />
    </ActionForm>
  );
}

export function ContactForm() {
  return (
    <ActionForm action={sendContactMessage} submitLabel="Send message" successTitle="Message sent">
      <FormSection title="Send us a message">
        <TextField name="firstName" label="First name" autoComplete="given-name" />
        <TextField name="lastName" label="Last name" autoComplete="family-name" />
        <TextField name="email" label="Email address" type="email" autoComplete="email" />
        <SelectField name="topic" label="Topic" options={["General", "Registration", "Partnerships", "Media", "Exhibition"]} />
        <TextField name="subject" label="Subject" full />
        <TextArea name="message" label="Message" rows={6} />
      </FormSection>
      <Consent />
    </ActionForm>
  );
}
