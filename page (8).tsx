import { FileText, CheckCircle2, PenLine, Wrench, Star, Eye } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getStats() {
  const [totalPosts, publishedPosts, draftPosts, totalTools, featuredTools, visibleTools] =
    await Promise.all([
      prisma.post.count(),
      prisma.post.count({ where: { status: "PUBLISHED" } }),
      prisma.post.count({ where: { status: "DRAFT" } }),
      prisma.tool.count(),
      prisma.tool.count({ where: { featured: true } }),
      prisma.tool.count({ where: { visible: true } }),
    ]);

  return { totalPosts, publishedPosts, draftPosts, totalTools, featuredTools, visibleTools };
}

export default async function AdminDashboardPage() {
  const stats = await getStats();

  const cards = [
    { label: "Total Posts", value: stats.totalPosts, Icon: FileText },
    { label: "Published Posts", value: stats.publishedPosts, Icon: CheckCircle2 },
    { label: "Draft Posts", value: stats.draftPosts, Icon: PenLine },
    { label: "Total Tools", value: stats.totalTools, Icon: Wrench },
    { label: "Featured Tools", value: stats.featuredTools, Icon: Star },
    { label: "Visible Tools", value: stats.visibleTools, Icon: Eye },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <p className="mt-1 text-gray-500 text-sm">An overview of your content.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ label, value, Icon }) => (
          <div
            key={label}
            className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-6"
          >
            <div>
              <p className="text-sm text-gray-500">{label}</p>
              <p className="mt-1 text-3xl font-bold text-gray-900">{value}</p>
            </div>
            <Icon className="h-8 w-8 text-brand-500" />
          </div>
        ))}
      </div>
    </div>
  );
}
