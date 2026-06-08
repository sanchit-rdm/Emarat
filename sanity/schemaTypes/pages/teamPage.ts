import { defineArrayMember, defineField } from "sanity";
import { pageSingletonWithContent } from "./pageSingleton";

export const teamPageType = pageSingletonWithContent("teamPage", "Team Page", [
  defineField({
    name: "values",
    title: "Values Strip",
    type: "array",
    of: [
      defineArrayMember({
        type: "object",
        fields: [
          defineField({ name: "label", title: "Label", type: "string" }),
          defineField({ name: "body", title: "Body", type: "string" }),
        ],
        preview: { select: { title: "label", subtitle: "body" } },
      }),
    ],
  }),
  defineField({
    name: "intro",
    title: "Team Intro",
    type: "object",
    fields: [
      defineField({ name: "heading1", title: "Heading Line 1", type: "string" }),
      defineField({ name: "heading2", title: "Heading Line 2 (muted)", type: "string" }),
      defineField({ name: "blurb", title: "Blurb", type: "text", rows: 3 }),
    ],
  }),
  defineField({
    name: "members",
    title: "Team Members",
    type: "array",
    of: [
      defineArrayMember({
        type: "object",
        fields: [
          defineField({ name: "name", title: "Name", type: "string" }),
          defineField({ name: "role", title: "Role", type: "string" }),
          defineField({ name: "bio", title: "Bio", type: "text", rows: 3 }),
          defineField({ name: "image", title: "Photo", type: "image", options: { hotspot: true } }),
        ],
        preview: { select: { title: "name", subtitle: "role", media: "image" } },
      }),
    ],
  }),
  defineField({
    name: "cta",
    title: "Join Us CTA",
    type: "object",
    fields: [
      defineField({ name: "heading1", title: "Heading Line 1", type: "string" }),
      defineField({ name: "heading2", title: "Heading Line 2 (muted)", type: "string" }),
      defineField({ name: "body", title: "Body", type: "text", rows: 2 }),
      defineField({ name: "buttonLabel", title: "Button Label", type: "string" }),
      defineField({ name: "buttonHref", title: "Button Link", type: "string" }),
    ],
  }),
]);
