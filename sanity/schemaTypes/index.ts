import { blockContentType } from "./blockContentType";
import { postType } from "./postType";
import { newsArticleType } from "./newsArticleType";
import { authorType } from "./authorType";
import { projectType } from "./projectType";
import { siteSettingsType } from "./siteSettings";
import { homePageType } from "./homePage";
import { seoType } from "./objects/seo";
import { pageHeroType } from "./objects/pageHero";
import { pageSingletonTypes } from "./pages";
import { pageBuilderBlockTypes } from "./objects/blocks";
import { seoLandingPageType } from "./seoLandingPageType";

export const schemaTypes = [
  // Objects
  seoType,
  pageHeroType,
  ...pageBuilderBlockTypes,
  // Globals / singletons
  siteSettingsType,
  homePageType,
  ...pageSingletonTypes,
  // Collections
  projectType,
  postType,
  newsArticleType,
  authorType,
  seoLandingPageType,
  blockContentType,
];
