import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";

const projects = [
  {
    no: "01",
    title: "Mira Residences",
    place: "Dubai, UAE",
    year: "2025",
    type: "Residential, 84 units",
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80&auto=format&fit=crop",
  },
  {
    no: "02",
    title: "Halqa Pavilion",
    place: "Muscat, Oman",
    year: "2024",
    type: "Cultural pavilion",
    img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=900&q=80&auto=format&fit=crop",
  },
  {
    no: "03",
    title: "Bayt Al Noor",
    place: "Riyadh, KSA",
    year: "2024",
    type: "Mixed-use tower",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80&auto=format&fit=crop",
  },
  {
    no: "04",
    title: "Olive Court",
    place: "Lisbon, Portugal",
    year: "2023",
    type: "Adaptive reuse, 22 homes",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=80&auto=format&fit=crop",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="px-6 py-28 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal as="div" className="mb-4 text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
              <span>(01) Selected works</span>
            </Reveal>
            <SplitReveal
              as="h2"
              className="font-display text-[clamp(2rem,6vw,5.5rem)] leading-[1] tracking-tight"
            >
              A quiet portfolio,
            </SplitReveal>
            <SplitReveal
              as="h2"
              delay={0.1}
              className="font-display text-[clamp(2rem,6vw,5.5rem)] leading-[1] tracking-tight text-[color:var(--muted)]"
            >
              built to be lived in.
            </SplitReveal>
          </div>
          <Reveal as="a" delay={0.2} className="group inline-flex items-center gap-3 self-end text-sm">
            <span className="border-b border-[color:var(--line)] pb-1 transition-colors group-hover:border-[color:var(--fg)]">
              All projects
            </span>
            <span aria-hidden>→</span>
          </Reveal>
        </div>

        <ul className="flex flex-col">
          {projects.map((p, i) => (
            <li
              key={p.no}
              className="group relative border-t border-[color:var(--line)] last:border-b"
            >
              <Reveal
                as="a"
                delay={i * 0.05}
                className="grid cursor-pointer grid-cols-12 items-center gap-4 py-8 transition-colors hover:bg-[color:var(--bg-alt)]/40 lg:py-12"
              >
                <span className="col-span-2 font-mono text-xs text-[color:var(--muted)] lg:col-span-1">
                  {p.no}
                </span>
                <span className="col-span-10 font-display text-2xl tracking-tight transition-transform duration-500 group-hover:translate-x-2 lg:col-span-5 lg:text-4xl">
                  {p.title}
                </span>
                <span className="hidden text-sm text-[color:var(--muted)] lg:col-span-2 lg:block">
                  {p.place}
                </span>
                <span className="hidden text-sm text-[color:var(--muted)] lg:col-span-3 lg:block">
                  {p.type}
                </span>
                <span className="hidden text-right text-sm text-[color:var(--muted)] lg:col-span-1 lg:block">
                  {p.year}
                </span>

                <div
                  className="pointer-events-none absolute right-6 top-1/2 hidden h-44 w-64 -translate-y-1/2 overflow-hidden rounded-md opacity-0 transition-opacity duration-500 group-hover:opacity-100 lg:block"
                  aria-hidden
                >
                  <Image
                    src={p.img}
                    alt=""
                    fill
                    sizes="256px"
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                    style={{ filter: "sepia(0.18) saturate(0.9) brightness(0.92)" }}
                  />
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
