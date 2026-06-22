import SiteNav from "@/components/SiteNav";
import ScrollVideoHero from "@/components/sections/ScrollVideoHero";
import IntroV2 from "@/components/sections/v2/IntroV2";
import ElegantDesignV2 from "@/components/sections/v2/ElegantDesignV2";
import IconicIntroV2 from "@/components/sections/v2/IconicIntroV2";
import Location from "@/components/sections/Location";
import ResidencesV2 from "@/components/sections/v2/ResidencesV2";
import StickyRevealSection from "@/components/sections/v2/StickyRevealSection";
import PrinciplesV2 from "@/components/sections/v2/PrinciplesV2";
import NewsV2 from "@/components/sections/v2/NewsV2";
import ContactV2 from "@/components/sections/v2/ContactV2";
import SiteFooter from "@/components/sections/SiteFooter";
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { HOME_PAGE_QUERY, POSTS_QUERY, PROJECTS_LISTING_QUERY } from "@/sanity/lib/queries";
import { buildMetadata } from "@/sanity/lib/page";

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({ query: HOME_PAGE_QUERY, tags: ["homePage"] });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const seo = (data as any)?.seo;
  return buildMetadata(seo, {
    title: "Emarat Realty — Home (Design Option 2)",
    description:
      "A distinguished leader in luxury real estate, specialising in exquisite residences and high-end commercial spaces at DLF Garden City, Sector 93, Gurugram.",
  });
}

/**
 * Home Page — Design Option 2.
 *
 * Same hero video, same content and imagery as the primary home page, but a
 * distinct, lighter and more spacious layout inspired by the reference design
 * (vp.moscow): a fading "elegant design" gallery, a three-column iconic-sights
 * grid, a full-width alternating residence slider, style cards and an airy
 * callback section. Lives at /home-2 so the client can compare the two
 * directions side by side via the on-screen Design switcher.
 */
export default async function HomeV2() {
  const [{ data: homePageRaw }, { data: postsRaw }, { data: projectsRaw }] = await Promise.all([
    sanityFetch({ query: HOME_PAGE_QUERY, tags: ["homePage"] }),
    sanityFetch({ query: POSTS_QUERY, tags: ["post"] }),
    sanityFetch({ query: PROJECTS_LISTING_QUERY, tags: ["project"] }),
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const homePage = homePageRaw as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const posts = (postsRaw as any[]) ?? [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const projects = (projectsRaw as any[]) ?? [];

  return (
    <>
      <SiteNav />
      <main className="home-v2">
        <ScrollVideoHero blocks={homePage?.heroBlocks} scrollLabel={homePage?.scrollCue} videoSrc="/videos/home2-scrub.mp4" posterSrc="/videos/home2-poster.webp" />
        <IntroV2 data={homePage?.about} eyebrow={homePage?.designTwo?.introEyebrow} />
        <ElegantDesignV2 images={homePage?.gallery} labels={homePage?.designTwo?.elegant} />
        <IconicIntroV2 data={homePage?.location} labels={homePage?.designTwo?.iconic} />
        <Location data={homePage?.location} />
        <ResidencesV2 projects={projects} labels={homePage?.designTwo?.residences} />
        <StickyRevealSection data={homePage?.designTwo?.stickyReveal} />
        <PrinciplesV2 data={homePage?.approach} labels={homePage?.designTwo?.principles} />
        <NewsV2 posts={posts} labels={homePage?.designTwo?.news} />
        <ContactV2 data={homePage?.contact} labels={homePage?.designTwo?.contact} />
      </main>
      <SiteFooter />
    </>
  );
}
