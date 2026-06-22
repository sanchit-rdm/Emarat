"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import { toPlainText, type PortableTextBlock } from "@/lib/portableText";
import { amenityIcons } from "@/components/project/amenityIcons";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/* Location-specific icons (connectivity originals + peaceful-living set) */
const locationOnlyIcons = {
  /* ── connectivity ── */
  connectivity: (
    <svg viewBox="0 0 24 24" {...stroke}><circle cx="12" cy="12" r="2" /><path d="M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7M6 6a9 9 0 0 0 0 12M18 6a9 9 0 0 1 0 12" /></svg>
  ),
  access: (
    <svg viewBox="0 0 24 24" {...stroke}><path d="M5 20l4-16M19 20l-4-16M12 6v1m0 4v1m0 4v1" /></svg>
  ),
  travel: (
    <svg viewBox="0 0 24 24" {...stroke}><path d="M3 13l8-2 4-7 2 1-2 7 6 2v2l-7-1-2 4-2-1 .5-3.5L4 16z" /></svg>
  ),

  /* ── peaceful living ── */
  peaceful: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <circle cx="9" cy="5" r="2" />
      <path d="M9 7l-1 4" />
      <path d="M5 3v11" />
      <path d="M5 11h8" />
      <path d="M13 8v3" />
      <path d="M5 14v4M11 14v4" />
      <path d="M8 11l4 3" />
      <path d="M16 10h4" />
      <path d="M18 10v5" />
      <path d="M16.5 7h2.5l-.5 3h-1.5z" />
    </svg>
  ),
  tree: (
    <svg viewBox="0 0 24 24" {...stroke}><path d="M12 22v-4" /><path d="M7 18l5-13 5 13H7z" /></svg>
  ),
  forest: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M12 22v-3" /><path d="M8 19l4-9 4 9H8z" />
      <path d="M4 22v-2" /><path d="M2 20l2-5 2 5H2z" />
      <path d="M20 22v-2" /><path d="M18 20l2-5 2 5h-4z" />
    </svg>
  ),
  flower: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <circle cx="12" cy="12" r="2" />
      <path d="M12 8V4M15.5 9.5l2.5-2.5M16 12h4M15.5 14.5l2.5 2.5M12 16v4M8.5 14.5l-2.5 2.5M8 12H4M8.5 9.5l-2.5-2.5" />
    </svg>
  ),
  leaf: (
    <svg viewBox="0 0 24 24" {...stroke}><path d="M6 20c0-7 5-13 15-16-5 0-10 2-13 6-2 3-2 7-2 10z" /><path d="M6 20l-3 2" /></svg>
  ),
  mountain: (
    <svg viewBox="0 0 24 24" {...stroke}><path d="M2 21h20M9 21L15 7l6 14M2 21l7-13 5 8" /></svg>
  ),
  sunrise: (
    <svg viewBox="0 0 24 24" {...stroke}><path d="M4 18a8 8 0 0 1 16 0M2 18h20M12 5v3M5 8l2 2M19 8l-2 2" /></svg>
  ),
  sunset: (
    <svg viewBox="0 0 24 24" {...stroke}><path d="M4 20a8 8 0 0 1 16 0M2 20h20M12 7v3M5 10l2 2M19 10l-2 2M3 5l1.5 1M21 5l-1.5 1" /></svg>
  ),
  moon: (
    <svg viewBox="0 0 24 24" {...stroke}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
  ),
  stars: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      <path d="M19 4l.4 1.2H21l-1 .7.4 1.3L19 6.4l-1.2.8.4-1.3-1-.7h1.4z" />
    </svg>
  ),
  bird: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M2 11c2-2 4-2 5 0M9 10c2-2 4-2 5 0M15 8c2-2 4-2 5 0" />
      <path d="M3 16c1.5-1.5 3-1.5 4.5 0M9 15c1.5-1.5 3-1.5 4.5 0" />
    </svg>
  ),
  butterfly: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M12 8v8" />
      <path d="M9 6c-2-1-5-1-4 3 0 2 2 3 4 2M15 6c2-1 5-1 4 3 0 2-2 3-4 2M9 18c-2 1-5 1-4-3 0-2 2-3 4-2M15 18c2 1 5 1 4-3 0-2-2-3-4-2" />
    </svg>
  ),
  river: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M3 8c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
      <path d="M3 14c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
      <path d="M3 20c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
    </svg>
  ),
  breeze: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M3 8h12a3 3 0 0 0 0-6 3 3 0 0 0-3 3" />
      <path d="M3 12h14a3 3 0 0 0 0-6 3 3 0 0 0-3 3" />
      <path d="M3 16h10a3 3 0 0 0 0-6 3 3 0 0 0-3 3" />
    </svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" {...stroke}><path d="M18 18H6a5 5 0 0 1 0-10h.2A6.5 6.5 0 0 1 20 14a4 4 0 0 1-2 4z" /></svg>
  ),
  rain: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M6 13a5 5 0 0 1 0-10h.3A6 6 0 0 1 18 9v1a4 4 0 0 1-1 7" />
      <path d="M9 17l-1 4M12 17v4M15 17l1 4" />
    </svg>
  ),
  hammock: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M4 5v4M20 5v4" />
      <path d="M4 9c1 7 4 9 8 9s7-2 8-9" />
      <circle cx="12" cy="12" r="1.5" />
      <path d="M10 14l-1 3M14 14l1 3" />
    </svg>
  ),
  bench: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M3 12h18M6 12v7M18 12v7" />
      <path d="M4 12V9a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v3" />
    </svg>
  ),
  zen: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <ellipse cx="12" cy="20" rx="6" ry="1.5" />
      <ellipse cx="12" cy="17" rx="4.5" ry="1.5" />
      <ellipse cx="12" cy="14" rx="3" ry="1.5" />
      <ellipse cx="12" cy="11.5" rx="2" ry="1.5" />
    </svg>
  ),
  trail: (
    <svg viewBox="0 0 24 24" {...stroke}><path d="M4 21c0-5 3-8 5-8s3 3 5 3 4-2 5-8" /></svg>
  ),
  picnic: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M4 11h16l-2 10H6z" />
      <path d="M4 11a8 8 0 0 1 16 0" />
      <path d="M9 11V8M15 11V8" />
    </svg>
  ),
  meadow: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M2 21h20" />
      <path d="M5 21v-4c0-2 1.5-3 2.5-2M5 21v-3" />
      <path d="M9 21v-6c0-3 2-4 3-3M9 21v-4" />
      <path d="M14 21v-5c0-3 2-5 4-3M14 21v-3" />
      <path d="M19 21v-3c0-2 1.5-2.5 2-1.5" />
    </svg>
  ),
  lake: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M3 17c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
      <path d="M3 21c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
      <path d="M8 17V6l4-3 4 3v11" />
      <path d="M9 10h6" />
    </svg>
  ),
  candle: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <rect x="9" y="9" width="6" height="12" rx="1" />
      <path d="M12 9V5M11 7c0-1.5 2-1.5 2-3" />
      <path d="M6 21h12" />
    </svg>
  ),
  swing: (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M5 3h14M8 3l2 8h4l2-8" />
      <path d="M10 11v5M14 11v5" />
      <path d="M9 16h6a1 1 0 0 1 1 1v1H8v-1a1 1 0 0 1 1-1z" />
    </svg>
  ),
};

/* Merge all icons — amenity icons are available for location tabs too */
const icons = { ...locationOnlyIcons, ...amenityIcons };
type IconKey = keyof typeof icons;

type Place = {
  id: string;
  name: string;
  heading: [string, string];
  body: string;
  feature: string;
  icon: IconKey;
  bg: string;
};

const DEFAULT_PLACES: Place[] = [
  {
    id: "dwarka",
    name: "Dwarka Expressway",
    heading: ["Dwarka", "Expressway"],
    body: "Enjoy easy access to one of the region's key road networks, connecting you to major destinations across Gurugram and Delhi NCR.",
    feature: "Seamless Connectivity",
    icon: "connectivity",
    bg: "/images/dwarka-expressway.jpg",
  },
  {
    id: "nh48",
    name: "NH-48",
    heading: ["NH-48", "National Highway"],
    body: "Stay connected to business districts, commercial centres and everyday destinations through one of the country's most important highways.",
    feature: "Easy Access",
    icon: "access",
    bg: "/images/nh-48.webp",
  },
  {
    id: "airport",
    name: "IGI Airport",
    heading: ["Indira Gandhi", "Airport"],
    body: "Benefit from convenient access to Indira Gandhi International Airport, ensuring smoother travel and better connectivity.",
    feature: "Peaceful Living",
    icon: "peaceful",
    bg: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=75&auto=format&fit=crop",
  },
];

type SanityPlace = {
  _key?: string;
  name?: string;
  headingLine1?: string | PortableTextBlock[];
  headingLine2?: string | PortableTextBlock[];
  feature?: string | PortableTextBlock[];
  icon?: string;
  body?: string;
  image?: string | null;
};
interface LocationData {
  eyebrow?: string;
  places?: SanityPlace[];
}

export default function Location({ data }: { data?: LocationData }) {
  const [active, setActive] = useState(0);
  const eyebrow = data?.eyebrow?.trim() || "Location & Connectivity";
  const places: Place[] = data?.places?.length
    ? data.places.map((p, i) => ({
        id: p._key ?? `place-${i}`,
        name: p.name ?? "",
        heading: [toPlainText(p.headingLine1 ?? p.name ?? ""), toPlainText(p.headingLine2 ?? "")],
        body: p.body ?? "",
        feature: toPlainText(p.feature ?? ""),
        icon: (p.icon && p.icon in icons ? p.icon : "connectivity") as IconKey,
        bg: p.image || "/images/dwarka-expressway.jpg",
      }))
    : DEFAULT_PLACES;
  const current = places[active] ?? places[0];

  return (
    <section
      id="location"
      className="relative isolate overflow-hidden px-4 py-10 sm:px-6 sm:py-[50px] lg:px-10 lg:py-[100px]"
    >
      {/* Crossfading full-bleed background images */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        {places.map((p, i) => (
          <Image
            key={p.id}
            src={p.bg}
            alt=""
            fill
            sizes="100vw"
            priority={i === 0}
            className="object-cover transition-opacity duration-[1.2s] ease-out"
            style={{
              opacity: i === active ? 1 : 0,
              filter: "sepia(0.22) saturate(0.85) brightness(0.42) contrast(1.05)",
            }}
          />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[color:var(--bg)]/35" />

      <div className="mx-auto max-w-[1400px]">
        <Reveal as="p" className="eyebrow mb-8 text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">
          <span>{eyebrow}</span>
        </Reveal>

        {/* Fixed-height content area */}
        <div className="min-h-[20rem] sm:min-h-[22rem] lg:min-h-[24rem]">
          <div key={`heading-${active}`} className="places-fade">
            <h2 className="font-display h-page">{current.heading[0]}</h2>
            <h2 className="font-display h-page text-[color:var(--accent)]">{current.heading[1]}</h2>
          </div>

          <p
            key={`body-${active}`}
            className="places-fade mt-8 max-w-xl text-base leading-relaxed text-[color:var(--fg)]/80 lg:text-lg"
          >
            {current.body}
          </p>
        </div>

        {/* Tab navigation */}
        <div className="mt-12 lg:mt-16">
          <div className="flex flex-wrap justify-between gap-y-6">
            {places.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-pressed={i === active}
                className={`group flex items-center gap-4 text-left transition-opacity duration-500 ${
                  i === active ? "opacity-100" : "opacity-55 hover:opacity-90"
                }`}
              >
                <span
                  className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 lg:h-20 lg:w-20 ${
                    i === active
                      ? "border-[color:var(--accent)] text-[color:var(--fg)]"
                      : "border-[color:var(--line)] text-[color:var(--fg)]/70"
                  }`}
                >
                  <span className="h-7 w-7 lg:h-8 lg:w-8" style={{ filter: "brightness(0) invert(1)" }}>{icons[p.icon]}</span>
                </span>

                <div>
                  <div className="font-display-alt text-base tracking-tight lg:text-lg">{p.feature}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                    {p.name}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
