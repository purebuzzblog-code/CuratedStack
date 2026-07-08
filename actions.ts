"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signOut, auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { postSchema, toolSchema, footerSchema, settingsSchema } from "@/lib/validations";
import { getWordCount, getReadingTime } from "@/lib/utils";

export async function signOutAction() {
  await signOut({ redirectTo: "/admin/login" });
}

async function logActivity(action: string, entity: string, entityId?: string, detail?: string) {
  const session = await auth();
  await prisma.activityLog.create({
    data: {
      action,
      entity,
      entityId,
      detail,
      userId: session?.user ? (session.user as { id?: string }).id : undefined,
    },
  });
}

// ---------------------------------------------------------------------------
// Posts
// ---------------------------------------------------------------------------

export type FormState = { success: boolean; message: string };

export async function savePost(
  postId: string | null,
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = postSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt") ?? "",
    content: formData.get("content"),
    status: formData.get("status"),
    featuredImage: formData.get("featuredImage") ?? "",
    seoTitle: formData.get("seoTitle") ?? "",
    seoDescription: formData.get("seoDescription") ?? "",
    categoryId: formData.get("categoryId") ?? "",
  });

  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const data = parsed.data;
  const wordCount = getWordCount(data.content);
  const readingTime = getReadingTime(data.content);

  const payload = {
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt || null,
    content: data.content,
    status: data.status,
    featuredImage: data.featuredImage || null,
    seoTitle: data.seoTitle || null,
    seoDescription: data.seoDescription || null,
    categoryId: data.categoryId || null,
    wordCount,
    readingTime,
    publishedAt: data.status === "PUBLISHED" ? new Date() : null,
  };

  try {
    if (postId) {
      await prisma.post.update({ where: { id: postId }, data: payload });
      await logActivity("post.updated", "Post", postId);
    } else {
      const created = await prisma.post.create({ data: payload });
      await logActivity("post.created", "Post", created.id);
    }
  } catch {
    return { success: false, message: "A post with that slug already exists." };
  }

  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  return { success: true, message: "Post saved." };
}

export async function deletePost(postId: string) {
  await prisma.post.delete({ where: { id: postId } });
  await logActivity("post.deleted", "Post", postId);
  revalidatePath("/admin/posts");
  revalidatePath("/blog");
}

export async function togglePostStatus(postId: string, status: "DRAFT" | "PUBLISHED") {
  await prisma.post.update({
    where: { id: postId },
    data: { status, publishedAt: status === "PUBLISHED" ? new Date() : null },
  });
  await logActivity(status === "PUBLISHED" ? "post.published" : "post.unpublished", "Post", postId);
  revalidatePath("/admin/posts");
  revalidatePath("/blog");
}

// ---------------------------------------------------------------------------
// Tools
// ---------------------------------------------------------------------------

export async function saveTool(
  toolId: string | null,
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = toolSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    category: formData.get("category"),
    affiliateUrl: formData.get("affiliateUrl"),
    logo: formData.get("logo") ?? "",
    featured: formData.get("featured") === "on",
    visible: formData.get("visible") === "on",
  });

  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const data = parsed.data;

  try {
    if (toolId) {
      await prisma.tool.update({ where: { id: toolId }, data: { ...data, logo: data.logo || null } });
      await logActivity("tool.updated", "Tool", toolId);
    } else {
      const created = await prisma.tool.create({ data: { ...data, logo: data.logo || null } });
      await logActivity("tool.created", "Tool", created.id);
    }
  } catch {
    return { success: false, message: "A tool with that slug already exists." };
  }

  revalidatePath("/admin/tools");
  revalidatePath("/stack");
  return { success: true, message: "Tool saved." };
}

export async function deleteTool(toolId: string) {
  await prisma.tool.delete({ where: { id: toolId } });
  await logActivity("tool.deleted", "Tool", toolId);
  revalidatePath("/admin/tools");
  revalidatePath("/stack");
}

export async function toggleToolVisibility(toolId: string, visible: boolean) {
  await prisma.tool.update({ where: { id: toolId }, data: { visible } });
  await logActivity(visible ? "tool.shown" : "tool.hidden", "Tool", toolId);
  revalidatePath("/admin/tools");
  revalidatePath("/stack");
}

export async function toggleToolFeatured(toolId: string, featured: boolean) {
  await prisma.tool.update({ where: { id: toolId }, data: { featured } });
  await logActivity(featured ? "tool.featured" : "tool.unfeatured", "Tool", toolId);
  revalidatePath("/admin/tools");
  revalidatePath("/stack");
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

export async function saveFooter(_prevState: FormState, formData: FormData): Promise<FormState> {
  const parsed = footerSchema.safeParse({
    facebook: formData.get("facebook") ?? "",
    twitter: formData.get("twitter") ?? "",
    linkedin: formData.get("linkedin") ?? "",
    github: formData.get("github") ?? "",
    youtube: formData.get("youtube") ?? "",
    instagram: formData.get("instagram") ?? "",
  });

  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  await prisma.footer.upsert({
    where: { id: "footer" },
    update: parsed.data,
    create: { id: "footer", ...parsed.data },
  });

  await logActivity("footer.updated", "Footer", "footer");
  revalidatePath("/", "layout");
  return { success: true, message: "Footer updated." };
}

// ---------------------------------------------------------------------------
// Settings
// ---------------------------------------------------------------------------

export async function saveSettings(_prevState: FormState, formData: FormData): Promise<FormState> {
  const parsed = settingsSchema.safeParse({
    siteTitle: formData.get("siteTitle"),
    logoUrl: formData.get("logoUrl") ?? "",
    faviconUrl: formData.get("faviconUrl") ?? "",
    defaultSeoTitle: formData.get("defaultSeoTitle"),
    defaultSeoDescription: formData.get("defaultSeoDescription"),
    analyticsId: formData.get("analyticsId") ?? "",
  });

  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  await prisma.settings.upsert({
    where: { id: "settings" },
    update: parsed.data,
    create: { id: "settings", ...parsed.data },
  });

  await logActivity("settings.updated", "Settings", "settings");
  revalidatePath("/", "layout");
  return { success: true, message: "Settings updated." };
}

export async function requireAdminRedirectIfMissing() {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }
  return session;
}
