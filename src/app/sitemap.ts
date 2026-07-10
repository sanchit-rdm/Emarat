import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { projectSlugs } from "@/lib/projects";

const BASE = "https://www.emaratrealty.com";

/* Static fallback — mirrors the hardcoded pages under /upcoming-projects/[slug]. */
const UPCOMING_FALLBACK = ["bhimtal", "goa", "lakefarms", "lansdowne"];

const STATIC_ROUTES: Array<{ path: string; priority: number }> = [
  { path: "", priority: 1 },
  { path: "/projects", priority: 0.9 },
  { path: "/upcoming-projects", priority: 0.8 },
  { path: "/about", priority: 0.7 },
  { path: "/blog", priority: 0.7 },
  { path: "/directors-desk", priority: 0.5 },
  { path: "/careers", priority: 0.5 },
  { path: "/contact", priority: 0.6 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let sanityProjects: string[] = [];
  let upcoming: Array<string | null> = [];
  let posts: Array<{ slug: string; publishedAt?: string }> = [];
  try {
    [sanityProjects, upcoming, posts] = await Promise.all([
      client.fetch(`*[_type == "project" && defined(slug.current)].slug.current`),
      client.fetch(`*[_type == "upcomingProjectsPage"][0].projects[].slug`),
      client.fetch(
        `*[_type == "post" && defined(slug.current)]{ "slug": slug.current, publishedAt }`,
      ),
    ]);
  } catch {
    /* Sanity unreachable — fall back to the static route lists below. */
  }

  const projectPaths = [...new Set([...projectSlugs, ...(sanityProjects ?? [])])].map(
    (s) => `/projects/${s}`,
  );
  const upcomingPaths = [
    ...new Set([...UPCOMING_FALLBACK, ...(upcoming ?? []).filter((s): s is string => !!s)]),
  ].map((s) => `/upcoming-projects/${s}`);

  return [
    ...STATIC_ROUTES.map(({ path, priority }) => ({
      url: `${BASE}${path}`,
      lastModified: new Date(),
      priority,
    })),
    ...[...projectPaths, ...upcomingPaths].map((path) => ({
      url: `${BASE}${path}`,
      lastModified: new Date(),
      priority: 0.8,
    })),
    ...(posts ?? []).map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: p.publishedAt ? new Date(p.publishedAt) : new Date(),
      priority: 0.6,
    })),
  ];
}
