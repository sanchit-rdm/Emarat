import { blockContentType } from "./blockContentType";
import { postType } from "./postType";
import { authorType } from "./authorType";
import { projectType } from "./projectType";
import { siteSettingsType } from "./siteSettings";
import { homePageType } from "./homePage";

export const schemaTypes = [
  siteSettingsType,
  homePageType,
  projectType,
  postType,
  authorType,
  blockContentType,
];
