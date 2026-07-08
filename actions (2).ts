"use server";

import { contactFormSchema } from "@/lib/validations";

export type ContactActionState = {
  success: boolean;
  message: string;
};

/**
 * Placeholder contact handler. Wire this up to an email service (Resend,
 * Postmark, Nodemailer + SMTP, etc.) or persist to the database — for now it
 * validates input and logs it server-side so the form is fully functional
 * end-to-end once a mail provider is plugged in.
 */
export async function submitContactForm(
  _prevState: ContactActionState,
  formData: FormData
): Promise<ContactActionState> {
  const parsed = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Please check the form and try again.",
    };
  }

  // TODO: send an email or persist this to the database via prisma.
  console.log("New contact message:", parsed.data);

  return {
    success: true,
    message: "Thanks — your message has been sent. We typically reply within a few days.",
  };
}
