import SiteNav from "@/components/SiteNav";
import ScrollVideoHero from "@/components/sections/ScrollVideoHero";
import StatsMarquee from "@/components/sections/StatsMarquee";
import Gallery from "@/components/sections/Gallery";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import Location from "@/components/sections/Location";
import Testimonials from "@/components/sections/Testimonials";
import Approach from "@/components/sections/Approach";
import News from "@/components/sections/News";
import Contact from "@/components/sections/Contact";
import SiteFooter from "@/components/sections/SiteFooter";
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { HOME_PAGE_QUERY, POSTS_QUERY } from "@/sanity/lib/queries";
import { buildMetadata } from "@/sanity/lib/page";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({ query: HOME_PAGE_QUERY, tags: ["homePage"] });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const seo = (data as any)?.seo;
  return buildMetadata(seo, {
    title: "Emarat Realty Luxury Real Estate in Gurugram",
    description:
      "A distinguished leader in luxury real estate, specialising in exquisite residences and high-end commercial spaces at DLF Garden City, Sector 93, Gurugram.",
  });
}

export default async function Home() {
  const [{ data: homePageRaw }, { data: postsRaw }] = await Promise.all([
    sanityFetch({ query: HOME_PAGE_QUERY, tags: ["homePage"] }),
    sanityFetch({ query: POSTS_QUERY, tags: ["post"] }),
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const homePage = homePageRaw as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const posts = (postsRaw as any[]) ?? [];

  return (
    <>
      <SiteNav />
      <main>
        <ScrollVideoHero blocks={homePage?.heroBlocks} />
        <StatsMarquee stats={homePage?.stats} />
        <Gallery images={homePage?.gallery} />
        <div className="theme-light">
          <Projects />
        </div>
        <About data={homePage?.about} />
        <Location data={homePage?.location} />
        <div className="theme-light">
          <Approach data={homePage?.approach} />
        </div>
        <Testimonials data={homePage?.testimonials} />
        <div className="theme-light">
          <News posts={posts} />
        </div>
        <Contact data={homePage?.contact} />
      </main>
      <SiteFooter />
    </>
  );
}
