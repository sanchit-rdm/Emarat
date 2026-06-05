import Reveal from "@/components/motion/Reveal";
import SplitReveal from "@/components/motion/SplitReveal";
import CircleButton from "@/components/CircleButton";

interface ContactData {
  heading1?: string;
  heading2?: string;
  phone?: string;
  phoneHref?: string;
  phoneHours?: string;
  email?: string;
  emailNote?: string;
  address?: string;
}
interface Props { data?: ContactData }

/**
 * Design Option 2 — closing callback section on a cream surface.
 *
 * A centred "request a callback" block: heading, lead line and a minimal lead
 * form, all centre-aligned in a single narrow column. Contact details live in
 * the footer, so they're intentionally omitted here.
 */
export default function ContactV2({ data }: Props) {
  const heading1 = data?.heading1 ?? "Ready to find";
  const heading2 = data?.heading2 ?? "your perfect home?";

  return (
    <section id="contact" className="theme-light px-6 py-24 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal className="eyebrow mb-4 flex items-center justify-center font-script text-2xl text-[color:var(--accent)]">
          <span>Make Your Enquiry</span>
        </Reveal>
        <SplitReveal as="h2" className="font-display h-page">
          {heading1}
        </SplitReveal>
        <SplitReveal as="h2" delay={0.1} className="font-display h-page text-[color:var(--muted)]">
          {heading2}
        </SplitReveal>

        <Reveal as="p" delay={0.1} className="mx-auto mt-8 max-w-md text-sm text-[color:var(--muted)]">
          Leave your details and our team will get back to you within one business day.
        </Reveal>

        <Reveal as="div" delay={0.15} className="mt-12">
          <form className="flex flex-col gap-6 text-left">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
              <select
                className="w-full bg-transparent text-sm text-[color:var(--muted)] outline-none"
                aria-label="Project interest"
                defaultValue=""
              >
                <option value="" disabled>Interested in…</option>
                <option value="c2">C2 at DLF Garden City</option>
                <option value="c5">C5 at DLF Garden City</option>
                <option value="e11">E11 at DLF Garden City</option>
                <option value="ea04">EA 04 at Alameda</option>
                <option value="plots">Residential Plots</option>
                <option value="floors">Independent Floors</option>
              </select>
            </div>
            <div className="mt-4 flex flex-col items-center gap-4">
              <CircleButton type="submit" variant="filled">
                Request Callback
              </CircleButton>
              <p className="text-[10px] uppercase tracking-[0.16em] text-[color:var(--muted)]">
                By submitting you agree to our privacy policy.
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
