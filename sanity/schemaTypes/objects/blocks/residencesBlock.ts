import { defineArrayMember, defineField, defineType } from "sanity";

/* The interactive "Residences" slider — identical to the home page section,
   reusing the same ResidencesV2 component. References real `project`
   documents (title/location/built form/image always stay in sync with the
   /projects pages); only the heading/label copy and which projects to
   include are editable per landing page. */
export const residencesBlockType = defineType({
  name: "residencesBlock",
  title: "Residences Slider",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string", initialValue: "The Residences" }),
    defineField({ name: "heading1", title: "Heading — Line 1", type: "string", initialValue: "Find your" }),
    defineField({ name: "heading2", title: "Heading — Line 2 (accent)", type: "string", initialValue: "dream home." }),
    defineField({
      name: "projects",
      title: "Projects",
      type: "array",
      description: "Pick which projects to feature, in display order",
      of: [defineArrayMember({ type: "reference", to: [{ type: "project" }] })],
      validation: (r) => r.min(1),
    }),
    defineField({ name: "allLabel", title: "“All Residences” Link Label", type: "string", initialValue: "All residences" }),
    defineField({ name: "allHref", title: "“All Residences” Link", type: "string", initialValue: "/projects" }),
    defineField({ name: "locationLabel", title: "“Location” Field Label", type: "string", initialValue: "Location" }),
    defineField({ name: "configLabel", title: "“Built Form” Field Label", type: "string", initialValue: "Built Form" }),
    defineField({ name: "viewLabel", title: "“View Residence” Button Label", type: "string", initialValue: "View Residence" }),
  ],
  preview: {
    select: { heading1: "heading1", heading2: "heading2", projects: "projects" },
    prepare: ({ heading1, heading2, projects }) => ({
      title: [heading1, heading2].filter(Boolean).join(" ") || "Residences Slider",
      subtitle: `${projects?.length ?? 0} project(s)`,
    }),
  },
});
