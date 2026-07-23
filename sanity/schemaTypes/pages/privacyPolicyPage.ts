import { defineField } from "sanity";
import { pageSingletonWithContent } from "./pageSingleton";

export const privacyPolicyPageType = pageSingletonWithContent(
  "privacyPolicyPage",
  "Privacy Policy Page",
  [
    defineField({
      name: "effectiveDate",
      title: "Effective Date",
      type: "string",
      description: "Shown under the page heading, e.g. \"Effective from 1 January 2026\".",
    }),
    defineField({
      name: "body",
      title: "Policy Body",
      type: "blockContent",
      description: "Full policy text. Use H2/H3 for section headings.",
    }),
  ]
);
