import { defineField } from "sanity";
import { pageSingletonWithContent } from "./pageSingleton";

/* The articles themselves are `post` documents; these fields are the page's
   own labels and surrounding copy. */
export const newsPageType = pageSingletonWithContent("newsPage", "News Page", [
  defineField({ name: "featuredLabel", title: "Featured Label", type: "string" }),
  defineField({ name: "readArticleLabel", title: "“Read Article” Button Label", type: "string" }),
  defineField({ name: "gridHeading", title: "Articles Grid Heading", type: "string" }),
  defineField({ name: "authorFallback", title: "Author Fallback (when none set)", type: "string" }),
  defineField({ name: "emptyTitle", title: "Empty State — Title", type: "string" }),
  defineField({ name: "emptyBody", title: "Empty State — Body", type: "string" }),
  defineField({
    name: "newsletter",
    title: "Newsletter Section",
    type: "object",
    fields: [
      defineField({ name: "heading1", title: "Heading Line 1", type: "string" }),
      defineField({ name: "heading2", title: "Heading Line 2 (muted)", type: "string" }),
      defineField({ name: "placeholder", title: "Email Placeholder", type: "string" }),
      defineField({ name: "buttonLabel", title: "Button Label", type: "string" }),
      defineField({ name: "note", title: "Note", type: "string" }),
    ],
  }),
]);
