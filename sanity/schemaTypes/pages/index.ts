import { aboutPageType } from "./aboutPage";
import { directorsDeskPageType } from "./directorsDeskPage";
import { careersPageType } from "./careersPage";
import { contactPageType } from "./contactPage";
import { newsPageType } from "./newsPage";
import { projectsPageType } from "./projectsPage";
import { upcomingProjectsPageType } from "./upcomingProjectsPage";
import { privacyPolicyPageType } from "./privacyPolicyPage";
import { termsPageType } from "./termsPage";

export {
  aboutPageType,
  directorsDeskPageType,
  careersPageType,
  contactPageType,
  newsPageType,
  projectsPageType,
  upcomingProjectsPageType,
  privacyPolicyPageType,
  termsPageType,
};

export const pageSingletonTypes = [
  aboutPageType,
  contactPageType,
  directorsDeskPageType,
  careersPageType,
  newsPageType,
  projectsPageType,
  upcomingProjectsPageType,
  privacyPolicyPageType,
  termsPageType,
];

export const pageSingletonNames = pageSingletonTypes.map((t) => t.name);
