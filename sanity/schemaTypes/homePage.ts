import { defineArrayMember, defineField, defineType } from "sanity";

export const homePageType = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    /* ---- Stats band ---- */
    defineField({
      name: "stats",
      title: "Stats Band",
      description: "The 6 count-up figures shown below the hero.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "value", title: "Number", type: "number" }),
            defineField({ name: "suffix", title: "Suffix (e.g. +)", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        }),
      ],
    }),

    /* ---- Gallery ---- */
    defineField({
      name: "gallery",
      title: "Gallery",
      description: "Horizontal scroll gallery on the homepage.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
          preview: { select: { title: "label", media: "image" } },
        }),
      ],
    }),

    /* ---- About section ---- */
    defineField({
      name: "about",
      title: "About Section",
      type: "object",
      fields: [
        defineField({ name: "heading1", title: "Heading Line 1", type: "string" }),
        defineField({ name: "heading2", title: "Heading Line 2 (muted)", type: "string" }),
        defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
        defineField({
          name: "services",
          title: "Services Grid",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
              ],
              preview: { select: { title: "title", subtitle: "subtitle" } },
            }),
          ],
        }),
        defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
        defineField({ name: "imageCaption", title: "Image Caption", type: "string" }),
      ],
    }),

    /* ---- Approach / Values section ---- */
    defineField({
      name: "approach",
      title: "Values Section",
      type: "object",
      fields: [
        defineField({ name: "heading1", title: "Heading Line 1", type: "string" }),
        defineField({ name: "heading2", title: "Heading Line 2 (muted)", type: "string" }),
        defineField({
          name: "values",
          title: "Values",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "no", title: "Number (e.g. I.)", type: "string" }),
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({ name: "body", title: "Description", type: "text", rows: 3 }),
                defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
                defineField({ name: "alt", title: "Image Alt Text", type: "string" }),
              ],
              preview: { select: { title: "title", subtitle: "no", media: "image" } },
            }),
          ],
        }),
      ],
    }),

    /* ---- Testimonials ---- */
    defineField({
      name: "testimonials",
      title: "Testimonials Section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow Label", type: "string" }),
        defineField({ name: "heading1", title: "Heading Line 1", type: "string" }),
        defineField({ name: "heading2", title: "Heading Line 2 (muted)", type: "string" }),
        defineField({
          name: "items",
          title: "Testimonials",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "quote", title: "Quote", type: "text", rows: 4 }),
                defineField({ name: "name", title: "Resident Name", type: "string" }),
              ],
              preview: { select: { title: "name", subtitle: "quote" } },
            }),
          ],
        }),
      ],
    }),

    /* ---- Contact section ---- */
    defineField({
      name: "contact",
      title: "Contact Section",
      type: "object",
      fields: [
        defineField({ name: "heading1", title: "Heading Line 1", type: "string" }),
        defineField({ name: "heading2", title: "Heading Line 2 (muted)", type: "string" }),
        defineField({ name: "phone", title: "Phone Number", type: "string" }),
        defineField({ name: "phoneHref", title: "Phone href (e.g. tel:+91...)", type: "string" }),
        defineField({ name: "phoneHours", title: "Phone Hours", type: "string" }),
        defineField({ name: "email", title: "Email Address", type: "string" }),
        defineField({ name: "emailNote", title: "Email Note", type: "string" }),
        defineField({ name: "address", title: "Address", type: "text", rows: 4 }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Home Page" }) },
});
