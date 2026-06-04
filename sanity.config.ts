import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./src/sanity/structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";

const SINGLETON_TYPES = new Set([
  "siteSettings",
  "homePage",
  "aboutPage",
  "contactPage",
  "teamPage",
  "directorsDeskPage",
  "careersPage",
  "newsPage",
  "propertiesPage",
  "locationPage",
  "projectsPage",
]);
const SINGLETON_ACTIONS = new Set(["publish", "discardChanges", "restore"]);

export default defineConfig({
  name: "default",
  title: "Emarat CMS",

  projectId,
  dataset,
  basePath: "/studio",

  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    // Singletons can only be published/discarded/restored — not deleted or duplicated.
    actions: (input, { schemaType }) =>
      SINGLETON_TYPES.has(schemaType)
        ? input.filter(
            ({ action }) => action && SINGLETON_ACTIONS.has(action)
          )
        : input,
    // Hide singletons from the "New document" menu.
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === "global"
        ? prev.filter(
            (template) => !SINGLETON_TYPES.has(template.templateId)
          )
        : prev,
  },

  deployment: {
    appId: "e2vv7qv4b8o977sxs66mh9re",
    autoUpdates: true,
  },
});
