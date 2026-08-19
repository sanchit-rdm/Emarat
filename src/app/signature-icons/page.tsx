import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/sections/SiteFooter";
import SignatureIconCard from "@/components/SignatureIconCard";
import { sanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Signature Icons | Emarat Realty",
  robots: { index: false, follow: false },
};

type SiteSettings = {
  contact?: { phone?: string; email?: string } | null;
  socialLinks?: Array<{ platform?: string; url?: string }> | null;
};

const DEFAULT_LINKS: Record<string, string> = {
  linkedin: "https://www.linkedin.com/company/emarat-realty/",
  instagram: "https://www.instagram.com/emarat.realty/",
  facebook: "https://www.facebook.com/emaratrealty1/",
  x: "https://x.com/Emaratrealty",
  youtube: "https://www.youtube.com/@emarat.realty",
};
const DEFAULT_PHONE = "+91 84509 84509";
const DEFAULT_WEBSITE = "https://www.emaratrealty.com";

function telHref(phone: string) {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

export default async function SignatureIconsPage() {
  let settings: SiteSettings | null = null;
  try {
    const { data } = await sanityFetch({ query: SITE_SETTINGS_QUERY, tags: ["siteSettings"] });
    settings = data as SiteSettings | null;
  } catch {
    /* fall back to defaults */
  }

  const bySocial = new Map(
    (settings?.socialLinks ?? [])
      .filter((s) => s.platform && s.url)
      .map((s) => [s.platform!.toLowerCase().replace(/\s|\//g, ""), s.url!])
  );
  const socialUrl = (key: string) => bySocial.get(key) ?? DEFAULT_LINKS[key];
  const phone = settings?.contact?.phone?.trim() || DEFAULT_PHONE;

  const icons = [
    { key: "facebook", label: "Facebook", href: socialUrl("facebook") },
    { key: "instagram", label: "Instagram", href: socialUrl("instagram") },
    { key: "linkedin", label: "LinkedIn", href: socialUrl("linkedin") },
    { key: "x", label: "X (Twitter)", href: socialUrl("x") ?? socialUrl("twitter/x") },
    { key: "youtube", label: "YouTube", href: socialUrl("youtube") },
    { key: "phone", label: "Phone", href: telHref(phone) },
    { key: "website", label: "Website", href: DEFAULT_WEBSITE },
  ];

  return (
    <>
      <SiteNav />
      <main className="px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-display h-section">Signature Icons</h1>
          <p className="mt-4 max-w-xl text-sm text-[color:var(--muted)]">
            Icons for use in email signatures. Copy the image URL to embed the icon, and the link
            URL for where it should point.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {icons.map((icon) => (
              <SignatureIconCard
                key={icon.key}
                label={icon.label}
                src={`/signature-icons/${icon.key}.png`}
                href={icon.href}
              />
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
