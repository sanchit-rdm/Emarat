import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

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

export const metadata: Metadata = {
  title: "Emarat Realty Luxury Real Estate in Gurugram",
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
      className={`${montserrat.variable} ${adelora.variable} antialiased`}
    >
      <body className="min-h-screen">
        {/* Brand-green vertical rail — present on every page as a quiet brand signature */}
        <div className="brand-rail" aria-hidden />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
