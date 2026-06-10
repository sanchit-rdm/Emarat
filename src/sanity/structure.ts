import type { StructureResolver } from "sanity/structure";

const singleton = (
  S: Parameters<StructureResolver>[0],
  id: string,
  title: string
) => S.listItem().title(title).id(id).child(S.document().schemaType(id).documentId(id));

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Emarat CMS")
    .items([
      singleton(S, "siteSettings", "⚙️ Site Settings"),
      S.divider(),

      // Pages
      singleton(S, "homePage", "Home Page"),
      singleton(S, "aboutPage", "About Page"),
      singleton(S, "directorsDeskPage", "Director's Desk Page"),
      singleton(S, "careersPage", "Careers Page"),
      singleton(S, "projectsPage", "Projects Listing Page"),
      singleton(S, "newsPage", "News Page"),
      singleton(S, "contactPage", "Contact Page"),
      S.divider(),

      // Collections
      S.listItem().title("Projects").child(S.documentTypeList("project").title("Projects")),
      S.listItem().title("Blog Posts").child(S.documentTypeList("post").title("Blog Posts")),
      S.listItem().title("Authors").child(S.documentTypeList("author").title("Authors")),
    ]);
