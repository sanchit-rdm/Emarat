import { defineQuery } from "next-sanity";

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    siteTitle,
    siteDescription,
    contact {
      phone, phoneHours, email, emailNote, address
    },
    socialLinks[] { platform, url },
    nav[] {
      label,
      href,
      dropdown[] { label, href }
    },
    footer {
      "image": image.asset->url,
      headline,
      tagline,
      addressLines,
      columns[] {
        heading,
        links[] { label, href }
      },
      contactHeading,
      officeHours,
      copyright,
      legalNote
    }
  }
`);

/* Shared projections for the simple Hero + SEO page singletons. */
const HERO_FIELDS = `
  hero {
    eyebrow, titleTop, titleBottom, subtitle, trailing,
    "bgImage": bgImage.asset->url
  }
`;
const SEO_FIELDS = `
  seo {
    metaTitle, metaDescription,
    "ogImage": ogImage.asset->url
  }
`;

/* Build a query for a Hero+SEO page singleton by document type. */
export function pageQuery(type: string) {
  return `*[_type == "${type}"][0] { ${HERO_FIELDS}, ${SEO_FIELDS} }`;
}

export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage"][0] {
    "heroBlocks": heroBlocks[]{ _key, heading },
    scrollCue,
    "gallery": gallery[]{
      _key,
      "src": image.asset->url,
      label
    },
    about {
      heading1,
      heading2,
      description,
      "services": services[]{ _key, title, subtitle },
      "image": image.asset->url,
      imageCaption
    },
    approach {
      heading1,
      heading2,
      "values": values[]{
        _key,
        no,
        title,
        body,
        "img": image.asset->url,
        alt
      }
    },
    contact {
      heading1,
      heading2,
      phone,
      phoneHref,
      phoneHours,
      email,
      emailNote,
      address,
      lead,
      namePlaceholder,
      phonePlaceholder,
      emailPlaceholder,
      categoryPlaceholder,
      categoryOptions,
      privacy,
      submitLabel,
      callLabel,
      emailLabel,
      visitLabel
    },
    location {
      eyebrow,
      "places": places[]{
        _key, name, headingLine1, headingLine2, feature, icon, body,
        "image": image.asset->url
      }
    },
    statement {
      eyebrow, lead, rest, body, ctaLabel, ctaHref,
      "image": image.asset->url
    },
    gallerySection { heading1, heading2, scrollHint, swipeHint },
    newsSection { heading1, heading2, allLabel, allHref },
    projectsSection { heading1, heading2, allLabel, allHref },
    designTwo {
      introEyebrow,
      elegant { title, buttonLabel, buttonHref },
      iconic { line1, line2, watermark, ctaLabel, ctaHref },
      residences { eyebrow, heading1, heading2, allLabel, allHref, locationLabel, configLabel, viewLabel },
      principles { heading1, heading2 },
      news { eyebrow, heading1, heading2, allLabel, allHref },
      contact { eyebrow, lead, namePlaceholder, phonePlaceholder, categoryPlaceholder, categoryOptions, submitLabel, privacy }
    },
    ${SEO_FIELDS}
  }
`);

export const ABOUT_PAGE_QUERY = defineQuery(`
  *[_type == "aboutPage"][0] {
    ${HERO_FIELDS},
    intro {
      heading1, heading2, paragraph, highlights
    },
    argo {
      heading1, heading2, body,
      "industries": industries[]{ _key, name, note }
    },
    community {
      heading1, heading2, blurb,
      "initiatives": initiatives[]{ _key, name, body }
    },
    leadership {
      quote, body, personName, personRole, personInitials,
      primaryCtaLabel, primaryCtaHref, secondaryCtaLabel, secondaryCtaHref
    },
    ${SEO_FIELDS}
  }
`);

export const DIRECTORS_DESK_PAGE_QUERY = defineQuery(`
  *[_type == "directorsDeskPage"][0] {
    ${HERO_FIELDS},
    portrait { personName, personRole, "image": image.asset->url },
    quote { line1, line2 },
    message,
    signatureName,
    cta { heading, body, primaryLabel, primaryHref, secondaryLabel, secondaryHref },
    ${SEO_FIELDS}
  }
`);

export const TEAM_PAGE_QUERY = defineQuery(`
  *[_type == "teamPage"][0] {
    ${HERO_FIELDS},
    "values": values[]{ _key, label, body },
    intro { heading1, heading2, blurb },
    "members": members[]{ _key, name, role, bio, "image": image.asset->url },
    cta { heading1, heading2, body, buttonLabel, buttonHref },
    ${SEO_FIELDS}
  }
`);

export const CAREERS_PAGE_QUERY = defineQuery(`
  *[_type == "careersPage"][0] {
    ${HERO_FIELDS},
    pillarsHeading { heading1, heading2 },
    "pillars": pillars[]{ _key, n, title, body },
    areasHeading { heading1, heading2 },
    areas,
    apply { heading1, heading2, body, cardLabel, email, hours, office, buttonLabel },
    ${SEO_FIELDS}
  }
`);

export const CONTACT_PAGE_QUERY = defineQuery(`
  *[_type == "contactPage"][0] {
    ${HERO_FIELDS},
    "methods": methods[]{ _key, label, primary, href, sub },
    form {
      heading1, heading2, nameLabel, namePlaceholder, phoneLabel, phonePlaceholder,
      emailLabel, emailPlaceholder, categoryLabel, categoryPlaceholder, categoryOptions,
      messageLabel, messagePlaceholder, consent, privacy, submitLabel
    },
    office {
      label, addressLines, phoneLabel, phone, emailLabel, email, hoursLabel, hours,
      "socials": socials[]{ _key, label, href }
    },
    map { title, embedUrl },
    ${SEO_FIELDS}
  }
`);

export const NEWS_PAGE_QUERY = defineQuery(`
  *[_type == "newsPage"][0] {
    ${HERO_FIELDS},
    featuredLabel, readArticleLabel, gridHeading, authorFallback, emptyTitle, emptyBody,
    newsletter { heading1, heading2, placeholder, buttonLabel, note },
    ${SEO_FIELDS}
  }
`);

export const PROJECTS_PAGE_QUERY = defineQuery(`
  *[_type == "projectsPage"][0] {
    ${HERO_FIELDS},
    filter { allLabel, "links": links[]{ _key, label, href }, trailing },
    cardButtons { viewLabel, enquireLabel, configLabel, sizesLabel },
    additionalHeading,
    "additional": additional[]{ _key, name, location, type },
    cta { heading, body, buttonLabel, buttonHref },
    detail {
      breadcrumbHome, breadcrumbProjects, heroEnquireLabel, heroFloorPlansLabel,
      navOverview, navAmenities, navFloorPlans, navGallery, navLocation, navEnquire,
      overviewHeading1, overviewHeading2, amenitiesHeading, amenitiesBlurb,
      floorPlansHeading, floorPlansBlurb, floorPlansRequestLabel, floorPlansBadge, galleryHeading,
      connectivityHeading1, connectivityHeading2, connectivityBlurb,
      enquiryHeading, enquiryBlurb, enquiryPhone, enquiryEmail, enquirySubmitLabel,
      enquiryInterestedLabel, enquiryNameLabel, enquiryNamePlaceholder,
      enquiryPhoneLabel, enquiryPhonePlaceholder, enquiryEmailLabel, enquiryEmailPlaceholder,
      enquiryConfigLabel, enquiryConfigPlaceholder, enquiryConfigOptions,
      enquiryMessageLabel, enquiryMessagePlaceholder, enquiryPrivacy
    },
    ${SEO_FIELDS}
  }
`);

export const PROJECTS_LISTING_QUERY = defineQuery(`
  *[_type == "project"] | order(no asc) {
    "slug": slug.current,
    no, title, location, status, config, size,
    "heroImage": heroImage.asset->url,
    tagline,
    excerpt,
    "stats": stats[]{ _key, label, value }
  }
`);

export const PROJECT_SLUGS_QUERY = defineQuery(`
  *[_type == "project"].slug.current
`);

export const PROJECT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    "slug": slug.current,
    no, title, shortName, tagline, location, status,
    config, size, possession, rera, mapQuery,
    "heroImage": heroImage.asset->url,
    "overviewImage": overviewImage.asset->url,
    "overview": overview[],
    "stats": stats[]{ _key, label, value },
    "amenities": amenities[]{ _key, name, icon },
    "floorPlans": floorPlans[]{
      _key, id, label,
      "config": config,
      "image": image.asset->url,
      "specs": specs[]{ _key, label, value }
    },
    "gallery": gallery[]{
      _key,
      "src": image.asset->url,
      label
    },
    "connectivity": connectivity[]{
      _key, category, items
    },
    "highlights": coalesce(highlights, [])
  }
`);

export const POSTS_QUERY = defineQuery(`
  *[_type == "post"] | order(publishedAt desc) {
    _id, title, slug, author->, mainImage, publishedAt, body
  }
`);
