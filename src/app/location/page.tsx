import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/sections/SiteFooter";
import PageHero from "@/components/PageHero";
import Location from "@/components/sections/Location";
import Gallery from "@/components/sections/Gallery";
import { sanityFetch } from "@/sanity/lib/live";
import { HOME_PAGE_QUERY } from "@/sanity/lib/queries";
import { getPageContent, mergeHero, buildMetadata } from "@/sanity/lib/page";

const HERO_FALLBACK = {
  eyebrow: "",
  titleTop: "DLF Garden City,",
  titleBottom: "Sector 93, Gurugram.",
  subtitle:
    "A township strategically placed in Gurugram's most coveted residential corridor connected, serene, and designed for effortless urban living. Direct access to the Dwarka Expressway and minutes from Golf Course Extension Road.",
  trailing: "5 min Dwarka Expressway · 35 min IGI",
  bgImage: "/images/alameda-bedroom-3.webp",
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageContent("locationPage");
  return buildMetadata(page?.seo, {
    title: "Location Emarat Realty",
    description:
      "DLF Garden City, Sector 93, Gurugram the most coveted residential corridor in the NCR. Connected to Dwarka Expressway, Golf Course Road and IGI Airport.",
  });
}

export default async function LocationPage() {
  const [page, { data: homePage }] = await Promise.all([
    getPageContent("locationPage"),
    sanityFetch({ query: HOME_PAGE_QUERY, tags: ["homePage"] }),
  ]);
  const hero = mergeHero(page?.hero, HERO_FALLBACK);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const home = homePage as any;
  return (
    <>
      <SiteNav />
      <main>
        <PageHero {...hero} />
        <Location data={home?.location} />
        <Gallery images={home?.gallery} />
      </main>
      <SiteFooter />
    </>
  );
}
