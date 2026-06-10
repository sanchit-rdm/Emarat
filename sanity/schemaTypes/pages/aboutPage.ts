import { defineArrayMember, defineField } from "sanity";
import { pageSingletonWithContent } from "./pageSingleton";

/* About page — every visible string is editable here (Hero + SEO come from the
   shared groups; the fields below are the page body). */
export const aboutPageType = pageSingletonWithContent("aboutPage", "About Page", [
  defineField({
    name: "intro",
    title: "Opening Statement",
    type: "object",
    fields: [
      defineField({ name: "heading1", title: "Heading Line 1", type: "string" }),
      defineField({ name: "heading2", title: "Heading Line 2 (accent)", type: "string" }),
      defineField({ name: "paragraph", title: "Paragraph", type: "text", rows: 4 }),
      defineField({
        name: "highlights",
        title: "Highlights",
        type: "array",
        of: [defineArrayMember({ type: "string" })],
      }),
    ],
  }),
  defineField({
    name: "community",
    title: "Community / Social Section",
    type: "object",
    fields: [
      defineField({ name: "heading1", title: "Heading Line 1", type: "string" }),
      defineField({ name: "heading2", title: "Heading Line 2 (muted)", type: "string" }),
      defineField({ name: "blurb", title: "Blurb", type: "text", rows: 3 }),
      defineField({
        name: "initiatives",
        title: "Initiatives",
        type: "array",
        of: [
          defineArrayMember({
            type: "object",
            fields: [
              defineField({ name: "name", title: "Name", type: "string" }),
              defineField({ name: "body", title: "Description", type: "text", rows: 3 }),
            ],
            preview: { select: { title: "name" } },
          }),
        ],
      }),
    ],
  }),
  defineField({
    name: "leadership",
    title: "Leadership Teaser",
    type: "object",
    fields: [
      defineField({ name: "quote", title: "Quote", type: "text", rows: 3 }),
      defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
      defineField({ name: "personName", title: "Person Name", type: "string" }),
      defineField({ name: "personRole", title: "Person Role", type: "string" }),
      defineField({ name: "personInitials", title: "Person Initials (avatar)", type: "string" }),
      defineField({ name: "primaryCtaLabel", title: "Primary Button Label", type: "string" }),
      defineField({ name: "primaryCtaHref", title: "Primary Button Link", type: "string" }),
      defineField({ name: "secondaryCtaLabel", title: "Secondary Link Label", type: "string" }),
      defineField({ name: "secondaryCtaHref", title: "Secondary Link", type: "string" }),
    ],
  }),
]);
