import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollRail from "@/components/ScrollRail";
import BrochureButton from "@/components/BrochureButton";
import { SanityLive, sanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

// Body text — Montserrat. Drives --font-sans-pri.
const montserrat = Montserrat({
  variable: "--font-sans-pri",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// Display / headings — Adelora (client-licensed). Drives --font-display-alt.
const adelora = localFont({
  src: [
    { path: "../fonts/Adelora.otf", weight: "400", style: "normal" },
    { path: "../fonts/Adelora Italic.otf", weight: "400", style: "italic" },
  ],
  variable: "--font-display-alt",
  display: "swap",
});

// Cursive script accent — Bizantheum (client-licensed). Drives --font-script,
// used for decorative flourishes such as the "Elegant Design" title on Home
// Design 2. Applied only where the `.font-script` class is set.
const bizantheum = localFont({
  src: [{ path: "../fonts/Bizantheum.otf", weight: "400", style: "normal" }],
  variable: "--font-script",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  let title = "Emarat Realty Luxury Real Estate in Gurugram";
  let description =
    "A distinguished leader in luxury real estate, specialising in exquisite residences and high-end commercial spaces at DLF Garden City, Sector 93, Gurugram.";
  let ogImage = "/og-image.jpg";
  try {
    const { data } = await sanityFetch({ query: SITE_SETTINGS_QUERY, tags: ["siteSettings"] });
    const s = data as { siteTitle?: string; siteDescription?: string; ogImage?: string | null } | null;
    if (s?.siteTitle?.trim()) title = s.siteTitle;
    if (s?.siteDescription?.trim()) description = s.siteDescription;
    if (s?.ogImage) ogImage = s.ogImage;
  } catch {
    /* fall back to the in-code defaults */
  }
  const images = [{ url: ogImage, width: 1200, height: 630 }];
  return {
    metadataBase: new URL("https://www.emaratrealty.com"),
    title,
    description,
    openGraph: { siteName: "Emarat Realty", type: "website", title, description, images },
    twitter: { card: "summary_large_image", title, description, images: images.map((i) => i.url) },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftMode } = await draftMode();

  type SocialLink = { platform?: string; url?: string };
  type Settings = { contact?: { phone?: string }; socialLinks?: SocialLink[] };
  let whatsappPhone = "+918450984509";
  let instagramUrl = "https://www.instagram.com/emarat.realty/";
  try {
    const { data } = await sanityFetch({ query: SITE_SETTINGS_QUERY, tags: ["siteSettings"] });
    const s = data as Settings | null;
    if (s?.contact?.phone) whatsappPhone = s.contact.phone;
    const ig = s?.socialLinks?.find((l) => l.platform === "Instagram");
    if (ig?.url) instagramUrl = ig.url;
  } catch { /* fall back to defaults */ }

  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${adelora.variable} ${bizantheum.variable} antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
      </head>
      <body className="min-h-screen">
        {/* Brand rail — green track with gold thumb that tracks page scroll progress */}
        <ScrollRail />
        <BrochureButton whatsappPhone={whatsappPhone} instagramUrl={instagramUrl} />
        <SmoothScroll>{children}</SmoothScroll>
        <SanityLive />
        {isDraftMode && <VisualEditing />}
      </body>
    </html>
  );
}
