import Image from "next/image";
import Link from "next/link";
import logo from "@/images/logo.png";
import { sanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

type FooterLink = { label: string; href: string };
type FooterColumn = { heading: string; links: FooterLink[] };
type FooterSettings = {
  contact?: { phone?: string; email?: string };
  socialLinks?: Array<{ platform?: string; url?: string }> | null;
  footer?: {
    image?: string | null;
    headline?: string;
    tagline?: string;
    addressLines?: string[] | null;
    columns?: FooterColumn[] | null;
    officeHours?: string;
    copyright?: string;
    legalNote?: string;
  } | null;
};

const DEFAULT_HEADLINE = "Redefining the standard of luxury living.";
const DEFAULT_FOOTER_IMAGE = "/images/E11/building.jpg";

const DEFAULT_TAGLINE =
  "Redefining the standard of luxury living. An Argo Group company building transformative real estate in Gurugram, Haryana.";
const DEFAULT_ADDRESS = [
  "Emarat Realty, 2nd Floor, Sector-15,",
  "Civil Lines, Gurugram (Haryana) 122001",
];
const DEFAULT_COLUMNS: FooterColumn[] = [
  {
    heading: "Corporate",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Director's Desk", href: "/directors-desk" },
      { label: "Our Team", href: "/team" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    heading: "Projects",
    links: [
      { label: "C2 at DLF Garden City", href: "/projects/c2" },
      { label: "C5 at DLF Garden City", href: "/projects/c5" },
      { label: "E11 at DLF Garden City", href: "/projects/e11" },
      { label: "EA 04 at Alameda", href: "/projects/ea04" },
    ],
  },
  {
    heading: "Explore",
    links: [
      { label: "Properties", href: "/properties" },
      { label: "Location", href: "/location" },
      { label: "News", href: "/news" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
const DEFAULT_PHONE = "+91 84509 84509";
const DEFAULT_EMAIL = "info@emaratrealty.com";
const DEFAULT_HOURS = "Mon Fri · 9am – 6pm";
const DEFAULT_SOCIALS: FooterLink[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/emarat-realty/" },
  { label: "Instagram", href: "https://www.instagram.com/emarat.realty/" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61570740803559" },
  { label: "X", href: "https://x.com/Emaratrealty" },
  { label: "YouTube", href: "https://youtube.com/@emarat.realty" },
];

function telHref(phone: string) {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

export default async function SiteFooter() {
  const year = new Date().getFullYear();

  let settings: FooterSettings | null = null;
  try {
    const { data } = await sanityFetch({ query: SITE_SETTINGS_QUERY, tags: ["siteSettings"] });
    settings = data as FooterSettings | null;
  } catch {
    /* fall back to defaults */
  }

  const f = settings?.footer;
  const image = f?.image?.trim() || DEFAULT_FOOTER_IMAGE;
  const headline = f?.headline?.trim() || DEFAULT_HEADLINE;
  const tagline = f?.tagline?.trim() || DEFAULT_TAGLINE;
  const addressLines = f?.addressLines?.length ? f.addressLines : DEFAULT_ADDRESS;
  const columns = f?.columns?.length ? f.columns : DEFAULT_COLUMNS;
  const phone = settings?.contact?.phone?.trim() || DEFAULT_PHONE;
  const email = settings?.contact?.email?.trim() || DEFAULT_EMAIL;
  const hours = f?.officeHours?.trim() || DEFAULT_HOURS;
  const socials = settings?.socialLinks?.length
    ? settings.socialLinks
        .filter((s) => s.platform && s.url)
        .map((s) => ({ label: s.platform as string, href: s.url as string }))
    : DEFAULT_SOCIALS;
  const copyright =
    f?.copyright?.trim() ||
    `© ${year} Emarat Realty. An Argo Group company. All rights reserved.`;
  const legalNote = f?.legalNote?.trim() || "RERA registered · Gurugram, Haryana";

  return (
    <footer className="theme-green relative">
      {/* Feature image banner across the top of the footer */}
      {image && (
        <div className="relative h-[40vh] min-h-[240px] w-full overflow-hidden lg:h-[52vh]">
          <Image
            src={image}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            style={{ filter: "sepia(0.12) saturate(0.9) brightness(0.8)" }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color:var(--bg)] via-[color:var(--bg)]/20 to-transparent" />
        </div>
      )}

      <div className="relative px-6 pb-10 pt-14 lg:px-10 lg:pt-20">
        <div className="brand-green-strip absolute inset-x-0 top-0" aria-hidden />

        {/* Large brand statement */}
        <div className="mx-auto max-w-[1440px]">
          <h2 className="font-display max-w-3xl text-3xl leading-[1.1] sm:text-4xl lg:text-6xl">
            {headline}
          </h2>
        </div>

        <div className="mx-auto mt-14 grid max-w-[1440px] grid-cols-12 gap-8 lg:mt-20">
        <div className="col-span-12 lg:col-span-4">
          <Image src={logo} alt="Emarat Realty" className="h-auto w-[200px]" sizes="200px" />
          <p className="mt-6 max-w-md text-sm text-[color:var(--muted)]">{tagline}</p>
          <p className="mt-4 max-w-md text-xs leading-relaxed text-[color:var(--muted)]/70">
            {addressLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < addressLines.length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.heading} className="col-span-6 lg:col-span-2">
            <div className="mb-4 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
              {col.heading}
            </div>
            <ul className="space-y-2 text-sm">
              {col.links.map((l) => (
                <li key={l.href + l.label}>
                  <Link href={l.href} className="transition-colors hover:text-[color:var(--accent)]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="col-span-6 lg:col-span-2">
          <div className="mb-4 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Get in Touch
          </div>
          <a href={telHref(phone)} className="block text-sm transition-colors hover:text-[color:var(--accent)]">
            {phone}
          </a>
          <a href={`mailto:${email}`} className="mt-2 block text-sm transition-colors hover:text-[color:var(--accent)]">
            {email}
          </a>
          <p className="mt-3 text-xs text-[color:var(--muted)]">{hours}</p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.16em] text-[color:var(--muted)]">
            {socials.map((s) => (
              <a
                key={s.href + s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[color:var(--fg)]"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-[1440px] flex-wrap items-center justify-between gap-4 border-t border-[color:var(--line)] pt-6 text-xs text-[color:var(--muted)]">
        <span>{copyright}</span>
        <span>{legalNote}</span>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-[color:var(--fg)]">Privacy Policy</Link>
          <Link href="#" className="hover:text-[color:var(--fg)]">Terms of Use</Link>
        </div>
      </div>
      </div>
    </footer>
  );
}
