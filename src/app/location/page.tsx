import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/sections/SiteFooter";
import PageHero from "@/components/PageHero";
import Location from "@/components/sections/Location";
import Gallery from "@/components/sections/Gallery";

export const metadata: Metadata = {
  title: "Location Emarat Realty",
  description:
    "DLF Garden City, Sector 93, Gurugram the most coveted residential corridor in the NCR. Connected to Dwarka Expressway, Golf Course Road and IGI Airport.",
};

export default function LocationPage() {
  return (
    <>
      <SiteNav />
      <main>
        <PageHero
          titleTop="DLF Garden City,"
          titleBottom="Sector 93, Gurugram."
          subtitle="A township strategically placed in Gurugram's most coveted residential corridor connected, serene, and designed for effortless urban living. Direct access to the Dwarka Expressway and minutes from Golf Course Extension Road."
          bgImage="/images/alameda-bedroom-3.webp"
          trailing="5 min Dwarka Expressway · 35 min IGI"
        />
        <Location />
        <Gallery />
      </main>
      <SiteFooter />
    </>
  );
}
