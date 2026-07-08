"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Placeholder only — wire this up to your email provider (e.g. Beehiiv,
    // ConvertKit) inside a server action or API route.
    setSubmitted(true);
  }

  return (
    <section className="border-y border-gray-100 bg-brand-600">
      <div className="container-page py-14 text-center">
        <Mail className="mx-auto h-8 w-8 text-white/80" />
        <h2 className="mt-3 text-2xl font-bold text-white">Get new posts in your inbox</h2>
        <p className="mt-2 text-brand-100">
          Occasional emails when there's something worth reading. No spam.
        </p>

        {submitted ? (
          <p className="mt-6 text-white font-medium">Thanks — you're on the list.</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-6 flex max-w-md flex-col sm:flex-row gap-3"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="rounded-lg bg-gray-900 px-6 py-3 font-medium text-white hover:bg-gray-800 transition-colors"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
