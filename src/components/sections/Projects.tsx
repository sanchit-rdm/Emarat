import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";

const projects = [
  {
    no: "01",
    title: "C2 at DLF Garden City",
    place: "Sector 93, Gurugram",
    year: "2024",
    type: "3 & 4 BHK Luxury Apartments",
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80&auto=format&fit=crop",
  },
  {
    no: "02",
    title: "C5 at DLF Garden City",
    place: "Sector 93, Gurugram",
    year: "2023",
    type: "Premium Residences",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80&auto=format&fit=crop",
  },
  {
    no: "03",
    title: "E11 at DLF Garden City",
    place: "Sector 93, Gurugram",
    year: "2023",
    type: "Luxury Flats & Penthouses",
    img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900&q=80&auto=format&fit=crop",
  },
  {
    no: "04",
    title: "EA 04 at Almeda",
    place: "Gurugram, Haryana",
    year: "2022",
    type: "Commercial & Retail Spaces",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80&auto=format&fit=crop",
  },
  {
    no: "05",
    title: "DLF Garden City Plots",
    place: "Sector 93, Gurugram",
    year: "2022",
    type: "Residential Plots",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=80&auto=format&fit=crop",
  },
  {
    no: "06",
    title: "DLF Independent Floors",
    place: "Phase 3, Gurugram",
    year: "2021",
    type: "Independent Builder Floors",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80&auto=format&fit=crop",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="px-6 py-28 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <SplitReveal
              as="h2"
              className="font-display h-section"
            >
              Residences built
            </SplitReveal>
            <SplitReveal
              as="h2"
              delay={0.1}
              className="font-display h-section text-[color:var(--muted)]"
            >
              to be lived in.
            </SplitReveal>
          </div>
          <Reveal delay={0.2} className="self-end">
            <a href="/projects" className="group inline-flex items-center gap-3 text-sm">
              <span className="border-b border-[color:var(--line)] pb-1 transition-colors group-hover:border-[color:var(--fg)]">
                All projects
              </span>
              <span aria-hidden>→</span>
            </a>
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
                delay={i * 0.04}
                className="grid cursor-pointer grid-cols-12 items-center gap-4 py-8 transition-colors hover:bg-[color:var(--bg-alt)]/40 lg:py-10"
              >
                <span className="col-span-2 font-mono text-xs text-[color:var(--muted)] lg:col-span-1">
                  {p.no}
                </span>
                <span className="col-span-10 font-display text-2xl tracking-tight transition-transform duration-500 group-hover:translate-x-2 lg:col-span-4 lg:text-4xl">
                  {p.title}
                </span>
                <span className="hidden text-sm text-[color:var(--muted)] lg:col-span-3 lg:block">
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
                    style={{ filter: "sepia(0.15) saturate(0.9) brightness(0.9)" }}
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
