import AdminSidebar from "@/components/AdminSidebar";
import { requireAdminRedirectIfMissing } from "@/app/admin/actions";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Belt-and-suspenders check in addition to middleware.
  await requireAdminRedirectIfMissing();

  return (
    <div className="flex min-h-screen flex-col sm:flex-row bg-gray-50/50">
      <AdminSidebar />
      <div className="flex-1 p-6 sm:p-10">{children}</div>
    </div>
  );
}
