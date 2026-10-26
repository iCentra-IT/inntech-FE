import "server-only";

export type SubmissionKind =
  | "newsletter"
  | "contact"
  | "registration"
  | "partnership"
  | "exhibitor"
  | "media-accreditation"
  | "speaker-application";

/**
 * Delivers a validated form submission.
 *
 * Until the admin dashboard and database from the brief exist, submissions are
 * POSTed as JSON to SUBMISSIONS_WEBHOOK_URL (an automation tool, CRM inbox or
 * the future backend API). Uploaded files are reported by name and size only;
 * storing them needs the media storage (Cloudinary or S3) from the brief.
 *
 * Returns false when there is nowhere to send the submission, so the form can
 * tell the visitor instead of pretending it was received.
 */
export async function recordSubmission(kind: SubmissionKind, data: Record<string, unknown>) {
  const payload = { kind, submittedAt: new Date().toISOString(), data };
  const url = process.env.SUBMISSIONS_WEBHOOK_URL;

  if (!url) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[submission]", JSON.stringify(payload, null, 2));
      return true;
    }
    console.error(`[submission] SUBMISSIONS_WEBHOOK_URL is not set; dropped ${kind} submission`);
    return false;
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(process.env.SUBMISSIONS_WEBHOOK_SECRET && {
          authorization: `Bearer ${process.env.SUBMISSIONS_WEBHOOK_SECRET}`,
        }),
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) console.error(`[submission] webhook responded ${res.status} for ${kind}`);
    return res.ok;
  } catch (err) {
    console.error(`[submission] webhook failed for ${kind}`, err);
    return false;
  }
}
