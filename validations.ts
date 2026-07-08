import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Please enter your name").max(100),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message should be at least 10 characters").max(5000),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const postSchema = z.object({
  title: z.string().min(3, "Title is required"),
  slug: z
    .string()
    .min(3, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  excerpt: z.string().max(300).optional().or(z.literal("")),
  content: z.string().min(20, "Content is required"),
  status: z.enum(["DRAFT", "PUBLISHED"]),
  featuredImage: z.string().url().optional().or(z.literal("")),
  seoTitle: z.string().max(70).optional().or(z.literal("")),
  seoDescription: z.string().max(160).optional().or(z.literal("")),
  categoryId: z.string().optional().or(z.literal("")),
});

export type PostFormValues = z.infer<typeof postSchema>;

export const toolSchema = z.object({
  name: z.string().min(2, "Name is required"),
  slug: z
    .string()
    .min(2, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  description: z.string().min(10, "Description is required"),
  category: z.string().min(2, "Category is required"),
  affiliateUrl: z.string().url("Must be a valid URL"),
  logo: z.string().url().optional().or(z.literal("")),
  featured: z.boolean().default(false),
  visible: z.boolean().default(true),
});

export type ToolFormValues = z.infer<typeof toolSchema>;

export const footerSchema = z.object({
  facebook: z.string().url().optional().or(z.literal("")),
  twitter: z.string().url().optional().or(z.literal("")),
  linkedin: z.string().url().optional().or(z.literal("")),
  github: z.string().url().optional().or(z.literal("")),
  youtube: z.string().url().optional().or(z.literal("")),
  instagram: z.string().url().optional().or(z.literal("")),
});

export type FooterFormValues = z.infer<typeof footerSchema>;

export const settingsSchema = z.object({
  siteTitle: z.string().min(2),
  logoUrl: z.string().url().optional().or(z.literal("")),
  faviconUrl: z.string().url().optional().or(z.literal("")),
  defaultSeoTitle: z.string().max(70),
  defaultSeoDescription: z.string().max(160),
  analyticsId: z.string().optional().or(z.literal("")),
});

export type SettingsFormValues = z.infer<typeof settingsSchema>;

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
