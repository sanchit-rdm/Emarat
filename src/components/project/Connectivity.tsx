"use client";

import { useState } from "react";
import type { LandmarkGroup } from "@/lib/projects";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";

export default function Connectivity({
  landmarks,
  mapQuery,
  location,
  labels,
}: {
  landmarks: LandmarkGroup[];
  mapQuery: string;
  location: string;
  labels?: { heading1?: string; heading2?: string; blurb?: string };
}) {
  const [active, setActive] = useState(0);
  const heading1 = labels?.heading1?.trim() || "Location &";
  const heading2 = labels?.heading2?.trim() || "Connectivity.";
  const blurb = labels?.blurb?.trim() || "anchored among the corridors, retail and institutions that connect the whole of the NCR.";

  return (
    <section
      id="location"
      className="relative isolate scroll-mt-44 overflow-hidden border-t border-[color:var(--line)] px-4 py-14 sm:px-6 sm:py-20 lg:px-10 lg:py-32"
    >
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[420px] w-[420px] rounded-full bg-[color:var(--brand-green)]/15 blur-[160px]" />

      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-10 lg:gap-16">
        {/* Left: heading + categorised landmarks */}
        <div className="col-span-12 lg:col-span-5">
          <SplitReveal as="h2" className="font-display h-section">
            {heading1}
          </SplitReveal>
          <SplitReveal as="h2" delay={0.1} className="font-display h-section text-[color:var(--accent)]">
            {heading2}
          </SplitReveal>

          <Reveal as="p" delay={0.2} className="mt-6 text-sm text-[color:var(--muted)]">
            {location} — {blurb}
          </Reveal>

          <ul className="mt-10 flex flex-col">
            {landmarks.map((g, i) => (
              <li key={g.category}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={i === active}
                  className={`group w-full border-t border-[color:var(--line)] py-5 text-left transition-opacity last:border-b ${
                    i === active ? "opacity-100" : "opacity-65 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-colors ${
                        i === active ? "bg-[color:var(--accent)]" : "bg-[color:var(--line)]"
                      }`}
                    />
                    <span className="text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">
                      {g.category}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1 pl-[1.125rem] font-display-alt text-lg leading-snug lg:text-xl">
                    {g.items.map((item, j) => (
                      <span key={item}>
                        {item}
                        {j < g.items.length - 1 && (
                          <span className="ml-2 text-[color:var(--accent)]/50">·</span>
                        )}
                      </span>
                    ))}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: live map */}
        <div className="col-span-12 lg:col-span-7">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-md border border-[color:var(--line)] bg-[color:var(--bg-alt)] sm:aspect-square lg:aspect-auto lg:h-full lg:min-h-[460px]">
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
