import type { Metadata } from "next";
import ToolCard from "@/components/ToolCard";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "The Stack | CuratedStack",
  description: "The tools we actually use and recommend for building and shipping projects.",
};

export const revalidate = 60;

async function getTools() {
  return prisma.tool.findMany({
    where: { visible: true },
    orderBy: [{ featured: "desc" }, { name: "asc" }],
  });
}

export default async function StackPage() {
  const tools = await getTools();

  return (
    <div className="container-page py-16">
      <div className="max-w-2xl mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">The Stack</h1>
        <p className="mt-3 text-gray-600">
          A short, curated list of tools we use ourselves. Some links are affiliate links —
          see our{" "}
          <a href="/privacy" className="text-brand-600 underline underline-offset-2">
            privacy policy
          </a>{" "}
          for details.
        </p>
      </div>

      {tools.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No tools listed yet — check back soon.</p>
      )}
    </div>
  );
}
