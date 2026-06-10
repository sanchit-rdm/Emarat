import { aboutPageType } from "./aboutPage";
import { directorsDeskPageType } from "./directorsDeskPage";
import { careersPageType } from "./careersPage";
import { contactPageType } from "./contactPage";
import { newsPageType } from "./newsPage";
import { projectsPageType } from "./projectsPage";

export {
  aboutPageType,
  directorsDeskPageType,
  careersPageType,
  contactPageType,
  newsPageType,
  projectsPageType,
};

export const pageSingletonTypes = [
  aboutPageType,
  contactPageType,
  directorsDeskPageType,
  careersPageType,
  newsPageType,
  projectsPageType,
];

export const pageSingletonNames = pageSingletonTypes.map((t) => t.name);
