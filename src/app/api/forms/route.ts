import { NextRequest, NextResponse } from "next/server";
import { sendFormSubmissionEmail } from "@/lib/email";

const FORM_TITLES: Record<string, string> = {
  contact: "New contact enquiry",
  "project-enquiry": "New project enquiry",
  "callback-request": "New callback request",
};

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { formName, fields } = body as { formName?: unknown; fields?: unknown };

  if (typeof formName !== "string" || !FORM_TITLES[formName] || typeof fields !== "object" || fields === null) {
    return NextResponse.json({ error: "Invalid form submission" }, { status: 400 });
  }

  const cleanFields: Record<string, string> = {};
  for (const [key, value] of Object.entries(fields as Record<string, unknown>)) {
    if (typeof value === "string") cleanFields[key] = value.slice(0, 5000);
  }

  try {
    await sendFormSubmissionEmail({
      subject: `${FORM_TITLES[formName]} — Emarat Realty`,
      fields: cleanFields,
    });
  } catch (err) {
    console.error("Failed to send form submission email", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
