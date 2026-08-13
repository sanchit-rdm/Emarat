import { defineArrayMember, defineField, defineType } from "sanity";

/* Featured project cards — each card's content (image, title, copy, tags) is
   authored independently per landing page, since the same project reads
   differently on every SEO page. `linkedProject` is optional and only used
   to point the View/Enquire buttons at a real /projects/[slug] page. */
export const projectShowcaseBlockType = defineType({
  name: "projectShowcaseBlock",
  title: "Project Showcase",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({
      name: "cards",
      title: "Project Cards",
      type: "array",
      description: "Each card's content is independent — edit freely for this page without affecting other pages",
      of: [
        defineArrayMember({
          type: "object",
          name: "card",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              validation: (r) => r.required(),
            }),
            defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
            defineField({ name: "location", title: "Location", type: "string" }),
            defineField({ name: "builtForm", title: "Built Form", type: "string", description: "e.g. 'S + 4'" }),
            defineField({
              name: "tags",
              title: "Tags",
              type: "array",
              description: "Short highlight bullets, e.g. '5BHK Independent Floors', 'DLF Gated Community'",
              of: [defineArrayMember({ type: "string" })],
            }),
            defineField({
              name: "linkedProject",
              title: "Linked Project (for buttons)",
              type: "reference",
              to: [{ type: "project" }],
              description: "Optional — makes View Project / Enquire link to the real project page",
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "location", media: "image" },
          },
        }),
      ],
      validation: (r) => r.min(1),
    }),
    defineField({
      name: "viewLabel",
      title: "“View Project” Button Label",
      type: "string",
      initialValue: "View Project",
    }),
    defineField({
      name: "enquireLabel",
      title: "“Enquire” Button Label",
      type: "string",
      initialValue: "Enquire",
    }),
  ],
  preview: {
    select: { title: "heading", subtitle: "eyebrow", cards: "cards" },
    prepare: ({ title, subtitle, cards }) => ({
      title: title || "Project Showcase",
      subtitle: `${subtitle ? subtitle + " · " : ""}${cards?.length ?? 0} card(s)`,
    }),
  },
});
