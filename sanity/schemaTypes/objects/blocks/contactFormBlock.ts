import { defineField, defineType } from "sanity";

/* Closing lead-capture form. Submits to /api/forms as "callback-request". Renders via ContactV2. */
export const contactFormBlockType = defineType({
  name: "contactFormBlock",
  title: "Contact / Enquiry Form",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string", initialValue: "Get in Touch" }),
    defineField({ name: "heading1", title: "Heading — Line 1", type: "string" }),
    defineField({ name: "heading2", title: "Heading — Line 2 (accent)", type: "string" }),
    defineField({ name: "lead", title: "Lead Paragraph", type: "text", rows: 2 }),
    defineField({ name: "submitLabel", title: "Submit Button Label", type: "string", initialValue: "Request a Callback" }),
  ],
  preview: {
    select: { title: "heading1", subtitle: "heading2" },
    prepare: ({ title, subtitle }) => ({
      title: title || "Contact / Enquiry Form",
      subtitle,
    }),
  },
});
