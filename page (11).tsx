import type { Metadata } from "next";
import BlogCard from "@/components/BlogCard";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Blog | CuratedStack",
  description: "Practical writing on building, shipping, and choosing the right tools.",
};

export const revalidate = 60;

async function getPosts() {
  return prisma.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    include: { category: true },
  });
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="container-page py-16">
      <div className="max-w-2xl mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">The Blog</h1>
        <p className="mt-3 text-gray-600">
          Notes on building, shipping, and picking tools that actually earn their keep.
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No posts published yet — check back soon.</p>
      )}
    </div>
  );
}
