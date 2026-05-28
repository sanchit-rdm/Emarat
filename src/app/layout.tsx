import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-sans-pri",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono-pri",
  subsets: ["latin"],
});

const instrument = Instrument_Serif({
  variable: "--font-display-pri",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Emarat Studio — Architecture & Property Development",
  description:
    "An independent architecture and property development practice working in residential, mixed-use and adaptive reuse across MENA and Europe since 2009.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrument.variable} antialiased`}
    >
      <body className="min-h-screen">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
