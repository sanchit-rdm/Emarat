export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[color:var(--line)] px-6 pb-10 pt-16 lg:px-10">
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-5">
          <div className="font-display text-3xl tracking-tight lg:text-5xl">
            Emarat<span className="text-[color:var(--accent)]"> Realty</span>
          </div>
          <p className="mt-6 max-w-md text-sm text-[color:var(--muted)]">
            A distinguished leader in luxury real estate, specialising in exquisite
            residences and high-end commercial spaces at DLF Garden City, Gurugram.
          </p>
          <p className="mt-4 max-w-md text-xs leading-relaxed text-[color:var(--muted)]/70">
            Shop No-4, First Floor, S.C.O.-2, 3 &amp; 4,<br />
            Old Judicial Complex, Near Sec-15,<br />
            Jharsa Road, Gurugram, Haryana — 122001
          </p>
        </div>

        <div className="col-span-6 lg:col-span-2">
          <div className="mb-4 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Projects
          </div>
          <ul className="space-y-2 text-sm">
            <li><a href="#projects" className="transition-colors hover:text-[color:var(--accent)]">C2 at DLF Garden City</a></li>
            <li><a href="#projects" className="transition-colors hover:text-[color:var(--accent)]">C5 at DLF Garden City</a></li>
            <li><a href="#projects" className="transition-colors hover:text-[color:var(--accent)]">E11 at DLF Garden City</a></li>
            <li><a href="#projects" className="transition-colors hover:text-[color:var(--accent)]">EA 04 at Almeda</a></li>
          </ul>
        </div>

        <div className="col-span-6 lg:col-span-2">
          <div className="mb-4 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Company
          </div>
          <ul className="space-y-2 text-sm">
            <li><a href="#about" className="transition-colors hover:text-[color:var(--accent)]">About Us</a></li>
            <li><a href="#values" className="transition-colors hover:text-[color:var(--accent)]">Our Values</a></li>
            <li><a href="#location" className="transition-colors hover:text-[color:var(--accent)]">Location</a></li>
            <li><a href="#news" className="transition-colors hover:text-[color:var(--accent)]">News</a></li>
            <li><a href="#contact" className="transition-colors hover:text-[color:var(--accent)]">Contact</a></li>
          </ul>
        </div>

        <div className="col-span-12 lg:col-span-3">
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
          <div className="mt-6 flex flex-wrap gap-4 text-xs uppercase tracking-[0.16em] text-[color:var(--muted)]">
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[color:var(--fg)]">Instagram</a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[color:var(--fg)]">LinkedIn</a>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[color:var(--fg)]">Facebook</a>
            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[color:var(--fg)]">YouTube</a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-[1440px] flex-wrap items-center justify-between gap-4 border-t border-[color:var(--line)] pt-6 text-xs text-[color:var(--muted)]">
        <span>© {year} Emarat Realty. All rights reserved.</span>
        <span>RERA registered · Gurugram, Haryana</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-[color:var(--fg)]">Privacy Policy</a>
          <a href="#" className="hover:text-[color:var(--fg)]">Terms of Use</a>
        </div>
      </div>
    </footer>
  );
}
