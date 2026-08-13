import { defineField, defineType } from "sanity";

/* Rich text section — heading + Portable Text body. Renders via RichTextSection. */
export const richTextBlockType = defineType({
  name: "richTextBlock",
  title: "Rich Text Section",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "body", title: "Body", type: "blockContent" }),
  ],
  preview: {
    select: { title: "heading", subtitle: "eyebrow" },
    prepare: ({ title, subtitle }) => ({
      title: title || "Rich Text Section",
      subtitle: subtitle || "Rich Text",
    }),
  },
});
