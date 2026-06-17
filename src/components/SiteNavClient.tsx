"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CircleButton from "@/components/CircleButton";
import logo from "@/images/logo.png";

export type NavDropdownItem = { href: string; label: string };
export type NavItem = { href?: string; label: string; dropdown?: NavDropdownItem[] };

export default function SiteNavClient({
  items,
  enquireLabel = "Enquire Now",
  enquireHref = "/contact",
}: {
  items: NavItem[];
  enquireLabel?: string;
  enquireHref?: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("top");
      if (!hero) {
        setScrolled(window.scrollY > 24);
        return;
      }
      const headerH = headerRef.current?.offsetHeight ?? 0;
      setScrolled(hero.getBoundingClientRect().bottom <= headerH);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-[color:var(--bg)]/85 backdrop-blur-md border-b border-[color:var(--line)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:h-28 lg:px-10">
        <Link href="/" className="flex items-center" aria-label="Emarat Realty home">
          <Image src={logo} alt="Emarat Realty" priority className="h-auto w-[90px] sm:w-[100px] lg:w-[130px]" sizes="(min-width: 1024px) 130px, (min-width: 640px) 100px, 90px" />
        </Link>

        <nav className="hidden gap-7 text-sm lg:flex">
          {items.map((item) =>
            item.dropdown && item.dropdown.length ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  type="button"
                  className="nav-link flex items-center gap-1 font-semibold text-white transition-colors hover:text-[color:var(--accent)]"
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
                          className="block rounded px-3 py-2 text-sm tracking-[0.02em] text-white transition-colors hover:bg-[color:var(--bg-alt)] hover:text-[color:var(--accent)]"
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
                key={item.label}
                href={item.href ?? "#"}
                className="nav-link font-semibold text-white transition-colors hover:text-[color:var(--accent)]"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden lg:inline-flex">
            <CircleButton href={enquireHref} size="sm" variant="outline" className="enquire-btn">
              {enquireLabel}
            </CircleButton>
          </div>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex flex-col gap-1.5 p-3 -mr-2 lg:hidden"
          >
            <span className={`block h-px w-6 bg-[color:var(--fg)] transition-transform duration-300 ${menuOpen ? "translate-y-2.5 rotate-45" : ""}`} />
            <span className={`block h-px w-6 bg-[color:var(--fg)] transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px w-6 bg-[color:var(--fg)] transition-transform duration-300 ${menuOpen ? "-translate-y-2.5 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="max-h-[80vh] overflow-y-auto border-t border-[color:var(--line)] bg-[color:var(--bg)]/95 backdrop-blur-md lg:hidden">
          <nav className="flex flex-col px-6 py-4">
            {items.map((item) =>
              item.dropdown && item.dropdown.length ? (
                <details key={item.label} className="border-b border-[color:var(--line)]">
                  <summary className="flex cursor-pointer items-center justify-between py-4 text-sm font-semibold text-white">
                    <span>{item.label}</span>
                    <span aria-hidden className="text-[0.6rem]">▾</span>
                  </summary>
                  <div className="pb-3">
                    {item.dropdown.map((d) => (
                      <Link
                        key={d.href}
                        href={d.href}
                        onClick={() => setMenuOpen(false)}
                        className="block py-2 pl-3 text-sm tracking-[0.02em] text-white transition-colors hover:text-[color:var(--accent)]"
                      >
                        {d.label}
                      </Link>
                    ))}
                  </div>
                </details>
              ) : (
                <Link
                  key={item.label}
                  href={item.href ?? "#"}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-[color:var(--line)] py-4 text-sm font-semibold text-white transition-colors hover:text-[color:var(--accent)]"
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="mt-6">
              <CircleButton href={enquireHref} variant="outline" className="enquire-btn w-full">
                {enquireLabel}
              </CircleButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
