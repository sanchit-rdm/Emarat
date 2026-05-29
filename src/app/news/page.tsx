import type { Metadata } from "next";
import Image from "next/image";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/sections/SiteFooter";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import CircleButton from "@/components/CircleButton";
import { getAllPosts } from "@/lib/sanity.client";

export const metadata: Metadata = {
  title: "News & Insights — Emarat Realty",
  description:
    "From Vision to Value — project updates, market notes and feature articles from Emarat Realty in Gurugram.",
};

type Post = {
  _id: string;
  title?: string;
  slug?: { current?: string };
  author?: { name?: string };
  mainImage?: { asset?: { url?: string } };
  publishedAt?: string;
  excerpt?: string;
};

const placeholders: Post[] = [
  {
    _id: "p1",
    title: "E11 at DLF Garden City: Why it is Gurugram's most anticipated launch of 2026",
    author: { name: "Project Update" },
    publishedAt: "2026-04-18",
    excerpt: "Inside the new duplex penthouses, sky lounges and the design thinking behind our most ambitious residence yet.",
    mainImage: { asset: { url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80&auto=format&fit=crop" } },
  },
  {
    _id: "p2",
    title: "Investing in Gurugram real estate in 2026 — what the numbers actually say",
    author: { name: "Market Note" },
    publishedAt: "2026-03-07",
    excerpt: "Five years of price data from Sectors 92–94 reveal a more nuanced story than the headlines suggest.",
    mainImage: { asset: { url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80&auto=format&fit=crop" } },
  },
  {
    _id: "p3",
    title: "Why DLF Garden City remains Sector 93's most sought-after address",
    author: { name: "Feature" },
    publishedAt: "2026-02-14",
    excerpt: "A walking tour of the township — the architecture, the courtyards, the connectivity, and what comes next.",
    mainImage: { asset: { url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80&auto=format&fit=crop" } },
  },
  {
    _id: "p4",
    title: "Inside the Dwarka Expressway: how Gurugram's most important road is being completed",
    author: { name: "Infrastructure" },
    publishedAt: "2026-01-22",
    excerpt: "The signal-free corridor that will reshape NCR connectivity — and what it means for property values along Sector 93.",
    mainImage: { asset: { url: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80&auto=format&fit=crop" } },
  },
  {
    _id: "p5",
    title: "What a luxury home actually costs to build in 2026",
    author: { name: "Essay" },
    publishedAt: "2025-12-30",
    excerpt: "Italian marble, German plumbing, Indian craftsmanship — a breakdown of where every rupee goes in a premium residence.",
    mainImage: { asset: { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format&fit=crop" } },
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
  const posts = await getAllPosts();
  const items: Post[] = posts && posts.length > 0 ? posts : placeholders;
  const [featured, ...rest] = items;

  return (
    <>
      <SiteNav />
      <main>
        <PageHero
          titleTop="From Vision"
          titleBottom="to Value."
          subtitle="The Emarat perspective — project updates, market notes from Gurugram and longer feature articles about how we think about luxury real estate in 2026."
          bgImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=2400&q=80&auto=format&fit=crop"
          trailing="Updated monthly"
        />

        {/* Featured article */}
        {featured && (
          <section className="border-y border-[color:var(--line)] bg-[color:var(--bg-alt)] px-6 py-20 lg:px-10 lg:py-28">
            <div className="mx-auto max-w-[1440px]">
              <Reveal as="div" className="mb-8 text-xs uppercase tracking-[0.22em] text-[color:var(--accent)]">
                <span>★ Featured</span>
              </Reveal>
              <div className="grid grid-cols-12 items-center gap-8 lg:gap-12">
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
                    <span>{featured.author?.name ?? "Emarat"}</span>
                    <span>·</span>
                    <span>{formatDate(featured.publishedAt)}</span>
                  </div>
                  <SplitReveal
                    as="h2"
                    className="mt-5 font-display h-sub"
                  >
                    {featured.title ?? ""}
                  </SplitReveal>
                  {featured.excerpt && (
                    <Reveal as="p" delay={0.2} className="mt-6 text-base text-[color:var(--muted)] lg:text-lg">
                      {featured.excerpt}
                    </Reveal>
                  )}
                  <Reveal delay={0.3} className="mt-8">
                    <CircleButton href="#" variant="outline" size="sm">
                      Read article
                    </CircleButton>
                  </Reveal>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Rest of articles grid (light cream) */}
        <section className="theme-light px-6 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <SplitReveal
                as="h2"
                className="font-display h-section"
              >
                More from the journal.
              </SplitReveal>
              <Reveal as="p" delay={0.15} className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
                {rest.length} articles
              </Reveal>
            </div>

            {rest.length === 0 ? (
              <Reveal className="rounded-md border border-[color:var(--line)] py-20 text-center">
                <div className="font-display text-3xl text-[color:var(--muted)]">Stay tuned.</div>
                <p className="mt-3 text-sm text-[color:var(--muted)]">
                  New articles published monthly.
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
                    <a className="block">
                      <div className="relative mb-5 aspect-[4/5] overflow-hidden rounded-md bg-[color:var(--bg-alt)]">
                        {post.mainImage?.asset?.url && (
                          <Image
                            src={post.mainImage.asset.url}
                            alt={post.title ?? ""}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                            style={{ filter: "sepia(0.12) saturate(0.9) brightness(0.88)" }}
                          />
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
                        <span>{post.author?.name ?? "Emarat"}</span>
                        <span>·</span>
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                      <h3 className="mt-3 font-display text-xl leading-tight tracking-tight transition-colors group-hover:text-[color:var(--accent)] lg:text-2xl">
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
        <section className="border-t border-[color:var(--line)] bg-[color:var(--bg-alt)] px-6 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto grid max-w-[1280px] grid-cols-12 items-end gap-8">
            <div className="col-span-12 lg:col-span-7">
              <SplitReveal
                as="h2"
                className="font-display h-section"
              >
                Monthly notes from
              </SplitReveal>
              <SplitReveal
                as="h2"
                delay={0.1}
                className="font-display h-section text-[color:var(--muted)]"
              >
                the drawing table.
              </SplitReveal>
            </div>
            <div className="col-span-12 lg:col-span-5">
              <form className="flex items-center border-b border-[color:var(--line)] py-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-[color:var(--muted)]"
                  aria-label="Email"
                />
                <button
                  type="submit"
                  className="text-xs uppercase tracking-[0.18em] text-[color:var(--accent)] transition-colors hover:text-[color:var(--fg)]"
                >
                  Subscribe →
                </button>
              </form>
              <p className="mt-3 text-xs text-[color:var(--muted)]">
                Monthly. New work, market notes and essays. No marketing.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
