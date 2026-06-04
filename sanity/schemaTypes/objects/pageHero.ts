import { defineField, defineType } from "sanity";

/* Reusable inner-page hero (matches the <PageHero> component props). */
export const pageHeroType = defineType({
  name: "pageHero",
  title: "Hero",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow (small label above title)",
      type: "string",
    }),
    defineField({
      name: "titleTop",
      title: "Title — Line 1",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "titleBottom",
      title: "Title — Line 2 (muted)",
      type: "string",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "bgImage",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "trailing",
      title: "Trailing Text (right side)",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "titleTop", subtitle: "titleBottom", media: "bgImage" },
  },
});
