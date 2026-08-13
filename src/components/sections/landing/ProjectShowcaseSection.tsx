import Image from "@/components/Image";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import CircleButton from "@/components/CircleButton";

type Card = {
  _key?: string;
  image?: string | null;
  title?: string;
  description?: string;
  location?: string;
  builtForm?: string;
  tags?: string[];
  linkedSlug?: string | null;
};

interface Props {
  eyebrow?: string;
  heading?: string;
  cards?: Card[];
  viewLabel?: string;
  enquireLabel?: string;
}

/* Alternating project detail cards — image + Location/Built-Form spec table +
   highlight tags + View/Enquire CTAs. Each card's content is authored
   independently per landing page (not pulled from the shared `project` docs),
   since the same project reads differently on every SEO page. */
export default function ProjectShowcaseSection({
  eyebrow,
  heading,
  cards,
  viewLabel,
  enquireLabel,
}: Props) {
  const list = (cards ?? []).filter((c) => c.title);
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
          {list.map((c, i) => {
            const href = c.linkedSlug ? `/projects/${c.linkedSlug}` : undefined;
            const tags = (c.tags ?? []).filter(Boolean).slice(0, 4);

            return (
              <article
                key={c._key ?? i}
                className="grid grid-cols-12 items-center gap-y-8 lg:gap-12"
              >
                <div className={`col-span-12 lg:col-span-6 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <Reveal className="relative aspect-[4/3] overflow-hidden rounded-md bg-[color:var(--bg-alt)]">
                    {c.image && (
                      <Image
                        src={c.image}
                        alt={c.title ?? ""}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover"
                      />
                    )}
                  </Reveal>
                </div>

                <div className={`col-span-12 lg:col-span-6 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <SplitReveal as="h3" className="font-display h-sub">
                    {c.title ?? ""}
                  </SplitReveal>

                  {c.description && (
                    <Reveal delay={0.15} className="mt-5 text-sm leading-relaxed text-[color:var(--muted)]">
                      {c.description}
                    </Reveal>
                  )}

                  {(c.location || c.builtForm) && (
                    <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-[color:var(--line)] py-6">
                      {c.location && (
                        <Reveal delay={0.25}>
                          <div className="text-[0.625rem] uppercase tracking-[0.2em] text-[color:var(--muted)]">
                            Location
                          </div>
                          <div className="mt-1 text-sm">{c.location}</div>
                        </Reveal>
                      )}
                      {c.builtForm && (
                        <Reveal delay={0.3}>
                          <div className="text-[0.625rem] uppercase tracking-[0.2em] text-[color:var(--muted)]">
                            Built Form
                          </div>
                          <div className="mt-1 text-sm">{c.builtForm}</div>
                        </Reveal>
                      )}
                    </div>
                  )}

                  {tags.length > 0 && (
                    <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[color:var(--muted)]">
                      {tags.map((t) => (
                        <li key={t} className="flex items-center gap-2">
                          <span className="inline-block h-1 w-1 rounded-full bg-[color:var(--accent)]" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}

                  <Reveal delay={0.4} className="mt-8 flex gap-3">
                    {href ? (
                      <>
                        <CircleButton href={href} size="sm" variant="filled">
                          {view}
                        </CircleButton>
                        <CircleButton href={`${href}#enquiry`} size="sm" variant="outline">
                          {enquire}
                        </CircleButton>
                      </>
                    ) : (
                      <CircleButton href="/contact" size="sm" variant="filled">
                        {enquire}
                      </CircleButton>
                    )}
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
