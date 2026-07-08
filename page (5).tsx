import ToolForm from "@/components/admin/ToolForm";

export default function NewToolPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">New Tool</h1>
      <div className="mt-8">
        <ToolForm />
      </div>
    </div>
  );
}
