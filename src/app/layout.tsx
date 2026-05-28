import type { Metadata } from "next";
import { Inter, Italiana, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

// Body — geometric sans, alternative to Euclid Square used on vp.moscow
const inter = Inter({
  variable: "--font-sans-pri",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

// Display — high-contrast serif, free alternative to SangBleu Empire (vp.moscow)
const italiana = Italiana({
  variable: "--font-display-pri",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

// Secondary display — softer companion serif for smaller headings & paragraphs
const cormorant = Cormorant_Garamond({
  variable: "--font-display-alt",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Emarat Realty — Luxury Real Estate in Gurugram",
  description:
    "A distinguished leader in luxury real estate, specialising in exquisite residences and high-end commercial spaces at DLF Garden City, Sector 93, Gurugram.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${italiana.variable} ${cormorant.variable} antialiased`}
    >
      <body className="min-h-screen">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
