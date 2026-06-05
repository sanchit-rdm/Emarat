"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import RevealImage from "@/components/motion/RevealImage";
import CircleButton from "@/components/CircleButton";

/**
 * Design Option 2 — "The Residences" feature slider.
 *
 * One residence at a time on a brand-green stage: a large crossfading image
 * paired with its details and a numbered indicator, advanced with arrows or
 * the track below. Mirrors the reference design's full-width infrastructure
 * slider. Content matches the primary page's Projects section.
 */

type Residence = {
  no: string;
  title: string;
  place: string;
  status: string;
  type: string;
  img: string;
  href: string;
};

const RESIDENCES: Residence[] = [
  {
    no: "01",
    title: "C2 at DLF Garden City",
    place: "Sector 93, Gurugram",
    status: "Now Selling",
    type: "5 BHK Independent Floors",
    img: "/images/C-2/building.jpg",
    href: "/projects/c2",
  },
  {
    no: "02",
    title: "C5 at DLF Garden City",
    place: "Sector 93, Gurugram",
    status: "Now Selling",
    type: "Independent Floors",
    img: "/images/C-5/building.jpg",
    href: "/projects/c5",
  },
  {
    no: "03",
    title: "E11 at DLF Garden City",
    place: "Sector 93, Gurugram",
    status: "New Launch",
    type: "Three-Side Open Floors",
    img: "/images/E11/building.jpg",
    href: "/projects/e11",
  },
  {
    no: "04",
    title: "EA 04 at Alameda",
    place: "Sector 73, Gurugram",
    status: "Now Selling",
    type: "Boutique Private Floors",
    img: "/images/EA4/building.jpg",
    href: "/projects/ea04",
  },
];

export default function ResidencesV2() {
  const [active, setActive] = useState(0);
  const count = RESIDENCES.length;
  const go = (dir: number) => setActive((i) => (i + dir + count) % count);
  const current = RESIDENCES[active];

  return (
    <section id="residences" className="theme-green px-6 py-24 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 lg:mb-16">
          <div>
            <Reveal className="eyebrow mb-4 flex items-center font-script text-2xl text-[color:var(--accent)]">
              <span>The Residences</span>
            </Reveal>
            <SplitReveal as="h2" className="font-display h-section">
              Find your
            </SplitReveal>
            <SplitReveal as="h2" delay={0.1} className="font-display h-section text-[color:var(--accent)]">
              dream home.
            </SplitReveal>
          </div>
          <Reveal delay={0.2} className="self-end">
            <Link href="/projects" className="group inline-flex items-center gap-3 text-sm">
              <span className="border-b border-[color:var(--line)] pb-1 transition-colors group-hover:border-[color:var(--fg)]">
                All residences
              </span>
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>

        {/* Slider */}
        <div className="grid grid-cols-12 items-center gap-8 lg:gap-12">
          {/* Image stage — clip-reveal + parallax, crossfading per residence */}
          <div className="col-span-12 lg:col-span-7">
            <RevealImage
              className="relative aspect-[4/3] w-full rounded-lg lg:aspect-[16/11]"
              parallax={6}
              overlay={
                <div className="pointer-events-none absolute left-5 top-5">
                  <span className="rounded-full bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-white backdrop-blur-sm">
                    {current.status}
                  </span>
                </div>
              }
            >
              {RESIDENCES.map((r, i) => (
                <Image
                  key={r.no}
                  src={r.img}
                  alt={r.title}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  priority={i === 0}
                  className="object-cover transition-opacity duration-700 ease-out"
                  style={{ opacity: i === active ? 1 : 0 }}
                />
              ))}
            </RevealImage>
          </div>

          {/* Detail panel */}
          <div className="col-span-12 lg:col-span-5">
            <div key={active} className="places-fade">
              <div className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--accent)]">
                {current.status}
              </div>
              <h3 className="mt-4 font-display text-4xl leading-tight lg:text-5xl">
                {current.title}
              </h3>

              <dl className="mt-8 space-y-4">
                <div className="flex items-center justify-between border-t border-[color:var(--line)] pt-4">
                  <dt className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">Location</dt>
                  <dd className="text-sm">{current.place}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-[color:var(--line)] pt-4">
                  <dt className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">Configuration</dt>
                  <dd className="text-sm">{current.type}</dd>
                </div>
              </dl>

              <div className="mt-10">
                <CircleButton href={current.href} variant="filled">
                  View Residence
                </CircleButton>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-12 flex items-center gap-4">
              <button
                type="button"
                aria-label="Previous residence"
                onClick={() => go(-1)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--line)] transition-colors hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
              >
                <span aria-hidden>‹</span>
              </button>
              <button
                type="button"
                aria-label="Next residence"
                onClick={() => go(1)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--line)] transition-colors hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
              >
                <span aria-hidden>›</span>
              </button>
            </div>
          </div>
        </div>

        {/* Track */}
        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-md sm:grid-cols-4">
          {RESIDENCES.map((r, i) => (
            <button
              key={r.no}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              className={`flex flex-col items-start gap-1 px-4 py-5 text-left transition-colors ${
                i === active
                  ? "bg-[color:var(--accent)] text-[color:var(--bg)]"
                  : "bg-[color:var(--bg-alt)] text-[color:var(--fg)] hover:bg-[color:var(--bg-alt)]/70"
              }`}
            >
              <span className="font-display-alt text-base leading-tight">{r.title}</span>
              <span className="text-[10px] uppercase tracking-[0.18em] opacity-60">{r.place}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
