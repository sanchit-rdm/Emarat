import { defineField, defineType } from "sanity";

export const newsArticleType = defineType({
  name: "newsArticle",
  title: "News Article",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      description: "Publication or channel where the news appeared (e.g. Times of India).",
    }),
    defineField({
      name: "sourceUrl",
      title: "Source URL",
      type: "url",
      description: "Link to the original article (optional).",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Short summary shown on listing cards.",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});
