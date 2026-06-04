import { defineQuery } from "next-sanity";

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    siteTitle,
    siteDescription,
    contact {
      phone, phoneHours, email, emailNote, address
    },
    socialLinks[] { platform, url }
  }
`);

export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage"][0] {
    "stats": stats[]{ _key, value, suffix, label },
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
    testimonials {
      eyebrow,
      heading1,
      heading2,
      "items": items[]{ _key, quote, name }
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
    }
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
