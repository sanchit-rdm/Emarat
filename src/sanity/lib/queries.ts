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
      address
    },
    location {
      eyebrow,
      "places": places[]{
        _key, name, headingLine1, headingLine2, feature, icon, body,
        "image": image.asset->url
      }
    },
    statement {
      eyebrow, lead, rest, body, ctaHref,
      "image": image.asset->url
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
