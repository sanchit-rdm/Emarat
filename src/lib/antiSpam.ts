import type { NextRequest } from "next/server";

/** Hidden field bots that blindly fill every input trap themselves in; real users never see it. */
export const HONEYPOT_FIELD = "companyWebsite";

/** Hidden field carrying the client-side render timestamp (ms since epoch, as a string). */
export const TIMESTAMP_FIELD = "formRenderedAt";

/** Real users need at least this long to read and fill a form; bots posting straight to the
    API either omit this field entirely or submit within milliseconds of "rendering" it. */
const MIN_FILL_MS = 1200;

export function isSpamSubmission(honeypot: unknown, renderedAt: unknown): boolean {
  if (typeof honeypot === "string" && honeypot.trim() !== "") return true;

  const startedAt = typeof renderedAt === "string" ? Number(renderedAt) : NaN;
  if (!Number.isFinite(startedAt)) return true;

  return Date.now() - startedAt < MIN_FILL_MS;
}

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 8;
const submissionsByIp = new Map<string, number[]>();

/** Best-effort in-memory per-IP throttle across all forms. Resets on cold start —
    this is a deterrent, not a hard guarantee, since we have no external store. */
export function isRateLimited(req: NextRequest): boolean {
  const ip = getClientIp(req);
  const now = Date.now();
  const recent = (submissionsByIp.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  submissionsByIp.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}
