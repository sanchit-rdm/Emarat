import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/sections/SiteFooter";
import PageHero from "@/components/PageHero";
import renderSection from "@/components/sections/landing/renderSection";
import { sanityFetch } from "@/sanity/lib/live";
import { client } from "@/lib/sanity.client";
import { SEO_LANDING_PAGE_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { buildMetadata } from "@/sanity/lib/page";

export const dynamic = "force-dynamic";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LandingPage = any;

async function getLandingPage(slug: string): Promise<LandingPage | null> {
  const { data } = await sanityFetch({
    query: SEO_LANDING_PAGE_BY_SLUG_QUERY,
    params: { slug },
    tags: ["seoLandingPage"],
  });
  return (data as LandingPage) ?? null;
}

export async function generateStaticParams() {
  // Plain client.fetch here (not sanityFetch) — generateStaticParams runs at
  // build time with no request context, so the draft-mode-aware live client
  // is unavailable.
  try {
    const slugs: string[] = await client.fetch(
      `*[_type == "seoLandingPage" && defined(slug.current)].slug.current`
    );
    return (slugs ?? []).filter(Boolean).map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getLandingPage(slug);
  if (!page) return { title: "Page Not Found · Emarat Realty" };
  return buildMetadata(page.seo, {
    title: page.hero?.titleTop ? `${page.hero.titleTop} · Emarat Realty` : "Emarat Realty",
    description: page.hero?.subtitle ?? "",
  });
}

export default async function SeoLandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getLandingPage(slug);
  if (!page) notFound();

  const sections = Array.isArray(page.sections) ? page.sections : [];

  return (
    <>
      <SiteNav />
      <main>
        {page.hero?.titleTop && <PageHero {...page.hero} />}
        {await Promise.all(sections.map((section: { _key: string; _type: string }) => renderSection(section)))}
      </main>
      <SiteFooter />
    </>
  );
}
