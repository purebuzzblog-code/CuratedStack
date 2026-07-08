import Link from "next/link";

export default function CTA() {
  return (
    <section className="container-page py-16 text-center">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
        Looking for the right tool for your next project?
      </h2>
      <p className="mt-3 text-gray-600 max-w-lg mx-auto">
        The Stack is a short, curated list — every tool on it is something we've actually
        used and would recommend without a sponsorship attached.
      </p>
      <Link
        href="/stack"
        className="mt-6 inline-flex items-center rounded-lg bg-gray-900 px-6 py-3 text-white font-medium hover:bg-gray-800 transition-colors"
      >
        Browse The Stack
      </Link>
    </section>
  );
}
