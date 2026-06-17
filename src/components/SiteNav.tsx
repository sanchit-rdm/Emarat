import { sanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import SiteNavClient, { type NavItem } from "@/components/SiteNavClient";

// Default menu — used until/unless overridden in Sanity → Site Settings → Nav.
const DEFAULT_NAV: NavItem[] = [
  {
    label: "Home",
    dropdown: [
      { href: "/", label: "Home 1" },
      { href: "/home-2", label: "Home 2" },
    ],
  },
  {
    label: "Corporate",
    dropdown: [
      { href: "/about", label: "About Us" },
      { href: "/directors-desk", label: "Director's Desk" },
    ],
  },
  {
    label: "Projects",
    dropdown: [
      { href: "/projects/c2", label: "C2 at DLF Garden City" },
      { href: "/projects/c5", label: "C5 at DLF Garden City" },
      { href: "/projects/e11", label: "E11 at DLF Garden City" },
      { href: "/projects/ea04", label: "EA 04 at Alameda" },
    ],
  },
  {
    label: "Upcoming Projects",
    dropdown: [
      { href: "/upcoming-projects/goa", label: "Goa" },
      { href: "/upcoming-projects/bhimtal", label: "Bhimtal" },
      { href: "/upcoming-projects/lakefarms", label: "Lakefarms" },
      { href: "/upcoming-projects/lansdowne", label: "Lansdowne" },
    ],
  },
  { href: "/careers", label: "Careers" },
  {
    label: "Media",
    dropdown: [
      { href: "/blog", label: "Blog" },
      { href: "/news", label: "News" },
    ],
  },
  { href: "/contact", label: "Contact" },
];

type SanityNav = Array<{
  label?: string;
  href?: string;
  dropdown?: Array<{ label?: string; href?: string }> | null;
}> | null;

export default async function SiteNav() {
  let nav: NavItem[] = DEFAULT_NAV;
  try {
    const { data } = await sanityFetch({ query: SITE_SETTINGS_QUERY, tags: ["siteSettings"] });
    const sanityNav = (data as { nav?: SanityNav })?.nav;
    if (sanityNav && sanityNav.length) {
      nav = sanityNav
        .filter((i) => i.label)
        .map((i) => ({
          label: i.label as string,
          href: i.href || undefined,
          dropdown: i.dropdown?.length
            ? i.dropdown
                .filter((d) => d.label && d.href)
                .map((d) => ({ label: d.label as string, href: d.href as string }))
            : undefined,
        }));
    }
  } catch {
    // keep defaults
  }

  return <SiteNavClient items={nav} />;
}
