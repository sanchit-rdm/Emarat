"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "Studio" },
  { href: "#approach", label: "Approach" },
  { href: "#materials", label: "Materials" },
  { href: "#news", label: "Journal" },
  { href: "#contact", label: "Contact" },
];

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-[color:var(--bg)]/80 backdrop-blur-md border-b border-[color:var(--line)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 lg:h-20 lg:px-10">
        <a href="#top" className="font-display text-lg tracking-tight">
          <span className="font-medium">Emarat</span>
          <span className="text-[color:var(--muted)]">.studio</span>
        </a>

        <nav className="hidden gap-8 text-sm md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[color:var(--muted)] transition-colors hover:text-[color:var(--fg)]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="hidden text-xs uppercase tracking-[0.18em] text-[color:var(--muted)] transition-colors hover:text-[color:var(--fg)] md:inline"
          >
            EN / AR
          </button>
          <a
            href="#contact"
            className="rounded-full border border-[color:var(--line)] px-4 py-2 text-xs uppercase tracking-[0.18em] transition-colors hover:bg-[color:var(--fg)] hover:text-[color:var(--bg)]"
          >
            Start a project
          </a>
        </div>
      </div>
    </header>
  );
}
