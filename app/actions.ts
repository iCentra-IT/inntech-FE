"use server";

import { z } from "zod";
import { recordSubmission, type SubmissionKind } from "@/lib/submissions";
import { site } from "@/lib/content/site";

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string>;
  /** Echoed text values so fields keep their input after a failed submit. */
  values?: Record<string, string>;
};

const required = (label: string) => z.string().trim().min(1, `${label} is required`);
const email = z.string().trim().pipe(z.email("Enter a valid email address"));
const phone = z
  .string()
  .trim()
  .regex(/^[+()\d\s-]{7,20}$/, "Enter a valid phone number");
const optional = z.string().trim().optional().transform((v) => v || undefined);
const optionalUrl = z
  .string()
  .trim()
  .optional()
  .transform((v) => v || undefined)
  .refine((v) => !v || /^https?:\/\/\S+\.\S+/.test(v), "Enter a full URL, starting with https://");
const consent = z.literal("on", { error: "Please confirm you agree to how we use your data" });

const MB = 1024 * 1024;
function file(label: string, types: string[], maxMb: number, isRequired: boolean) {
  return z
    .custom<File | undefined>((v) => v === undefined || v instanceof File)
    .transform((f) => (f && f.size > 0 ? f : undefined))
    .superRefine((f, ctx) => {
      if (!f) {
        if (isRequired) ctx.addIssue({ code: "custom", message: `${label} is required` });
        return;
      }
      if (f.size > maxMb * MB) ctx.addIssue({ code: "custom", message: `${label} must be under ${maxMb} MB` });
      if (!types.includes(f.type)) ctx.addIssue({ code: "custom", message: `${label} must be ${types.map((t) => t.split("/")[1].toUpperCase()).join(", ")}` });
    });
}

function fileSummary(f?: File) {
  return f ? { name: f.name, type: f.type, size: f.size } : undefined;
}

/** Reads FormData into a plain object, collecting repeated keys (checkbox groups) into arrays. */
function read(formData: FormData, multi: string[] = []) {
  const out: Record<string, unknown> = {};
  for (const key of new Set(formData.keys())) {
    if (key.startsWith("$ACTION")) continue;
    const all = formData.getAll(key);
    out[key] = multi.includes(key) ? all.filter((v) => typeof v === "string" && v) : all[0];
  }
  return out;
}

function echo(raw: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(raw).flatMap(([k, v]) =>
      typeof v === "string" ? [[k, v]] : Array.isArray(v) ? [[k, v.join("\n")]] : [],
    ),
  );
}

async function handle<S extends z.ZodType>(
  kind: SubmissionKind,
  schema: S,
  formData: FormData,
  opts: { multi?: string[]; success: string; toRecord?: (data: z.output<S>) => Record<string, unknown> },
): Promise<FormState> {
  const raw = read(formData, opts.multi);

  // Honeypot: real visitors never see or fill this field.
  if (typeof raw.website_confirm === "string" && raw.website_confirm) {
    return { status: "success", message: opts.success };
  }

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      errors[key] ??= issue.message;
    }
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors,
      values: echo(raw),
    };
  }

  const ok = await recordSubmission(kind, opts.toRecord ? opts.toRecord(parsed.data) : (parsed.data as Record<string, unknown>));
  if (!ok) {
    return {
      status: "error",
      message: `We couldn’t send your submission just now. Please try again, or email ${site.contact.email}.`,
      values: echo(raw),
    };
  }
  return { status: "success", message: opts.success };
}

/* ------------------------------------------------------------------ */

const newsletterSchema = z.object({ email, consent });

export async function subscribeNewsletter(_: FormState, formData: FormData) {
  return handle("newsletter", newsletterSchema, formData, {
    success: "Thank you for subscribing. We’ll keep you posted on speakers, editions and insights.",
  });
}

const contactSchema = z.object({
  firstName: required("First name"),
  lastName: required("Last name"),
  email,
  topic: z.enum(["General", "Registration", "Partnerships", "Media", "Exhibition"], { error: "Choose a topic" }),
  subject: required("Subject"),
  message: z.string().trim().min(10, "Tell us a little more (at least 10 characters)"),
  consent,
});

export async function sendContactMessage(_: FormState, formData: FormData) {
  return handle("contact", contactSchema, formData, {
    success: "Thank you. Your message is with the secretariat and we’ll get back to you soon.",
  });
}

const registrationSchema = z.object({
  edition: required("Edition"),
  ticket: required("Pass type"),
  firstName: required("First name"),
  lastName: required("Last name"),
  email,
  phone,
  organisation: required("Organisation"),
  jobTitle: required("Job title"),
  sector: required("Sector"),
  country: required("Country"),
  city: required("City"),
  groupSize: optional,
  dietary: optional,
  accessibility: optional,
  heardFrom: required("This field"),
  consent,
  marketing: optional,
});

export async function registerAttendee(_: FormState, formData: FormData) {
  return handle("registration", registrationSchema, formData, {
    success:
      "You’re registered. We’ve received your details and the secretariat will confirm your pass by email.",
  });
}

const partnershipSchema = z.object({
  edition: required("Edition"),
  organisation: required("Organisation name"),
  sector: required("Industry sector"),
  website: optionalUrl,
  socialLinks: optional,
  officeLocation: required("Office location"),
  firstName: required("First name"),
  lastName: required("Last name"),
  jobTitle: required("Job title"),
  email,
  phone,
  category: required("Partnership category"),
  contribution: z.array(z.string()).min(1, "Choose at least one form of contribution"),
  benefits: z.array(z.string()).min(1, "Choose at least one expected benefit"),
  requestCall: z.enum(["Yes", "No"], { error: "Let us know if you’d like a call" }),
  heardFrom: required("This field"),
  consent,
});

export async function submitPartnershipInterest(_: FormState, formData: FormData) {
  return handle("partnership", partnershipSchema, formData, {
    multi: ["contribution", "benefits"],
    success: `Thank you. Our partnerships team will be in touch shortly. For anything urgent, call ${site.partnershipContact.name} on ${site.partnershipContact.phone}.`,
  });
}

const exhibitorSchema = z.object({
  edition: required("Edition"),
  company: required("Company name"),
  website: optionalUrl,
  contactName: required("Contact name"),
  email,
  phone,
  productCategory: required("Product category"),
  stage: required("Company stage"),
  boothType: required("Booth preference"),
  description: z.string().trim().min(30, "Describe what you’ll showcase (at least 30 characters)"),
  pitchDeck: file("Pitch deck", ["application/pdf"], 15, false),
  consent,
});

export async function applyToExhibit(_: FormState, formData: FormData) {
  return handle("exhibitor", exhibitorSchema, formData, {
    success: "Application received. Our exhibitions team will review it and reply with booth options and next steps.",
    toRecord: (d) => ({ ...d, pitchDeck: fileSummary(d.pitchDeck) }),
  });
}

const mediaSchema = z.object({
  edition: required("Edition"),
  fullName: required("Full name"),
  outlet: required("Media outlet"),
  role: required("Role"),
  email,
  phone,
  outletUrl: optionalUrl,
  pressCard: file("Press card or ID", ["image/jpeg", "image/png", "application/pdf"], 8, true),
  coverage: z.string().trim().min(20, "Tell us how you plan to cover the summit (at least 20 characters)"),
  consent,
});

export async function applyForAccreditation(_: FormState, formData: FormData) {
  return handle("media-accreditation", mediaSchema, formData, {
    success: "Application received. Approved media receive their accreditation pass by email before the event.",
    toRecord: (d) => ({ ...d, pressCard: fileSummary(d.pressCard) }),
  });
}

const speakerSchema = z.object({
  edition: required("Edition"),
  fullName: required("Full name"),
  email,
  phone: optional,
  role: required("Role"),
  organisation: required("Organisation"),
  bio: z.string().trim().min(80, "Share a short bio (at least 80 characters)"),
  photo: file("Headshot", ["image/jpeg", "image/png", "image/webp"], 8, false),
  topic: required("Proposed topic"),
  format: required("Session format"),
  abstract: z.string().trim().min(80, "Describe your session (at least 80 characters)"),
  links: optional,
  consent,
});

export async function applyToSpeak(_: FormState, formData: FormData) {
  return handle("speaker-application", speakerSchema, formData, {
    success: "Thank you for your proposal. The programme committee reviews every application and will be in touch.",
    toRecord: (d) => ({ ...d, photo: fileSummary(d.photo) }),
  });
}
