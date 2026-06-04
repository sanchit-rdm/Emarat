import { defineField, defineType } from "sanity";

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
