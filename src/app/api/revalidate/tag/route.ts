import { type NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = { tags: string[] };

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
      true
    );

    if (!isValidSignature) {
      return new Response("Invalid signature", { status: 401 });
    }

    if (!body?.tags?.length) {
      return NextResponse.json({ revalidated: [] });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body.tags.forEach((tag) => { (revalidateTag as any)(tag); });

    return NextResponse.json({ revalidated: body.tags, now: Date.now() });
  } catch (err) {
    console.error(err);
    return new Response("Revalidation error", { status: 500 });
  }
}
