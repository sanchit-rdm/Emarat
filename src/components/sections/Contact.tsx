import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import CircleButton from "@/components/CircleButton";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden border-t border-[color:var(--line)] bg-[color:var(--bg-alt)] px-6 py-32 lg:px-10 lg:py-48"
    >
      <div className="pointer-events-none absolute inset-0 -z-20">
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=2400&q=80&auto=format&fit=crop"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
          style={{ filter: "sepia(0.2) saturate(0.8) brightness(0.45) contrast(1.05)" }}
        />
        <div className="absolute inset-0 bg-[color:var(--bg-alt)]/50" />
      </div>
      <div className="pointer-events-none absolute -right-32 top-1/4 h-[440px] w-[440px] rounded-full bg-[color:var(--accent)]/12 blur-[200px]" />

      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-10">
          <SplitReveal
            as="h2"
            className="font-display h-page"
          >
            Ready to find
          </SplitReveal>
          <SplitReveal
            as="h2"
            delay={0.1}
            className="font-display h-page text-[color:var(--muted)]"
          >
            your perfect home?
          </SplitReveal>

          {/* Callback form */}
          <Reveal as="div" delay={0.2} className="mt-16 max-w-xl">
            <p className="mb-6 text-sm text-[color:var(--muted)]">
              Leave your details and our team will get back to you within one business day.
            </p>
            <form className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="border-b border-[color:var(--line)] pb-3">
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-[color:var(--muted)]"
                    aria-label="Name"
                  />
                </div>
                <div className="border-b border-[color:var(--line)] pb-3">
                  <input
                    type="tel"
                    placeholder="+91 00000 00000"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-[color:var(--muted)]"
                    aria-label="Phone"
                  />
                </div>
              </div>
              <div className="border-b border-[color:var(--line)] pb-3">
                <input
                  type="email"
                  placeholder="Email address (optional)"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-[color:var(--muted)]"
                  aria-label="Email"
                />
              </div>
              <div className="border-b border-[color:var(--line)] pb-3">
                <select
                  className="w-full bg-transparent text-sm text-[color:var(--muted)] outline-none"
                  aria-label="Project interest"
                  defaultValue=""
                >
                  <option value="" disabled>Interested in…</option>
                  <option value="c2">C2 at DLF Garden City</option>
                  <option value="c5">C5 at DLF Garden City</option>
                  <option value="e11">E11 at DLF Garden City</option>
                  <option value="ea04">EA 04 at Almeda</option>
                  <option value="plots">Residential Plots</option>
                  <option value="floors">Independent Floors</option>
                </select>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                <p className="text-[10px] uppercase tracking-[0.16em] text-[color:var(--muted)]">
                  By submitting you agree to our privacy policy.
                </p>
                <CircleButton type="submit" variant="filled">
                  Request Callback
                </CircleButton>
              </div>
            </form>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3">
            <Reveal as="div" delay={0.1} className="space-y-3">
              <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                Call Us
              </div>
              <a
                href="tel:+918450984509"
                className="block font-display text-2xl tracking-tight transition-colors hover:text-[color:var(--accent)]"
              >
                +91 84509 84509
              </a>
              <p className="text-sm text-[color:var(--muted)]">
                Mon – Sat, 10am – 7pm IST
              </p>
            </Reveal>

            <Reveal as="div" delay={0.15} className="space-y-3">
              <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                Email Us
              </div>
              <a
                href="mailto:info@emaratrealty.com"
                className="block font-display text-xl tracking-tight transition-colors hover:text-[color:var(--accent)]"
              >
                info@emaratrealty.com
              </a>
              <p className="text-sm text-[color:var(--muted)]">
                We respond within one working day.
              </p>
            </Reveal>

            <Reveal as="div" delay={0.2} className="space-y-3">
              <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                Visit Us
              </div>
              <p className="font-display text-base leading-relaxed">
                Emarat Realty<br />
                2nd Floor, Sector-15<br />
                Civil Lines, Gurugram<br />
                Haryana 122001
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
