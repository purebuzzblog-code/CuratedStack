import Link from "next/link";
import { Plus, Pencil, Trash2, Wrench } from "lucide-react";
import { prisma } from "@/lib/prisma";
import {
  deleteTool,
  toggleToolVisibility,
  toggleToolFeatured,
} from "@/app/admin/actions";

export const dynamic = "force-dynamic";

async function getTools() {
  return prisma.tool.findMany({ orderBy: { createdAt: "desc" } });
}

export default async function AdminToolsPage() {
  const tools = await getTools();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tools</h1>
          <p className="mt-1 text-gray-500 text-sm">{tools.length} total</p>
        </div>
        <Link
          href="/admin/tools/new"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Tool
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-xl border border-gray-100 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-100 bg-gray-50 text-left text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Featured</th>
              <th className="px-4 py-3 font-medium">Visible</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tools.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                  <Wrench className="mx-auto h-6 w-6 mb-2" />
                  No tools yet.
                </td>
              </tr>
            )}
            {tools.map((tool) => (
              <tr key={tool.id} className="border-b border-gray-50 last:border-none">
                <td className="px-4 py-3 font-medium text-gray-900">{tool.name}</td>
                <td className="px-4 py-3 text-gray-500">{tool.category}</td>
                <td className="px-4 py-3">
                  <form
                    action={async () => {
                      "use server";
                      await toggleToolFeatured(tool.id, !tool.featured);
                    }}
                  >
                    <button
                      type="submit"
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        tool.featured
                          ? "bg-brand-50 text-brand-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {tool.featured ? "Featured" : "Not featured"}
                    </button>
                  </form>
                </td>
                <td className="px-4 py-3">
                  <form
                    action={async () => {
                      "use server";
                      await toggleToolVisibility(tool.id, !tool.visible);
                    }}
                  >
                    <button
                      type="submit"
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        tool.visible
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {tool.visible ? "Visible" : "Hidden"}
                    </button>
                  </form>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/tools/${tool.id}`}
                      className="text-gray-400 hover:text-brand-600"
                      title="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await deleteTool(tool.id);
                      }}
                    >
                      <button
                        type="submit"
                        className="text-gray-400 hover:text-red-600"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
