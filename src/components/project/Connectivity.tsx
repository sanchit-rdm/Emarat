"use client";

import { useState } from "react";
import type { Landmark } from "@/lib/projects";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";

export default function Connectivity({
  landmarks,
  mapQuery,
  location,
}: {
  landmarks: Landmark[];
  mapQuery: string;
  location: string;
}) {
  const [active, setActive] = useState(0);
  const max = Math.max(...landmarks.map((l) => l.minutes));

  return (
    <section
      id="location"
      className="relative isolate scroll-mt-44 overflow-hidden border-t border-[color:var(--line)] px-6 py-24 lg:px-10 lg:py-32"
    >
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[420px] w-[420px] rounded-full bg-[color:var(--brand-green)]/15 blur-[160px]" />

      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-10 lg:gap-16">
        {/* Left: heading + distances */}
        <div className="col-span-12 lg:col-span-5">
          <SplitReveal as="h2" className="font-display h-section">
            Location &amp;
          </SplitReveal>
          <SplitReveal as="h2" delay={0.1} className="font-display h-section text-[color:var(--muted)]">
            Connectivity.
          </SplitReveal>

          <Reveal as="p" delay={0.2} className="mt-6 text-sm text-[color:var(--muted)]">
            {location} — moments from the corridors that connect the whole of the NCR.
          </Reveal>

          <ul className="mt-10 flex flex-col">
            {landmarks.map((l, i) => (
              <li key={l.name}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={i === active}
                  className={`group w-full border-t border-[color:var(--line)] py-5 text-left transition-colors last:border-b ${
                    i === active ? "" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-display-alt text-xl lg:text-2xl">{l.name}</span>
                    <span className="flex items-baseline gap-1.5 whitespace-nowrap">
                      <span className="font-display text-2xl tracking-tight text-[color:var(--accent)] lg:text-3xl">
                        {l.minutes}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--muted)]">min</span>
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--muted)]">{l.category}</span>
                    {/* progress bar — closer = fuller */}
                    <span className="relative h-px flex-1 bg-[color:var(--line)]">
                      <span
                        className="absolute inset-y-0 left-0 bg-[color:var(--accent)] transition-all duration-500"
                        style={{ width: `${100 - (l.minutes / max) * 80}%` }}
                      />
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: live map */}
        <div className="col-span-12 lg:col-span-7">
          <Reveal className="relative aspect-square overflow-hidden rounded-md border border-[color:var(--line)] bg-[color:var(--bg-alt)] lg:aspect-auto lg:h-full lg:min-h-[460px]">
            <iframe
              title={`Map — ${location}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`}
              className="absolute inset-0 h-full w-full"
              style={{ border: 0, filter: "grayscale(0.4) contrast(0.95) brightness(0.95)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
