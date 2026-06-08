import { defineField, defineType, type FieldDefinition } from "sanity";

/* Factory for a simple page singleton: editable Hero + SEO.
   Used by the marketing pages whose body copy stays in code but whose hero
   and SEO metadata are editable from the Studio. */
export function pageSingleton(name: string, title: string) {
  return defineType({
    name,
    title,
    type: "document",
    groups: [
      { name: "hero", title: "Hero", default: true },
      { name: "seo", title: "SEO" },
    ],
    fields: [
      defineField({ name: "hero", title: "Hero", type: "pageHero", group: "hero" }),
      defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
    ],
    preview: { prepare: () => ({ title }) },
  });
}

/* Factory for a full page singleton: editable Hero + Page Content + SEO.
   Pass the page's body fields (already grouped under "content"); every visible
   string on the page should have a field here so nothing is code-locked. */
export function pageSingletonWithContent(
  name: string,
  title: string,
  contentFields: FieldDefinition[]
) {
  return defineType({
    name,
    title,
    type: "document",
    groups: [
      { name: "hero", title: "Hero", default: true },
      { name: "content", title: "Page Content" },
      { name: "seo", title: "SEO" },
    ],
    fields: [
      defineField({ name: "hero", title: "Hero", type: "pageHero", group: "hero" }),
      ...contentFields.map((f) => ({ ...f, group: "content" }) as FieldDefinition),
      defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
    ],
    preview: { prepare: () => ({ title }) },
  });
}
