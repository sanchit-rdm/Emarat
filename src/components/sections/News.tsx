import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";

type Post = {
  _id: string;
  title?: string;
  slug?: { current?: string };
  author?: { name?: string };
  mainImage?: { asset?: { url?: string } };
  publishedAt?: string;
};

const placeholders: Post[] = [
  {
    _id: "p1",
    title: "E11 at DLF Garden City: Why it is Gurugram's most anticipated launch",
    author: { name: "Project Update" },
    publishedAt: "2026-04-18",
    mainImage: { asset: { url: "/images/alameda-lounge.webp" } },
  },
  {
    _id: "p2",
    title: "Investing in Gurugram real estate in 2026 what the numbers say",
    author: { name: "Market Note" },
    publishedAt: "2026-03-07",
    mainImage: { asset: { url: "/images/alameda-dining.webp" } },
  },
  {
    _id: "p3",
    title: "Why DLF Garden City remains Sector 93's most sought-after address",
    author: { name: "Feature" },
    publishedAt: "2026-02-14",
    mainImage: { asset: { url: "/images/alameda-kitchen.webp" } },
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

interface NewsLabels {
  heading1?: string;
  heading2?: string;
  allLabel?: string;
  allHref?: string;
  authorFallback?: string;
}

export default function News({ posts, labels }: { posts: Post[]; labels?: NewsLabels }) {
  const items = (posts && posts.length > 0 ? posts : placeholders).slice(0, 3);
  const heading1 = labels?.heading1?.trim() || "Latest from";
  const heading2 = labels?.heading2?.trim() || "Emarat Realty.";
  const allLabel = labels?.allLabel?.trim() || "All articles";
  const allHref = labels?.allHref?.trim() || "/blog";
  const authorFallback = labels?.authorFallback?.trim() || "Emarat Realty";

  return (
    <section id="news" className="px-4 py-10 sm:px-6 sm:py-[50px] lg:px-10 lg:py-[100px]">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <SplitReveal
              as="h2"
              className="font-display h-section"
            >
              {heading1}
            </SplitReveal>
            <SplitReveal
              as="h2"
              delay={0.1}
              className="font-display h-section text-[color:var(--accent)]"
            >
              {heading2}
            </SplitReveal>
          </div>
          <Reveal delay={0.2} className="self-end">
            <a href={allHref} className="group inline-flex items-center gap-3 text-sm">
              <span className="border-b border-[color:var(--line)] pb-1 transition-colors group-hover:border-[color:var(--fg)]">
                {allLabel}
              </span>
              <span aria-hidden>→</span>
            </a>
          </Reveal>
        </div>

        <ul className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {items.map((post, i) => (
            <Reveal
              key={post._id}
              as="li"
              delay={i * 0.08}
              className="group flex flex-col"
            >
              <a className="block">
                <div className="relative mb-6 aspect-[4/5] overflow-hidden rounded-md bg-[color:var(--bg-alt)]">
                  {post.mainImage?.asset?.url && (
                    <Image
                      src={post.mainImage.asset.url}
                      alt={post.title ?? ""}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                      style={{ filter: "sepia(0.12) saturate(0.9) brightness(0.88)" }}
                    />
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                  <span>{post.author?.name ?? authorFallback}</span>
                  <span>·</span>
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <h3 className="mt-3 font-display-alt text-2xl leading-tight transition-colors group-hover:text-[color:var(--accent)]">
                  {post.title}
                </h3>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
