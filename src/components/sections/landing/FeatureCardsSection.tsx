import Image from "@/components/Image";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import CircleButton from "@/components/CircleButton";

type Card = {
  _key?: string;
  image?: string | null;
  title?: string;
  description?: string;
};

interface Props {
  eyebrow?: string;
  heading?: string;
  cards?: Card[];
  enquireLabel?: string;
}

/* Alternating image + heading + paragraph cards — each card is an editorial
   section rendered visually as a card, authored independently per landing
   page (not tied to the shared `project` docs). */
export default function FeatureCardsSection({
  eyebrow,
  heading,
  cards,
  enquireLabel,
}: Props) {
  const list = (cards ?? []).filter((c) => c.title);
  if (list.length === 0) return null;
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
          {list.map((c, i) => (
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

                <Reveal delay={0.4} className="mt-8">
                  <CircleButton href="/contact" size="sm" variant="filled">
                    {enquire}
                  </CircleButton>
                </Reveal>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
