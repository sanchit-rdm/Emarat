export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[color:var(--line)] px-6 pb-10 pt-16 lg:px-10">
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-5">
          <div className="font-display text-3xl tracking-tight lg:text-5xl">
            Emarat<span className="text-[color:var(--muted)]">.studio</span>
          </div>
          <p className="mt-6 max-w-md text-sm text-[color:var(--muted)]">
            An independent architecture and property development practice
            building slowly across MENA and Europe since 2009.
          </p>
        </div>

        <div className="col-span-6 lg:col-span-2">
          <div className="mb-4 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Practice
          </div>
          <ul className="space-y-2 text-sm">
            <li><a href="#projects" className="hover:text-[color:var(--accent)]">Projects</a></li>
            <li><a href="#about" className="hover:text-[color:var(--accent)]">Studio</a></li>
            <li><a href="#approach" className="hover:text-[color:var(--accent)]">Approach</a></li>
            <li><a href="#news" className="hover:text-[color:var(--accent)]">Journal</a></li>
          </ul>
        </div>

        <div className="col-span-6 lg:col-span-2">
          <div className="mb-4 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Contact
          </div>
          <ul className="space-y-2 text-sm">
            <li><a href="mailto:hello@emarat.studio" className="hover:text-[color:var(--accent)]">hello@emarat.studio</a></li>
            <li><a href="mailto:press@emarat.studio" className="hover:text-[color:var(--accent)]">press@emarat.studio</a></li>
            <li><a href="mailto:careers@emarat.studio" className="hover:text-[color:var(--accent)]">careers@emarat.studio</a></li>
          </ul>
        </div>

        <div className="col-span-12 lg:col-span-3">
          <div className="mb-4 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Newsletter
          </div>
          <form className="flex border-b border-[color:var(--line)] py-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-[color:var(--muted)]"
              aria-label="Email"
            />
            <button
              type="submit"
              className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)] transition-colors hover:text-[color:var(--fg)]"
            >
              Subscribe →
            </button>
          </form>
          <p className="mt-4 text-xs text-[color:var(--muted)]">
            Quarterly. New work, essays and lectures. No marketing.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-[1440px] flex-wrap items-center justify-between gap-4 border-t border-[color:var(--line)] pt-6 text-xs text-[color:var(--muted)]">
        <span>© {year} Emarat Studio. All rights reserved.</span>
        <span>Architecture, planning & development licence holders.</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-[color:var(--fg)]">Instagram</a>
          <a href="#" className="hover:text-[color:var(--fg)]">LinkedIn</a>
          <a href="#" className="hover:text-[color:var(--fg)]">Are.na</a>
        </div>
      </div>
    </footer>
  );
}
