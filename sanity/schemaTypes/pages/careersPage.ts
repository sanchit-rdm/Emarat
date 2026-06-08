import { defineArrayMember, defineField } from "sanity";
import { pageSingletonWithContent } from "./pageSingleton";

export const careersPageType = pageSingletonWithContent("careersPage", "Careers Page", [
  defineField({
    name: "pillarsHeading",
    title: "Pillars Heading",
    type: "object",
    fields: [
      defineField({ name: "heading1", title: "Heading Line 1", type: "string" }),
      defineField({ name: "heading2", title: "Heading Line 2 (muted)", type: "string" }),
    ],
  }),
  defineField({
    name: "pillars",
    title: "Why Work With Us — Pillars",
    type: "array",
    of: [
      defineArrayMember({
        type: "object",
        fields: [
          defineField({ name: "n", title: "Numeral (e.g. I.)", type: "string" }),
          defineField({ name: "title", title: "Title", type: "string" }),
          defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
        ],
        preview: { select: { title: "title", subtitle: "n" } },
      }),
    ],
  }),
  defineField({
    name: "areasHeading",
    title: "Areas Heading",
    type: "object",
    fields: [
      defineField({ name: "heading1", title: "Heading Line 1", type: "string" }),
      defineField({ name: "heading2", title: "Heading Line 2 (muted)", type: "string" }),
    ],
  }),
  defineField({
    name: "areas",
    title: "Areas We Hire In",
    type: "array",
    of: [defineArrayMember({ type: "string" })],
  }),
  defineField({
    name: "apply",
    title: "How To Apply",
    type: "object",
    fields: [
      defineField({ name: "heading1", title: "Heading Line 1", type: "string" }),
      defineField({ name: "heading2", title: "Heading Line 2 (muted)", type: "string" }),
      defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
      defineField({ name: "cardLabel", title: "Card Label", type: "string" }),
      defineField({ name: "email", title: "Application Email", type: "string" }),
      defineField({ name: "hours", title: "Hours Line", type: "string" }),
      defineField({ name: "office", title: "Office Line", type: "string" }),
      defineField({ name: "buttonLabel", title: "Button Label", type: "string" }),
    ],
  }),
]);
