import Marquee from "@/components/motion/Marquee";

const items = [
  { v: "10+", k: "Years of experience" },
  { v: "7", k: "Projects delivered" },
  { v: "500+", k: "Happy families" },
  { v: "4", k: "Unique developments" },
  { v: "3", k: "Property types" },
  { v: "1", k: "Prime location Gurugram" },
];

export default function StatsMarquee() {
  return (
    <section className="theme-green relative border-y border-[color:var(--line)] bg-[color:var(--bg)] py-10 lg:py-12">
      {/* Top + bottom hairline accents in the section accent (gold on green) */}
      <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--accent)] to-transparent" />
      <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[color:var(--accent)] to-transparent" />

      <Marquee speed={50} className="font-display">
        {items.map((it) => (
          <div
            key={it.k}
            className="flex items-baseline gap-4 whitespace-nowrap"
          >
            <span className="text-3xl tracking-tight text-[color:var(--accent)] lg:text-5xl">{it.v}</span>
            <span className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
              {it.k}
            </span>
            {/* Divider in the section accent — gold on the green dark surface */}
            <span className="mx-8 font-display text-2xl text-[color:var(--accent)] lg:text-3xl">/</span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
