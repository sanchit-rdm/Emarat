import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/sections/SiteFooter";
import { getPostBySlug } from "@/lib/sanity.client";
import { renderPortableText } from "@/lib/portableText";

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title ? `${post.title} — Emarat Realty` : "Emarat Realty",
    openGraph: post.mainImage?.asset?.url
      ? { images: [{ url: post.mainImage.asset.url }] }
      : undefined,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const img = post.mainImage?.asset?.url as string | undefined;
  const publishedAt = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <>
      <SiteNav />
      <main className="theme-light">
        {/* Hero image */}
        {img && (
          <div className="relative h-[55vh] min-h-[320px] w-full overflow-hidden">
            <Image
              src={img}
              alt={post.title ?? ""}
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ filter: "sepia(0.12) saturate(0.88) brightness(0.82)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}

        <article className="mx-auto max-w-[740px] px-4 py-10 sm:px-6 sm:py-[50px] lg:py-[100px]">
          {/* Meta */}
          <div className="mb-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
            {publishedAt && <span>{publishedAt}</span>}
          </div>

          <h1 className="font-display text-3xl leading-tight lg:text-5xl">
            {post.title}
          </h1>

          {post.body && (
            <div className="prose prose-neutral mt-10 max-w-none text-[color:var(--muted)] lg:text-lg [&_p]:leading-relaxed [&_p]:mt-5 first:[&_p]:mt-0 [&_strong]:text-[color:var(--fg)] [&_a]:text-[color:var(--accent)] [&_a]:underline">
              {renderPortableText(post.body)}
            </div>
          )}

          <div className="mt-16 border-t border-[color:var(--line)] pt-8">
            <a
              href="/blog"
              className="text-sm uppercase tracking-[0.2em] text-[color:var(--accent)] hover:underline"
            >
              ← Back to News
            </a>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
