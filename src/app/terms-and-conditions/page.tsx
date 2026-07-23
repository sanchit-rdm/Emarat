import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/sections/SiteFooter";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import { renderPortableText, type PortableTextBlock } from "@/lib/portableText";
import { sanityFetch } from "@/sanity/lib/live";
import { TERMS_PAGE_QUERY } from "@/sanity/lib/queries";
import { getPageContent, mergeHero, buildMetadata, pickStr, pickArr } from "@/sanity/lib/page";

export const dynamic = "force-dynamic";

const HERO_FALLBACK = {
  eyebrow: "Legal",
  titleTop: "Terms &",
  titleBottom: "Conditions.",
  subtitle: "The terms that govern your use of the Emarat Realty website.",
  trailing: "",
  bgImage: "/images/alameda-powder-room.webp",
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
    "These Terms & Conditions (“Terms”) govern your access to and use of the Emarat Realty website. By accessing or using this website, you agree to be bound by these Terms. If you do not agree, please do not use this website."
  ),
  h2("1. Acceptance of Terms"),
  p(
    "Your continued use of this website constitutes acceptance of these Terms and any updates we may make to them from time to time."
  ),
  h2("2. Use of This Website"),
  p("You agree to use this website only for lawful purposes. You must not:"),
  li("Use the website in any way that could damage, disable, or impair it, or interfere with any other party's use."),
  li("Attempt to gain unauthorised access to any part of the website, servers, or databases connected to it."),
  li("Copy, reproduce, or republish content from this website without our prior written consent."),
  h2("3. Project Information & RERA Disclaimer"),
  p(
    "All project details, images, floor plans, specifications, and renders on this website are indicative and for general information purposes only. They are subject to change without prior notice and do not constitute an offer, warranty, or contract of any kind. Prospective buyers are advised to independently verify project details and RERA registration numbers on the relevant state RERA website before making any decision."
  ),
  h2("4. No Offer or Booking Through This Website"),
  p(
    "Nothing on this website constitutes a legal offer, and no booking, reservation, or sale is concluded through this website. Any booking is subject to a separate written agreement executed between Emarat Realty and the buyer, along with applicable terms, payment schedules, and regulatory approvals."
  ),
  h2("5. Intellectual Property"),
  p(
    "All content on this website, including text, graphics, logos, images, and design, is the property of Emarat Realty or its licensors and is protected by applicable intellectual property laws. No content may be used without our prior written permission."
  ),
  h2("6. Third-Party Links"),
  p(
    "This website may contain links to third-party websites for your convenience. We do not endorse and are not responsible for the content, accuracy, or practices of any linked third-party website."
  ),
  h2("7. Limitation of Liability"),
  p(
    "To the fullest extent permitted by law, Emarat Realty shall not be liable for any direct, indirect, incidental, or consequential loss or damage arising from your use of, or inability to use, this website or reliance on any information contained on it."
  ),
  h2("8. Indemnification"),
  p(
    "You agree to indemnify and hold Emarat Realty harmless from any claims, losses, or damages arising out of your misuse of this website or violation of these Terms."
  ),
  h2("9. Governing Law & Jurisdiction"),
  p(
    "These Terms are governed by the laws of India, and any disputes arising from them shall be subject to the exclusive jurisdiction of the courts at Gurugram, Haryana."
  ),
  h2("10. Changes to These Terms"),
  p(
    "We may revise these Terms at any time by updating this page. Please review this page periodically to stay informed of any changes."
  ),
  h2("11. Contact Us"),
  contactP("If you have any questions about these Terms & Conditions, please contact us at"),
];

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageContent("termsPage");
  return buildMetadata(page?.seo, {
    title: "Terms & Conditions | Emarat Realty",
    description: "Read the Terms & Conditions that govern your use of the Emarat Realty website.",
  });
}

export default async function TermsAndConditionsPage() {
  const { data } = await sanityFetch({ query: TERMS_PAGE_QUERY, tags: ["termsPage"] });
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
