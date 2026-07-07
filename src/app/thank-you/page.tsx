import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/sections/SiteFooter";
import ThankYouRedirect from "@/components/ThankYouRedirect";

export const metadata: Metadata = {
  title: "Thank You | Emarat Realty",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <>
      <SiteNav />
      <main>
        <ThankYouRedirect />
      </main>
      <SiteFooter />
    </>
  );
}
