import { richTextBlockType } from "./richTextBlock";
import { statementBannerBlockType } from "./statementBannerBlock";
import { imageBandBlockType } from "./imageBandBlock";
import { featureCardsBlockType } from "./featureCardsBlock";
import { residencesBlockType } from "./residencesBlock";
import { categorizedCardGridBlockType } from "./categorizedCardGridBlock";
import { newsTeaserBlockType } from "./newsTeaserBlock";
import { contactFormBlockType } from "./contactFormBlock";

export {
  richTextBlockType,
  statementBannerBlockType,
  imageBandBlockType,
  featureCardsBlockType,
  residencesBlockType,
  categorizedCardGridBlockType,
  newsTeaserBlockType,
  contactFormBlockType,
};

/* All page-builder block object types — registered in schemaTypes/index.ts
   and referenced by name in seoLandingPage's `sections` array. */
export const pageBuilderBlockTypes = [
  richTextBlockType,
  statementBannerBlockType,
  imageBandBlockType,
  featureCardsBlockType,
  residencesBlockType,
  categorizedCardGridBlockType,
  newsTeaserBlockType,
  contactFormBlockType,
];

/* Names for the `sections` array's `of` list — kept in one place so the
   Studio schema and any code referencing block type names stay in sync. */
export const pageBuilderBlockNames = pageBuilderBlockTypes.map((t) => t.name);
