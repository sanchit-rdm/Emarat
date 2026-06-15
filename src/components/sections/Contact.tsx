import Image from "next/image";
import type { PortableTextBlock } from "@/lib/portableText";
import { renderPortableText, toPlainText } from "@/lib/portableText";
import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import CircleButton from "@/components/CircleButton";

interface ContactData {
  heading1?: string | PortableTextBlock[];
  heading2?: string | PortableTextBlock[];
  phone?: string;
  phoneHref?: string;
  phoneHours?: string;
  email?: string;
  emailNote?: string;
  address?: string | PortableTextBlock[];
  lead?: string | PortableTextBlock[];
  namePlaceholder?: string;
  phonePlaceholder?: string;
  emailPlaceholder?: string;
  categoryPlaceholder?: string;
  categoryOptions?: string[];
  privacy?: string;
  submitLabel?: string;
  callLabel?: string;
  emailLabel?: string;
  visitLabel?: string;
}
interface Props { data?: ContactData }

export default function Contact({ data }: Props) {
  const heading1 = data?.heading1 ?? "Ready to find";
  const heading2 = data?.heading2 ?? "your perfect home?";
  const phone = data?.phone ?? "+91 84509 84509";
  const phoneHref = data?.phoneHref ?? "tel:+918450984509";
  const phoneHours = data?.phoneHours ?? "Mon – Sat, 10am – 7pm IST";
  const email = data?.email ?? "info@emaratrealty.com";
  const emailNote = data?.emailNote ?? "We respond within one working day.";
  const address = data?.address ?? "Emarat Realty\n2nd Floor, Sector-15\nCivil Lines, Gurugram\nHaryana 122001";
  const lead = data?.lead ?? "Leave your details and our team will get back to you within one business day.";
  const namePlaceholder = data?.namePlaceholder ?? "Your name";
  const phonePlaceholder = data?.phonePlaceholder ?? "+91 00000 00000";
  const emailPlaceholder = data?.emailPlaceholder ?? "Email address (optional)";
  const categoryPlaceholder = data?.categoryPlaceholder ?? "Interested in…";
  const categoryOptions = data?.categoryOptions?.length
    ? data.categoryOptions
    : ["C2 at DLF Garden City", "C5 at DLF Garden City", "E11 at DLF Garden City", "EA 04 at Alameda"];
  const privacy = data?.privacy ?? "By submitting you agree to our privacy policy.";
  const submitLabel = data?.submitLabel ?? "Request a Callback";
  const callLabel = data?.callLabel ?? "Call Us";
  const emailLabel = data?.emailLabel ?? "Email Us";
  const visitLabel = data?.visitLabel ?? "Visit Us";
  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden border-t border-[color:var(--line)] bg-[color:var(--bg-alt)] px-6 py-32 lg:px-10 lg:py-48"
    >
      <div className="pointer-events-none absolute inset-0 -z-20">
        <Image
          src="/images/alameda-bedroom-4.webp"
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
          <SplitReveal as="h2" className="font-display h-page">
            {toPlainText(heading1)}
          </SplitReveal>
          <SplitReveal as="h2" delay={0.1} className="font-display h-page text-[color:var(--accent)]">
            {toPlainText(heading2)}
          </SplitReveal>

          {/* Callback form */}
          <Reveal as="div" delay={0.2} className="mt-16 max-w-xl">
            <p className="mb-6 text-sm text-[color:var(--muted)]">
              {renderPortableText(lead)}
            </p>
            <form className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="border-b border-[color:var(--line)] pb-3">
                  <input
                    type="text"
                    placeholder={namePlaceholder}
                    className="w-full bg-transparent text-sm outline-none placeholder:text-[color:var(--muted)]"
                    aria-label="Name"
                  />
                </div>
                <div className="border-b border-[color:var(--line)] pb-3">
                  <input
                    type="tel"
                    placeholder={phonePlaceholder}
                    className="w-full bg-transparent text-sm outline-none placeholder:text-[color:var(--muted)]"
                    aria-label="Phone"
                  />
                </div>
              </div>
              <div className="border-b border-[color:var(--line)] pb-3">
                <input
                  type="email"
                  placeholder={emailPlaceholder}
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
                  <option value="" disabled>{categoryPlaceholder}</option>
                  {categoryOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                <p className="text-[10px] uppercase tracking-[0.16em] text-[color:var(--muted)]">
                  {privacy}
                </p>
                <CircleButton type="submit" variant="filled">
                  {submitLabel}
                </CircleButton>
              </div>
            </form>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3">
            <Reveal as="div" delay={0.1} className="space-y-3">
              <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                {callLabel}
              </div>
              <a
                href={phoneHref}
                className="block font-display-alt text-2xl transition-colors hover:text-[color:var(--accent)]"
              >
                {phone}
              </a>
              <p className="text-sm text-[color:var(--muted)]">{phoneHours}</p>
            </Reveal>

            <Reveal as="div" delay={0.15} className="space-y-3">
              <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                {emailLabel}
              </div>
              <a
                href={`mailto:${email}`}
                className="block font-display-alt text-xl transition-colors hover:text-[color:var(--accent)]"
              >
                {email}
              </a>
              <p className="text-sm text-[color:var(--muted)]">{emailNote}</p>
            </Reveal>

            <Reveal as="div" delay={0.2} className="space-y-3">
              <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                {visitLabel}
              </div>
              <p className="font-display-alt text-base leading-relaxed" style={{ whiteSpace: "pre-line" }}>
                {renderPortableText(address)}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
