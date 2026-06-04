import { pageSingleton } from "./pageSingleton";

export const aboutPageType = pageSingleton("aboutPage", "About Page");
export const contactPageType = pageSingleton("contactPage", "Contact Page");
export const teamPageType = pageSingleton("teamPage", "Team Page");
export const directorsDeskPageType = pageSingleton("directorsDeskPage", "Director's Desk Page");
export const careersPageType = pageSingleton("careersPage", "Careers Page");
export const newsPageType = pageSingleton("newsPage", "News Page");
export const propertiesPageType = pageSingleton("propertiesPage", "Properties Page");
export const locationPageType = pageSingleton("locationPage", "Location Page");
export const projectsPageType = pageSingleton("projectsPage", "Projects Listing Page");

export const pageSingletonTypes = [
  aboutPageType,
  contactPageType,
  teamPageType,
  directorsDeskPageType,
  careersPageType,
  newsPageType,
  propertiesPageType,
  locationPageType,
  projectsPageType,
];

export const pageSingletonNames = pageSingletonTypes.map((t) => t.name);
