"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";

/**
 * Interactive "Iconic Sights" style section — mirrors vp.moscow's places-nav.
 * Three landmark cards: hovering/clicking each one crossfades the section
 * background image and swaps the heading + description below.
 */

const places = [
  {
    id: "dwarka",
    minutes: 5,
    name: "Dwarka Expressway",
    heading: ["Dwarka", "Expressway"],
    body: "Direct, signal-free access to NH-248BB — connecting Gurugram to Delhi in minutes. The most important infrastructure corridor of the NCR.",
    thumb: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80&auto=format&fit=crop",
    bg: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=2400&q=80&auto=format&fit=crop",
  },
  {
    id: "golf",
    minutes: 8,
    name: "Golf Course Extension",
    heading: ["Golf Course", "Extension Road"],
    body: "The premium business address of Gurugram — fine dining, retail and Grade-A offices, all within an eight-minute drive of your home.",
    thumb: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=600&q=80&auto=format&fit=crop",
    bg: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=2400&q=80&auto=format&fit=crop",
  },
  {
    id: "airport",
    minutes: 35,
    name: "IGI Airport",
    heading: ["Indira Gandhi", "Airport"],
    body: "International connectivity in thirty-five minutes — Asia's seventh busiest airport, accessible via the Dwarka Expressway with zero traffic signals.",
    thumb: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80&auto=format&fit=crop",
    bg: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=2400&q=80&auto=format&fit=crop",
  },
];

export default function Location() {
  const [active, setActive] = useState(0);
  const current = places[active];

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
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[color:var(--bg)]/50" />

      <div className="mx-auto max-w-[1440px]">
        {/* Animated heading (changes per tab using a key prop to retrigger reveal) */}
        <div key={`heading-${active}`} className="places-fade">
          <h2 className="font-display h-page">
            {current.heading[0]}
          </h2>
          <h2 className="font-display h-page text-[color:var(--accent)]">
            {current.heading[1]}
          </h2>
        </div>

        {/* Description */}
        <div
          key={`body-${active}`}
          className="places-fade mt-8 max-w-xl text-base leading-relaxed text-[color:var(--fg)]/80 lg:text-lg"
        >
          {current.body}
        </div>

        {/* Tab navigation — thumbnails with decorative circles between */}
        <div className="mt-16 lg:mt-24">
          <div className="flex flex-wrap items-center gap-y-6">
            {places.map((p, i) => (
              <div key={p.id} className="flex items-center">
                {/* Deco circle between items (not before first) */}
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
                  {/* Thumbnail */}
                  <div
                    className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-full border transition-all duration-500 lg:h-24 lg:w-24 ${
                      i === active
                        ? "border-[color:var(--accent)]"
                        : "border-[color:var(--line)]"
                    }`}
                  >
                    <Image
                      src={p.thumb}
                      alt={p.name}
                      fill
                      sizes="96px"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      style={{ filter: "sepia(0.12) saturate(0.85) brightness(0.85)" }}
                    />
                  </div>

                  {/* Minutes + name */}
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-display text-3xl tracking-tight lg:text-4xl">
                        {p.minutes}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">
                        Min
                      </span>
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                      {p.name}
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Hint */}
        <Reveal delay={0.2} className="mt-12 flex items-center gap-3 border-t border-[color:var(--line)] pt-6 text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">
          <span className="inline-block h-1 w-1 rounded-full bg-[color:var(--accent)]" />
          <span>Hover or tap a landmark — the view changes</span>
        </Reveal>
      </div>
    </section>
  );
}
