import { defineArrayMember, defineField, defineType } from "sanity";

const amenityIconOptions = [
  { title: "Clubhouse", value: "clubhouse" },
  { title: "Pool", value: "pool" },
  { title: "Gym", value: "gym" },
  { title: "Garden", value: "garden" },
  { title: "Security", value: "security" },
  { title: "Parking", value: "parking" },
  { title: "Power Backup", value: "power" },
  { title: "Concierge", value: "concierge" },
  { title: "Kids Area", value: "kids" },
  { title: "Sports", value: "sports" },
  { title: "Café", value: "cafe" },
  { title: "Spa / Puja Room", value: "spa" },
  { title: "Lift / Elevator", value: "lift" },
  { title: "Retail", value: "retail" },
  { title: "Balcony", value: "balcony" },
  { title: "Modular Kitchen", value: "kitchen" },
  { title: "Wardrobe", value: "wardrobe" },
  { title: "EV Charging", value: "ev" },
  { title: "Air Conditioning", value: "ac" },
  { title: "Vastu Compliant", value: "vastu" },
  { title: "Digital Lock", value: "lock" },
  { title: "Family Space", value: "family" },
];

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL identifier — e.g. 'c2' gives /projects/c2",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "no",
      title: "Project Number",
      type: "string",
      description: "Display order, e.g. '01'",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "shortName", title: "Short Name", type: "string" }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Shown in the hero banner below the title",
    }),
    defineField({
      name: "excerpt",
      title: "Listing Excerpt",
      type: "text",
      rows: 3,
      description: "Short paragraph shown on the Projects listing card",
    }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Now Selling", value: "Now Selling" },
          { title: "New Launch", value: "New Launch" },
          { title: "Sold Out", value: "Sold Out" },
        ],
        layout: "radio",
      },
    }),
    defineField({ name: "config", title: "Configuration", type: "string", description: "e.g. '5 BHK Independent Floors'" }),
    defineField({ name: "size", title: "Size / Built Form", type: "string", description: "e.g. 'G+4 · 5 BHK'" }),
    defineField({ name: "possession", title: "Possession", type: "string" }),
    defineField({ name: "rera", title: "RERA", type: "string" }),
    defineField({ name: "mapQuery", title: "Map Query", type: "string", description: "Google Maps search string" }),

    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      description: "Full-width banner shown at the top of the project page",
    }),
    defineField({
      name: "overviewImage",
      title: "Overview Image",
      type: "image",
      options: { hotspot: true },
      description: "Shown in the Project Overview section (right column)",
    }),

    defineField({
      name: "overview",
      title: "Overview Paragraphs",
      type: "array",
      of: [defineArrayMember({ type: "text" })],
      description: "Each item becomes a separate paragraph in the Overview section",
    }),

    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      description: "4 key figures shown in the Overview grid (e.g. Built Form, Configuration)",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "value", title: "Value (large text)", type: "string" }),
            defineField({ name: "label", title: "Label (small text)", type: "string" }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
    }),

    defineField({
      name: "amenities",
      title: "Amenities",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: { list: amenityIconOptions },
            }),
          ],
          preview: { select: { title: "name", subtitle: "icon" } },
        }),
      ],
    }),

    defineField({
      name: "floorPlans",
      title: "Floor Plans",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "id",
              title: "ID",
              type: "string",
              description: "One of: stilt, typical, terrace",
            }),
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "config", title: "Configuration", type: "string" }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "specs",
              title: "Specifications",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  fields: [
                    defineField({ name: "label", title: "Label", type: "string" }),
                    defineField({ name: "value", title: "Value", type: "string" }),
                  ],
                  preview: { select: { title: "label", subtitle: "value" } },
                }),
              ],
            }),
          ],
          preview: { select: { title: "label", subtitle: "config", media: "image" } },
        }),
      ],
    }),

    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
          preview: { select: { title: "label", media: "image" } },
        }),
      ],
    }),

    defineField({
      name: "connectivity",
      title: "Connectivity",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "category", title: "Category", type: "string" }),
            defineField({
              name: "items",
              title: "Items",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
            }),
          ],
          preview: { select: { title: "category" } },
        }),
      ],
    }),

    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],

  orderings: [
    {
      title: "Project Number",
      name: "noAsc",
      by: [{ field: "no", direction: "asc" }],
    },
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "location",
      media: "heroImage",
    },
  },
});
