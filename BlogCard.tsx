import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { PostWithCategory } from "@/types";

export default function BlogCard({ post }: { post: PostWithCategory }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-gray-200 transition-all bg-white"
    >
      <div className="relative h-44 w-full bg-gray-100">
        {post.featuredImage ? (
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-300 text-sm">
            CuratedStack
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        {post.category && (
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-600 mb-2">
            {post.category.name}
          </span>
        )}
        <h3 className="font-bold text-lg text-gray-900 group-hover:text-brand-600 transition-colors">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="mt-2 text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
        )}
        <div className="mt-auto pt-4 flex items-center gap-3 text-xs text-gray-400">
          <span>{post.publishedAt ? formatDate(post.publishedAt) : formatDate(post.createdAt)}</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readingTime} min read
          </span>
        </div>
      </div>
    </Link>
  );
}
