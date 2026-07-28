import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "siteTitle", title: "Site Title", type: "string" }),
    defineField({ name: "siteDescription", title: "Site Description", type: "text", rows: 2 }),
    defineField({
      name: "ogImage",
      title: "Default Social Share Image",
      type: "image",
      description:
        "Shown when any page is shared on WhatsApp / social and the page has no share image of its own (1200×630).",
      options: { hotspot: true },
    }),
    defineField({
      name: "contact",
      title: "Contact Details",
      type: "object",
      fields: [
        defineField({ name: "phone", title: "Phone", type: "string" }),
        defineField({ name: "phoneHours", title: "Phone Hours", type: "string" }),
        defineField({ name: "email", title: "Email", type: "string" }),
        defineField({ name: "emailNote", title: "Email Note", type: "string" }),
        defineField({ name: "address", title: "Address", type: "text", rows: 3 }),
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: ["Instagram", "Facebook", "LinkedIn", "YouTube", "X"],
              },
            }),
            defineField({ name: "url", title: "URL", type: "url" }),
          ],
          preview: { select: { title: "platform", subtitle: "url" } },
        }),
      ],
    }),

    /* ---- Header navigation ---- */
    defineField({
      name: "nav",
      title: "Header Navigation",
      description: "Top menu. A link with sub-items becomes a dropdown.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
            defineField({ name: "href", title: "Link (leave blank if it has a dropdown)", type: "string" }),
            defineField({
              name: "dropdown",
              title: "Dropdown Items",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  fields: [
                    defineField({ name: "label", title: "Label", type: "string" }),
                    defineField({ name: "href", title: "Link", type: "string" }),
                  ],
                  preview: { select: { title: "label", subtitle: "href" } },
                }),
              ],
            }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        }),
      ],
    }),

    /* ---- Footer ---- */
    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      fields: [
        defineField({
          name: "image",
          title: "Feature Image (top of footer)",
          type: "image",
          description: "Full-width banner image shown across the top of the footer.",
          options: { hotspot: true },
        }),
        defineField({
          name: "headline",
          title: "Headline",
          type: "string",
          description: "Large statement shown on the left of the footer.",
        }),
        defineField({ name: "tagline", title: "Tagline / Blurb", type: "text", rows: 3 }),
        defineField({ name: "addressLines", title: "Address (each line separate)", type: "array", of: [defineArrayMember({ type: "string" })] }),
        defineField({
          name: "columns",
          title: "Link Columns",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "heading", title: "Column Heading", type: "string" }),
                defineField({
                  name: "links",
                  title: "Links",
                  type: "array",
                  of: [
                    defineArrayMember({
                      type: "object",
                      fields: [
                        defineField({ name: "label", title: "Label", type: "string" }),
                        defineField({ name: "href", title: "Link", type: "string" }),
                      ],
                      preview: { select: { title: "label", subtitle: "href" } },
                    }),
                  ],
                }),
              ],
              preview: { select: { title: "heading" } },
            }),
          ],
        }),
        defineField({ name: "contactHeading", title: "“Get in Touch” Column Heading", type: "string" }),
        defineField({ name: "officeHours", title: "Office Hours", type: "string" }),
        defineField({ name: "copyright", title: "Copyright Line", type: "string" }),
        defineField({ name: "legalNote", title: "Legal Note (e.g. RERA)", type: "string" }),
      ],
    }),

    /* ---- Form confirmation email (sent to the person who submits any site form) ---- */
    defineField({
      name: "emailNotifications",
      title: "Form Confirmation Email",
      description:
        "Sent automatically to whoever submits a form on the site (contact, enquiries, newsletter, careers, etc).",
      type: "object",
      fields: [
        defineField({
          name: "enabled",
          title: "Send confirmation emails",
          type: "boolean",
          initialValue: true,
        }),
        defineField({ name: "fromName", title: "From Name", type: "string", initialValue: "Emarat Realty" }),
        defineField({ name: "subject", title: "Subject", type: "string", initialValue: "We've received your message" }),
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          initialValue: "Thank you for reaching out",
        }),
        defineField({
          name: "body",
          title: "Body",
          type: "text",
          rows: 4,
          description: "Main message shown under the heading.",
          initialValue:
            "We've received your submission and a member of our team will be in touch with you shortly.",
        }),
        defineField({ name: "signature", title: "Signature Line", type: "string", initialValue: "— The Emarat Realty Team" }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
