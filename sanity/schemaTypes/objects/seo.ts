import { defineField, defineType } from "sanity";

/* Reusable SEO object — embed on any page/document with:
   defineField({ name: "seo", type: "seo" }) */
export const seoType = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description: "Browser tab + Google result title. ~60 characters.",
      validation: (r) => r.max(70).warning("Keep under 70 characters"),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      description: "Google result snippet. ~155 characters.",
      validation: (r) => r.max(180).warning("Keep under 180 characters"),
    }),
    defineField({
      name: "ogImage",
      title: "Social Share Image",
      type: "image",
      description: "Shown when the page is shared on WhatsApp / social (1200×630).",
      options: { hotspot: true },
    }),
  ],
});
