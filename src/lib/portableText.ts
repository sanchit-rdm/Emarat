import type { ReactNode } from "react";

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
}

export function renderPortableText(
  value: string | PortableTextBlock[] | undefined
): ReactNode {
  if (!value) return null;
  if (typeof value === "string") return value;

  return value.flatMap((block, blockIndex) => {
    if (!block || block._type !== "block" || !Array.isArray(block.children)) {
      return null;
    }

    const children = block.children.map((child, childIndex) => {
      const text = child.text || "";
      const marks = child.marks || [];
      const hrefMark = marks.find((mark) => mark !== "strong" && mark !== "em" && mark !== "code");

      let node: ReactNode = text;
      if (marks.includes("code")) node = <code key={`code-${blockIndex}-${childIndex}`}>{node}</code>;
      if (marks.includes("em")) node = <em key={`em-${blockIndex}-${childIndex}`}>{node}</em>;
      if (marks.includes("strong")) node = <strong key={`strong-${blockIndex}-${childIndex}`}>{node}</strong>;

      if (hrefMark && Array.isArray(block.markDefs)) {
        const linkDef = block.markDefs.find((def) => def._key === hrefMark);
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

    return [children, blockIndex < value.length - 1 ? <br key={`br-${blockIndex}`} /> : null];
  });
}
