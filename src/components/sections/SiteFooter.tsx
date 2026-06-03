import Image from "next/image";
import Link from "next/link";
import logo from "@/images/logo.png";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="theme-green relative px-6 pb-10 pt-16 lg:px-10">
      {/* Gold accent strip across the top of the green footer surface */}
      <div className="brand-green-strip absolute inset-x-0 top-0" aria-hidden />
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-4">
          <Image
            src={logo}
            alt="Emarat Realty"
            className="h-auto w-[200px]"
            sizes="200px"
          />
          <p className="mt-6 max-w-md text-sm text-[color:var(--muted)]">
            Redefining the standard of luxury living. An Argo Group company building
            transformative real estate in Gurugram, Haryana.
          </p>
          <p className="mt-4 max-w-md text-xs leading-relaxed text-[color:var(--muted)]/70">
            Emarat Realty, 2nd Floor, Sector-15,<br />
            Civil Lines, Gurugram (Haryana) 122001
          </p>
        </div>

        <div className="col-span-6 lg:col-span-2">
          <div className="mb-4 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Corporate
          </div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="transition-colors hover:text-[color:var(--accent)]">About Us</Link></li>
            <li><Link href="/directors-desk" className="transition-colors hover:text-[color:var(--accent)]">Director&apos;s Desk</Link></li>
            <li><Link href="/team" className="transition-colors hover:text-[color:var(--accent)]">Our Team</Link></li>
            <li><Link href="/careers" className="transition-colors hover:text-[color:var(--accent)]">Careers</Link></li>
          </ul>
        </div>

        <div className="col-span-6 lg:col-span-2">
          <div className="mb-4 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Projects
          </div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/projects/c2" className="transition-colors hover:text-[color:var(--accent)]">C2 at DLF Garden City</Link></li>
            <li><Link href="/projects/c5" className="transition-colors hover:text-[color:var(--accent)]">C5 at DLF Garden City</Link></li>
            <li><Link href="/projects/e11" className="transition-colors hover:text-[color:var(--accent)]">E11 at DLF Garden City</Link></li>
            <li><Link href="/projects/ea04" className="transition-colors hover:text-[color:var(--accent)]">EA 04 at Almeda</Link></li>
          </ul>
        </div>

        <div className="col-span-6 lg:col-span-2">
          <div className="mb-4 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Explore
          </div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/properties" className="transition-colors hover:text-[color:var(--accent)]">Properties</Link></li>
            <li><Link href="/location" className="transition-colors hover:text-[color:var(--accent)]">Location</Link></li>
            <li><Link href="/news" className="transition-colors hover:text-[color:var(--accent)]">News</Link></li>
            <li><Link href="/contact" className="transition-colors hover:text-[color:var(--accent)]">Contact</Link></li>
          </ul>
        </div>

        <div className="col-span-6 lg:col-span-2">
          <div className="mb-4 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Get in Touch
          </div>
          <a
            href="tel:+918450984509"
            className="block text-sm transition-colors hover:text-[color:var(--accent)]"
          >
            +91 84509 84509
          </a>
          <a
            href="mailto:info@emaratrealty.com"
            className="mt-2 block text-sm transition-colors hover:text-[color:var(--accent)]"
          >
            info@emaratrealty.com
          </a>
          <p className="mt-3 text-xs text-[color:var(--muted)]">
            Mon Fri · 9am – 6pm
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.16em] text-[color:var(--muted)]">
            <a href="https://www.linkedin.com/company/emarat-realty/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[color:var(--fg)]">LinkedIn</a>
            <a href="https://www.instagram.com/emarat.realty/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[color:var(--fg)]">Instagram</a>
            <a href="https://www.facebook.com/profile.php?id=61570740803559" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[color:var(--fg)]">Facebook</a>
            <a href="https://x.com/Emaratrealty" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[color:var(--fg)]">X</a>
            <a href="https://youtube.com/@emarat.realty" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[color:var(--fg)]">YouTube</a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-[1440px] flex-wrap items-center justify-between gap-4 border-t border-[color:var(--line)] pt-6 text-xs text-[color:var(--muted)]">
        <span>© {year} Emarat Realty. An Argo Group company. All rights reserved.</span>
        <span>RERA registered · Gurugram, Haryana</span>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-[color:var(--fg)]">Privacy Policy</Link>
          <Link href="#" className="hover:text-[color:var(--fg)]">Terms of Use</Link>
        </div>
      </div>
    </footer>
  );
}
