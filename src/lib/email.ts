import { Resend } from "resend";

const DEFAULT_RECIPIENTS = ["Info@emaratrealty.com", "web@reddashmedia.com"];

export const FORM_RECIPIENT_EMAILS = process.env.FORM_RECIPIENT_EMAILS
  ? process.env.FORM_RECIPIENT_EMAILS.split(",").map((e) => e.trim()).filter(Boolean)
  : DEFAULT_RECIPIENTS;

let resendClient: Resend | null = null;

function getResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

export async function sendFormSubmissionEmail(params: {
  subject: string;
  fields: Record<string, string | undefined>;
  attachments?: { filename: string; content: Buffer }[];
}) {
  const { subject, fields, attachments } = params;
  const resend = getResend();

  const rows = Object.entries(fields)
    .filter(([, value]) => value !== undefined && value !== "")
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px;color:#555;font-weight:600;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:6px 12px;white-space:pre-wrap;">${escapeHtml(String(value))}</td></tr>`
    )
    .join("");

  const text = Object.entries(fields)
    .filter(([, value]) => value !== undefined && value !== "")
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  const replyTo = fields.Email || fields.email;

  const { error } = await resend.emails.send({
    from: process.env.FORM_FROM_EMAIL || "Emarat Realty Website <onboarding@resend.dev>",
    to: FORM_RECIPIENT_EMAILS,
    replyTo: replyTo || undefined,
    subject,
    text,
    html: `<table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">${rows}</table>`,
    attachments,
  });

  if (error) {
    throw new Error(error.message);
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
