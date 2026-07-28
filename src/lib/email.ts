import { Resend } from "resend";

const DEFAULT_RECIPIENTS = ["info@emaratrealty.com", "web@reddashmedia.com"];

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

export type EmailNotificationsSettings = {
  enabled?: boolean | null;
  fromName?: string | null;
  subject?: string | null;
  heading?: string | null;
  body?: string | null;
  signature?: string | null;
};

export async function sendUserConfirmationEmail(params: {
  to: string;
  template: EmailNotificationsSettings;
}) {
  const { to, template } = params;
  const resend = getResend();

  const fromName = template.fromName || "Emarat Realty";
  const subject = template.subject || "We've received your message";
  const heading = template.heading || "Thank you for reaching out";
  const body = template.body || "We've received your submission and a member of our team will be in touch with you shortly.";
  const signature = template.signature || "— The Emarat Realty Team";

  const fromAddress = (process.env.FORM_FROM_EMAIL || "Emarat Realty Website <onboarding@resend.dev>").replace(
    /^[^<]*(?=<)/,
    `${fromName} `
  );

  const html = `
    <div style="font-family:sans-serif;font-size:14px;color:#222;line-height:1.6;">
      <h2 style="margin:0 0 12px;">${escapeHtml(heading)}</h2>
      <p style="white-space:pre-wrap;margin:0 0 16px;">${escapeHtml(body)}</p>
      <p style="margin:0;color:#555;">${escapeHtml(signature)}</p>
    </div>
  `;
  const text = `${heading}\n\n${body}\n\n${signature}`;

  const { error } = await resend.emails.send({
    from: fromAddress,
    to,
    subject,
    text,
    html,
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
