/**
 * One-off import of the legacy emaratrealty.com blog (19 posts) into Sanity.
 *
 * Source:  local RSS export file (emaratrealty_all_blogs.xml).
 *          Pass the path as the first non-flag argument, or set XML_PATH env var.
 *          Defaults to ~/Downloads/emaratrealty_all_blogs.xml.
 * Target:  `post` documents (title, slug, publishedAt, excerpt, body=blockContent).
 *
 * The post body HTML is converted to Portable Text with @portabletext/block-tools,
 * and every inline <img> is downloaded from the old site and re-uploaded as a Sanity
 * asset (so nothing hot-links to a domain that's going away).
 *
 * Deterministic _id (`post.<slug>`) => safe to re-run; it overwrites, never duplicates.
 *
 * DRY RUN by default (parses + reports, writes nothing). Add --write to commit.
 *
 *   # 1. install the two helper libs (one time)
 *   npm install -D @portabletext/block-tools jsdom @sanity/schema
 *
 *   # 2. an Editor token: sanity.io/manage -> project -> API -> Tokens
 *   #    PowerShell:  $env:SANITY_TOKEN = "sk..."
 *
 *   # 3. preview (no writes)
 *   npx sanity exec scripts/import-emarat-blog.ts
 *
 *   # 4. commit for real
 *   npx sanity exec scripts/import-emarat-blog.ts -- --write
 */
import { createClient } from "@sanity/client";
import { htmlToBlocks } from "@portabletext/block-tools";
import { JSDOM } from "jsdom";
import { Schema } from "@sanity/schema";
import { readFileSync } from "fs";
import { homedir } from "os";
import { join } from "path";

const WRITE = process.argv.includes("--write");

// Accept path as first non-flag CLI arg, XML_PATH env var, or default location
const xmlPathArg = process.argv.slice(2).find((a) => !a.startsWith("-"));
const XML_PATH =
  xmlPathArg ||
  process.env.XML_PATH ||
  join(homedir(), "Downloads", "emaratrealty_all_blogs.xml");

const token = process.env.SANITY_TOKEN;
if (WRITE && !token) {
  throw new Error("Set SANITY_TOKEN before running with --write.");
}

const client = createClient({
  projectId: "k6lgt7ii",
  dataset: "production",
  apiVersion: "2024-05-25",
  useCdn: false,
  token,
});

// A self-contained copy of the project's `blockContent` shape (same styles, marks,
// lists, and link annotation as sanity/schemaTypes/blockContentType.ts). The plain
// `image` member here avoids the hotspot type-resolution that a standalone compile
// can't satisfy — inline images are emitted by the custom deserializer below.
const compiled = Schema.compile({
  name: "default",
  types: [
    {
      title: "Block Content",
      name: "blockContent",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "H5", value: "h5" },
            { title: "H6", value: "h6" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [{ title: "Bullet", value: "bullet" }],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                title: "URL",
                name: "link",
                type: "object",
                fields: [{ title: "URL", name: "href", type: "url" }],
              },
            ],
          },
        },
      ],
    },
  ],
});
const blockContentSchema = compiled.get("blockContent");

// ── tiny helpers ────────────────────────────────────────────────────────────
function decodeEntities(s: string): string {
  return s
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .trim();
}

function tag(item: string, name: string): string {
  const m = item.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`));
  return m ? m[1] : "";
}

function slugify(title: string): string {
  return decodeEntities(title)
    .toLowerCase()
    .replace(/['’"“”]/g, "") // drop apostrophes/quotes so words stay joined
    .replace(/[^a-z0-9]+/g, "-") // everything else -> hyphen
    .replace(/^-+|-+$/g, "")
    .slice(0, 96)
    .replace(/-+$/g, "");
}

// ── source ──────────────────────────────────────────────────────────────────
type Post = {
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  html: string;
  wpUrl: string; // original WordPress post URL — used to scrape og:image
};

// Extract the WordPress slug from the post's <link> URL (most canonical slug).
// Falls back to slugifying the title if the URL can't be parsed.
function extractSlug(item: string): string {
  const link = tag(item, "link").trim();
  if (link) {
    // URL pattern: .../blog/<slug>/
    const m = link.match(/\/blog\/([^/]+)\/?$/);
    if (m) return m[1];
  }
  const title = decodeEntities(tag(item, "title"));
  return slugify(title);
}

function readPosts(): Post[] {
  console.log(`Reading XML from: ${XML_PATH}\n`);
  const xml = readFileSync(XML_PATH, "utf-8");
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) || [];
  return items.map((item) => {
    const title = decodeEntities(tag(item, "title"));
    const html = tag(item, "content:encoded").replace(/^<!\[CDATA\[|\]\]>$/g, "");
    const excerpt = decodeEntities(tag(item, "description"))
      .replace(/<[^>]+>/g, "")
      .replace(/\[…\]|\[&hellip;\]/g, "…")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 300);
    const pub = tag(item, "pubDate");
    return {
      title,
      slug: extractSlug(item),
      publishedAt: pub ? new Date(pub).toISOString() : new Date().toISOString(),
      excerpt,
      html,
      wpUrl: tag(item, "link").trim(),
    };
  });
}

// ── image upload (cached by URL) ─────────────────────────────────────────────
const imageCache = new Map<string, string>(); // url -> asset._id

async function uploadImage(url: string): Promise<string | null> {
  if (imageCache.has(url)) return imageCache.get(url)!;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const asset = await client.assets.upload("image", buf, {
      filename: decodeURIComponent(url.split("/").pop() || "image"),
    });
    imageCache.set(url, asset._id);
    return asset._id;
  } catch (e) {
    console.warn(`    ! image failed (${url}): ${(e as Error).message}`);
    return null;
  }
}

// ── og:image scraper ─────────────────────────────────────────────────────────
// WordPress sets og:image to the post's featured image. We fetch the post
// page, parse out that tag, then re-upload the image as a Sanity asset.
async function fetchOgImageAssetId(postUrl: string): Promise<string | null> {
  try {
    const res = await fetch(postUrl, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    const m = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
              ?? html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
    if (!m) {
      console.warn(`    ! no og:image found at ${postUrl}`);
      return null;
    }
    return await uploadImage(m[1]);
  } catch (e) {
    console.warn(`    ! og:image fetch failed (${postUrl}): ${(e as Error).message}`);
    return null;
  }
}

// ── HTML -> Portable Text ─────────────────────────────────────────────────────
async function htmlToPortableText(html: string): Promise<unknown[]> {
  // Pre-upload every inline image so the deserializer can reference the asset.
  const dom = new JSDOM(html);
  const urls = [...dom.window.document.querySelectorAll("img")]
    .map((img) => img.getAttribute("src"))
    .filter((s): s is string => !!s);

  const refs = new Map<string, string>();
  if (WRITE) {
    for (const u of [...new Set(urls)]) {
      const id = await uploadImage(u);
      if (id) refs.set(u, id);
    }
  }

  return htmlToBlocks(html, blockContentSchema, {
    parseHtml: (h) => new JSDOM(h).window.document,
    rules: [
      {
        deserialize(el, _next, block) {
          const node = el as HTMLElement;
          if (node.tagName?.toLowerCase() === "img") {
            const src = node.getAttribute("src") || "";
            const ref = refs.get(src);
            if (!ref) return undefined; // dry run, or upload failed -> skip
            return block({
              _type: "image",
              asset: { _type: "reference", _ref: ref },
            });
          }
          return undefined; // fall through to default handling
        },
      },
    ],
  }) as unknown[];
}

// ── main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`Mode: ${WRITE ? "WRITE (committing to production)" : "DRY RUN (no writes)"}\n`);
  const posts = readPosts();
  console.log(`Parsed ${posts.length} posts from the XML file.\n`);

  let i = 0;
  for (const p of posts) {
    i++;
    const body = await htmlToPortableText(p.html);
    const imgCount = body.filter((b) => (b as { _type?: string })._type === "image").length;

    // Scrape the WordPress post page for its featured image (og:image).
    // In dry-run mode we still fetch + log the URL so you can verify before writing.
    let mainImageAssetId: string | null = null;
    if (p.wpUrl) {
      console.log(`    fetching og:image from ${p.wpUrl} …`);
      if (WRITE) {
        mainImageAssetId = await fetchOgImageAssetId(p.wpUrl);
      } else {
        // Dry-run: just probe the page and report what we'd use
        try {
          const res = await fetch(p.wpUrl, { headers: { "User-Agent": "Mozilla/5.0" } });
          const html = await res.text();
          const m = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
                    ?? html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
          if (m) console.log(`    og:image → ${m[1]}`);
          else console.warn(`    ! no og:image found`);
        } catch (e) {
          console.warn(`    ! probe failed: ${(e as Error).message}`);
        }
      }
    }

    console.log(
      `${String(i).padStart(2)}. ${p.title}\n` +
        `    slug: ${p.slug}  |  date: ${p.publishedAt.slice(0, 10)}  |  blocks: ${body.length}  |  images: ${imgCount}  |  mainImage: ${mainImageAssetId ?? (WRITE ? "none" : "dry-run")}`
    );

    if (WRITE) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const doc: Record<string, any> = {
        _id: `post.${p.slug}`,
        _type: "post",
        title: p.title,
        slug: { _type: "slug", current: p.slug },
        publishedAt: p.publishedAt,
        excerpt: p.excerpt,
        body,
      };
      if (mainImageAssetId) {
        doc.mainImage = {
          _type: "image",
          asset: { _type: "reference", _ref: mainImageAssetId },
        };
      }
      await client.createOrReplace(doc);
      console.log(`    ✓ written as post.${p.slug}`);
    }
  }

  console.log(
    `\n${WRITE ? "Imported" : "Would import"} ${posts.length} posts.` +
      (WRITE ? "" : "  Re-run with  -- --write  to commit.")
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
