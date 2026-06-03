"use client";

import { useState } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/lib/projects";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";

export default function ProjectGallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState(0);

  return (
    <section id="gallery" className="scroll-mt-44 border-t border-[color:var(--line)] bg-[color:var(--bg-alt)] px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SplitReveal as="h2" className="font-display h-section">
            Gallery
          </SplitReveal>
          <Reveal as="p" delay={0.15} className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
            {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </Reveal>
        </div>

        {/* Main viewer */}
        <Reveal className="relative aspect-[16/9] overflow-hidden rounded-md bg-[color:var(--bg)]">
          {images.map((img, i) => (
            <Image
              key={img.src + i}
              src={img.src}
              alt={img.label}
              fill
              priority={i === 0}
              sizes="(min-width: 1024px) 1200px, 100vw"
              className="object-cover transition-opacity duration-700 ease-out"
              style={{
                opacity: i === active ? 1 : 0,
                filter: "sepia(0.12) saturate(0.92) brightness(0.9)",
              }}
            />
          ))}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color:var(--bg)]/60 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 text-sm uppercase tracking-[0.16em] text-[color:var(--fg)]/80">
            {images[active].label}
          </div>
        </Reveal>

        {/* Thumbnail strip */}
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {images.map((img, i) => (
            <button
              key={img.src + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View ${img.label}`}
              aria-pressed={i === active}
              className={`relative aspect-[4/3] w-28 shrink-0 overflow-hidden rounded transition-all duration-300 sm:w-36 ${
                i === active
                  ? "ring-2 ring-[color:var(--accent)] ring-offset-2 ring-offset-[color:var(--bg-alt)]"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={img.src}
                alt={img.label}
                fill
                sizes="144px"
                className="object-cover"
                style={{ filter: "sepia(0.12) saturate(0.9) brightness(0.85)" }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
