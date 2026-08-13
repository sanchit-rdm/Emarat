import { defineArrayMember, defineField, defineType } from "sanity";

/* Featured project cards — references existing `project` documents.
   Renders as alternating image/detail cards (Location, Built Form, tags, View/Enquire CTAs). */
export const projectShowcaseBlockType = defineType({
  name: "projectShowcaseBlock",
  title: "Project Showcase",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({
      name: "projects",
      title: "Projects",
      type: "array",
      description: "Pick which projects to feature, in display order",
      of: [defineArrayMember({ type: "reference", to: [{ type: "project" }] })],
      validation: (r) => r.min(1),
    }),
    defineField({
      name: "viewLabel",
      title: "“View Project” Button Label",
      type: "string",
      initialValue: "View Project",
    }),
    defineField({
      name: "enquireLabel",
      title: "“Enquire” Button Label",
      type: "string",
      initialValue: "Enquire",
    }),
  ],
  preview: {
    select: { title: "heading", subtitle: "eyebrow", projects: "projects" },
    prepare: ({ title, subtitle, projects }) => ({
      title: title || "Project Showcase",
      subtitle: `${subtitle ? subtitle + " · " : ""}${projects?.length ?? 0} project(s)`,
    }),
  },
});
