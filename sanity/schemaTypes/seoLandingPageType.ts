import { defineArrayMember, defineField, defineType } from "sanity";
import { pageBuilderBlockNames } from "./objects/blocks";

/* SEO landing page — a collection of programmatic/SEO-targeted pages
   (e.g. "Independent Floors in Gurgaon"), each with its own URL, a
   Hero, a freely-ordered page-builder `sections` array, and SEO fields.
   Rendered at /[slug] by src/app/[slug]/page.tsx. */
export const seoLandingPageType = defineType({
  name: "seoLandingPage",
  title: "SEO Landing Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "content", title: "Sections" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Internal Title",
      type: "string",
      description: "For the Studio list only — not shown on the page",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      description: "e.g. 'independent-floors-in-gurgaon' gives /independent-floors-in-gurgaon/",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "targetKeyword",
      title: "Target Keyword",
      type: "string",
      description: "The primary SEO keyword this page targets — for editorial reference only",
    }),
    defineField({ name: "hero", title: "Hero", type: "pageHero", group: "hero" }),
    defineField({
      name: "sections",
      title: "Page Sections",
      type: "array",
      group: "content",
      description: "Add, remove and reorder sections to build the page",
      of: pageBuilderBlockNames.map((name) => defineArrayMember({ type: name })),
    }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  orderings: [
    {
      title: "Title A-Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
    prepare: ({ title, subtitle }) => ({
      title,
      subtitle: subtitle ? `/${subtitle}/` : "No slug set",
    }),
  },
});
