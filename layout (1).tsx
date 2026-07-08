import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

async function getSettings() {
  try {
    return await prisma.settings.upsert({
      where: { id: "settings" },
      update: {},
      create: { id: "settings" },
    });
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: settings?.defaultSeoTitle ?? "CuratedStack – Tools & Insights for Digital Builders",
    description:
      settings?.defaultSeoDescription ??
      "Curated tools, honest reviews, and practical guides for makers building their next project.",
    metadataBase: new URL("https://curatedstack.example.com"),
    icons: settings?.faviconUrl ? [{ url: settings.faviconUrl }] : undefined,
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {settings?.analyticsId && (
          <>
            {/* eslint-disable-next-line @next/next/next-script-for-ga */}
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${settings.analyticsId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${settings.analyticsId}');
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}
