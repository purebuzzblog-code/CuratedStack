import type { Metadata } from "next";
import { Mail, Clock } from "lucide-react";
import ContactForm from "@/components/ContactForm";

const CONTACT_EMAIL = "curatedstack4u@gmail.com";

export const metadata: Metadata = {
  title: "Contact | CuratedStack",
  description: "Get in touch with CuratedStack.",
};

export default function ContactPage() {
  return (
    <div className="container-page max-w-2xl py-16">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Contact</h1>
      <p className="mt-3 text-gray-600">
        Questions, corrections, or tool suggestions — all welcome.
      </p>

      <a
        href={`mailto:${CONTACT_EMAIL}`}
        className="mt-6 inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:border-brand-400 hover:text-brand-600 transition-colors"
      >
        <Mail className="h-4 w-4" />
        {CONTACT_EMAIL}
      </a>

      <div className="mt-10 rounded-xl border border-gray-100 bg-gray-50 p-6 sm:p-8">
        <ContactForm />
      </div>

      <div className="mt-6 flex items-start gap-2 text-sm text-gray-500">
        <Clock className="h-4 w-4 flex-shrink-0 mt-0.5" />
        <p>Responses typically take a few days — thanks for your patience.</p>
      </div>
    </div>
  );
}
