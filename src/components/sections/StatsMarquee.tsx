import Marquee from "@/components/motion/Marquee";

const items = [
  { v: "10+", k: "Years of experience" },
  { v: "7", k: "Projects delivered" },
  { v: "500+", k: "Happy families" },
  { v: "4", k: "Unique developments" },
  { v: "3", k: "Property types" },
  { v: "1", k: "Prime location — Gurugram" },
];

export default function StatsMarquee() {
  return (
    <section className="border-y border-[color:var(--line)] bg-[color:var(--bg-alt)] py-10 lg:py-12">
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
            <span className="mx-8 text-[color:var(--muted)]">/</span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
