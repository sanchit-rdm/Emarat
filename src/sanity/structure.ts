import type { StructureResolver } from "sanity/structure";

const SINGLETONS = ["siteSettings", "homePage"];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Emarat CMS")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),

      S.listItem()
        .title("Home Page")
        .id("homePage")
        .child(S.document().schemaType("homePage").documentId("homePage")),

      S.divider(),

      S.listItem()
        .title("Projects")
        .child(S.documentTypeList("project").title("Projects")),

      S.listItem()
        .title("Blog Posts")
        .child(S.documentTypeList("post").title("Blog Posts")),

      S.divider(),

      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !SINGLETONS.includes(item.getId()!) && !["project", "post", "author"].includes(item.getId()!)
      ),
    ]);
