import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { SanityLive, sanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

// Body text — Montserrat. Drives --font-sans-pri.
const montserrat = Montserrat({
  variable: "--font-sans-pri",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
  try {
    const { data } = await sanityFetch({ query: SITE_SETTINGS_QUERY, tags: ["siteSettings"] });
    const s = data as { siteTitle?: string; siteDescription?: string } | null;
    if (s?.siteTitle?.trim()) title = s.siteTitle;
    if (s?.siteDescription?.trim()) description = s.siteDescription;
  } catch {
    /* fall back to the in-code defaults */
  }
  return { title, description };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${adelora.variable} ${bizantheum.variable} antialiased`}
    >
      <body className="min-h-screen">
        {/* Brand-green vertical rail — present on every page as a quiet brand signature */}
        <div className="brand-rail" aria-hidden />
        <SmoothScroll>{children}</SmoothScroll>
        <SanityLive />
        {isDraftMode && <VisualEditing />}
      </body>
    </html>
  );
}
