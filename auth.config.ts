import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe auth config. Kept separate from `auth.ts` because middleware
 * runs on the Edge runtime and cannot use Prisma / bcrypt directly.
 */
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin =
        request.nextUrl.pathname.startsWith("/admin") &&
        !request.nextUrl.pathname.startsWith("/admin/login");

      if (isOnAdmin) {
        return isLoggedIn;
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role ?? "ADMIN";
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = token.role as string | undefined;
      }
      return session;
    },
  },
  providers: [], // populated in auth.ts
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
};
