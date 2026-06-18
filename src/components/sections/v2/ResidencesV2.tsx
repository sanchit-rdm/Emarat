"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import RevealImage from "@/components/motion/RevealImage";
import CircleButton from "@/components/CircleButton";

type Feature = { icon: React.ReactNode; label: string };

type Residence = {
  no: string;
  title: string;
  place: string;
  status: string;
  type: string;
  img: string;
  href: string;
  features: Feature[];
};

/* ── SVG icon helpers ─────────────────────────────────────── */
const Icons = {
  floors: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
    </svg>
  ),
  expand: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  ),
  ac: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <rect x="2" y="6" width="20" height="8" rx="2" />
      <path d="M7 18h.01M12 18h.01M17 18h.01M12 14v4" />
    </svg>
  ),
  healthcare: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <path d="M9 22V12h6v10M12 8v4M10 10h4" />
    </svg>
  ),
  garden: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M12 22V12M12 12C12 7 7 3 2 4c1 5 5 8 10 8zM12 12c0-5 5-9 10-8-1 5-5 8-10 8z" />
    </svg>
  ),
  marble: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  terrace: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M3 17l4-8 4 4 3-5 4 9M3 21h18" />
    </svg>
  ),
  openFloors: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  ),
  kitchen: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6h3.5M21 22v-7" />
    </svg>
  ),
  gold: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 16l-4.9 2.2.9-5.5L4 8.8l5.5-.8z" />
    </svg>
  ),
  elevator: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path d="M9 8l3-3 3 3M9 16l3 3 3-3" />
    </svg>
  ),
  gate: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  security: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
  concierge: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M18 20V10M12 20V4M6 20v-6" />
      <path d="M2 20h20" />
      <circle cx="12" cy="2" r="1" />
    </svg>
  ),
  balcony: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 9v12M15 9v12" />
      <path d="M9 6a3 3 0 0 1 6 0" />
    </svg>
  ),
  doorbell: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <circle cx="12" cy="10" r="3" />
      <path d="M12 15v2" />
      <circle cx="12" cy="18" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  vastu: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 9V7M12 17v-2M9 12H7M17 12h-2" />
    </svg>
  ),
  ev: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <rect x="5" y="2" width="14" height="16" rx="2" />
      <path d="M9 18v4M15 18v4M12 6v6M9 9h6" />
      <path d="M16 18h2a1 1 0 0 0 1-1v-1" />
    </svg>
  ),
};

const RESIDENCES: Residence[] = [
  {
    no: "01",
    title: "C2 at DLF Garden City",
    place: "Sector 93, Gurugram",
    status: "Now Selling",
    type: "S + 4",
    img: "/images/C-2/building.jpg",
    href: "/projects/c2",
    features: [
      { icon: Icons.floors, label: "5 BHK Independent Floors" },
      { icon: Icons.expand, label: "Large Open Spaces" },
      { icon: Icons.ac, label: "VRV/VRF Air Conditioning" },
      { icon: Icons.healthcare, label: "Healthcare Centre" },
    ],
  },
  {
    no: "02",
    title: "C5 at DLF Garden City",
    place: "Sector 93, Gurugram",
    status: "Now Selling",
    type: "S + 4",
    img: "/images/C-5/building.jpg",
    href: "/projects/c5",
    features: [
      { icon: Icons.kitchen, label: "Modular Kitchen with HOB" },
      { icon: Icons.balcony, label: "Wrap-around Balconies" },
      { icon: Icons.ac, label: "VRV/VRF Air Conditioning" },
      { icon: Icons.doorbell, label: "Video Doorbell" },
    ],
  },
  {
    no: "03",
    title: "E11 at DLF Garden City",
    place: "Sector 93, Gurugram",
    status: "New Launch",
    type: "S + 4",
    img: "/images/E11/building.jpg",
    href: "/projects/e11",
    features: [
      { icon: Icons.vastu, label: "Vastu Compliant" },
      { icon: Icons.ev, label: "Electric Car Charging Provision" },
      { icon: Icons.kitchen, label: "Modular Kitchen with HOB" },
      { icon: Icons.gate, label: "Gated Community" },
    ],
  },
  {
    no: "04",
    title: "EA 04 at Alameda",
    place: "Sector 73, Gurugram",
    status: "Now Selling",
    type: "S + 3",
    img: "/images/EA4/building.jpg",
    href: "/projects/ea04",
    features: [
      { icon: Icons.elevator, label: "Dual High-Speed Elevators" },
      { icon: Icons.security, label: "Security Monitoring" },
      { icon: Icons.ac, label: "VRV/VRF Air Conditioning" },
      { icon: Icons.concierge, label: "Arrival Experience" },
    ],
  },
];

type SanityProject = {
  slug?: string;
  no?: string;
  title?: string;
  location?: string;
  status?: string;
  config?: string;
  size?: string;
  heroImage?: string | null;
};

interface ResidencesLabels {
  eyebrow?: string;
  heading1?: string;
  heading2?: string;
  allLabel?: string;
  allHref?: string;
  locationLabel?: string;
  configLabel?: string;
  viewLabel?: string;
}
interface Props { projects?: SanityProject[]; labels?: ResidencesLabels }

function toResidences(projects?: SanityProject[]): Residence[] {
  const mapped = (projects ?? [])
    .filter((p) => p.heroImage)
    .map((p, i) => {
      const fallback = RESIDENCES.find((r) => r.href === `/projects/${p.slug}`) ?? RESIDENCES[i % RESIDENCES.length];
      return {
        no: p.no ?? String(i + 1).padStart(2, "0"),
        title: p.title ?? "",
        place: p.location ?? "",
        status: p.status ?? "",
        type: p.size ?? p.config ?? "",
        img: p.heroImage as string,
        href: p.slug ? `/projects/${p.slug}` : "/projects",
        features: fallback.features,
      };
    });
  return mapped.length ? mapped : RESIDENCES;
}

export default function ResidencesV2({ projects, labels }: Props) {
  const list = toResidences(projects);
  const eyebrow = labels?.eyebrow?.trim() || "The Residences";
  const heading1 = labels?.heading1?.trim() || "Find your";
  const heading2 = labels?.heading2?.trim() || "dream home.";
  const allLabel = labels?.allLabel?.trim() || "All residences";
  const allHref = labels?.allHref?.trim() || "/projects";
  const locationLabel = labels?.locationLabel?.trim() || "Location";
  const configLabel = labels?.configLabel?.trim() || "Built Form";
  const viewLabel = labels?.viewLabel?.trim() || "View Residence";
  const [active, setActive] = useState(0);
  const count = list.length;
  const go = (dir: number) => setActive((i) => (i + dir + count) % count);
  const current = list[active];

  return (
    <section id="residences" className="theme-light px-4 py-10 sm:px-6 sm:py-[50px] lg:px-10 lg:py-[100px]">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 lg:mb-16">
          <div>
            <Reveal className="eyebrow mb-4 flex items-center font-script text-2xl text-[color:var(--accent)]">
              <span>{eyebrow}</span>
            </Reveal>
            <Reveal as="h2" className="font-display h-section whitespace-nowrap">
              {heading1} <span className="text-[color:var(--accent)]">{heading2}</span>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="self-end">
            <Link href={allHref} className="group inline-flex items-center gap-3 text-sm">
              <span className="border-b border-[color:var(--line)] pb-1 transition-colors group-hover:border-[color:var(--fg)]">
                {allLabel}
              </span>
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>

        {/* Slider */}
        <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center gap-8 lg:flex-row lg:gap-12">
          {/* Image stage */}
          <div className="w-full shrink-0 lg:w-[600px]">
            <RevealImage className="relative aspect-square w-full rounded-lg" parallax={0}>
              {list.map((r, i) => (
                <Image
                  key={r.no}
                  src={r.img}
                  alt={r.title}
                  fill
                  sizes="600px"
                  priority={i === 0}
                  className="object-cover transition-opacity duration-700 ease-out"
                  style={{ opacity: i === active ? 1 : 0 }}
                />
              ))}
            </RevealImage>
          </div>

          {/* Detail panel */}
          <div className="w-full lg:flex-1">
            <div key={active} className="places-fade">
              <h3 className="font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">
                {current.title}
              </h3>

              <dl className="mt-8 space-y-4">
                <div className="flex items-center justify-between border-t border-[color:var(--line)] pt-4">
                  <dt className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">{locationLabel}</dt>
                  <dd className="text-sm">{current.place}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-[color:var(--line)] pt-4">
                  <dt className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">{configLabel}</dt>
                  <dd className="text-sm">{current.type}</dd>
                </div>
              </dl>

              {/* Feature icon boxes */}
              <div className="mt-8 grid grid-cols-4 gap-3">
                {current.features.map((f, i) => (
                  <div
                    key={i}
                    className="group flex flex-col items-center gap-2 rounded-md border border-[color:var(--line)] p-3 text-center transition-colors duration-300 hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
                  >
                    <span className="text-[color:var(--muted)] transition-colors duration-300 group-hover:text-[color:var(--accent))]">
                      {f.icon}
                    </span>
                    <span className="text-[0.625rem] uppercase leading-tight tracking-[0.12em] text-[color:var(--muted)] transition-colors duration-300 group-hover:text-[color:var(--accent)]">
                      {f.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <CircleButton href={current.href} variant="filled">
                  {viewLabel}
                </CircleButton>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-10 flex items-center gap-4">
              <button
                type="button"
                aria-label="Previous residence"
                onClick={() => go(-1)}
                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-[color:var(--line)] transition-colors hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
              >
                <span aria-hidden>‹</span>
              </button>
              <button
                type="button"
                aria-label="Next residence"
                onClick={() => go(1)}
                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-[color:var(--line)] transition-colors hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
              >
                <span aria-hidden>›</span>
              </button>
            </div>
          </div>
        </div>

        {/* Track */}
        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-md sm:grid-cols-4">
          {list.map((r, i) => (
            <button
              key={r.no}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              className={`flex cursor-pointer flex-col items-start gap-1 px-4 py-5 text-left transition-colors ${
                i === active
                  ? "bg-[color:var(--accent)] text-[color:var(--bg)]"
                  : "bg-[color:var(--bg-alt)] text-[color:var(--fg)] hover:bg-[color:var(--bg-alt)]/70"
              }`}
            >
              <span className="font-display-alt text-base leading-tight">{r.title}</span>
              <span className="text-[0.625rem] uppercase tracking-[0.18em] opacity-60">{r.place}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
