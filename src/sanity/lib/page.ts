import type { Metadata } from "next";
import { sanityFetch } from "./live";
import { pageQuery } from "./queries";

export type HeroData = {
  eyebrow?: string;
  titleTop?: string;
  titleBottom?: string;
  subtitle?: string;
  trailing?: string;
  bgImage?: string | null;
};

export type SeoData = {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string | null;
};

export type PageContent = { hero?: HeroData; seo?: SeoData } | null;

/* Fetch the Hero + SEO for a page singleton (by document type). */
export async function getPageContent(type: string): Promise<PageContent> {
  try {
    const { data } = await sanityFetch({
      query: pageQuery(type),
      tags: [type],
    });
    return (data as PageContent) ?? null;
  } catch {
    return null;
  }
}

/* Merge a hero from Sanity over the in-code defaults — empty fields fall back. */
const ZW_CHARS = /[\u200B\u200C\u200D\uFEFF]/g;
export function mergeHero(sanity: HeroData | undefined, fallback: Required<Omit<HeroData, "bgImage">> & { bgImage?: string }) {
  const normalize = (s: string) => s.replace(ZW_CHARS, "").replace(/\s+/g, " ").trim();
  const pick = (v: string | null | undefined, fb: string | undefined) =>
    typeof v === "string" && normalize(v) !== "" ? normalize(v) : fb;
  return {
    eyebrow: pick(sanity?.eyebrow, fallback.eyebrow),
    titleTop: pick(sanity?.titleTop, fallback.titleTop) ?? fallback.titleTop,
    titleBottom: pick(sanity?.titleBottom, fallback.titleBottom),
    subtitle: pick(sanity?.subtitle, fallback.subtitle),
    trailing: pick(sanity?.trailing, fallback.trailing),
    bgImage: pick(sanity?.bgImage ?? undefined, fallback.bgImage),
  };
}

/* Extract plain text from a string or Portable Text block array. */
function blockToStr(v: unknown): string {
  if (!v) return "";
  if (typeof v === "string") return v.replace(/\s+/g, " ").trim();
  if (Array.isArray(v)) {
    return (v as Array<{ _type?: string; children?: Array<{ text?: string }> }>)
      .map((block) =>
        block._type === "block" && Array.isArray(block.children)
          ? block.children.map((c) => c.text ?? "").join("")
          : ""
      )
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
  }
  return "";
}

/* Use a Sanity string/blockContent if present & non-empty, else the in-code fallback. */
export function pickStr(v: unknown, fb: string): string {
  const str = blockToStr(v);
  return str !== "" ? str : fb;
}

/* Use a Sanity array if present & non-empty, else the in-code fallback. */
export function pickArr<T>(v: T[] | null | undefined, fb: T[]): T[] {
  return Array.isArray(v) && v.length > 0 ? v : fb;
}

/* Build Next.js Metadata from Sanity SEO, falling back to provided defaults. */
export function buildMetadata(
  seo: SeoData | undefined,
  fallback: { title: string; description: string }
): Metadata {
  const title = seo?.metaTitle?.trim() || fallback.title;
  const description = seo?.metaDescription?.trim() || fallback.description;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: seo?.ogImage ? [{ url: seo.ogImage }] : undefined,
    },
  };
}
