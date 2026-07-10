import type { ReactNode } from "react";
import Image from "@/components/Image";
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
    contactHeading?: string;
    officeHours?: string;
    copyright?: string;
    legalNote?: string;
  } | null;
};

const DEFAULT_FOOTER_IMAGE = "/images/E11/building.jpg";

const DEFAULT_TAGLINE =
  "Redefining the standard of luxury living and building transformative real estate in Gurugram, Haryana.";
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
      { label: "Projects", href: "/projects" },
      { label: "Upcoming Projects", href: "/upcoming-projects" },
      { label: "News", href: "/blog" },
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
  { label: "Facebook", href: "https://www.facebook.com/emaratrealty1/" },
  { label: "X", href: "https://x.com/Emaratrealty" },
  { label: "YouTube", href: "https://youtube.com/@emarat.realty" },
];

function telHref(phone: string) {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

const S = { fill: "currentColor" };
const socialIcons: Record<string, ReactNode> = {
  linkedin: (
    <svg viewBox="0 0 24 24" width="18" height="18" {...S} aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" width="18" height="18" {...S} aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" width="18" height="18" {...S} aria-hidden>
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" width="18" height="18" {...S} aria-hidden>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" width="18" height="18" {...S} aria-hidden>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
};

const SOCIAL_ALIASES: Record<string, string> = { twitter: "x", "twitter/x": "x" };

function getSocialIcon(label: string): ReactNode {
  const raw = label.toLowerCase().replace(/\s/g, "");
  const key = SOCIAL_ALIASES[raw] ?? raw;
  return socialIcons[key] ?? <span className="text-xs uppercase tracking-[0.14em]">{label}</span>;
}

export default async function SiteFooter({ footerImage }: { footerImage?: string } = {}) {
  const year = new Date().getFullYear();

  let settings: FooterSettings | null = null;
  try {
    const { data } = await sanityFetch({ query: SITE_SETTINGS_QUERY, tags: ["siteSettings"] });
    settings = data as FooterSettings | null;
  } catch {
    /* fall back to defaults */
  }

  const f = settings?.footer;
  const image = footerImage || f?.image?.trim() || DEFAULT_FOOTER_IMAGE;
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
    `© ${year} Emarat Realty. All rights reserved.`;
  const legalNote = f?.legalNote?.trim() || "RERA registered · Gurugram, Haryana";
  const contactHeading = f?.contactHeading?.trim() || "Get in Touch";

  return (
    <footer className="theme-green relative pb-16 lg:pb-0">
      {/* Feature image banner across the top of the footer */}
      {image && (
        <div className="relative w-full overflow-hidden lg:h-[52vh]">
          <Image
            src={image}
            alt=""
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full object-cover lg:absolute lg:inset-0 lg:h-full lg:w-full"
            style={undefined}
          />
        </div>
      )}

      <div className="relative px-6 pb-10 pt-14 lg:px-10 lg:pt-20">
        <div className="brand-green-strip absolute inset-x-0 top-0" aria-hidden />

        <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-y-8 lg:gap-8">
        <div className="col-span-12 lg:col-span-4">
          <Image src={logo} alt="Emarat Realty" className="h-auto w-36 lg:w-[200px]" sizes="(min-width: 1024px) 200px, 144px" />
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
            {contactHeading}
          </div>
          <a href={telHref(phone)} className="block text-sm transition-colors hover:text-[color:var(--accent)]">
            {phone}
          </a>
          <a href={`mailto:${email}`} className="mt-2 block text-sm transition-colors hover:text-[color:var(--accent)]">
            {email}
          </a>
          <p className="mt-3 text-sm text-[color:var(--muted)]">{hours}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-[color:var(--muted)]">
            {socials.map((s) => (
              <a
                key={s.href + s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="transition-colors hover:text-[color:var(--fg)]"
              >
                {getSocialIcon(s.label)}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-[1400px] flex-wrap items-center justify-center gap-4 border-t border-[color:var(--line)] pt-6 text-center text-xs text-[color:var(--muted)] sm:justify-between sm:text-left">
        <span>{copyright}</span>
        <span>{legalNote}</span>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="https://www.reddashmedia.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[color:var(--fg)]"
          >
            Designed by Red Dash Media
          </Link>
        </div>
      </div>
      </div>
    </footer>
  );
}
