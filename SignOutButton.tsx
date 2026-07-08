"use client";

import { LogOut } from "lucide-react";
import { signOutAction } from "@/app/admin/actions";

export default function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
      >
        <LogOut className="h-4 w-4" />
        Sign out
      </button>
    </form>
  );
}
