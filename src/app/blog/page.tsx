import type { Metadata } from "next";
import Image from "@/components/Image";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/sections/SiteFooter";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import CircleButton from "@/components/CircleButton";
import NewsletterForm from "@/components/NewsletterForm";
import { sanityFetch } from "@/sanity/lib/live";
import { NEWS_PAGE_QUERY, POSTS_QUERY } from "@/sanity/lib/queries";
import { getPageContent, mergeHero, buildMetadata, pickStr } from "@/sanity/lib/page";

export const dynamic = 'force-dynamic';

const FB = {
  featuredLabel: "★ Featured",
  readArticleLabel: "Read article",
  gridHeading: "More from the journal.",
  emptyTitle: "Stay tuned.",
  emptyBody: "New articles published monthly.",
  newsletter: {
    heading1: "Monthly notes from",
    heading2: "the drawing table.",
    placeholder: "your@email.com",
    buttonLabel: "Subscribe →",
    note: "",
  },
};

const HERO_FALLBACK = {
  eyebrow: "",
  titleTop: "From Vision",
  titleBottom: "to Value.",
  subtitle:
    "The Emarat perspective project updates, market notes from Gurugram and longer feature articles about how we think about luxury real estate in 2026.",
  trailing: "Updated monthly",
  bgImage: "/images/alameda-lounge.webp",
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageContent("newsPage");
  return buildMetadata(page?.seo, {
    title: "News & Insights Emarat Realty",
    description:
      "From Vision to Value project updates, market notes and feature articles from Emarat Realty in Gurugram.",
  });
}

type Post = {
  _id: string;
  title?: string;
  slug?: { current?: string };
  mainImage?: { asset?: { url?: string } };
  coverImage?: string;
  publishedAt?: string;
  excerpt?: string;
};

const placeholders: Post[] = [
  {
    _id: "p1",
    title: "E11 at DLF Garden City: Why it is Gurugram's most anticipated launch of 2026",
    publishedAt: "2026-04-18",
    excerpt: "Inside the new duplex penthouses, sky lounges and the design thinking behind our most ambitious residence yet.",
    mainImage: { asset: { url: "/images/alameda-bathroom.webp" } },
  },
  {
    _id: "p2",
    title: "Investing in Gurugram real estate in 2026 what the numbers actually say",
    publishedAt: "2026-03-07",
    excerpt: "Five years of price data from Sectors 92–94 reveal a more nuanced story than the headlines suggest.",
    mainImage: { asset: { url: "/images/alameda-bedroom-4.webp" } },
  },
  {
    _id: "p3",
    title: "Why DLF Garden City remains Sector 93's most sought-after address",
    publishedAt: "2026-02-14",
    excerpt: "A walking tour of the township the architecture, the courtyards, the connectivity, and what comes next.",
    mainImage: { asset: { url: "/images/alameda-powder-room.webp" } },
  },
  {
    _id: "p4",
    title: "Inside the Dwarka Expressway: how Gurugram's most important road is being completed",
    publishedAt: "2026-01-22",
    excerpt: "The signal-free corridor that will reshape NCR connectivity and what it means for property values along Sector 93.",
    mainImage: { asset: { url: "/images/alameda-bedroom-5.webp" } },
  },
  {
    _id: "p5",
    title: "What a luxury home actually costs to build in 2026",
    publishedAt: "2025-12-30",
    excerpt: "Italian marble, German plumbing, Indian craftsmanship a breakdown of where every rupee goes in a premium residence.",
    mainImage: { asset: { url: "/images/alameda-entrance.webp" } },
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

export default async function NewsPage() {
  const [{ data: postsRaw }, { data }] = await Promise.all([
    sanityFetch({ query: POSTS_QUERY, tags: ["post"] }),
    sanityFetch({ query: NEWS_PAGE_QUERY, tags: ["newsPage"] }),
  ]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const posts = (postsRaw as any[]) ?? [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const c = (data as any) ?? {};
  const items: Post[] = posts && posts.length > 0 ? posts : placeholders;
  const [featured, ...rest] = items;
  const hero = mergeHero(c?.hero, HERO_FALLBACK);

  const featuredLabel = pickStr(c?.featuredLabel, FB.featuredLabel);
  const readArticleLabel = pickStr(c?.readArticleLabel, FB.readArticleLabel);
  const gridHeading = pickStr(c?.gridHeading, FB.gridHeading);
  const emptyTitle = pickStr(c?.emptyTitle, FB.emptyTitle);
  const emptyBody = pickStr(c?.emptyBody, FB.emptyBody);
  const nl = {
    heading1: pickStr(c?.newsletter?.heading1, FB.newsletter.heading1),
    heading2: pickStr(c?.newsletter?.heading2, FB.newsletter.heading2),
    placeholder: pickStr(c?.newsletter?.placeholder, FB.newsletter.placeholder),
    buttonLabel: pickStr(c?.newsletter?.buttonLabel, FB.newsletter.buttonLabel),
    note: pickStr(c?.newsletter?.note, FB.newsletter.note),
  };

  return (
    <>
      <SiteNav />
      <main>
        <PageHero {...hero} className="!min-h-[34svh] lg:!min-h-[85svh]" />

        {/* Featured article */}
        {featured && (
          <section className="border-y border-[color:var(--line)] bg-[color:var(--bg-alt)] px-4 py-10 sm:px-6 sm:py-[50px] lg:px-10 lg:py-[100px]">
            <div className="mx-auto max-w-[1400px]">
              <Reveal as="div" className="mb-8 text-xs uppercase tracking-[0.22em] text-[color:var(--accent)]">
                <span>{featuredLabel}</span>
              </Reveal>
              <div className="grid grid-cols-12 items-center gap-y-8 lg:gap-12">
                <div className="col-span-12 lg:col-span-7">
                  <Reveal className="relative aspect-[16/10] overflow-hidden rounded-md bg-[color:var(--bg)]">
                    {(featured.coverImage ?? featured.mainImage?.asset?.url) && (
                      <Image
                        src={(featured.coverImage ?? featured.mainImage?.asset?.url)!}
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
                  <SplitReveal
                    as="h2"
                    className="mt-5 font-display text-2xl leading-tight lg:text-4xl"
                  >
                    {featured.title ?? ""}
                  </SplitReveal>
                  {featured.excerpt && (
                    <Reveal as="p" delay={0.2} className="mt-6 text-base text-[color:var(--muted)] lg:text-lg">
                      {featured.excerpt}
                    </Reveal>
                  )}
                  <Reveal delay={0.3} className="mt-8">
                    <CircleButton href={`/blog/${featured.slug?.current ?? "#"}`} variant="outline" size="sm">
                      {readArticleLabel}
                    </CircleButton>
                  </Reveal>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Rest of articles grid (light cream) */}
        <section className="theme-light px-4 py-10 sm:px-6 sm:py-[50px] lg:px-10 lg:py-[100px]">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <SplitReveal
                as="h2"
                className="font-display h-section"
              >
                {gridHeading}
              </SplitReveal>
              <Reveal as="p" delay={0.15} className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
                {rest.length} articles
              </Reveal>
            </div>

            {rest.length === 0 ? (
              <Reveal className="rounded-md border border-[color:var(--line)] py-10 text-center">
                <div className="font-display-alt text-3xl text-[color:var(--accent)]">{emptyTitle}</div>
                <p className="mt-3 text-sm text-[color:var(--muted)]">
                  {emptyBody}
                </p>
              </Reveal>
            ) : (
              <ul className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((post, i) => (
                  <Reveal
                    as="li"
                    key={post._id}
                    delay={i * 0.06}
                    className="group flex flex-col"
                  >
                    <a href={`/blog/${post.slug?.current}`} className="block">
                      <div className="relative mb-5 aspect-[16/9] overflow-hidden rounded-md bg-[color:var(--bg-alt)]">
                        {(post.coverImage ?? post.mainImage?.asset?.url) && (
                          <Image
                            src={(post.coverImage ?? post.mainImage?.asset?.url)!}
                            alt={post.title ?? ""}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                            style={{ filter: "sepia(0.12) saturate(0.9) brightness(0.88)" }}
                          />
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-[0.6875rem] uppercase tracking-[0.18em] text-[color:var(--muted)]">
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                      <h3 className="mt-3 font-display-alt text-xl leading-tight transition-colors group-hover:text-[color:var(--accent)] lg:text-2xl">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted)]">
                          {post.excerpt}
                        </p>
                      )}
                    </a>
                  </Reveal>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Newsletter */}
        <section className="border-t border-[color:var(--line)] bg-[color:var(--bg-alt)] px-4 py-10 sm:px-6 sm:py-[50px] lg:px-10 lg:py-[100px]">
          <div className="mx-auto grid max-w-[1280px] grid-cols-12 items-end gap-y-8">
            <div className="col-span-12 lg:col-span-7">
              <SplitReveal
                as="h2"
                className="font-display h-section"
              >
                {nl.heading1}
              </SplitReveal>
              <SplitReveal
                as="h2"
                delay={0.1}
                className="font-display h-section text-[color:var(--accent)]"
              >
                {nl.heading2}
              </SplitReveal>
            </div>
            <div className="col-span-12 lg:col-span-5">
              <NewsletterForm placeholder={nl.placeholder} buttonLabel={nl.buttonLabel} />
              <p className="mt-3 text-xs text-[color:var(--muted)]">
                {nl.note}
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
