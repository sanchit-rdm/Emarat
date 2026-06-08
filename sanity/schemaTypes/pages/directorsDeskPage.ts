import { defineArrayMember, defineField } from "sanity";
import { pageSingletonWithContent } from "./pageSingleton";

export const directorsDeskPageType = pageSingletonWithContent(
  "directorsDeskPage",
  "Director's Desk Page",
  [
    defineField({
      name: "portrait",
      title: "Portrait",
      type: "object",
      fields: [
        defineField({ name: "image", title: "Photo", type: "image", options: { hotspot: true } }),
        defineField({ name: "personName", title: "Name", type: "string" }),
        defineField({ name: "personRole", title: "Role", type: "string" }),
      ],
    }),
    defineField({
      name: "quote",
      title: "Pull Quote",
      type: "object",
      fields: [
        defineField({ name: "line1", title: "Line 1", type: "string" }),
        defineField({ name: "line2", title: "Line 2 (accent)", type: "string" }),
      ],
    }),
    defineField({
      name: "message",
      title: "Message Paragraphs",
      type: "array",
      of: [defineArrayMember({ type: "text" })],
      description: "Each item becomes a paragraph of the message body.",
    }),
    defineField({ name: "signatureName", title: "Signature Name", type: "string" }),
    defineField({
      name: "mission",
      title: "Mission Card",
      type: "object",
      fields: [
        defineField({ name: "label", title: "Label", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "body", title: "Body", type: "text", rows: 4 }),
      ],
    }),
    defineField({
      name: "vision",
      title: "Vision Card",
      type: "object",
      fields: [
        defineField({ name: "label", title: "Label", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "body", title: "Body", type: "text", rows: 4 }),
      ],
    }),
    defineField({
      name: "cta",
      title: "Closing CTA",
      type: "object",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "body", title: "Body", type: "text", rows: 2 }),
        defineField({ name: "primaryLabel", title: "Primary Button Label", type: "string" }),
        defineField({ name: "primaryHref", title: "Primary Button Link", type: "string" }),
        defineField({ name: "secondaryLabel", title: "Secondary Button Label", type: "string" }),
        defineField({ name: "secondaryHref", title: "Secondary Button Link", type: "string" }),
      ],
    }),
  ]
);
