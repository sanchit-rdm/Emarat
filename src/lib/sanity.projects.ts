import { client } from "./sanity.client";
import type { Project } from "./projects";

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
  if (!hasValidConfig) return null;
  try {
    const raw = await client.fetch(
      `*[_type == "project" && slug.current == $slug][0]{ ${PROJECT_FIELDS} }`,
      { slug },
      { next: { tags: ["project", `project:${slug}`] } }
    );
    return raw ? normalize(raw) : null;
  } catch {
    return null;
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
    return (rows ?? []).map(normalize);
  } catch {
    return [];
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

// Converts raw Sanity response to the Project type used by the frontend.
// Nullish coalescing ensures missing optional fields never cause runtime errors.
function normalize(raw: Record<string, unknown>): Project {
  return {
    slug: (raw.slug as string) ?? "",
    no: (raw.no as string) ?? "",
    title: (raw.title as string) ?? "",
    shortName: (raw.shortName as string) ?? "",
    tagline: (raw.tagline as string) ?? "",
    location: (raw.location as string) ?? "",
    status: (raw.status as string) ?? "",
    config: (raw.config as string) ?? "",
    size: (raw.size as string) ?? "",
    possession: (raw.possession as string) ?? "",
    rera: (raw.rera as string) ?? "",
    heroImage: (raw.heroImage as string) ?? "",
    overviewImage: (raw.overviewImage as string) ?? "",
    overview: (raw.overview as string[]) ?? [],
    mapQuery: (raw.mapQuery as string) ?? "",
    stats: (raw.stats as Project["stats"]) ?? [],
    amenities: (raw.amenities as Project["amenities"]) ?? [],
    floorPlans: (raw.floorPlans as Project["floorPlans"]) ?? [],
    gallery: (raw.gallery as Project["gallery"]) ?? [],
    connectivity: (raw.connectivity as Project["connectivity"]) ?? [],
    highlights: (raw.highlights as string[]) ?? [],
  };
}
