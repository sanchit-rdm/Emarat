"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import { toPlainText, type PortableTextBlock } from "@/lib/portableText";

/**
 * Interactive connectivity section — hovering/clicking a landmark crossfades
 * the section background and swaps the heading + description. Each landmark
 * carries a feature label + icon (Seamless Connectivity / Easy Access /
 * Convenient Travel).
 */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const icons = {
  connectivity: (
    <svg viewBox="0 0 24 24" {...stroke}><circle cx="12" cy="12" r="2" /><path d="M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7M6 6a9 9 0 0 0 0 12M18 6a9 9 0 0 1 0 12" /></svg>
  ),
  access: (
    <svg viewBox="0 0 24 24" {...stroke}><path d="M5 20l4-16M19 20l-4-16M12 6v1m0 4v1m0 4v1" /></svg>
  ),
  travel: (
    <svg viewBox="0 0 24 24" {...stroke}><path d="M3 13l8-2 4-7 2 1-2 7 6 2v2l-7-1-2 4-2-1 .5-3.5L4 16z" /></svg>
  ),
  peaceful: (
    <svg viewBox="0 0 24 24" {...stroke}>
      {/* head */}
      <circle cx="9" cy="5" r="2" />
      {/* torso leaning into chair back */}
      <path d="M9 7l-1 4" />
      {/* chair back */}
      <path d="M5 3v11" />
      {/* chair seat */}
      <path d="M5 11h8" />
      {/* chair right side */}
      <path d="M13 8v3" />
      {/* chair front legs */}
      <path d="M5 14v4M11 14v4" />
      {/* person's legs resting */}
      <path d="M8 11l4 3" />
      {/* side table top */}
      <path d="M16 10h4" />
      {/* table leg */}
      <path d="M18 10v5" />
      {/* cup on table */}
      <path d="M16.5 7h2.5l-.5 3h-1.5z" />
    </svg>
  ),
};

type IconKey = "connectivity" | "access" | "travel" | "peaceful";
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
        icon: (["connectivity", "access", "travel", "peaceful"].includes(p.icon ?? "")
          ? p.icon
          : "connectivity") as IconKey,
        bg: p.image || "/images/dwarka-expressway.jpg",
      }))
    : DEFAULT_PLACES;
  const current = places[active] ?? places[0];

  return (
    <section
      id="location"
      className="relative isolate overflow-hidden px-6 py-24 lg:px-10 lg:py-32"
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

      <div className="mx-auto max-w-[1440px]">
        <Reveal as="p" className="eyebrow mb-8 text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">
          <span>{eyebrow}</span>
        </Reveal>

        {/* Fixed-height content area — reserves space for the tallest landmark
            so switching tabs never shifts the tabs / layout below. */}
        <div className="min-h-[20rem] sm:min-h-[19rem] lg:min-h-[24rem]">
          {/* Feature label for the active landmark */}
          <div key={`feature-${active}`} className="places-fade mb-4 flex items-center gap-3 text-[color:var(--accent)]">
            <span className="h-6 w-6">{icons[current.icon]}</span>
            <span className="text-xs uppercase tracking-[0.22em]">{current.feature}</span>
          </div>

          {/* Animated heading (changes per tab using a key prop to retrigger reveal) */}
          <div key={`heading-${active}`} className="places-fade">
            <h2 className="font-display h-page">{current.heading[0]}</h2>
            <h2 className="font-display h-page text-[color:var(--accent)]">{current.heading[1]}</h2>
          </div>

          {/* Description */}
          <p
            key={`body-${active}`}
            className="places-fade mt-8 max-w-xl text-base leading-relaxed text-[color:var(--fg)]/80 lg:text-lg"
          >
            {current.body}
          </p>
        </div>

        {/* Tab navigation — icon + feature + name */}
        <div className="mt-12 lg:mt-16">
          <div className="flex flex-wrap items-center gap-y-6">
            {places.map((p, i) => (
              <div key={p.id} className="flex items-center">
                {i > 0 && (
                  <div className="mx-4 hidden items-center gap-1 sm:flex lg:mx-8">
                    <span className="deco-circle" />
                    <span className="hidden h-px w-12 bg-[color:var(--accent)]/30 lg:inline-block" />
                  </div>
                )}

                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-pressed={i === active}
                  className={`group flex items-center gap-4 text-left transition-opacity duration-500 ${
                    i === active ? "opacity-100" : "opacity-55 hover:opacity-90"
                  }`}
                >
                  {/* Icon medallion */}
                  <span
                    className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 lg:h-20 lg:w-20 ${
                      i === active
                        ? "border-[color:var(--accent)] text-[color:var(--accent)]"
                        : "border-[color:var(--line)] text-[color:var(--fg)]/70"
                    }`}
                  >
                    <span className="h-7 w-7 lg:h-8 lg:w-8">{icons[p.icon]}</span>
                  </span>

                  {/* Feature + name */}
                  <div>
                    <div className="font-display-alt text-xl tracking-tight lg:text-2xl">{p.feature}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                      {p.name}
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
