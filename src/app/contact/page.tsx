import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/sections/SiteFooter";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import CircleButton from "@/components/CircleButton";

export const metadata: Metadata = {
  title: "Contact Emarat Realty",
  description:
    "Speak to the Emarat Realty team 2nd Floor, Sector-15, Civil Lines, Gurugram. Call +91 84509 84509 or email info@emaratrealty.com.",
};

const contactMethods = [
  {
    label: "Call us",
    primary: "+91 84509 84509",
    href: "tel:+918450984509",
    sub: "Mon – Fri · 9am – 6pm",
  },
  {
    label: "Email us",
    primary: "info@emaratrealty.com",
    href: "mailto:info@emaratrealty.com",
    sub: "We respond within one business day",
  },
  {
    label: "WhatsApp",
    primary: "+91 84509 84509",
    href: "https://wa.me/918450984509",
    sub: "Tap to chat with sales",
  },
];

export default function ContactPage() {
  return (
    <>
      <SiteNav />
      <main>
        <PageHero
          titleTop="Speak to our"
          titleBottom="sales team."
          subtitle="Whether you're enquiring about a specific residence, planning a site visit, or simply exploring the right investment for your family we're here to help."
          bgImage="/images/alameda-bedroom-2.webp"
          trailing="+91 84509 84509 · info@emaratrealty.com"
        />

        {/* Three contact methods */}
        <section className="border-b border-[color:var(--line)] bg-[color:var(--bg-alt)] px-6 py-16 lg:px-10 lg:py-24">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
            {contactMethods.map((c, i) => (
              <Reveal
                key={c.label}
                delay={i * 0.07}
                className="group rounded-md border border-[color:var(--line)] p-8 transition-colors hover:border-[color:var(--accent)]/40"
              >
                <div className="text-xs uppercase tracking-[0.22em] text-[color:var(--accent)]">
                  {c.label}
                </div>
                <a
                  href={c.href}
                  className="mt-5 block font-display-alt text-2xl transition-colors hover:text-[color:var(--accent)] lg:text-3xl"
                >
                  {c.primary}
                </a>
                <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                  {c.sub}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Form + Office card */}
        <section className="px-6 py-28 lg:px-10 lg:py-40">
          <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-8 lg:gap-16">
            {/* Form */}
            <div className="col-span-12 lg:col-span-7">
              <SplitReveal
                as="h2"
                className="font-display h-section"
              >
                Leave your details.
              </SplitReveal>
              <SplitReveal
                as="h2"
                delay={0.1}
                className="font-display h-section text-[color:var(--muted)]"
              >
                We&apos;ll be in touch.
              </SplitReveal>

              <Reveal as="form" delay={0.2} className="mt-12 flex flex-col gap-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="border-b border-[color:var(--line)] pb-3 transition-colors focus-within:border-[color:var(--accent)]">
                    <label className="block text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      className="mt-2 w-full bg-transparent text-sm outline-none placeholder:text-[color:var(--muted)]/60"
                    />
                  </div>
                  <div className="border-b border-[color:var(--line)] pb-3 transition-colors focus-within:border-[color:var(--accent)]">
                    <label className="block text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">
                      Phone
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 00000 00000"
                      className="mt-2 w-full bg-transparent text-sm outline-none placeholder:text-[color:var(--muted)]/60"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="border-b border-[color:var(--line)] pb-3 transition-colors focus-within:border-[color:var(--accent)]">
                    <label className="block text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="mt-2 w-full bg-transparent text-sm outline-none placeholder:text-[color:var(--muted)]/60"
                    />
                  </div>
                  <div className="border-b border-[color:var(--line)] pb-3 transition-colors focus-within:border-[color:var(--accent)]">
                    <label className="block text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">
                      Category
                    </label>
                    <select
                      className="mt-2 w-full bg-transparent text-sm outline-none"
                      defaultValue=""
                    >
                      <option value="" disabled className="bg-[color:var(--bg)]">Select a category</option>
                      <option value="residential" className="bg-[color:var(--bg)]">Residential enquiry</option>
                      <option value="commercial" className="bg-[color:var(--bg)]">Commercial enquiry</option>
                      <option value="plots" className="bg-[color:var(--bg)]">Plot purchase</option>
                      <option value="press" className="bg-[color:var(--bg)]">Press / Media</option>
                      <option value="other" className="bg-[color:var(--bg)]">Other</option>
                    </select>
                  </div>
                </div>

                <div className="border-b border-[color:var(--line)] pb-3 transition-colors focus-within:border-[color:var(--accent)]">
                  <label className="block text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">
                    Message
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us how we can help…"
                    className="mt-2 w-full resize-none bg-transparent text-sm outline-none placeholder:text-[color:var(--muted)]/60"
                  />
                </div>

                <label className="flex cursor-pointer items-start gap-3 text-xs text-[color:var(--muted)]">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="mt-0.5 h-3.5 w-3.5 accent-[color:var(--accent)]"
                  />
                  <span>
                    I authorise Emarat Realty to contact me via Email, SMS, WhatsApp or Call regarding my enquiry.
                  </span>
                </label>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-[color:var(--muted)]">
                    By submitting you agree to our privacy policy.
                  </p>
                  <CircleButton type="submit" variant="filled">
                    Send Enquiry
                  </CircleButton>
                </div>
              </Reveal>
            </div>

            {/* Office card */}
            <div className="col-span-12 lg:col-span-5">
              <div className="rounded-md border border-[color:var(--line)] p-8 lg:p-10">
                <div className="text-xs uppercase tracking-[0.22em] text-[color:var(--accent)]">
                  Corporate Office
                </div>
                <p className="mt-6 font-display-alt text-xl leading-relaxed lg:text-2xl">
                  Emarat Realty<br />
                  2nd Floor, Sector-15,<br />
                  Civil Lines, Gurugram<br />
                  Haryana 122001
                </p>

                <div className="mt-8 grid grid-cols-2 gap-4 border-t border-[color:var(--line)] pt-6">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
                      Phone
                    </div>
                    <a href="tel:+918450984509" className="mt-1 block text-sm transition-colors hover:text-[color:var(--accent)]">
                      +91 84509 84509
                    </a>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
                      Email
                    </div>
                    <a href="mailto:info@emaratrealty.com" className="mt-1 block break-all text-sm transition-colors hover:text-[color:var(--accent)]">
                      info@emaratrealty.com
                    </a>
                  </div>
                </div>

                <div className="mt-6 border-t border-[color:var(--line)] pt-6">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
                    Office Hours
                  </div>
                  <div className="mt-1 text-sm">Monday Friday · 9am – 6pm</div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3 text-xs uppercase tracking-[0.16em]">
                  <a href="https://www.linkedin.com/company/emarat-realty/" target="_blank" rel="noopener noreferrer" className="text-[color:var(--muted)] transition-colors hover:text-[color:var(--accent)]">LinkedIn</a>
                  <a href="https://www.instagram.com/emarat.realty/" target="_blank" rel="noopener noreferrer" className="text-[color:var(--muted)] transition-colors hover:text-[color:var(--accent)]">Instagram</a>
                  <a href="https://www.facebook.com/profile.php?id=61570740803559" target="_blank" rel="noopener noreferrer" className="text-[color:var(--muted)] transition-colors hover:text-[color:var(--accent)]">Facebook</a>
                  <a href="https://x.com/Emaratrealty" target="_blank" rel="noopener noreferrer" className="text-[color:var(--muted)] transition-colors hover:text-[color:var(--accent)]">X</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="px-6 pb-28 lg:px-10 lg:pb-40">
          <div className="mx-auto max-w-[1440px]">
            <div className="relative aspect-[21/9] overflow-hidden rounded-md border border-[color:var(--line)] bg-[color:var(--bg-alt)]">
              <iframe
                title="Emarat Realty Civil Lines, Gurugram"
                src="https://www.google.com/maps?q=Sector+15+Civil+Lines+Gurugram&output=embed"
                className="absolute inset-0 h-full w-full"
                style={{ border: 0, filter: "grayscale(0.4) contrast(0.95) brightness(0.95)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
