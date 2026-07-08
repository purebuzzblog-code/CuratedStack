"use client";

import { useActionState } from "react";
import { Facebook, Twitter, Linkedin, Github, Youtube, Instagram } from "lucide-react";
import { saveFooter, type FormState } from "@/app/admin/actions";
import type { Footer } from "@prisma/client";

const initialState: FormState = { success: false, message: "" };

const fields = [
  { name: "facebook", label: "Facebook", Icon: Facebook },
  { name: "twitter", label: "Twitter", Icon: Twitter },
  { name: "linkedin", label: "LinkedIn", Icon: Linkedin },
  { name: "github", label: "GitHub", Icon: Github },
  { name: "youtube", label: "YouTube", Icon: Youtube },
  { name: "instagram", label: "Instagram", Icon: Instagram },
] as const;

export default function FooterForm({ footer }: { footer: Footer }) {
  const [state, formAction, isPending] = useActionState(saveFooter, initialState);

  return (
    <form action={formAction} className="space-y-5 max-w-lg">
      {fields.map(({ name, label, Icon }) => (
        <div key={name}>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Icon className="h-4 w-4" />
            {label}
          </label>
          <input
            name={name}
            defaultValue={footer[name] ?? ""}
            placeholder="https:// (leave blank to hide)"
            className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>
      ))}

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
