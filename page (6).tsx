import { notFound } from "next/navigation";
import ToolForm from "@/components/admin/ToolForm";
import { prisma } from "@/lib/prisma";

export default async function EditToolPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tool = await prisma.tool.findUnique({ where: { id } });

  if (!tool) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Edit Tool</h1>
      <div className="mt-8">
        <ToolForm tool={tool} />
      </div>
    </div>
  );
}
