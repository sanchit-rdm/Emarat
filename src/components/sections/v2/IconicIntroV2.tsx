import Reveal from "@/components/motion/Reveal";

type SanityPlace = { _key?: string; image?: string | null };
interface LocationData {
  eyebrow?: string;
  places?: SanityPlace[];
}
interface IconicLabels {
  line1?: string;
  line2?: string;
  watermark?: string;
  ctaLabel?: string;
  ctaHref?: string;
}
interface Props { data?: LocationData; labels?: IconicLabels }

export default function IconicIntroV2({ data, labels }: Props) {
  const line1 = labels?.line1?.trim() || "Life within reach";
  const line2 = labels?.line2?.trim() || "of every iconic landmark";

  return (
    <section className="relative isolate flex min-h-[100vh] items-center justify-center overflow-hidden px-4 py-10 sm:px-6">
      {/* Background image. Sized per breakpoint (a media-gated CSS background
          only downloads the matching file) and fixed-attachment only on
          desktop: fixed backgrounds force whole-layer repaints on phones and
          iOS Safari mishandles them. */}
      <style>{`
        #iconic-bg { background-image: url("/images/parallax-bg-mobile.webp"); }
        @media (min-width: 1024px) and (pointer: fine) {
          #iconic-bg {
            background-image: url("/images/parallax-bg.webp");
            background-attachment: fixed;
          }
        }
      `}</style>
      <div id="iconic-bg" className="pointer-events-none absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat" />
      {/* Plain dark overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[#01472E]/70" />

      {/* Headline */}
      <Reveal className="relative z-10 text-center">
        <h2 className="font-display mx-auto max-w-4xl text-[clamp(2.25rem,6.5vw,5.5rem)] leading-[1.08] tracking-[1px]">
          <span className="block">{line1}</span>
          <span className="block text-[color:var(--accent)]">{line2}</span>
        </h2>
      </Reveal>
    </section>
  );
}
