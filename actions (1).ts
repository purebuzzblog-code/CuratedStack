"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { loginSchema } from "@/lib/validations";

export type LoginActionState = {
  success: boolean;
  message: string;
};

export async function loginAction(
  _prevState: LoginActionState,
  formData: FormData
): Promise<LoginActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: "/admin/dashboard",
    });
    return { success: true, message: "" };
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, message: "Invalid email or password." };
    }
    // NEXT_REDIRECT is thrown by signIn on success — rethrow so Next.js can handle it.
    throw error;
  }
}
