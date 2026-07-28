import { NextRequest, NextResponse } from "next/server";
import { checkBotId } from "botid/server";
import { sendFormSubmissionEmail, sendUserConfirmationEmail } from "@/lib/email";
import { HONEYPOT_FIELD, TIMESTAMP_FIELD, isSpamSubmission, isRateLimited } from "@/lib/antiSpam";
import { sanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { EmailNotificationsSettings } from "@/lib/email";

const MAX_RESUME_BYTES = 8 * 1024 * 1024; // 8MB

export async function POST(req: NextRequest) {
  const botVerification = await checkBotId();
  if (botVerification.isBot) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (isSpamSubmission(formData.get(HONEYPOT_FIELD), formData.get(TIMESTAMP_FIELD))) {
    // Pretend success so bots get no signal that they were caught.
    return NextResponse.json({ ok: true });
  }

  if (isRateLimited(req)) {
    return NextResponse.json({ error: "Too many submissions — please try again later" }, { status: 429 });
  }

  const fields: Record<string, string> = {};
  for (const key of ["name", "email", "phone", "position", "message"]) {
    const value = formData.get(key);
    if (typeof value === "string") fields[key] = value.slice(0, 5000);
  }

  const attachments: { filename: string; content: Buffer }[] = [];
  const resume = formData.get("resume");
  if (resume instanceof File && resume.size > 0) {
    if (resume.size > MAX_RESUME_BYTES) {
      return NextResponse.json({ error: "Resume file is too large (max 8MB)" }, { status: 400 });
    }
    const buffer = Buffer.from(await resume.arrayBuffer());
    attachments.push({ filename: resume.name || "resume", content: buffer });
  }

  try {
    await sendFormSubmissionEmail({
      subject: "New career application — Emarat Realty",
      fields,
      attachments: attachments.length ? attachments : undefined,
    });
  } catch (err) {
    console.error("Failed to send career application email", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 502 });
  }

  if (fields.email) {
    try {
      const { data } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
      const settings = data as { emailNotifications?: EmailNotificationsSettings | null } | null;
      if (settings?.emailNotifications?.enabled !== false) {
        await sendUserConfirmationEmail({
          to: fields.email,
          template: settings?.emailNotifications || {},
        });
      }
    } catch (err) {
      console.error("Failed to send user confirmation email", err);
    }
  }

  return NextResponse.json({ ok: true });
}
