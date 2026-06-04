import { client } from "./sanity.client";
import { getProject, type Project } from "./projects";

const hasValidConfig =
  !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
  !!process.env.NEXT_PUBLIC_SANITY_DATASET;

// Resolves all image references to CDN URLs inside the GROQ query so the
// frontend components can keep using plain string <img src> / Next Image src.
const PROJECT_FIELDS = /* groq */ `
  "slug": slug.current,
  no,
  title,
  shortName,
  tagline,
  excerpt,
  location,
  status,
  config,
  size,
  possession,
  rera,
  "heroImage": heroImage.asset->url,
  "overviewImage": overviewImage.asset->url,
  "overview": overview[],
  mapQuery,
  "stats": stats[]{_key, label, value},
  "amenities": amenities[]{_key, name, icon},
  "floorPlans": floorPlans[]{
    _key,
    id,
    label,
    "config": config,
    "image": image.asset->url,
    "specs": specs[]{_key, label, value}
  },
  "gallery": gallery[]{
    _key,
    "src": image.asset->url,
    label
  },
  "connectivity": connectivity[]{
    _key,
    category,
    items
  },
  "highlights": coalesce(highlights, [])
`;

export type SanityProjectListing = {
  slug: string;
  no: string;
  title: string;
  location: string;
  status: string;
  config: string;
  size: string;
  heroImage: string | null;
  tagline: string;
  excerpt: string | null;
  stats: Array<{ _key: string; label: string; value: string }>;
};

export async function getSanityProject(slug: string): Promise<Project | null> {
  const staticProject = getProject(slug) ?? null;
  if (!hasValidConfig) return staticProject;
  try {
    const raw = await client.fetch(
      `*[_type == "project" && slug.current == $slug][0]{ ${PROJECT_FIELDS} }`,
      { slug },
      { next: { tags: ["project", `project:${slug}`] } }
    );
    // Merge any data entered in Sanity over the static brochure data so partial
    // documents never blank out a section — empty Sanity fields fall back.
    return raw ? normalize(raw, staticProject) : staticProject;
  } catch {
    return staticProject;
  }
}

export async function getSanityProjects(): Promise<Project[]> {
  if (!hasValidConfig) return [];
  try {
    const rows = await client.fetch(
      `*[_type == "project"] | order(no asc){ ${PROJECT_FIELDS} }`,
      {},
      { next: { tags: ["project"] } }
    );
    return (rows ?? []).map((raw: Record<string, unknown>) =>
      normalize(raw, getProject(raw.slug as string) ?? null)
    );
  } catch {
    return [];
  }
}

export async function getSanityProjectSeo(slug: string): Promise<{
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string | null;
} | null> {
  if (!hasValidConfig) return null;
  try {
    return await client.fetch(
      `*[_type == "project" && slug.current == $slug][0].seo{
        metaTitle, metaDescription, "ogImage": ogImage.asset->url
      }`,
      { slug },
      { next: { tags: ["project", `project:${slug}`] } }
    );
  } catch {
    return null;
  }
}

export async function getSanityProjectSlugs(): Promise<string[]> {
  if (!hasValidConfig) return [];
  try {
    const slugs = await client.fetch(
      `*[_type == "project"].slug.current`,
      {},
      { next: { tags: ["project"] } }
    );
    return slugs ?? [];
  } catch {
    return [];
  }
}

export async function getSanityProjectListings(): Promise<SanityProjectListing[]> {
  if (!hasValidConfig) return [];
  try {
    return await client.fetch(
      `*[_type == "project"] | order(no asc){
        "slug": slug.current,
        no, title, location, status, config, size,
        "heroImage": heroImage.asset->url,
        tagline,
        excerpt,
        "stats": stats[]{_key, label, value}
      }`,
      {},
      { next: { tags: ["project"] } }
    ) ?? [];
  } catch {
    return [];
  }
}

// A blank Project used when there is no static fallback (a project that only
// exists in Sanity). Components still guard against empty arrays.
const EMPTY_PROJECT: Project = {
  slug: "", no: "", title: "", shortName: "", tagline: "", location: "",
  status: "", config: "", size: "", possession: "", rera: "", heroImage: "",
  overviewImage: "", overview: [], mapQuery: "", stats: [], amenities: [],
  floorPlans: [], gallery: [], connectivity: [], highlights: [],
};

// Picks the Sanity value when it is present and non-empty, otherwise the
// static fallback — so a partial Sanity document never blanks out a section.
function pick<T>(sanityVal: T | undefined | null, fallback: T): T {
  if (sanityVal === undefined || sanityVal === null) return fallback;
  if (typeof sanityVal === "string" && sanityVal.trim() === "") return fallback;
  if (Array.isArray(sanityVal) && sanityVal.length === 0) return fallback;
  return sanityVal;
}

// Converts raw Sanity response to the Project type, overlaying it on the static
// brochure data so any field left empty in Sanity falls back gracefully.
function normalize(raw: Record<string, unknown>, fallback: Project | null): Project {
  const f = fallback ?? EMPTY_PROJECT;
  return {
    slug: pick(raw.slug as string, f.slug),
    no: pick(raw.no as string, f.no),
    title: pick(raw.title as string, f.title),
    shortName: pick(raw.shortName as string, f.shortName),
    tagline: pick(raw.tagline as string, f.tagline),
    location: pick(raw.location as string, f.location),
    status: pick(raw.status as string, f.status),
    config: pick(raw.config as string, f.config),
    size: pick(raw.size as string, f.size),
    possession: pick(raw.possession as string, f.possession),
    rera: pick(raw.rera as string, f.rera),
    heroImage: pick(raw.heroImage as string, f.heroImage),
    overviewImage: pick(raw.overviewImage as string, f.overviewImage),
    overview: pick(raw.overview as string[], f.overview),
    mapQuery: pick(raw.mapQuery as string, f.mapQuery),
    stats: pick(raw.stats as Project["stats"], f.stats),
    amenities: pick(raw.amenities as Project["amenities"], f.amenities),
    floorPlans: pick(raw.floorPlans as Project["floorPlans"], f.floorPlans),
    gallery: pick(raw.gallery as Project["gallery"], f.gallery),
    connectivity: pick(raw.connectivity as Project["connectivity"], f.connectivity),
    highlights: (raw.highlights as string[]) ?? f.highlights,
  };
}
