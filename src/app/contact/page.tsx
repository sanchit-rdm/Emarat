import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/sections/SiteFooter";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import CircleButton from "@/components/CircleButton";
import { sanityFetch } from "@/sanity/lib/live";
import { CONTACT_PAGE_QUERY } from "@/sanity/lib/queries";
import { getPageContent, mergeHero, buildMetadata, pickStr, pickArr } from "@/sanity/lib/page";

export const dynamic = 'force-dynamic';

const HERO_FALLBACK = {
  eyebrow: "",
  titleTop: "Speak to our",
  titleBottom: "sales team.",
  subtitle:
    "Whether you're enquiring about a specific residence, planning a site visit, or simply exploring the right investment for your family we're here to help.",
  trailing: "+91 84509 84509 · info@emaratrealty.com",
  bgImage: "/images/alameda-bedroom-2.webp",
};

const FB = {
  form: {
    heading1: "Leave your details.",
    heading2: "We'll be in touch.",
    nameLabel: "Full Name",
    namePlaceholder: "Your name",
    phoneLabel: "Phone",
    phonePlaceholder: "+91 00000 00000",
    emailLabel: "Email",
    emailPlaceholder: "your@email.com",
    subjectLabel: "Subject",
    subjectPlaceholder: "Subject of your enquiry",
    messageLabel: "Message",
    messagePlaceholder: "Tell us how we can help…",
    consent: "I authorise Emarat Realty to contact me via Email, SMS, WhatsApp or Call regarding my enquiry.",
    privacy: "By submitting you agree to our privacy policy.",
    submitLabel: "Send Enquiry",
  },
  office: {
    label: "Corporate Office",
    addressLines: ["Emarat Realty", "2nd Floor, Sector-15,", "Civil Lines, Gurugram", "Haryana 122001"],
    phoneLabel: "Phone",
    phone: "+91 84509 84509",
    emailLabel: "Email",
    email: "info@emaratrealty.com",
    hoursLabel: "Office Hours",
    hours: "Monday Friday · 9am – 6pm",
    socials: [
      { label: "LinkedIn", href: "https://www.linkedin.com/company/emarat-realty/" },
      { label: "Instagram", href: "https://www.instagram.com/emarat.realty/" },
      { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61570740803559" },
      { label: "X", href: "https://x.com/Emaratrealty" },
    ],
  },
  map: {
    title: "Emarat Realty Civil Lines, Gurugram",
    embedUrl: "https://www.google.com/maps?q=Sector+15+Civil+Lines+Gurugram&output=embed",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageContent("contactPage");
  return buildMetadata(page?.seo, {
    title: "Contact Emarat Realty",
    description:
      "Speak to the Emarat Realty team 2nd Floor, Sector-15, Civil Lines, Gurugram. Call +91 84509 84509 or email info@emaratrealty.com.",
  });
}

export default async function ContactPage() {
  const { data } = await sanityFetch({ query: CONTACT_PAGE_QUERY, tags: ["contactPage"] });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const c = (data as any) ?? {};
  const hero = mergeHero(c?.hero, HERO_FALLBACK);

  const f = c?.form ?? {};
  const form = {
    heading1: pickStr(f.heading1, FB.form.heading1),
    heading2: pickStr(f.heading2, FB.form.heading2),
    nameLabel: pickStr(f.nameLabel, FB.form.nameLabel),
    namePlaceholder: pickStr(f.namePlaceholder, FB.form.namePlaceholder),
    phoneLabel: pickStr(f.phoneLabel, FB.form.phoneLabel),
    phonePlaceholder: pickStr(f.phonePlaceholder, FB.form.phonePlaceholder),
    emailLabel: pickStr(f.emailLabel, FB.form.emailLabel),
    emailPlaceholder: pickStr(f.emailPlaceholder, FB.form.emailPlaceholder),
    subjectLabel: pickStr(f.subjectLabel, FB.form.subjectLabel),
    subjectPlaceholder: pickStr(f.subjectPlaceholder, FB.form.subjectPlaceholder),
    messageLabel: pickStr(f.messageLabel, FB.form.messageLabel),
    messagePlaceholder: pickStr(f.messagePlaceholder, FB.form.messagePlaceholder),
    consent: pickStr(f.consent, FB.form.consent),
    privacy: pickStr(f.privacy, FB.form.privacy),
    submitLabel: pickStr(f.submitLabel, FB.form.submitLabel),
  };
  const o = c?.office ?? {};
  const office = {
    label: pickStr(o.label, FB.office.label),
    addressLines: pickArr<string>(o.addressLines, FB.office.addressLines),
    phoneLabel: pickStr(o.phoneLabel, FB.office.phoneLabel),
    phone: pickStr(o.phone, FB.office.phone),
    emailLabel: pickStr(o.emailLabel, FB.office.emailLabel),
    email: pickStr(o.email, FB.office.email),
    hoursLabel: pickStr(o.hoursLabel, FB.office.hoursLabel),
    hours: pickStr(o.hours, FB.office.hours),
    socials: pickArr(o.socials, FB.office.socials),
  };
  const map = {
    title: pickStr(c?.map?.title, FB.map.title),
    embedUrl: pickStr(c?.map?.embedUrl, FB.map.embedUrl),
  };
  const telHref = `tel:${office.phone.replace(/[^+\d]/g, "")}`;

  return (
    <>
      <SiteNav />
      <main>
        <PageHero {...hero} />

        {/* Form + Office card */}
        <section className="px-4 py-10 sm:px-6 sm:py-[50px] lg:px-10 lg:py-[100px]">
          <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-y-8 lg:gap-16">
            {/* Form */}
            <div className="col-span-12 lg:col-span-7">
              <SplitReveal as="h2" className="font-display h-section">
                {form.heading1}
              </SplitReveal>
              <SplitReveal as="h2" delay={0.1} className="font-display h-section text-[color:var(--accent)]">
                {form.heading2}
              </SplitReveal>

              <Reveal as="form" delay={0.2} className="mt-12 flex flex-col gap-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="border-b border-[color:var(--line)] pb-3 transition-colors focus-within:border-[color:var(--accent)]">
                    <label className="block text-[0.625rem] uppercase tracking-[0.22em] text-[color:var(--muted)]">
                      {form.nameLabel}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={form.namePlaceholder}
                      className="mt-2 w-full bg-transparent text-sm outline-none placeholder:text-[color:var(--muted)]/60"
                    />
                  </div>
                  <div className="border-b border-[color:var(--line)] pb-3 transition-colors focus-within:border-[color:var(--accent)]">
                    <label className="block text-[0.625rem] uppercase tracking-[0.22em] text-[color:var(--muted)]">
                      {form.phoneLabel}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder={form.phonePlaceholder}
                      className="mt-2 w-full bg-transparent text-sm outline-none placeholder:text-[color:var(--muted)]/60"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="border-b border-[color:var(--line)] pb-3 transition-colors focus-within:border-[color:var(--accent)]">
                    <label className="block text-[0.625rem] uppercase tracking-[0.22em] text-[color:var(--muted)]">
                      {form.emailLabel}
                    </label>
                    <input
                      type="email"
                      placeholder={form.emailPlaceholder}
                      className="mt-2 w-full bg-transparent text-sm outline-none placeholder:text-[color:var(--muted)]/60"
                    />
                  </div>
                  <div className="border-b border-[color:var(--line)] pb-3 transition-colors focus-within:border-[color:var(--accent)]">
                    <label className="block text-[0.625rem] uppercase tracking-[0.22em] text-[color:var(--muted)]">
                      {form.subjectLabel}
                    </label>
                    <input
                      type="text"
                      placeholder={form.subjectPlaceholder}
                      className="mt-2 w-full bg-transparent text-sm outline-none placeholder:text-[color:var(--muted)]/60"
                    />
                  </div>
                </div>

                <div className="border-b border-[color:var(--line)] pb-3 transition-colors focus-within:border-[color:var(--accent)]">
                  <label className="block text-[0.625rem] uppercase tracking-[0.22em] text-[color:var(--muted)]">
                    {form.messageLabel}
                  </label>
                  <textarea
                    rows={3}
                    placeholder={form.messagePlaceholder}
                    className="mt-2 w-full resize-none bg-transparent text-sm outline-none placeholder:text-[color:var(--muted)]/60"
                  />
                </div>

                <label className="flex cursor-pointer items-start gap-3 text-xs text-[color:var(--muted)]">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="mt-0.5 h-3.5 w-3.5 accent-[color:var(--accent)]"
                  />
                  <span>{form.consent}</span>
                </label>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                  <p className="text-[12px] text-[color:var(--muted)]">
                    {form.privacy}
                  </p>
                  <CircleButton type="submit" variant="filled">
                    {form.submitLabel}
                  </CircleButton>
                </div>
              </Reveal>
            </div>

            {/* Office card */}
            <div className="col-span-12 lg:col-span-5">
              <div className="rounded-md border border-[color:var(--line)] p-8 lg:p-10">
                <div className="text-xs uppercase tracking-[0.22em] text-[color:var(--accent)]">
                  {office.label}
                </div>
                <p className="mt-6 font-display-alt text-xl leading-relaxed lg:text-2xl">
                  {office.addressLines.map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < office.addressLines.length - 1 && <br />}
                    </span>
                  ))}
                </p>

                <div className="mt-8 grid grid-cols-2 gap-4 border-t border-[color:var(--line)] pt-6">
                  <div>
                    <div className="text-[0.625rem] uppercase tracking-[0.2em] text-[color:var(--muted)]">
                      {office.phoneLabel}
                    </div>
                    <a href={telHref} className="mt-1 block text-sm transition-colors hover:text-[color:var(--accent)]">
                      {office.phone}
                    </a>
                  </div>
                  <div>
                    <div className="text-[0.625rem] uppercase tracking-[0.2em] text-[color:var(--muted)]">
                      {office.emailLabel}
                    </div>
                    <a href={`mailto:${office.email}`} className="mt-1 block break-all text-sm transition-colors hover:text-[color:var(--accent)]">
                      {office.email}
                    </a>
                  </div>
                </div>

                <div className="mt-6 border-t border-[color:var(--line)] pt-6">
                  <div className="text-[0.625rem] uppercase tracking-[0.2em] text-[color:var(--muted)]">
                    {office.hoursLabel}
                  </div>
                  <div className="mt-1 text-sm">{office.hours}</div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3 text-xs uppercase tracking-[0.16em]">
                  {office.socials.map((s) => (
                    <a
                      key={s.href ?? s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[color:var(--muted)] transition-colors hover:text-[color:var(--accent)]"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="px-6 pb-28 lg:px-10 lg:pb-40">
          <div className="mx-auto max-w-[1400px]">
            <div className="relative aspect-[21/9] overflow-hidden rounded-md border border-[color:var(--line)] bg-[color:var(--bg-alt)]">
              <iframe
                title={map.title}
                src={map.embedUrl}
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
