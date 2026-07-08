import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | CuratedStack",
  description: "How CuratedStack handles data, cookies, and affiliate links.",
};

export default function PrivacyPage() {
  return (
    <div className="container-page max-w-3xl py-16">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Privacy Policy</h1>
      <p className="mt-2 text-sm text-gray-400">Last updated: {new Date().getFullYear()}</p>

      <div className="prose-content mt-8">
        <h2>What we collect</h2>
        <p>
          When you use the contact form on this site, we collect the name, email address,
          and message you provide, solely to respond to your inquiry. We do not sell or
          share this information with third parties for marketing purposes.
        </p>
        <h2>Newsletter</h2>
        <p>
          If you subscribe to updates, your email address is stored with our email
          provider for the purpose of sending you updates. You can unsubscribe at any
          time using the link in any email we send.
        </p>
        <h2>Affiliate links</h2>
        <p>
          Some links on this site, including links on The Stack and within blog posts,
          are affiliate links. If you click one and make a purchase, CuratedStack may
          earn a commission at no additional cost to you. This never influences which
          tools we choose to recommend.
        </p>
        <h2>Cookies and analytics</h2>
        <p>
          This site may use basic analytics to understand overall traffic patterns, such
          as which pages are visited. This data is aggregated and is not used to
          personally identify visitors.
        </p>
        <h2>Contact</h2>
        <p>
          Questions about this policy can be sent to{" "}
          <a href="mailto:curatedstack4u@gmail.com">curatedstack4u@gmail.com</a>.
        </p>
      </div>
    </div>
  );
}
