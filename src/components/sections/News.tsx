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
    title: "How we think about residential value in 2026",
    author: { name: "Market note" },
    publishedAt: "2026-03-12",
    mainImage: { asset: { url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=900&q=80&auto=format&fit=crop" } },
  },
  {
    _id: "p2",
    title: "Mira Residences breaks ground in Dubai South",
    author: { name: "Project update" },
    publishedAt: "2026-02-04",
    mainImage: { asset: { url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=900&q=80&auto=format&fit=crop" } },
  },
  {
    _id: "p3",
    title: "What makes a home outlive its first owner",
    author: { name: "Essay" },
    publishedAt: "2026-01-21",
    mainImage: { asset: { url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900&q=80&auto=format&fit=crop" } },
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

export default function News({ posts }: { posts: Post[] }) {
  const items = (posts && posts.length > 0 ? posts : placeholders).slice(0, 3);

  return (
    <section id="news" className="px-6 py-28 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal as="div" className="mb-4 text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
              <span>(05) Journal</span>
            </Reveal>
            <SplitReveal
              as="h2"
              className="font-display text-[clamp(2rem,6vw,5.5rem)] leading-[1] tracking-tight"
            >
              Notes from
            </SplitReveal>
            <SplitReveal
              as="h2"
              delay={0.1}
              className="font-display text-[clamp(2rem,6vw,5.5rem)] leading-[1] tracking-tight text-[color:var(--muted)]"
            >
              the drawing table.
            </SplitReveal>
          </div>
          <Reveal as="a" delay={0.2} className="group inline-flex items-center gap-3 self-end text-sm">
            <span className="border-b border-[color:var(--line)] pb-1 transition-colors group-hover:border-[color:var(--fg)]">
              All entries
            </span>
            <span aria-hidden>→</span>
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
                      style={{ filter: "sepia(0.18) saturate(0.9) brightness(0.92)" }}
                    />
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                  <span>{post.author?.name ?? "Studio"}</span>
                  <span>·</span>
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <h3 className="mt-3 font-display text-2xl leading-tight tracking-tight transition-colors group-hover:text-[color:var(--accent)]">
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
