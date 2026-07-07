import { NextRequest, NextResponse } from "next/server";
import { sendFormSubmissionEmail } from "@/lib/email";

const MAX_RESUME_BYTES = 8 * 1024 * 1024; // 8MB

export async function POST(req: NextRequest) {
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
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

  return NextResponse.json({ ok: true });
}
