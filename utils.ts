export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ");
}

export function getWordCount(html: string): number {
  return stripHtml(html)
    .split(/\s+/)
    .filter(Boolean).length;
}

export function getReadingTime(html: string): number {
  const words = getWordCount(html);
  return Math.max(1, Math.round(words / 200));
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function truncate(text: string, length = 160): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trimEnd() + "…";
}
