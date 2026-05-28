import SiteNav from "@/components/SiteNav";
import Hero from "@/components/sections/Hero";
import StatsMarquee from "@/components/sections/StatsMarquee";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import Approach from "@/components/sections/Approach";
import Materials from "@/components/sections/Materials";
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
        <Hero />
        <StatsMarquee />
        <Projects />
        <About />
        <Approach />
        <Materials />
        <News posts={posts} />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
