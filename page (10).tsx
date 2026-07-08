import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, Info } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import ShareButtons from "@/components/ShareButtons";

export const revalidate = 60;

async function getPost(slug: string) {
  return prisma.post.findUnique({
    where: { slug },
    include: { category: true },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  return {
    title: post.seoTitle || `${post.title} | CuratedStack`,
    description: post.seoDescription || post.excerpt || undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post || post.status !== "PUBLISHED") {
    notFound();
  }

  const url = `https://curatedstack.example.com/blog/${post.slug}`;

  return (
    <article className="container-page max-w-3xl py-16">
      {post.category && (
        <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
          {post.category.name}
        </span>
      )}
      <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900">{post.title}</h1>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
        <span>{formatDate(post.publishedAt ?? post.createdAt)}</span>
        <span className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          {post.readingTime} min read
        </span>
        <span>{post.wordCount} words</span>
      </div>

      {post.featuredImage && (
        <div className="relative mt-8 h-72 sm:h-96 w-full overflow-hidden rounded-xl bg-gray-100">
          <Image src={post.featuredImage} alt={post.title} fill className="object-cover" />
        </div>
      )}

      <div className="mt-6 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
        <p>
          Affiliate disclosure: some links in this post are affiliate links. If you buy
          through them, CuratedStack may earn a commission at no extra cost to you.
        </p>
      </div>

      <div
        className="prose-content mt-8"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="mt-10 border-t border-gray-100 pt-8">
        <ShareButtons title={post.title} url={url} />
      </div>
    </article>
  );
}
