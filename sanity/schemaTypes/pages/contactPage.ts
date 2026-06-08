import { defineArrayMember, defineField } from "sanity";
import { pageSingletonWithContent } from "./pageSingleton";

export const contactPageType = pageSingletonWithContent("contactPage", "Contact Page", [
  defineField({
    name: "methods",
    title: "Contact Methods (3 cards)",
    type: "array",
    of: [
      defineArrayMember({
        type: "object",
        fields: [
          defineField({ name: "label", title: "Label", type: "string" }),
          defineField({ name: "primary", title: "Primary (phone/email)", type: "string" }),
          defineField({ name: "href", title: "Link (tel:/mailto:/https:)", type: "string" }),
          defineField({ name: "sub", title: "Sub-text", type: "string" }),
        ],
        preview: { select: { title: "label", subtitle: "primary" } },
      }),
    ],
  }),
  defineField({
    name: "form",
    title: "Enquiry Form",
    type: "object",
    fields: [
      defineField({ name: "heading1", title: "Heading Line 1", type: "string" }),
      defineField({ name: "heading2", title: "Heading Line 2 (muted)", type: "string" }),
      defineField({ name: "nameLabel", title: "Name Label", type: "string" }),
      defineField({ name: "namePlaceholder", title: "Name Placeholder", type: "string" }),
      defineField({ name: "phoneLabel", title: "Phone Label", type: "string" }),
      defineField({ name: "phonePlaceholder", title: "Phone Placeholder", type: "string" }),
      defineField({ name: "emailLabel", title: "Email Label", type: "string" }),
      defineField({ name: "emailPlaceholder", title: "Email Placeholder", type: "string" }),
      defineField({ name: "categoryLabel", title: "Category Label", type: "string" }),
      defineField({ name: "categoryPlaceholder", title: "Category Placeholder", type: "string" }),
      defineField({
        name: "categoryOptions",
        title: "Category Options",
        type: "array",
        of: [defineArrayMember({ type: "string" })],
      }),
      defineField({ name: "messageLabel", title: "Message Label", type: "string" }),
      defineField({ name: "messagePlaceholder", title: "Message Placeholder", type: "string" }),
      defineField({ name: "consent", title: "Consent Checkbox Text", type: "text", rows: 2 }),
      defineField({ name: "privacy", title: "Privacy Note", type: "string" }),
      defineField({ name: "submitLabel", title: "Submit Button Label", type: "string" }),
    ],
  }),
  defineField({
    name: "office",
    title: "Office Card",
    type: "object",
    fields: [
      defineField({ name: "label", title: "Label", type: "string" }),
      defineField({
        name: "addressLines",
        title: "Address (each line separate)",
        type: "array",
        of: [defineArrayMember({ type: "string" })],
      }),
      defineField({ name: "phoneLabel", title: "Phone Label", type: "string" }),
      defineField({ name: "phone", title: "Phone", type: "string" }),
      defineField({ name: "emailLabel", title: "Email Label", type: "string" }),
      defineField({ name: "email", title: "Email", type: "string" }),
      defineField({ name: "hoursLabel", title: "Hours Label", type: "string" }),
      defineField({ name: "hours", title: "Hours", type: "string" }),
      defineField({
        name: "socials",
        title: "Social Links",
        type: "array",
        of: [
          defineArrayMember({
            type: "object",
            fields: [
              defineField({ name: "label", title: "Label", type: "string" }),
              defineField({ name: "href", title: "URL", type: "url" }),
            ],
            preview: { select: { title: "label", subtitle: "href" } },
          }),
        ],
      }),
    ],
  }),
  defineField({
    name: "map",
    title: "Map",
    type: "object",
    fields: [
      defineField({ name: "title", title: "Map Title (accessibility)", type: "string" }),
      defineField({ name: "embedUrl", title: "Google Maps Embed URL", type: "url" }),
    ],
  }),
]);
