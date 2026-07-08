import PostForm from "@/components/admin/PostForm";
import { prisma } from "@/lib/prisma";

export default async function NewPostPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">New Post</h1>
      <div className="mt-8">
        <PostForm categories={categories} />
      </div>
    </div>
  );
}
