import { defineArrayMember, defineField } from "sanity";
import { pageSingletonWithContent } from "./pageSingleton";

export const upcomingProjectsPageType = pageSingletonWithContent(
  "upcomingProjectsPage",
  "Upcoming Projects Page",
  [
    defineField({
      name: "projects",
      title: "Upcoming Projects",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "slug", title: "Slug (URL path, e.g. goa)", type: "string" }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "tagline", title: "Tagline (short, shown in hero)", type: "string" }),
            defineField({ name: "location", title: "Location Tag", type: "string" }),
            defineField({ name: "status", title: "Status Badge", type: "string" }),
            defineField({ name: "body", title: "Description", type: "blockContent" }),
            defineField({ name: "heroImage", title: "Hero Image", type: "image", options: { hotspot: true } }),
          ],
          preview: {
            select: { title: "title", subtitle: "location" },
          },
        }),
      ],
    }),
    defineField({
      name: "cta",
      title: "Closing CTA",
      type: "object",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "body", title: "Body", type: "text", rows: 2 }),
        defineField({ name: "buttonLabel", title: "Button Label", type: "string" }),
        defineField({ name: "buttonHref", title: "Button Link", type: "string" }),
      ],
    }),
  ]
);
