import { defineArrayMember, defineField, defineType } from "sanity";

/* Alternating image + heading + paragraph cards. Each card's content is
   authored independently per landing page — an editorial section rendered
   as a card (image, heading, body copy), not a project spec sheet. */
export const featureCardsBlockType = defineType({
  name: "featureCardsBlock",
  title: "Feature Cards",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({
      name: "cards",
      title: "Cards",
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
            defineField({ name: "title", title: "Heading", type: "string", validation: (r) => r.required() }),
            defineField({ name: "description", title: "Body Copy", type: "text", rows: 4 }),
            defineField({
              name: "location",
              title: "Location (optional)",
              type: "string",
              description: "Shown as a small spec row on the card when filled in — leave blank to hide",
            }),
            defineField({
              name: "builtForm",
              title: "Built Form (optional)",
              type: "string",
              description: "e.g. 'S + 4' — leave blank to hide",
            }),
            defineField({
              name: "tags",
              title: "Tags (optional)",
              type: "array",
              description: "Short highlight bullets, e.g. '5BHK Independent Floors' — leave empty to hide",
              of: [defineArrayMember({ type: "string" })],
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "description", media: "image" },
          },
        }),
      ],
      validation: (r) => r.min(1),
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
      title: title || "Feature Cards",
      subtitle: `${subtitle ? subtitle + " · " : ""}${cards?.length ?? 0} card(s)`,
    }),
  },
});
