"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import CircleButton from "@/components/CircleButton";
import logo from "@/images/logo.png";

const links = [
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#location", label: "Location" },
  { href: "#properties", label: "Properties" },
  { href: "#news", label: "News" },
  { href: "#contact", label: "Contact" },
];

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
          ? "bg-[color:var(--bg)]/85 backdrop-blur-md border-b border-[color:var(--line)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 lg:h-20 lg:px-10">
        <a href="#top" className="flex items-center" aria-label="Emarat Realty home">
          <Image
            src={logo}
            alt="Emarat Realty"
            priority
            className="h-auto w-[130px]"
            sizes="130px"
          />
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
          <div className="hidden md:inline-flex">
            <CircleButton href="#contact" size="sm" variant="outline">
              Enquire Now
            </CircleButton>
          </div>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex flex-col gap-1.5 p-1 md:hidden"
          >
            <span className={`block h-px w-6 bg-[color:var(--fg)] transition-transform duration-300 ${menuOpen ? "translate-y-2.5 rotate-45" : ""}`} />
            <span className={`block h-px w-6 bg-[color:var(--fg)] transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px w-6 bg-[color:var(--fg)] transition-transform duration-300 ${menuOpen ? "-translate-y-2.5 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-[color:var(--line)] bg-[color:var(--bg)]/95 backdrop-blur-md md:hidden">
          <nav className="flex flex-col px-6 py-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-[color:var(--line)] py-4 text-sm text-[color:var(--muted)] transition-colors hover:text-[color:var(--fg)]"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-6">
              <CircleButton href="#contact" variant="outline" className="w-full">
                Enquire Now
              </CircleButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
