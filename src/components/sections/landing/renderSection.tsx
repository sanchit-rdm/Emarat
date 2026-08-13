import RichTextSection from "./RichTextSection";
import ProjectShowcaseSection from "./ProjectShowcaseSection";
import CategorizedCardGridSection from "./CategorizedCardGridSection";
import StatementV2 from "@/components/sections/v2/StatementV2";
import ElegantDesignV2 from "@/components/sections/v2/ElegantDesignV2";
import NewsV2 from "@/components/sections/v2/NewsV2";
import ContactV2 from "@/components/sections/v2/ContactV2";
import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_QUERY } from "@/sanity/lib/queries";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Section = { _key: string; _type: string } & Record<string, any>;

/* Dispatches each seoLandingPage `sections[]` entry to its matching
   React component, keyed on _type. Add a case here whenever a new
   block object type is added to sanity/schemaTypes/objects/blocks. */
export default async function renderSection(section: Section) {
  switch (section._type) {
    case "richTextBlock":
      return (
        <RichTextSection
          key={section._key}
          eyebrow={section.eyebrow}
          heading={section.heading}
          body={section.body}
        />
      );

    case "statementBannerBlock":
      return (
        <StatementV2
          key={section._key}
          data={{
            image: section.image,
            lead: section.lead,
            rest: section.rest,
            body: section.body,
          }}
        />
      );

    case "imageBandBlock":
      return (
        <ElegantDesignV2
          key={section._key}
          images={section.images?.map((img: { _key?: string; src?: string; label?: string }) => ({
            _key: img._key,
            src: img.src ?? "",
            label: img.label ?? "",
          }))}
          labels={{
            title: section.title,
            buttonLabel: section.buttonLabel,
            buttonHref: section.buttonHref,
          }}
        />
      );

    case "projectShowcaseBlock":
      return (
        <ProjectShowcaseSection
          key={section._key}
          eyebrow={section.eyebrow}
          heading={section.heading}
          cards={section.cards}
          viewLabel={section.viewLabel}
          enquireLabel={section.enquireLabel}
        />
      );

    case "categorizedCardGridBlock":
      return (
        <CategorizedCardGridSection
          key={section._key}
          eyebrow={section.eyebrow}
          heading={section.heading}
          subheading={section.subheading}
          columns={section.columns}
          exploreLabel={section.exploreLabel}
        />
      );

    case "newsTeaserBlock": {
      const { data: posts } = await sanityFetch({ query: POSTS_QUERY, tags: ["post"] });
      return (
        <NewsV2
          key={section._key}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          posts={(posts as any[]) ?? []}
          labels={{
            eyebrow: section.eyebrow,
            allLabel: section.allLabel,
            allHref: section.allHref,
          }}
        />
      );
    }

    case "contactFormBlock":
      return (
        <ContactV2
          key={section._key}
          data={{ heading1: section.heading1, heading2: section.heading2 }}
          labels={{ eyebrow: section.eyebrow, lead: section.lead, submitLabel: section.submitLabel }}
          formName="callback-request"
        />
      );

    default:
      return null;
  }
}
