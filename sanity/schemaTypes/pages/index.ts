import { aboutPageType } from "./aboutPage";
import { directorsDeskPageType } from "./directorsDeskPage";
import { teamPageType } from "./teamPage";
import { careersPageType } from "./careersPage";
import { contactPageType } from "./contactPage";
import { newsPageType } from "./newsPage";
import { projectsPageType } from "./projectsPage";

export {
  aboutPageType,
  directorsDeskPageType,
  teamPageType,
  careersPageType,
  contactPageType,
  newsPageType,
  projectsPageType,
};

export const pageSingletonTypes = [
  aboutPageType,
  contactPageType,
  teamPageType,
  directorsDeskPageType,
  careersPageType,
  newsPageType,
  projectsPageType,
];

export const pageSingletonNames = pageSingletonTypes.map((t) => t.name);
