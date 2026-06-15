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
  address?: string;
}
interface ContactLabels {
  eyebrow?: string | PortableTextBlock[];
  lead?: string | PortableTextBlock[];
  namePlaceholder?: string;
  phonePlaceholder?: string;
  categoryPlaceholder?: string;
  categoryOptions?: string[];
  submitLabel?: string;
  privacy?: string;
}
interface Props { data?: ContactData; labels?: ContactLabels }

/**
 * Design Option 2 — closing callback section on a cream surface.
 *
 * A centred "request a callback" block: heading, lead line and a minimal lead
 * form, all centre-aligned in a single narrow column. Contact details live in
 * the footer, so they're intentionally omitted here.
 */
export default function ContactV2({ data, labels }: Props) {
  const heading1 = data?.heading1 ?? "Ready to find";
  const heading2 = data?.heading2 ?? "your perfect home?";
  const eyebrow = labels?.eyebrow ?? "Make Your Enquiry";
  const lead = labels?.lead ?? "Leave your details and our team will get back to you within one business day.";
  const namePlaceholder = labels?.namePlaceholder?.trim() || "Your name";
  const phonePlaceholder = labels?.phonePlaceholder?.trim() || "+91 00000 00000";
  const categoryPlaceholder = labels?.categoryPlaceholder?.trim() || "Interested in…";
  const categoryOptions = labels?.categoryOptions?.length
    ? labels.categoryOptions
    : ["C2 at DLF Garden City", "C5 at DLF Garden City", "E11 at DLF Garden City", "EA 04 at Alameda", "Residential Plots", "Independent Floors"];
  const submitLabel = labels?.submitLabel?.trim() || "Request Callback";
  const privacy = labels?.privacy?.trim() || "By submitting you agree to our privacy policy.";

  return (
    <section id="contact" className="theme-light px-6 py-24 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal className="eyebrow mb-4 flex items-center justify-center font-script text-2xl text-[color:var(--accent)]">
          <span>{renderPortableText(eyebrow)}</span>
        </Reveal>
        <SplitReveal as="h2" className="font-display h-page">
          {toPlainText(heading1)}
        </SplitReveal>
        <SplitReveal as="h2" delay={0.1} className="font-display h-page text-[color:var(--accent)]">
          {toPlainText(heading2)}
        </SplitReveal>

        <Reveal as="p" delay={0.1} className="mx-auto mt-8 max-w-md text-sm text-[color:var(--muted)]">
          {renderPortableText(lead)}
        </Reveal>

        <Reveal as="div" delay={0.15} className="mt-12">
          <form className="flex flex-col gap-6 text-left">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
            <div className="mt-4 flex flex-col items-center gap-4">
              <CircleButton type="submit" variant="filled">
                {submitLabel}
              </CircleButton>
              <p className="text-[10px] uppercase tracking-[0.16em] text-[color:var(--muted)]">
                {privacy}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
