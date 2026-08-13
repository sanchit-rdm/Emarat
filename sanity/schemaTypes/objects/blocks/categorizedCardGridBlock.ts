import { defineArrayMember, defineField, defineType } from "sanity";

/* Two-column categorized card grid (e.g. Beach & Lake / Mountain). Renders via HolidayHomesV2. */
export const categorizedCardGridBlockType = defineType({
  name: "categorizedCardGridBlock",
  title: "Categorized Card Grid",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "subheading", title: "Subheading", type: "text", rows: 2 }),
    defineField({
      name: "columns",
      title: "Columns",
      type: "array",
      validation: (r) => r.length(2),
      of: [
        defineArrayMember({
          type: "object",
          name: "column",
          fields: [
            defineField({ name: "categoryLabel", title: "Category Label", type: "string" }),
            defineField({
              name: "cards",
              title: "Cards",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  fields: [
                    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
                    defineField({ name: "title", title: "Title", type: "string" }),
                    defineField({ name: "location", title: "Location", type: "string" }),
                    defineField({ name: "tagline", title: "Tagline", type: "text", rows: 2 }),
                    defineField({ name: "href", title: "Link", type: "string" }),
                  ],
                  preview: { select: { title: "title", subtitle: "location", media: "image" } },
                }),
              ],
            }),
          ],
          preview: { select: { title: "categoryLabel", subtitle: "cards.length" } },
        }),
      ],
    }),
    defineField({ name: "exploreLabel", title: "Card Link Label", type: "string", initialValue: "Explore" }),
  ],
  preview: {
    select: { title: "heading", subtitle: "eyebrow" },
    prepare: ({ title, subtitle }) => ({ title: title || "Categorized Card Grid", subtitle }),
  },
});
