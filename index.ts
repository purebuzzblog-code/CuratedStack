import type { Post, Tool, Category, Footer, Settings } from "@prisma/client";

export type PostWithCategory = Post & { category: Category | null };

export type { Post, Tool, Category, Footer, Settings };

export type SocialKey =
  | "facebook"
  | "twitter"
  | "linkedin"
  | "github"
  | "youtube"
  | "instagram";
