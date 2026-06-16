import { aboutPageType } from "./aboutPage";
import { directorsDeskPageType } from "./directorsDeskPage";
import { careersPageType } from "./careersPage";
import { contactPageType } from "./contactPage";
import { newsPageType } from "./newsPage";
import { projectsPageType } from "./projectsPage";
import { upcomingProjectsPageType } from "./upcomingProjectsPage";

export {
  aboutPageType,
  directorsDeskPageType,
  careersPageType,
  contactPageType,
  newsPageType,
  projectsPageType,
  upcomingProjectsPageType,
};

export const pageSingletonTypes = [
  aboutPageType,
  contactPageType,
  directorsDeskPageType,
  careersPageType,
  newsPageType,
  projectsPageType,
  upcomingProjectsPageType,
];

export const pageSingletonNames = pageSingletonTypes.map((t) => t.name);
