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
export function mergeHero(sanity: HeroData | undefined, fallback: Required<Omit<HeroData, "bgImage">> & { bgImage?: string }) {
  const normalize = (s: string) => s.replace(/\s+/g, " ").trim();
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

/* Use a Sanity string if present & non-empty, else the in-code fallback. */
export function pickStr(v: string | null | undefined, fb: string): string {
  if (typeof v === "string") {
    const norm = v.replace(/\s+/g, " ").trim();
    return norm !== "" ? norm : fb;
  }
  return fb;
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
