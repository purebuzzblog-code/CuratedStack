import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="border-b border-gray-100 bg-gradient-to-b from-brand-50 to-white">
      <div className="container-page py-20 sm:py-28 text-center">
        <h1 className="mx-auto max-w-3xl text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
          Tools and writing for people who build things themselves
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-gray-600">
          CuratedStack is a small, honest collection of tools and guides for digital
          builders — no fluff, no fake numbers, just what actually works.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/stack"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-white font-medium hover:bg-brand-700 transition-colors"
          >
            Explore The Stack
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 text-gray-700 font-medium hover:border-brand-400 hover:text-brand-600 transition-colors"
          >
            Read the Blog
          </Link>
        </div>
      </div>
    </section>
  );
}
