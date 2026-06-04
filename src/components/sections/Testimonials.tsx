import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";

const DEFAULT_TESTIMONIALS = [
  { quote: "When we first visited the property, the quality of construction immediately stood out. Even after moving in, we've continued to appreciate the attention given to the details and finishing throughout the home.", name: "Rohan Malhotra", no: "01" },
  { quote: "One of the biggest reasons we chose this home was the location. Having easy access to major roads, schools and everyday conveniences has made life much easier for our family.", name: "Neha Verma", no: "02" },
  { quote: "The layout of the home works really well for our family. The rooms are well planned, the spaces feel open, and it simply feels easy to live in.", name: "Amit Khanna", no: "03" },
];

interface TestimonialsData {
  eyebrow?: string;
  heading1?: string;
  heading2?: string;
  items?: Array<{ _key?: string; quote: string; name: string }>;
}
interface Props { data?: TestimonialsData }

export default function Testimonials({ data }: Props) {
  const eyebrow = data?.eyebrow ?? "What Residents Say";
  const heading1 = data?.heading1 ?? "More Than A Home,";
  const heading2 = data?.heading2 ?? "A Place To Belong.";
  const testimonials = data?.items?.length
    ? data.items.map((t, i) => ({ _key: t._key, quote: t.quote, name: t.name, no: String(i + 1).padStart(2, "0") }))
    : DEFAULT_TESTIMONIALS;
  return (
    <section className="px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1440px]">
        <Reveal as="p" className="eyebrow mb-8 text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">
          <span>{eyebrow}</span>
        </Reveal>

        <SplitReveal as="h2" className="font-display h-section max-w-2xl">
          {heading1}
        </SplitReveal>
        <SplitReveal as="h2" delay={0.08} className="font-display h-section text-[color:var(--muted)]">
          {heading2}
        </SplitReveal>

        <div className="mt-16 grid grid-cols-1 gap-px border border-[color:var(--line)] md:grid-cols-3 lg:mt-24">
          {testimonials.map((t, i) => (

            <Reveal
              key={t.name}
              delay={i * 0.1}
              className="group relative flex flex-col justify-between gap-10 border-[color:var(--line)] bg-[color:var(--bg)] p-8 transition-colors hover:bg-[color:var(--bg-alt)]/60 lg:p-10 [&:not(:last-child)]:border-r"
            >
              {/* Opening mark */}
              <span
                aria-hidden
                className="font-display text-6xl leading-none text-[color:var(--accent)] opacity-30 transition-opacity duration-500 group-hover:opacity-70"
              >
                &ldquo;
              </span>

              <blockquote className="-mt-6 flex-1 text-base leading-relaxed text-[color:var(--muted)] lg:text-lg">
                {t.quote}
              </blockquote>

              <div className="flex items-end justify-between border-t border-[color:var(--line)] pt-6">
                <div>
                  <div className="font-display-alt text-xl tracking-tight">{t.name}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">
                    Emarat Resident
                  </div>
                </div>
                <span className="font-mono text-xs text-[color:var(--accent)] opacity-50">{t.no}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
