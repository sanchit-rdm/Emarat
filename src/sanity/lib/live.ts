import { defineLive } from "next-sanity/live";
import { client } from "./client";

// Accept either name — the project's .env example historically used
// SANITY_API_TOKEN, while next-sanity's convention is SANITY_API_READ_TOKEN.
const token = process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN;

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({ apiVersion: "2024-05-25" }),
  serverToken: token,
  browserToken: token,
});
