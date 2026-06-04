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
import { getAllPosts } from "@/lib/sanity.client";

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <>
      <SiteNav />
      <main>
        <ScrollVideoHero />
        <StatsMarquee />
        <Gallery />
        <div className="theme-light">
          <Projects />
        </div>
        <About />
        <Location />
        <div className="theme-light">
          <Approach />
        </div>
        <Testimonials />
        <div className="theme-light">
          <News posts={posts} />
        </div>
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
