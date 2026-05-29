"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CircleButton from "@/components/CircleButton";
import logo from "@/images/logo.png";

const corporate = [
  { href: "/about", label: "About Us" },
  { href: "/directors-desk", label: "Director's Desk" },
  { href: "/team", label: "Our Team" },
];

const projectLinks = [
  { href: "/projects", label: "All Projects" },
  { href: "/projects#c2", label: "C2 — DLF Garden City" },
  { href: "/projects#c5", label: "C5 — DLF Garden City" },
  { href: "/projects#e11", label: "E11 — DLF Garden City" },
  { href: "/projects#ea04", label: "EA 04 — Almeda" },
];

const topLevel = [
  { label: "Corporate", dropdown: corporate },
  { label: "Projects", dropdown: projectLinks },
  { href: "/location", label: "Location" },
  { href: "/properties", label: "Properties" },
  { href: "/careers", label: "Careers" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

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
        <Link href="/" className="flex items-center" aria-label="Emarat Realty home">
          <Image
            src={logo}
            alt="Emarat Realty"
            priority
            className="h-auto w-[130px]"
            sizes="130px"
          />
        </Link>

        <nav className="hidden gap-7 text-sm md:flex">
          {topLevel.map((item) =>
            item.dropdown ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  type="button"
                  className="nav-link flex items-center gap-1 text-[color:var(--muted)] transition-colors hover:text-[color:var(--fg)]"
                  aria-expanded={openDropdown === item.label}
                >
                  {item.label}
                  <span aria-hidden className="text-[0.6rem]">▾</span>
                </button>
                {openDropdown === item.label && (
                  <div className="absolute left-0 top-full pt-4">
                    <div className="min-w-[220px] rounded-md border border-[color:var(--line)] bg-[color:var(--bg)]/95 p-2 backdrop-blur-md">
                      {item.dropdown.map((d) => (
                        <Link
                          key={d.href}
                          href={d.href}
                          className="block rounded px-3 py-2 text-xs uppercase tracking-[0.14em] text-[color:var(--muted)] transition-colors hover:bg-[color:var(--bg-alt)] hover:text-[color:var(--accent)]"
                        >
                          {d.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href!}
                className="nav-link text-[color:var(--muted)] transition-colors hover:text-[color:var(--fg)]"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:inline-flex">
            <CircleButton href="/contact" size="sm" variant="outline">
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
        <div className="max-h-[80vh] overflow-y-auto border-t border-[color:var(--line)] bg-[color:var(--bg)]/95 backdrop-blur-md md:hidden">
          <nav className="flex flex-col px-6 py-4">
            {topLevel.map((item) =>
              item.dropdown ? (
                <details key={item.label} className="border-b border-[color:var(--line)]">
                  <summary className="flex cursor-pointer items-center justify-between py-4 text-sm text-[color:var(--muted)]">
                    <span>{item.label}</span>
                    <span aria-hidden className="text-[0.6rem]">▾</span>
                  </summary>
                  <div className="pb-3">
                    {item.dropdown.map((d) => (
                      <Link
                        key={d.href}
                        href={d.href}
                        onClick={() => setMenuOpen(false)}
                        className="block py-2 pl-3 text-xs uppercase tracking-[0.14em] text-[color:var(--muted)] transition-colors hover:text-[color:var(--accent)]"
                      >
                        {d.label}
                      </Link>
                    ))}
                  </div>
                </details>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-[color:var(--line)] py-4 text-sm text-[color:var(--muted)] transition-colors hover:text-[color:var(--fg)]"
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="mt-6">
              <CircleButton href="/contact" variant="outline" className="w-full">
                Enquire Now
              </CircleButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
