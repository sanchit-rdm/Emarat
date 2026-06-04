import { blockContentType } from "./blockContentType";
import { postType } from "./postType";
import { authorType } from "./authorType";
import { projectType } from "./projectType";
import { siteSettingsType } from "./siteSettings";
import { homePageType } from "./homePage";
import { seoType } from "./objects/seo";
import { pageHeroType } from "./objects/pageHero";
import { pageSingletonTypes } from "./pages";

export const schemaTypes = [
  // Objects
  seoType,
  pageHeroType,
  // Globals / singletons
  siteSettingsType,
  homePageType,
  ...pageSingletonTypes,
  // Collections
  projectType,
  postType,
  authorType,
  blockContentType,
];
