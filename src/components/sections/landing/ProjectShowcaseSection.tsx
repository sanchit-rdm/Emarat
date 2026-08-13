import Image from "@/components/Image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import CircleButton from "@/components/CircleButton";

type Stat = { _key?: string; value?: string; label?: string };

type Project = {
  slug?: string;
  no?: string;
  title?: string;
  location?: string;
  status?: string;
  config?: string;
  size?: string;
  heroImage?: string | null;
  stats?: Stat[];
};

interface Props {
  eyebrow?: string;
  heading?: string;
  projects?: Project[];
  viewLabel?: string;
  enquireLabel?: string;
}

/* Alternating project detail cards — image + Location/Built-Form spec table +
   highlight tags + View/Enquire CTAs. Mirrors the /projects listing page cards. */
export default function ProjectShowcaseSection({
  eyebrow,
  heading,
  projects,
  viewLabel,
  enquireLabel,
}: Props) {
  const list = (projects ?? []).filter((p) => p.slug);
  if (list.length === 0) return null;
  const view = viewLabel?.trim() || "View Project";
  const enquire = enquireLabel?.trim() || "Enquire";

  return (
    <section className="theme-light px-4 py-10 sm:px-6 sm:py-[50px] lg:px-10 lg:py-[100px]">
      <div className="mx-auto max-w-[1400px]">
        {(eyebrow || heading) && (
          <div className="mb-12 lg:mb-16">
            {eyebrow && (
              <Reveal className="eyebrow mb-4 flex items-center font-script text-2xl text-[color:var(--accent)]">
                <span>{eyebrow}</span>
              </Reveal>
            )}
            {heading && (
              <SplitReveal as="h2" className="font-display h-section">
                {heading}
              </SplitReveal>
            )}
          </div>
        )}

        <div className="space-y-24 lg:space-y-32">
          {list.map((p, i) => {
            const highlights = (p.stats ?? [])
              .map((s) => [s.value, s.label].filter(Boolean).join(" "))
              .filter(Boolean)
              .slice(0, 3);

            return (
              <article
                key={p.slug}
                className="grid grid-cols-12 items-center gap-y-8 lg:gap-12"
              >
                <div className={`col-span-12 lg:col-span-7 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <Link href={`/projects/${p.slug}`} className="group block">
                    <Reveal className="relative aspect-[4/3] overflow-hidden rounded-md bg-[color:var(--bg-alt)]">
                      {p.heroImage && (
                        <Image
                          src={p.heroImage}
                          alt={p.title ?? ""}
                          fill
                          sizes="(min-width: 1024px) 55vw, 100vw"
                          className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                        />
                      )}
                    </Reveal>
                  </Link>
                </div>

                <div className={`col-span-12 lg:col-span-5 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <Link href={`/projects/${p.slug}`} className="transition-colors hover:text-[color:var(--accent)]">
                    <SplitReveal as="h3" className="font-display h-sub">
                      {p.title ?? ""}
                    </SplitReveal>
                  </Link>

                  <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-[color:var(--line)] py-6">
                    <Reveal delay={0.25}>
                      <div className="text-[0.625rem] uppercase tracking-[0.2em] text-[color:var(--muted)]">
                        Location
                      </div>
                      <div className="mt-1 text-sm">{p.location}</div>
                    </Reveal>
                    <Reveal delay={0.3}>
                      <div className="text-[0.625rem] uppercase tracking-[0.2em] text-[color:var(--muted)]">
                        Built Form
                      </div>
                      <div className="mt-1 text-sm">{p.size || p.config}</div>
                    </Reveal>
                  </div>

                  {highlights.length > 0 && (
                    <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[color:var(--muted)]">
                      {highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2">
                          <span className="inline-block h-1 w-1 rounded-full bg-[color:var(--accent)]" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}

                  <Reveal delay={0.4} className="mt-8 flex gap-3">
                    <CircleButton href={`/projects/${p.slug}`} size="sm" variant="filled">
                      {view}
                    </CircleButton>
                    <CircleButton href={`/projects/${p.slug}#enquiry`} size="sm" variant="outline">
                      {enquire}
                    </CircleButton>
                  </Reveal>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
