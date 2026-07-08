import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | CuratedStack",
  description: "Terms governing the use of the CuratedStack website.",
};

export default function TermsPage() {
  return (
    <div className="container-page max-w-3xl py-16">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Terms of Service</h1>
      <p className="mt-2 text-sm text-gray-400">Last updated: {new Date().getFullYear()}</p>

      <div className="prose-content mt-8">
        <h2>Use of this site</h2>
        <p>
          CuratedStack is provided for informational purposes. Content on this site,
          including blog posts and tool descriptions, reflects our own opinions and
          experience and should not be taken as professional advice.
        </p>
        <h2>Affiliate relationships</h2>
        <p>
          CuratedStack participates in affiliate programs, including but not limited to
          those listed on The Stack. We may earn a commission on qualifying purchases
          made through links on this site.
        </p>
        <h2>No guarantees</h2>
        <p>
          Tools and services change over time. We do our best to keep information
          current, but we can't guarantee that pricing, features, or availability
          described on this site are always up to date at the time you read them.
        </p>
        <h2>Intellectual property</h2>
        <p>
          All original content on this site is owned by CuratedStack unless otherwise
          noted. Tool names, logos, and trademarks belong to their respective owners.
        </p>
        <h2>Changes to these terms</h2>
        <p>
          These terms may be updated occasionally. Continued use of the site after
          changes are posted means you accept the updated terms.
        </p>
        <h2>Contact</h2>
        <p>
          Questions about these terms can be sent to{" "}
          <a href="mailto:curatedstack4u@gmail.com">curatedstack4u@gmail.com</a>.
        </p>
      </div>
    </div>
  );
}
