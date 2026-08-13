import type { PortableTextBlock } from "@/lib/portableText";
import { renderPortableText } from "@/lib/portableText";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";

interface Props {
  eyebrow?: string;
  heading?: string;
  body?: PortableTextBlock[];
}

/* Generic rich-text section — eyebrow + heading + Portable Text body.
   Used by seoLandingPage's richTextBlock for editorial copy sections. */
export default function RichTextSection({ eyebrow, heading, body }: Props) {
  if (!heading && !body?.length) return null;
  return (
    <section className="px-4 py-10 sm:px-6 sm:py-[50px] lg:px-10 lg:py-[100px]">
      <div className="mx-auto max-w-3xl">
        {eyebrow && (
          <Reveal className="eyebrow mb-4 flex items-center font-script text-2xl text-[color:var(--accent)]">
            <span>{eyebrow}</span>
          </Reveal>
        )}
        {heading && (
          <SplitReveal as="h2" className="font-display h-sub">
            {heading}
          </SplitReveal>
        )}
        {body && body.length > 0 && (
          <Reveal delay={0.15} className="mt-6 text-base leading-relaxed text-[color:var(--muted)]">
            {renderPortableText(body)}
          </Reveal>
        )}
      </div>
    </section>
  );
}
