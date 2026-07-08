import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import BlogCard from "@/components/BlogCard";
import ToolCard from "@/components/ToolCard";
import Newsletter from "@/components/Newsletter";
import CTA from "@/components/CTA";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

async function getLatestPosts() {
  return prisma.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    take: 3,
    include: { category: true },
  });
}

async function getFeaturedTools() {
  return prisma.tool.findMany({
    where: { featured: true, visible: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  });
}

export default async function HomePage() {
  const [posts, tools] = await Promise.all([getLatestPosts(), getFeaturedTools()]);

  return (
    <>
      <Hero />

      <section className="container-page py-16">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Latest from the blog</h2>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {posts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No posts published yet — check back soon.</p>
        )}
      </section>

      <section className="bg-gray-50 border-y border-gray-100">
        <div className="container-page py-16">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Featured in The Stack</h2>
            <Link
              href="/stack"
              className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {tools.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No featured tools yet.</p>
          )}
        </div>
      </section>

      <Newsletter />
      <CTA />
    </>
  );
}
