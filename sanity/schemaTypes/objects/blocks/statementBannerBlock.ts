import { defineField, defineType } from "sanity";

/* Full-bleed image banner with a 2-line headline + lead paragraph. Renders via StatementV2. */
export const statementBannerBlockType = defineType({
  name: "statementBannerBlock",
  title: "Full-Bleed Statement Banner",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "lead",
      title: "Headline — Line 1 (accent colour)",
      type: "string",
    }),
    defineField({
      name: "rest",
      title: "Headline — Line 2",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Lead Paragraph",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: { title: "lead", subtitle: "rest", media: "image" },
    prepare: ({ title, subtitle, media }) => ({
      title: title || "Statement Banner",
      subtitle: subtitle,
      media,
    }),
  },
});
