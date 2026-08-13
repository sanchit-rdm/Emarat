import { defineArrayMember, defineField, defineType } from "sanity";

/* Horizontally drifting image band with a centred cursive title + optional CTA. Renders via ElegantDesignV2. */
export const imageBandBlockType = defineType({
  name: "imageBandBlock",
  title: "Image Band",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title (script font)", type: "string" }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "label", title: "Alt / Label", type: "string" })],
        }),
      ],
      validation: (r) => r.min(3),
    }),
    defineField({ name: "buttonLabel", title: "Button Label", type: "string" }),
    defineField({ name: "buttonHref", title: "Button Link", type: "string" }),
  ],
  preview: {
    select: { title: "title", media: "images.0" },
    prepare: ({ title, media }) => ({ title: title || "Image Band", media }),
  },
});
