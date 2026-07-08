"use client";

import { useActionState, useState } from "react";
import { saveTool, type FormState } from "@/app/admin/actions";
import { slugify } from "@/lib/utils";
import type { Tool } from "@prisma/client";

const initialState: FormState = { success: false, message: "" };

export default function ToolForm({ tool }: { tool?: Tool | null }) {
  const saveWithId = saveTool.bind(null, tool?.id ?? null);
  const [state, formAction, isPending] = useActionState(saveWithId, initialState);

  const [name, setName] = useState(tool?.name ?? "");
  const [slug, setSlug] = useState(tool?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!tool);

  return (
    <form action={formAction} className="space-y-6 max-w-xl">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
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
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          defaultValue={tool?.description ?? ""}
          required
          rows={3}
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <input
          name="category"
          defaultValue={tool?.category ?? ""}
          required
          placeholder="e.g. Productivity"
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Affiliate URL</label>
        <input
          name="affiliateUrl"
          defaultValue={tool?.affiliateUrl ?? "https://example.com?ref=curatedstack"}
          required
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 font-mono text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Logo URL</label>
        <input
          name="logo"
          defaultValue={tool?.logo ?? ""}
          placeholder="https://…"
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={tool?.featured ?? false}
            className="rounded border-gray-300 text-brand-600 focus:ring-brand-500"
          />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            name="visible"
            defaultChecked={tool?.visible ?? true}
            className="rounded border-gray-300 text-brand-600 focus:ring-brand-500"
          />
          Visible
        </label>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-60 transition-colors"
        >
          {isPending ? "Saving…" : "Save"}
        </button>
        {state.message && (
          <span className={`text-sm ${state.success ? "text-green-600" : "text-red-600"}`}>
            {state.message}
          </span>
        )}
      </div>
    </form>
  );
}
