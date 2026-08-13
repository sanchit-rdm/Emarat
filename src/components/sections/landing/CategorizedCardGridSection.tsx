import Image from "@/components/Image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";

type Card = {
  _key?: string;
  image?: string | null;
  title?: string;
  location?: string;
  tagline?: string;
  href?: string;
};

type Column = {
  _key?: string;
  categoryLabel?: string;
  cards?: Card[];
};

interface Props {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  columns?: Column[];
  exploreLabel?: string;
}

/* Two-column categorized card grid — generic version of the home page's
   Beach & Lake / Mountain layout, fully editor-driven for landing pages. */
export default function CategorizedCardGridSection({
  eyebrow,
  heading,
  subheading,
  columns,
  exploreLabel,
}: Props) {
  const cols = (columns ?? []).filter((c) => c.cards?.length);
  if (cols.length === 0) return null;
  const explore = exploreLabel?.trim() || "Explore";

  return (
    <section className="theme-light px-4 py-16 sm:px-6 sm:py-[80px] lg:px-10 lg:py-[120px]">
      <div className="mx-auto max-w-[1400px]">
        {(eyebrow || heading || subheading) && (
          <div className="mb-14 text-center">
            {eyebrow && (
              <Reveal>
                <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--accent)]">{eyebrow}</p>
              </Reveal>
            )}
            {heading && (
              <SplitReveal as="h2" delay={0.05} className="font-display h-page mt-3">
                {heading}
              </SplitReveal>
            )}
            {subheading && (
              <Reveal delay={0.1}>
                <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[color:var(--muted)]">
                  {subheading}
                </p>
              </Reveal>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
          {cols.map((col, ci) => (
            <div key={col._key ?? ci}>
              {col.categoryLabel && (
                <Reveal className="mb-8 flex items-center gap-3 border-b border-[color:var(--line)] pb-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.25em]">{col.categoryLabel}</span>
                </Reveal>
              )}
              <div className="grid grid-cols-2 gap-6">
                {(col.cards ?? []).map((card, i) => (
                  <Reveal as="article" key={card._key ?? i} className="group">
                    <Link href={card.href || "#"} className="block">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-[color:var(--bg-alt)]">
                        {card.image && (
                          <Image
                            src={card.image}
                            alt={card.title ?? ""}
                            fill
                            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, (min-width: 480px) 50vw, 100vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        )}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      </div>
                      <div className="mt-4">
                        {card.location && (
                          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">{card.location}</p>
                        )}
                        {card.title && (
                          <h3 className="mt-2 font-display text-2xl transition-colors group-hover:text-[color:var(--accent)]">
                            {card.title}
                          </h3>
                        )}
                        {card.tagline && (
                          <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)] line-clamp-2">{card.tagline}</p>
                        )}
                        <span className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[color:var(--accent)]">
                          {explore}
                          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-3 w-3">
                            <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
