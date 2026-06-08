import { defineArrayMember, defineField } from "sanity";
import { pageSingletonWithContent } from "./pageSingleton";

/* The project cards come from the `project` collection. These fields are the
   page's surrounding copy: filter strip, the extra plots/floors offerings,
   shared card button labels, and the closing call-to-action. */
export const projectsPageType = pageSingletonWithContent(
  "projectsPage",
  "Projects Listing Page",
  [
    defineField({
      name: "filter",
      title: "Filter Strip",
      type: "object",
      fields: [
        defineField({ name: "allLabel", title: "“All” Label", type: "string" }),
        defineField({
          name: "links",
          title: "Filter Links",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "label", title: "Label", type: "string" }),
                defineField({ name: "href", title: "Link (e.g. #c2)", type: "string" }),
              ],
              preview: { select: { title: "label", subtitle: "href" } },
            }),
          ],
        }),
        defineField({ name: "trailing", title: "Trailing Text", type: "string" }),
      ],
    }),
    defineField({
      name: "cardButtons",
      title: "Card Button Labels",
      type: "object",
      fields: [
        defineField({ name: "viewLabel", title: "View Button Label", type: "string" }),
        defineField({ name: "enquireLabel", title: "Enquire Button Label", type: "string" }),
      ],
    }),
    defineField({ name: "additionalHeading", title: "Additional Offerings — Heading", type: "string" }),
    defineField({
      name: "additional",
      title: "Additional Offerings",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "location", title: "Location", type: "string" }),
            defineField({ name: "type", title: "Type", type: "string" }),
          ],
          preview: { select: { title: "name", subtitle: "location" } },
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
    defineField({
      name: "detail",
      title: "Project Detail Page — Shared Labels",
      description: "Section headings and labels shared across every individual project page (the project data itself lives in the Projects collection).",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "breadcrumbHome", title: "Breadcrumb — Home", type: "string" }),
        defineField({ name: "breadcrumbProjects", title: "Breadcrumb — Projects", type: "string" }),
        defineField({ name: "heroEnquireLabel", title: "Hero — Enquire Button", type: "string" }),
        defineField({ name: "heroFloorPlansLabel", title: "Hero — Floor Plans Button", type: "string" }),
        defineField({ name: "navOverview", title: "Nav — Overview", type: "string" }),
        defineField({ name: "navAmenities", title: "Nav — Amenities", type: "string" }),
        defineField({ name: "navFloorPlans", title: "Nav — Floor Plans", type: "string" }),
        defineField({ name: "navGallery", title: "Nav — Gallery", type: "string" }),
        defineField({ name: "navLocation", title: "Nav — Location", type: "string" }),
        defineField({ name: "navEnquire", title: "Nav — Enquire", type: "string" }),
        defineField({ name: "overviewHeading1", title: "Overview — Heading 1", type: "string" }),
        defineField({ name: "overviewHeading2", title: "Overview — Heading 2", type: "string" }),
        defineField({ name: "amenitiesHeading", title: "Amenities — Heading", type: "string" }),
        defineField({ name: "amenitiesBlurb", title: "Amenities — Blurb", type: "string" }),
        defineField({ name: "floorPlansHeading", title: "Floor Plans — Heading", type: "string" }),
        defineField({ name: "floorPlansBlurb", title: "Floor Plans — Blurb", type: "string" }),
        defineField({ name: "floorPlansRequestLabel", title: "Floor Plans — Request Link", type: "string" }),
        defineField({ name: "galleryHeading", title: "Gallery — Heading", type: "string" }),
        defineField({ name: "connectivityHeading1", title: "Connectivity — Heading 1", type: "string" }),
        defineField({ name: "connectivityHeading2", title: "Connectivity — Heading 2", type: "string" }),
        defineField({ name: "connectivityBlurb", title: "Connectivity — Blurb (after location)", type: "string" }),
        defineField({ name: "enquiryHeading", title: "Enquiry — Heading", type: "string" }),
        defineField({ name: "enquiryBlurb", title: "Enquiry — Blurb", type: "text", rows: 3 }),
        defineField({ name: "enquiryPhone", title: "Enquiry — Phone", type: "string" }),
        defineField({ name: "enquiryEmail", title: "Enquiry — Email", type: "string" }),
        defineField({ name: "enquirySubmitLabel", title: "Enquiry — Submit Button", type: "string" }),
      ],
    }),
  ]
);
