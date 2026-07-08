import FooterForm from "@/components/admin/FooterForm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminFooterPage() {
  const footer = await prisma.footer.upsert({
    where: { id: "footer" },
    update: {},
    create: { id: "footer" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Footer</h1>
      <p className="mt-1 text-gray-500 text-sm">
        Social links left empty are automatically hidden from the site footer.
      </p>
      <div className="mt-8">
        <FooterForm footer={footer} />
      </div>
    </div>
  );
}
