import { PrismaClient, PostStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

function wordCount(html: string) {
  const text = html.replace(/<[^>]+>/g, " ");
  return text.split(/\s+/).filter(Boolean).length;
}

function readingTime(words: number) {
  return Math.max(1, Math.round(words / 200));
}

async function main() {
  // ---------------- Admin user ----------------
  const adminEmail = process.env.ADMIN_EMAIL || "admin@curatedstack.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "ChangeMe123!";
  const hashed = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "CuratedStack Admin",
      password: hashed,
      role: "ADMIN",
    },
  });

  // ---------------- Category ----------------
  const category = await prisma.category.upsert({
    where: { slug: "productivity" },
    update: {},
    create: { name: "Productivity", slug: "productivity" },
  });

  // ---------------- Settings & Footer singletons ----------------
  await prisma.settings.upsert({
    where: { id: "settings" },
    update: {},
    create: { id: "settings" },
  });

  await prisma.footer.upsert({
    where: { id: "footer" },
    update: {},
    create: { id: "footer" },
  });

  // ---------------- Blog posts ----------------
  const posts = [
    {
      title: "How We Choose Tools for The Stack",
      slug: "how-we-choose-tools-for-the-stack",
      excerpt:
        "The criteria behind every tool that makes it onto CuratedStack — and the ones that don't.",
      content: `
        <p>Every tool on The Stack earns its place through actual use, not a marketing email. Before anything is added, we ask a few simple questions: does it solve a real problem, is the pricing honest, and would we still recommend it if the affiliate program disappeared tomorrow?</p>
        <h2>What we look for</h2>
        <p>We favor tools that are easy to start with, transparent about pricing, and built by teams that ship consistently. Onboarding friction, hidden fees, and unclear roadmaps are common reasons a tool doesn't make the list.</p>
        <h2>What we avoid</h2>
        <p>We steer away from tools that rely on aggressive upsells or that require long-term contracts before you can properly evaluate them. If a free trial isn't enough to judge the product, that's a signal worth noting.</p>
        <p>This page will keep evolving as our own workflows change. If you think we're missing something obvious, reach out — the contact page is the fastest way to reach us.</p>
      `,
      status: PostStatus.PUBLISHED,
      categoryId: category.id,
      seoTitle: "How We Choose Tools for The Stack | CuratedStack",
      seoDescription:
        "The criteria CuratedStack uses to decide which tools are worth recommending to digital builders.",
    },
    {
      title: "Building in Public Without Burning Out",
      slug: "building-in-public-without-burning-out",
      excerpt:
        "Sharing progress publicly can be great for accountability — here's how to do it sustainably.",
      content: `
        <p>Building in public is often framed as a growth hack, but the more useful way to think about it is as a forcing function for clarity. Writing down what you shipped this week makes it obvious when nothing shipped.</p>
        <h2>Set a cadence you can actually keep</h2>
        <p>Daily updates sound impressive but are hard to sustain alongside actual building. A weekly note, posted on the same day each week, tends to hold up much better over months.</p>
        <h2>Separate the update from the pitch</h2>
        <p>Not every update needs to sell something. Some of the most useful posts are simply "here's what broke and how I fixed it" — readers trust that far more than a constant stream of wins.</p>
        <p>The goal isn't an audience for its own sake. It's a record you can look back on, and occasionally, people who find it useful along the way.</p>
      `,
      status: PostStatus.PUBLISHED,
      categoryId: category.id,
      seoTitle: "Building in Public Without Burning Out | CuratedStack",
      seoDescription:
        "A practical, sustainable approach to sharing your building process publicly.",
    },
    {
      title: "A Simple Content Workflow for Solo Makers",
      slug: "a-simple-content-workflow-for-solo-makers",
      excerpt:
        "You don't need a content team to publish consistently. Here's a workflow that fits in a few hours a week.",
      content: `
        <p>Most solo makers overbuild their content process before they've published a handful of pieces. A simpler workflow, used consistently, beats an elaborate one that gets abandoned after two weeks.</p>
        <h2>The four-step loop</h2>
        <p>Capture ideas as they come, in one place. Pick one per week. Draft in a single sitting without editing. Edit the next day with fresh eyes. That's the entire loop, and it scales as you get faster.</p>
        <h2>Tools matter less than the habit</h2>
        <p>A notes app and a plain text editor are enough to start. The tools reviewed on The Stack can remove friction once you know your workflow, but they rarely create the habit on their own.</p>
        <p>If you're starting from zero, aim for four published pieces before judging whether the workflow works for you.</p>
      `,
      status: PostStatus.DRAFT,
      categoryId: category.id,
      seoTitle: "A Simple Content Workflow for Solo Makers | CuratedStack",
      seoDescription:
        "A lightweight, repeatable content workflow designed for solo builders and makers.",
    },
  ];

  for (const p of posts) {
    const words = wordCount(p.content);
    await prisma.post.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        ...p,
        wordCount: words,
        readingTime: readingTime(words),
        authorId: admin.id,
        publishedAt: p.status === PostStatus.PUBLISHED ? new Date() : null,
      },
    });
  }

  // ---------------- Stack tools ----------------
  const tools = [
    {
      name: "Notion",
      slug: "notion",
      description:
        "An all-in-one workspace for notes, docs, wikis, and lightweight project management.",
      category: "Productivity",
      featured: true,
    },
    {
      name: "Beehiiv",
      slug: "beehiiv",
      description:
        "A newsletter platform built for growth, with built-in referral programs and analytics.",
      category: "Newsletter",
      featured: true,
    },
    {
      name: "ConvertKit",
      slug: "convertkit",
      description:
        "Email marketing built for creators, with automations, tagging, and paid subscriptions.",
      category: "Email Marketing",
      featured: false,
    },
    {
      name: "Framer",
      slug: "framer",
      description:
        "A visual website builder for designers who want production-ready sites without code.",
      category: "Website Builder",
      featured: true,
    },
    {
      name: "Webflow",
      slug: "webflow",
      description:
        "A visual development platform for building fully custom, responsive websites.",
      category: "Website Builder",
      featured: false,
    },
    {
      name: "Lemon Squeezy",
      slug: "lemon-squeezy",
      description:
        "Merchant-of-record payments and billing for software and digital products.",
      category: "Payments",
      featured: true,
    },
    {
      name: "Amazon Associates",
      slug: "amazon-associates",
      description:
        "Amazon's affiliate program for earning commissions by recommending physical products.",
      category: "Affiliate Network",
      featured: false,
    },
  ];

  for (const t of tools) {
    await prisma.tool.upsert({
      where: { slug: t.slug },
      update: {},
      create: {
        ...t,
        affiliateUrl: "https://example.com?ref=curatedstack",
        visible: true,
      },
    });
  }

  console.log("Seed complete.");
  console.log(`Admin login: ${adminEmail} / ${adminPassword}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
