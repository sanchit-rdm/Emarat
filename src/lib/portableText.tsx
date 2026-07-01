import Image from "next/image";
import type { ReactNode } from "react";
import { urlFor } from "@/sanity/lib/image";
import type { Image as SanityImage } from "sanity";

export interface PortableTextSpan {
  _type?: string;
  text?: string;
  marks?: string[];
}

export interface PortableTextBlock {
  _type?: string;
  style?: string;
  children?: PortableTextSpan[];
  markDefs?: Array<{ _key?: string; _type?: string; href?: string }>;
  // image block fields
  asset?: { _type?: string; _ref?: string; url?: string };
}

/**
 * Flatten Portable Text (or a plain string) to a plain string. Used for the
 * animated display headings (SplitReveal), which split text word-by-word and
 * therefore need a string, not formatted nodes.
 */
export function toPlainText(
  value: string | PortableTextBlock[] | undefined
): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value
    .map((block) =>
      block && block._type === "block" && Array.isArray(block.children)
        ? block.children.map((child) => child.text || "").join("")
        : ""
    )
    .join("\n")
    .trim();
}

const HEADING_STYLES = new Set(["h1", "h2", "h3", "h4", "h5", "h6"]);
const HEADING_CLASSES: Record<string, string> = {
  h1: "font-display text-3xl lg:text-5xl mt-10 mb-4",
  h2: "font-display text-2xl lg:text-4xl mt-10 mb-4",
  h3: "font-display text-xl lg:text-3xl mt-8 mb-3",
  h4: "font-display text-lg lg:text-2xl mt-6 mb-2",
  h5: "font-display text-base lg:text-xl mt-4 mb-2",
  h6: "font-display text-base mt-4 mb-2",
};

function renderSpans(
  children: PortableTextSpan[],
  markDefs: Array<{ _key?: string; _type?: string; href?: string }>,
  blockIndex: number
): ReactNode[] {
  return children.map((child, childIndex) => {
    const text = child.text || "";
    const marks = child.marks || [];
    const hrefMark = marks.find(
      (mark) => mark !== "strong" && mark !== "em" && mark !== "code"
    );

    let node: ReactNode = text;
    if (marks.includes("code"))
      node = <code key={`code-${blockIndex}-${childIndex}`}>{node}</code>;
    if (marks.includes("em"))
      node = <em key={`em-${blockIndex}-${childIndex}`}>{node}</em>;
    if (marks.includes("strong"))
      node = (
        <strong key={`strong-${blockIndex}-${childIndex}`}>{node}</strong>
      );

    if (hrefMark) {
      const linkDef = markDefs.find((def) => def._key === hrefMark);
      if (linkDef?.href) {
        node = (
          <a
            key={`link-${blockIndex}-${childIndex}`}
            href={linkDef.href}
            target="_blank"
            rel="noreferrer noopener"
            className="underline"
          >
            {node}
          </a>
        );
      }
    }

    return <span key={`span-${blockIndex}-${childIndex}`}>{node}</span>;
  });
}

export function renderPortableText(
  value: string | PortableTextBlock[] | undefined
): ReactNode {
  if (!value) return null;
  if (typeof value === "string") return <p>{value}</p>;

  return value.map((block, blockIndex) => {
    if (!block) return null;

    // Inline image block uploaded by the importer
    if (block._type === "image") {
      let imgSrc: string | null = null;
      try {
        // Prefer pre-resolved url, fall back to building from asset ref
        if ((block as { asset?: { url?: string } }).asset?.url) {
          imgSrc = (block as { asset: { url: string } }).asset.url;
        } else if (block.asset?._ref) {
          imgSrc = urlFor(block as unknown as SanityImage).url();
        }
      } catch {
        imgSrc = null;
      }
      if (!imgSrc) return null;
      return (
        <div
          key={`img-${blockIndex}`}
          className="relative my-8 aspect-[16/9] w-full overflow-hidden rounded-md"
        >
          <Image
            src={imgSrc}
            alt=""
            fill
            sizes="(min-width: 740px) 740px, 100vw"
            className="object-cover"
          />
        </div>
      );
    }

    if (block._type !== "block" || !Array.isArray(block.children)) return null;

    const style = block.style || "normal";
    const spans = renderSpans(
      block.children,
      block.markDefs ?? [],
      blockIndex
    );

    if (HEADING_STYLES.has(style)) {
      const Tag = style as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
      return (
        <Tag key={`block-${blockIndex}`} className={HEADING_CLASSES[style]}>
          {spans}
        </Tag>
      );
    }

    if (style === "blockquote") {
      return (
        <blockquote
          key={`block-${blockIndex}`}
          className="my-6 border-l-4 border-[color:var(--accent)] pl-5 italic text-[color:var(--muted)]"
        >
          {spans}
        </blockquote>
      );
    }

    return (
      <p key={`block-${blockIndex}`} className="mt-5 first:mt-0">
        {spans}
      </p>
    );
  });
}
