import Marquee from "@/components/motion/Marquee";

const items = [
  { v: "17", k: "Years in practice" },
  { v: "42", k: "Buildings delivered" },
  { v: "9", k: "Cities" },
  { v: "1.6M", k: "Sqm under design" },
  { v: "11", k: "Design awards" },
  { v: "28", k: "Studio members" },
];

export default function StatsMarquee() {
  return (
    <section className="border-y border-[color:var(--line)] bg-[color:var(--bg-alt)] py-10 lg:py-12">
      <Marquee speed={55} className="font-display">
        {items.map((it) => (
          <div
            key={it.k}
            className="flex items-baseline gap-4 whitespace-nowrap"
          >
            <span className="text-3xl tracking-tight lg:text-5xl">{it.v}</span>
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
