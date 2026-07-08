"use client";

import { useActionState } from "react";
import { saveSettings, type FormState } from "@/app/admin/actions";
import type { Settings } from "@prisma/client";

const initialState: FormState = { success: false, message: "" };

export default function SettingsForm({ settings }: { settings: Settings }) {
  const [state, formAction, isPending] = useActionState(saveSettings, initialState);

  return (
    <form action={formAction} className="space-y-5 max-w-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700">Site Title</label>
        <input
          name="siteTitle"
          defaultValue={settings.siteTitle}
          required
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Logo URL</label>
        <input
          name="logoUrl"
          defaultValue={settings.logoUrl}
          placeholder="https://…"
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Favicon URL</label>
        <input
          name="faviconUrl"
          defaultValue={settings.faviconUrl}
          placeholder="https://…"
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Default SEO Title</label>
        <input
          name="defaultSeoTitle"
          defaultValue={settings.defaultSeoTitle}
          maxLength={70}
          required
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Default SEO Description
        </label>
        <textarea
          name="defaultSeoDescription"
          defaultValue={settings.defaultSeoDescription}
          maxLength={160}
          rows={3}
          required
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Analytics Measurement ID
        </label>
        <input
          name="analyticsId"
          defaultValue={settings.analyticsId}
          placeholder="G-XXXXXXXXXX"
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 font-mono text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
      </div>

      <div className="flex items-center gap-3 pt-2">
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
