import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";

const projects = [
  {
    no: "01",
    title: "C2 at DLF Garden City",
    place: "Sector 93, Gurugram",
    year: "2024",
    type: "3 & 4 BHK Luxury Apartments",
    img: "/images/alameda-bedroom-1.webp",
    href: "/projects/c2",
  },
  {
    no: "02",
    title: "C5 at DLF Garden City",
    place: "Sector 93, Gurugram",
    year: "2023",
    type: "Premium Residences",
    img: "/images/alameda-bedroom-2.webp",
    href: "/projects/c5",
  },
  {
    no: "03",
    title: "E11 at DLF Garden City",
    place: "Sector 93, Gurugram",
    year: "2023",
    type: "Luxury Flats & Penthouses",
    img: "/images/alameda-bedroom-3.webp",
    href: "/projects/e11",
  },
  {
    no: "04",
    title: "EA 04 at Almeda",
    place: "Gurugram, Haryana",
    year: "2022",
    type: "Commercial & Retail Spaces",
    img: "/images/alameda-bathroom.webp",
    href: "/projects/ea04",
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
              <Reveal as="div" delay={i * 0.04}>
                <Link
                  href={p.href}
                  className="grid cursor-pointer grid-cols-12 items-center gap-4 py-8 transition-colors hover:bg-[color:var(--bg-alt)]/40 lg:py-10"
                >
                  <span className="col-span-2 font-mono text-xs text-[color:var(--muted)] lg:col-span-1">
                    {p.no}
                  </span>
                  <span className="col-span-10 font-display-alt text-2xl transition-transform duration-500 group-hover:translate-x-2 lg:col-span-4 lg:text-4xl">
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
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
