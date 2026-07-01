import type { Metadata } from "next";
import Image from "@/components/Image";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/sections/SiteFooter";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import CircleButton from "@/components/CircleButton";
import { sanityFetch } from "@/sanity/lib/live";
import { NEWS_ARTICLES_QUERY } from "@/sanity/lib/queries";

export const dynamic = "force-dynamic";

const HERO_FALLBACK = {
  eyebrow: "",
  titleTop: "Latest",
  titleBottom: "News.",
  subtitle: "Press coverage, announcements and industry updates from Emarat Realty.",
  trailing: "",
  bgImage: "/images/alameda-lounge.webp",
};

type NewsArticle = {
  _id: string;
  title?: string;
  slug?: { current?: string };
  source?: string;
  sourceUrl?: string;
  mainImage?: { asset?: { url?: string } };
  publishedAt?: string;
  excerpt?: string;
};

const PLACEHOLDERS: NewsArticle[] = [
  {
    _id: "n1",
    title: "Emarat Realty launches E11 at DLF Garden City — Gurugram's newest luxury address",
    source: "Hindustan Times",
    publishedAt: "2026-05-10",
    excerpt: "The three-side open independent floors at Sector 93 represent a new benchmark in premium residential development.",
    mainImage: { asset: { url: "/images/E11/building.jpg" } },
  },
  {
    _id: "n2",
    title: "DLF Garden City Sector 93 sees record sales velocity in Q1 2026",
    source: "Economic Times",
    publishedAt: "2026-04-02",
    excerpt: "Demand for premium independent floors continues to outpace supply across Gurugram's most sought-after township.",
    mainImage: { asset: { url: "/images/C-2/building.jpg" } },
  },
  {
    _id: "n3",
    title: "Emarat Realty named among top luxury developers in NCR for 2026",
    source: "Business Standard",
    publishedAt: "2026-03-18",
    excerpt: "The award recognises consistent delivery quality and customer satisfaction across the company's project portfolio.",
    mainImage: { asset: { url: "/images/C-5/building.jpg" } },
  },
];

function formatDate(d?: string) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export const metadata: Metadata = {
  title: "News — Emarat Realty",
  description:
    "Press coverage, announcements and industry updates from Emarat Realty.",
};

export default async function MediaPage() {
  const { data: articlesRaw } = await sanityFetch({
    query: NEWS_ARTICLES_QUERY,
    tags: ["newsArticle"],
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fetched = (articlesRaw as any[]) ?? [];
  const articles: NewsArticle[] = fetched.length > 0 ? fetched : PLACEHOLDERS;
  const [featured, ...rest] = articles;

  return (
    <>
      <SiteNav />
      <main>
        <PageHero {...HERO_FALLBACK} />

        {/* Featured article */}
        {featured && (
          <section className="border-y border-[color:var(--line)] bg-[color:var(--bg-alt)] px-4 py-10 sm:px-6 sm:py-[50px] lg:px-10 lg:py-[100px]">
            <div className="mx-auto max-w-[1400px]">
              <Reveal as="div" className="mb-8 text-xs uppercase tracking-[0.22em] text-[color:var(--accent)]">
                <span>★ Featured</span>
              </Reveal>
              <div className="grid grid-cols-12 items-center gap-y-8 lg:gap-12">
                <div className="col-span-12 lg:col-span-7">
                  <Reveal className="relative aspect-[16/10] overflow-hidden rounded-md bg-[color:var(--bg)]">
                    {featured.mainImage?.asset?.url && (
                      <Image
                        src={featured.mainImage.asset.url}
                        alt={featured.title ?? ""}
                        fill
                        sizes="(min-width: 1024px) 60vw, 100vw"
                        className="object-cover"
                        style={{ filter: "sepia(0.14) saturate(0.88) brightness(0.86)" }}
                      />
                    )}
                  </Reveal>
                </div>
                <div className="col-span-12 lg:col-span-5">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                    <span>{formatDate(featured.publishedAt)}</span>
                  </div>
                  <SplitReveal as="h2" className="mt-5 font-display text-2xl leading-tight lg:text-4xl">
                    {featured.title ?? ""}
                  </SplitReveal>
                  {featured.excerpt && (
                    <Reveal as="p" delay={0.2} className="mt-6 text-base text-[color:var(--muted)] lg:text-lg">
                      {featured.excerpt}
                    </Reveal>
                  )}
                  <Reveal delay={0.3} className="mt-8">
                    {featured.sourceUrl ? (
                      <CircleButton href={featured.sourceUrl} variant="outline" size="sm">
                        Read Article
                      </CircleButton>
                    ) : (
                      <CircleButton href="#" variant="outline" size="sm">
                        Read Article
                      </CircleButton>
                    )}
                  </Reveal>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Articles grid */}
        <section className="theme-light px-4 py-10 sm:px-6 sm:py-[50px] lg:px-10 lg:py-[100px]">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <SplitReveal as="h2" className="font-display h-section">
                More from the press.
              </SplitReveal>
              <Reveal as="p" delay={0.15} className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
                {rest.length} articles
              </Reveal>
            </div>

            {rest.length === 0 ? (
              <Reveal className="rounded-md border border-[color:var(--line)] py-10 text-center">
                <div className="font-display-alt text-3xl text-[color:var(--accent)]">Stay tuned.</div>
                <p className="mt-3 text-sm text-[color:var(--muted)]">More news coming soon.</p>
              </Reveal>
            ) : (
              <ul className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((article, i) => (
                  <Reveal as="li" key={article._id} delay={i * 0.06} className="group flex flex-col">
                    {article.sourceUrl ? (
                      <Link href={article.sourceUrl} target="_blank" rel="noopener noreferrer" className="block">
                        <ArticleCard article={article} />
                      </Link>
                    ) : (
                      <div className="block">
                        <ArticleCard article={article} />
                      </div>
                    )}
                  </Reveal>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function ArticleCard({ article }: { article: NewsArticle }) {
  return (
    <>
      <div className="relative mb-5 aspect-[4/5] overflow-hidden rounded-md bg-[color:var(--bg-alt)]">
        {article.mainImage?.asset?.url && (
          <Image
            src={article.mainImage.asset.url}
            alt={article.title ?? ""}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
            style={{ filter: "sepia(0.12) saturate(0.9) brightness(0.88)" }}
          />
        )}
      </div>
      <div className="flex items-center gap-3 text-[0.6875rem] uppercase tracking-[0.18em] text-[color:var(--muted)]">
        <span>{formatDate(article.publishedAt)}</span>
      </div>
      <h3 className="mt-3 font-display-alt text-xl leading-tight transition-colors group-hover:text-[color:var(--accent)] lg:text-2xl">
        {article.title}
      </h3>
      {article.excerpt && (
        <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted)]">{article.excerpt}</p>
      )}
    </>
  );
}
