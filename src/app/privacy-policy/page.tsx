import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/sections/SiteFooter";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import { renderPortableText, type PortableTextBlock } from "@/lib/portableText";
import { sanityFetch } from "@/sanity/lib/live";
import { PRIVACY_POLICY_PAGE_QUERY } from "@/sanity/lib/queries";
import { getPageContent, mergeHero, buildMetadata, pickStr, pickArr } from "@/sanity/lib/page";

export const dynamic = "force-dynamic";

const HERO_FALLBACK = {
  eyebrow: "Legal",
  titleTop: "Privacy",
  titleBottom: "Policy.",
  subtitle:
    "How Emarat Realty collects, uses, and protects your personal information across our website and enquiries.",
  trailing: "",
  bgImage: "/images/alameda-dining.webp",
};

function h2(text: string): PortableTextBlock {
  return { _type: "block", style: "h2", children: [{ _type: "span", text }] };
}
function p(text: string): PortableTextBlock {
  return { _type: "block", style: "normal", children: [{ _type: "span", text }] };
}
function li(text: string): PortableTextBlock {
  return { _type: "block", listItem: "bullet", level: 1, children: [{ _type: "span", text }] };
}

const CONTACT_EMAIL = "info@emaratrealty.com";
const CONTACT_PHONE = "+91 84509 84509";

function contactP(intro: string): PortableTextBlock {
  return {
    _type: "block",
    style: "normal",
    children: [
      { _type: "span", text: `${intro} ` },
      { _type: "span", text: CONTACT_EMAIL, marks: ["email"] },
      { _type: "span", text: " or " },
      { _type: "span", text: CONTACT_PHONE, marks: ["phone"] },
      { _type: "span", text: "." },
    ],
    markDefs: [
      { _key: "email", _type: "link", href: `mailto:${CONTACT_EMAIL}` },
      { _key: "phone", _type: "link", href: `tel:${CONTACT_PHONE.replace(/[^+\d]/g, "")}` },
    ],
  };
}

const FALLBACK_BODY: PortableTextBlock[] = [
  p(
    "Emarat Realty (“Emarat Realty”, “we”, “us” or “our”) respects your privacy and is committed to protecting the personal information you share with us through this website. This Privacy Policy explains what information we collect, how we use it, and the choices you have."
  ),
  h2("1. Information We Collect"),
  p("We may collect the following categories of information when you use this website or contact us:"),
  li("Contact details you provide through enquiry, contact, or brochure-download forms, such as your name, phone number, email address, and message."),
  li("Project preferences, such as the configuration or property you are enquiring about."),
  li("Technical information collected automatically, such as IP address, browser type, device information, and pages visited, via cookies and similar technologies."),
  h2("2. How We Use Your Information"),
  p("We use the information we collect to:"),
  li("Respond to your enquiries and share project information, pricing, and availability."),
  li("Contact you by phone, email, or WhatsApp regarding your enquiry or shortlisted projects."),
  li("Improve our website, marketing, and customer experience."),
  li("Comply with applicable legal and regulatory requirements, including RERA."),
  h2("3. Cookies & Tracking Technologies"),
  p(
    "Our website uses cookies and similar technologies, including analytics tools such as Google Analytics, to understand how visitors use our site and to improve its performance. You can control or disable cookies through your browser settings; doing so may affect certain website features."
  ),
  h2("4. Sharing of Information"),
  p("We do not sell your personal information. We may share it with:"),
  li("Our internal sales, marketing, and customer relationship teams."),
  li("Trusted service providers who help us operate this website, send communications, or manage enquiries on our behalf, under confidentiality obligations."),
  li("Government or regulatory authorities where required by law."),
  h2("5. Data Security"),
  p(
    "We take reasonable technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security."
  ),
  h2("6. Your Rights & Choices"),
  p("Subject to applicable law, you may:"),
  li("Request access to, correction of, or deletion of the personal information we hold about you."),
  li("Opt out of marketing communications at any time by contacting us."),
  h2("7. Third-Party Links"),
  p(
    "Our website may contain links to third-party websites, including social media platforms and map services. We are not responsible for the privacy practices or content of those external websites."
  ),
  h2("8. Children's Privacy"),
  p("This website is not directed at children, and we do not knowingly collect personal information from children."),
  h2("9. Changes to This Policy"),
  p(
    "We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. The updated version will be posted on this page with a revised effective date."
  ),
  h2("10. Contact Us"),
  contactP(
    "If you have any questions about this Privacy Policy or how we handle your personal information, please contact us at"
  ),
];

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageContent("privacyPolicyPage");
  return buildMetadata(page?.seo, {
    title: "Privacy Policy | Emarat Realty",
    description:
      "Read Emarat Realty's Privacy Policy to understand how we collect, use, and protect your personal information.",
  });
}

export default async function PrivacyPolicyPage() {
  const { data } = await sanityFetch({ query: PRIVACY_POLICY_PAGE_QUERY, tags: ["privacyPolicyPage"] });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const c = (data as any) ?? {};
  const hero = mergeHero(c?.hero, HERO_FALLBACK);
  const effectiveDate = pickStr(c?.effectiveDate, "");
  const body = pickArr<PortableTextBlock>(c?.body, FALLBACK_BODY);

  return (
    <>
      <SiteNav />
      <main>
        <PageHero {...hero} />

        <section className="px-4 py-10 sm:px-6 sm:py-[50px] lg:px-10 lg:py-[100px]">
          <div className="mx-auto max-w-3xl">
            {effectiveDate && (
              <Reveal as="p" className="mb-8 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                {effectiveDate}
              </Reveal>
            )}
            <Reveal
              as="div"
              className="text-[color:var(--fg)]/85 lg:text-lg [&_p]:leading-relaxed [&_a]:text-[color:var(--accent)] [&_a]:underline"
            >
              {renderPortableText(body)}
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
