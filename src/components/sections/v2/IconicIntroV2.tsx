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
  const bgImage = "/images/Parallax.png";
  const line1 = labels?.line1?.trim() || "Life within reach";
  const line2 = labels?.line2?.trim() || "of every iconic landmark";

  return (
    <section className="relative isolate flex min-h-[100vh] items-center justify-center overflow-hidden px-4 py-10 sm:px-6">
      {/* Fixed background image — stays in place as page scrolls */}
      <div
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      />
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
