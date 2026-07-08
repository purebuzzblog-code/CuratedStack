import Link from "next/link";
import { Facebook, Twitter, Linkedin, Github, Youtube, Instagram, Mail } from "lucide-react";
import { prisma } from "@/lib/prisma";

const CONTACT_EMAIL = "curatedstack4u@gmail.com";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/stack", label: "The Stack" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
];

async function getFooterData() {
  try {
    return await prisma.footer.upsert({
      where: { id: "footer" },
      update: {},
      create: { id: "footer" },
    });
  } catch {
    // DB may not be reachable at build/preview time; fail gracefully.
    return {
      facebook: "",
      twitter: "",
      linkedin: "",
      github: "",
      youtube: "",
      instagram: "",
    };
  }
}

export default async function Footer() {
  const footer = await getFooterData();

  const socials = [
    { key: "facebook", url: footer.facebook, Icon: Facebook, label: "Facebook" },
    { key: "twitter", url: footer.twitter, Icon: Twitter, label: "Twitter" },
    { key: "linkedin", url: footer.linkedin, Icon: Linkedin, label: "LinkedIn" },
    { key: "github", url: footer.github, Icon: Github, label: "GitHub" },
    { key: "youtube", url: footer.youtube, Icon: Youtube, label: "YouTube" },
    { key: "instagram", url: footer.instagram, Icon: Instagram, label: "Instagram" },
  ].filter((s) => s.url && s.url.trim() !== "");

  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="container-page py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div>
            <p className="font-bold text-lg text-gray-900">CuratedStack</p>
            <p className="mt-2 max-w-xs text-sm text-gray-500">
              Tools and honest write-ups for people building things on their own.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-4 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-brand-600"
            >
              <Mail className="h-4 w-4" />
              {CONTACT_EMAIL}
            </a>
          </div>

          <nav className="grid grid-cols-2 gap-x-8 gap-y-2 sm:flex sm:flex-wrap sm:gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-600 hover:text-brand-600"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {socials.length > 0 && (
          <div className="mt-8 flex gap-4">
            {socials.map(({ key, url, Icon, label }) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-gray-400 hover:text-brand-600 transition-colors"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        )}

        <p className="mt-8 border-t border-gray-200 pt-6 text-xs text-gray-400">
          © {new Date().getFullYear()} CuratedStack. All rights reserved. Some links on this
          site are affiliate links — see our{" "}
          <Link href="/privacy" className="underline hover:text-brand-600">
            Privacy Policy
          </Link>{" "}
          for details.
        </p>
      </div>
    </footer>
  );
}
