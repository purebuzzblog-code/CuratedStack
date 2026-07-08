import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | CuratedStack",
  description: "Why CuratedStack exists and how it picks the tools it recommends.",
};

export default function AboutPage() {
  return (
    <div className="container-page max-w-3xl py-16">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">About CuratedStack</h1>

      <div className="prose-content mt-8">
        <p>
          CuratedStack is a small, independent site for digital builders — people making
          products, writing, newsletters, or side projects, often on their own. It's built
          around two things: a blog with practical, no-fluff writing, and The Stack, a
          short list of tools worth actually using.
        </p>
        <h2>Why it exists</h2>
        <p>
          Most "best tools" lists online are built to rank for search terms, not to help
          anyone make a decision. CuratedStack only includes tools that have been used
          directly, and the write-ups aim to be specific enough to be useful rather than
          generic enough to apply to anything.
        </p>
        <h2>How tools get chosen</h2>
        <p>
          A tool makes it onto The Stack because it solved a real problem well, not because
          it pays the highest commission. Some links on this site are affiliate links —
          that's disclosed clearly wherever it applies, and it never changes what actually
          gets recommended.
        </p>
        <h2>Get in touch</h2>
        <p>
          If something on the site is wrong, outdated, or missing, the contact page is the
          best way to reach out.
        </p>
      </div>
    </div>
  );
}
