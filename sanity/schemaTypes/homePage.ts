import { defineArrayMember, defineField, defineType } from "sanity";

export const homePageType = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    /* ---- Hero text overlays (scroll-scrubbed video hero) ---- */
    defineField({
      name: "heroBlocks",
      title: "Hero Headings",
      description:
        "The headings that fade in/out over the homepage video as you scroll. Edit the words only — scroll timing/position stays as designed.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "heading", title: "Heading", type: "string", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "heading" } },
        }),
      ],
      validation: (r) => r.max(4).warning("The hero is designed for up to 3–4 headings"),
    }),

    defineField({
      name: "scrollCue",
      title: "Hero Scroll Cue Label",
      type: "string",
      description: "Small label under the hero video (e.g. “Scroll”).",
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
        defineField({ name: "heading1", title: "Heading Line 1", type: "blockContent" }),
        defineField({ name: "heading2", title: "Heading Line 2 (muted)", type: "blockContent" }),
        defineField({ name: "description", title: "Description", type: "blockContent" }),
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
        defineField({ name: "heading1", title: "Heading Line 1", type: "blockContent" }),
        defineField({ name: "heading2", title: "Heading Line 2 (muted)", type: "blockContent" }),
        defineField({ name: "heading3", title: "Heading Line 3", type: "blockContent" }),
        defineField({
          name: "values",
          title: "Values",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "no", title: "Number (e.g. I.)", type: "string" }),
                defineField({ name: "title", title: "Title", type: "blockContent" }),
                defineField({ name: "body", title: "Description", type: "blockContent" }),
                defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
                defineField({ name: "alt", title: "Image Alt Text", type: "string" }),
              ],
              preview: { select: { title: "title", subtitle: "no", media: "image" } },
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
        defineField({ name: "heading1", title: "Heading Line 1", type: "blockContent" }),
        defineField({ name: "heading2", title: "Heading Line 2 (muted)", type: "blockContent" }),
        defineField({ name: "phone", title: "Phone Number", type: "string" }),
        defineField({ name: "phoneHref", title: "Phone href (e.g. tel:+91...)", type: "string" }),
        defineField({ name: "phoneHours", title: "Phone Hours", type: "string" }),
        defineField({ name: "email", title: "Email Address", type: "string" }),
        defineField({ name: "emailNote", title: "Email Note", type: "string" }),
        defineField({ name: "address", title: "Address", type: "blockContent" }),
        /* Callback form + column labels (Home Design 1 contact section) */
        defineField({ name: "lead", title: "Form Lead Paragraph", type: "blockContent" }),
        defineField({ name: "namePlaceholder", title: "Form — Name Placeholder", type: "string" }),
        defineField({ name: "phonePlaceholder", title: "Form — Phone Placeholder", type: "string" }),
        defineField({ name: "emailPlaceholder", title: "Form — Email Placeholder", type: "string" }),
        defineField({ name: "categoryPlaceholder", title: "Form — Category Placeholder", type: "string" }),
        defineField({
          name: "categoryOptions",
          title: "Form — Category Options",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
        }),
        defineField({ name: "privacy", title: "Form — Privacy Note", type: "string" }),
        defineField({ name: "submitLabel", title: "Form — Submit Button", type: "string" }),
        defineField({ name: "callLabel", title: "Column — Call Label", type: "string" }),
        defineField({ name: "emailLabel", title: "Column — Email Label", type: "string" }),
        defineField({ name: "visitLabel", title: "Column — Visit Label", type: "string" }),
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
                defineField({ name: "headingLine1", title: "Heading Line 1", type: "blockContent" }),
                defineField({ name: "headingLine2", title: "Heading Line 2 (accent)", type: "blockContent" }),
                defineField({ name: "feature", title: "Feature Label", type: "blockContent" }),
                defineField({
                  name: "icon",
                  title: "Icon",
                  type: "string",
                  options: {
                    list: [
                      { title: "Connectivity (signal)", value: "connectivity" },
                      { title: "Access (road / pillars)", value: "access" },
                      { title: "Travel (plane)", value: "travel" },
                      { title: "Peaceful Living (person in chair)", value: "peaceful" },
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

    /* ---- Statement (full-bleed lifestyle band — Home Design 2 only) ---- */
    defineField({
      name: "statement",
      title: "Statement Section (Design 2)",
      description:
        "Full-bleed lifestyle statement on the Home (Design 2) page, between the residences slider and the principles band.",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow (script)", type: "blockContent" }),
        defineField({ name: "lead", title: "Headline Line 1 (accent)", type: "blockContent" }),
        defineField({ name: "rest", title: "Headline Line 2", type: "blockContent" }),
        defineField({ name: "body", title: "Body", type: "blockContent" }),
        defineField({ name: "image", title: "Background Image", type: "image", options: { hotspot: true } }),
        defineField({ name: "ctaLabel", title: "Button Label", type: "string" }),
        defineField({ name: "ctaHref", title: "Button Link", type: "string", description: "e.g. /projects" }),
      ],
    }),

    /* ---- Gallery section heading (Home Design 1) ---- */
    defineField({
      name: "gallerySection",
      title: "Gallery Section Heading (Design 1)",
      type: "object",
      fields: [
        defineField({ name: "heading1", title: "Heading Line 1", type: "string" }),
        defineField({ name: "heading2", title: "Heading Line 2 (muted)", type: "string" }),
        defineField({ name: "scrollHint", title: "Scroll Hint (desktop)", type: "string" }),
        defineField({ name: "swipeHint", title: "Swipe Hint (mobile)", type: "string" }),
      ],
    }),

    /* ---- News section heading (Home Design 1) ---- */
    defineField({
      name: "newsSection",
      title: "News Section Heading (Design 1)",
      type: "object",
      fields: [
        defineField({ name: "heading1", title: "Heading Line 1", type: "string" }),
        defineField({ name: "heading2", title: "Heading Line 2 (muted)", type: "string" }),
        defineField({ name: "allLabel", title: "“All Articles” Link Label", type: "string" }),
        defineField({ name: "allHref", title: "“All Articles” Link", type: "string" }),
      ],
    }),

    /* ---- Projects section (Home Design 1) ---- */
    defineField({
      name: "projectsSection",
      title: "Projects Section (Design 1)",
      description: "Heading + link for the projects list on the primary home page. The list itself comes from the Projects collection.",
      type: "object",
      fields: [
        defineField({ name: "heading1", title: "Heading Line 1", type: "string" }),
        defineField({ name: "heading2", title: "Heading Line 2 (muted)", type: "string" }),
        defineField({ name: "allLabel", title: "“All Projects” Link Label", type: "string" }),
        defineField({ name: "allHref", title: "“All Projects” Link", type: "string" }),
      ],
    }),

    /* ---- Home Design 2 — section labels/chrome ---- */
    defineField({
      name: "designTwo",
      title: "Home Design 2 — Section Labels",
      description: "Headings, eyebrows and button labels for the Home (Design 2) sections. Body content reuses the shared sections above.",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "introEyebrow", title: "Intro — Eyebrow", type: "string" }),
        defineField({
          name: "elegant",
          title: "Elegant Design Band",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "buttonLabel", title: "Button Label", type: "string" }),
            defineField({ name: "buttonHref", title: "Button Link", type: "string" }),
          ],
        }),
        defineField({
          name: "iconic",
          title: "Iconic / Location Intro",
          type: "object",
          fields: [
            defineField({ name: "line1", title: "Heading Line 1", type: "string" }),
            defineField({ name: "line2", title: "Heading Line 2 (accent)", type: "string" }),
            defineField({ name: "watermark", title: "Watermark Word", type: "string" }),
            defineField({ name: "ctaLabel", title: "Button Label", type: "string" }),
            defineField({ name: "ctaHref", title: "Button Link", type: "string" }),
          ],
        }),
        defineField({
          name: "residences",
          title: "Residences Slider",
          type: "object",
          fields: [
            defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
            defineField({ name: "heading1", title: "Heading Line 1", type: "string" }),
            defineField({ name: "heading2", title: "Heading Line 2 (accent)", type: "string" }),
            defineField({ name: "allLabel", title: "“All Residences” Label", type: "string" }),
            defineField({ name: "allHref", title: "“All Residences” Link", type: "string" }),
            defineField({ name: "locationLabel", title: "Detail — Location Label", type: "string" }),
            defineField({ name: "configLabel", title: "Detail — Configuration Label", type: "string" }),
            defineField({ name: "viewLabel", title: "View Button Label", type: "string" }),
          ],
        }),
        defineField({
          name: "principles",
          title: "Principles Band (Building with Ethics…)",
          type: "object",
          fields: [
            defineField({ name: "heading1", title: "Heading Line 1", type: "blockContent" }),
            defineField({ name: "heading2", title: "Heading Line 2 (muted)", type: "blockContent" }),
            defineField({ name: "heading3", title: "Heading Line 3", type: "blockContent" }),
          ],
        }),
        defineField({
          name: "news",
          title: "News Section",
          type: "object",
          fields: [
            defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
            defineField({ name: "heading1", title: "Heading Line 1", type: "string" }),
            defineField({ name: "heading2", title: "Heading Line 2 (muted)", type: "string" }),
            defineField({ name: "allLabel", title: "“All Articles” Label", type: "string" }),
            defineField({ name: "allHref", title: "“All Articles” Link", type: "string" }),
          ],
        }),
        defineField({
          name: "contact",
          title: "Callback Section",
          type: "object",
          fields: [
            defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
            defineField({ name: "lead", title: "Lead Paragraph", type: "text", rows: 2 }),
            defineField({ name: "namePlaceholder", title: "Name Placeholder", type: "string" }),
            defineField({ name: "phonePlaceholder", title: "Phone Placeholder", type: "string" }),
            defineField({ name: "categoryPlaceholder", title: "Category Placeholder", type: "string" }),
            defineField({
              name: "categoryOptions",
              title: "Category Options",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
            }),
            defineField({ name: "submitLabel", title: "Submit Button Label", type: "string" }),
            defineField({ name: "privacy", title: "Privacy Note", type: "string" }),
          ],
        }),
      ],
    }),

    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Home Page" }) },
});
