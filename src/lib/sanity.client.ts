import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "k6lgt7ii";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-05-25";

const hasValidConfig = !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && !!process.env.NEXT_PUBLIC_SANITY_DATASET;

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Disable CDN in dev/preview so edits are reflected immediately.
  useCdn: false,
});

export async function getAllPosts() {
  if (!hasValidConfig) {
    console.warn(
      "Sanity is not configured. Please set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET"
    );
    return [];
  }
  try {
    return await client.fetch(
      `*[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        author->,
        mainImage,
        publishedAt,
        body
      }`,
      {},
      { next: { tags: ["post"] } }
    );
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  if (!hasValidConfig) {
    return null;
  }
  try {
    return await client.fetch(
      `*[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        author->,
        mainImage,
        publishedAt,
        body
      }`,
      { slug },
      { next: { tags: ["post", `post:${slug}`] } }
    );
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
}

export async function getAllAuthors() {
  if (!hasValidConfig) {
    return [];
  }
  try {
    return await client.fetch(
      `*[_type == "author"] {
        _id,
        name,
        slug,
        image,
        bio
      }`,
      {},
      { next: { tags: ["author"] } }
    );
  } catch (error) {
    console.error("Error fetching authors:", error);
    return [];
  }
}
