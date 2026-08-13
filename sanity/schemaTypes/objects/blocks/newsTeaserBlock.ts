import { defineField, defineType } from "sanity";

/* Latest news/blog teaser — pulls the 2 most recent posts automatically. Renders via NewsV2. */
export const newsTeaserBlockType = defineType({
  name: "newsTeaserBlock",
  title: "News / Insights Teaser",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string", initialValue: "Insights & updates" }),
    defineField({ name: "allLabel", title: "“All Articles” Label", type: "string", initialValue: "All articles" }),
    defineField({ name: "allHref", title: "“All Articles” Link", type: "string", initialValue: "/news" }),
  ],
  preview: {
    prepare: () => ({ title: "News / Insights Teaser" }),
  },
});
