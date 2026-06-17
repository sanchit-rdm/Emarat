import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import StrokeHover from "@/components/StrokeHover";

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
    title: "E11 at DLF Garden City: Gurugram's most anticipated launch",
    author: { name: "Project Update" },
    publishedAt: "2026-11-03",
  },
  {
    _id: "p2",
    title: "Non-standard glazing on the facades of E11 Residences",
    author: { name: "News" },
    publishedAt: "2026-08-14",
    mainImage: { asset: { url: "/images/E11/building.jpg" } },
  },
];

function dateParts(d?: string) {
  if (!d) return { day: "", month: "" };
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return { day: "", month: "" };
  return {
    day: String(dt.getDate()).padStart(2, "0"),
    month: dt.toLocaleDateString("en-GB", { month: "short" }).toUpperCase(),
  };
}

interface NewsLabels {
  eyebrow?: string;
  heading1?: string;
  heading2?: string;
  allLabel?: string;
  allHref?: string;
}

/**
 * Design Option 2 — "Insights & updates". A large vertical title and a round
 * view-all button on the left; two feature cards on the right (one outlined,
 * one image-led). The cards and the round button all share the same
 * stroke-draws-around-the-border hover as the Enquire Now button (StrokeHover).
 */
export default function NewsV2({ posts, labels }: { posts: Post[]; labels?: NewsLabels }) {
  const items = (posts && posts.length > 0 ? posts : placeholders).slice(0, 2);
  const eyebrow = labels?.eyebrow?.trim() || "Insights & updates";
  const allLabel = labels?.allLabel?.trim() || "All articles";
  const allHref = labels?.allHref?.trim() || "/news";

  return (
    <section id="news" className="theme-light px-4 py-14 sm:px-6 sm:py-20 lg:px-10 lg:py-36">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">
        {/* Left — vertical title + round view-all button */}
        <div className="flex items-center justify-between gap-8 lg:w-[26%] lg:flex-col lg:items-start lg:justify-center lg:gap-14">
          <Reveal>
            <h2 className="font-display uppercase leading-[1.04] tracking-[0.06em] text-[color:var(--accent)] text-4xl sm:text-5xl lg:max-h-[460px] lg:text-[clamp(2.5rem,3.4vw,4rem)] lg:[writing-mode:vertical-rl] lg:rotate-180">
              {eyebrow}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <StrokeHover
              href={allHref}
              ariaLabel={allLabel}
              className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-[color:var(--accent)]/40 text-[color:var(--fg)] transition-colors hover:text-[color:var(--accent)] lg:h-32 lg:w-32"
            >
              <span aria-hidden className="relative z-10 text-2xl">→</span>
            </StrokeHover>
          </Reveal>
        </div>

        {/* Right — two feature cards */}
        <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
          {items.map((post, i) => {
            const { day, month } = dateParts(post.publishedAt);
            const category = (post.author?.name || "News").toUpperCase();
            const img = post.mainImage?.asset?.url;
            const withImage = !!img;
            const postHref = post.slug?.current ? `/news/${post.slug.current}` : allHref;

            return (
              <Reveal key={post._id} delay={i * 0.1}>
                <StrokeHover
                  href={postHref}
                  ariaLabel={post.title}
                  className={`flex aspect-[5/6] flex-col justify-between rounded-md p-7 lg:p-9 ${
                    withImage
                      ? "text-white"
                      : "border border-[color:var(--accent)]/30 bg-[color:var(--bg)] text-[color:var(--fg)]"
                  }`}
                >
                  {withImage && (
                    <div className="absolute inset-0 -z-10">
                      <Image
                        src={img as string}
                        alt={post.title ?? ""}
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                        className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/35" />
                    </div>
                  )}

                  <div className="relative z-10">
                    <div className={`font-mono text-[0.625rem] uppercase tracking-[0.26em] ${withImage ? "text-white/80" : "text-[color:var(--accent)]"}`}>
                      {category}
                    </div>
                    <h3 className="mt-6 max-w-[18ch] text-sm font-medium uppercase leading-relaxed tracking-[0.1em]">
                      {post.title}
                    </h3>
                  </div>

                  <div className="relative z-10 flex items-end gap-3">
                    <span className={`font-display text-6xl leading-none lg:text-7xl ${withImage ? "text-white" : "text-[color:var(--accent)]"}`}>
                      {day}
                    </span>
                    <span className={`mb-2 text-[0.625rem] uppercase tracking-[0.22em] ${withImage ? "text-white/80" : "text-[color:var(--muted)]"}`}>
                      {month}
                    </span>
                  </div>
                </StrokeHover>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
