import { defineArrayMember, defineField, defineType } from "sanity";

export const homePageType = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    /* ---- Hero text overlays (scroll-scrubbed video hero) ---- */
    defineField({
      name: "heroBlocks",
      title: "Hero Text Blocks",
      description:
        "The text that fades in/out over the homepage video as you scroll. Edit the words only — scroll timing/position stays as designed.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "eyebrow", title: "Eyebrow (small label)", type: "string" }),
            defineField({ name: "heading", title: "Heading", type: "string", validation: (r) => r.required() }),
            defineField({ name: "sub", title: "Sub-text (optional)", type: "string" }),
          ],
          preview: { select: { title: "heading", subtitle: "eyebrow" } },
        }),
      ],
      validation: (r) => r.max(4).warning("The hero is designed for up to 3–4 blocks"),
    }),

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

    /* ---- Location & connectivity (interactive tabs) ---- */
    defineField({
      name: "location",
      title: "Location Section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow Label", type: "string" }),
        defineField({
          name: "places",
          title: "Places",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "name", title: "Name (tab label)", type: "string" }),
                defineField({ name: "headingLine1", title: "Heading Line 1", type: "string" }),
                defineField({ name: "headingLine2", title: "Heading Line 2 (accent)", type: "string" }),
                defineField({ name: "feature", title: "Feature Label", type: "string" }),
                defineField({
                  name: "icon",
                  title: "Icon",
                  type: "string",
                  options: {
                    list: [
                      { title: "Connectivity (signal)", value: "connectivity" },
                      { title: "Access (road)", value: "access" },
                      { title: "Travel (plane)", value: "travel" },
                    ],
                  },
                }),
                defineField({ name: "body", title: "Description", type: "text", rows: 3 }),
                defineField({ name: "image", title: "Background Image", type: "image", options: { hotspot: true } }),
              ],
              preview: { select: { title: "name", subtitle: "feature", media: "image" } },
            }),
          ],
        }),
      ],
    }),

    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Home Page" }) },
});
