"use client";

import { useActionState, useMemo, useState } from "react";
import Link from "next/link";
import { savePost, type FormState } from "@/app/admin/actions";
import { slugify, getWordCount, getReadingTime } from "@/lib/utils";
import type { Category, Post } from "@prisma/client";

const initialState: FormState = { success: false, message: "" };

export default function PostForm({
  post,
  categories,
}: {
  post?: Post | null;
  categories: Category[];
}) {
  const saveWithId = savePost.bind(null, post?.id ?? null);
  const [state, formAction, isPending] = useActionState(saveWithId, initialState);

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [slugTouched, setSlugTouched] = useState(!!post);

  const wordCount = useMemo(() => getWordCount(content), [content]);
  const readingTime = useMemo(() => getReadingTime(content), [content]);

  return (
    <form action={formAction} className="space-y-6 max-w-3xl">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (!slugTouched) setSlug(slugify(e.target.value));
          }}
          required
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Slug</label>
        <input
          name="slug"
          value={slug}
          onChange={(e) => {
            setSlug(slugify(e.target.value));
            setSlugTouched(true);
          }}
          required
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 font-mono text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
        <p className="mt-1 text-xs text-gray-400">/blog/{slug || "your-post-slug"}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Excerpt</label>
        <textarea
          name="excerpt"
          defaultValue={post?.excerpt ?? ""}
          rows={2}
          maxLength={300}
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Featured Image URL</label>
        <input
          name="featuredImage"
          defaultValue={post?.featuredImage ?? ""}
          placeholder="https://…"
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          name="categoryId"
          defaultValue={post?.categoryId ?? ""}
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        >
          <option value="">None</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">Content (HTML)</label>
          <span className="text-xs text-gray-400">
            {wordCount} words · {readingTime} min read
          </span>
        </div>
        <textarea
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={16}
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 font-mono text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
      </div>

      <fieldset className="rounded-lg border border-gray-200 p-4">
        <legend className="px-1 text-sm font-medium text-gray-700">SEO</legend>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600">SEO Title</label>
            <input
              name="seoTitle"
              defaultValue={post?.seoTitle ?? ""}
              maxLength={70}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">SEO Description</label>
            <textarea
              name="seoDescription"
              defaultValue={post?.seoDescription ?? ""}
              maxLength={160}
              rows={2}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
          </div>
        </div>
      </fieldset>

      <div className="flex flex-wrap items-center gap-3">
        <select
          name="status"
          defaultValue={post?.status ?? "DRAFT"}
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        >
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
        </select>

        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-60 transition-colors"
        >
          {isPending ? "Saving…" : "Save"}
        </button>

        {post && (
          <Link
            href={`/blog/${post.slug}`}
            target="_blank"
            className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 hover:border-brand-400 hover:text-brand-600 transition-colors"
          >
            Preview
          </Link>
        )}

        {state.message && (
          <span className={`text-sm ${state.success ? "text-green-600" : "text-red-600"}`}>
            {state.message}
          </span>
        )}
      </div>
    </form>
  );
}
