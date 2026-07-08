import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

export const { auth: middleware } = NextAuth(authConfig);

export default middleware;

export const config = {
  // Protect everything under /admin except the login page itself,
  // which is excluded inside authConfig.callbacks.authorized.
  matcher: ["/admin/:path*"],
};
