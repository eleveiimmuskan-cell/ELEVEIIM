import type { BlogPost } from "@/types";
import type { ApiBlogPost } from "@/types/api-blog";

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function estimateReadingTime(content: string): number {
  const words = stripHtml(content).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function toExcerpt(api: ApiBlogPost): string {
  const text = (api.excerpt || api.seoDesc || "").trim();
  if (text) return text;
  const plain = stripHtml(api.content || "");
  if (!plain) return "Read the latest insights from ELEVEIIM.";
  if (plain.length <= 160) return plain;
  return `${plain.slice(0, 157).trimEnd()}…`;
}

/** Maps a backend blog post into the UI BlogPost shape. */
export function mapApiBlogPostToUi(api: ApiBlogPost): BlogPost {
  return {
    id: api.id,
    slug: api.slug,
    title: api.title,
    excerpt: toExcerpt(api),
    content: api.content || "",
    category: api.category?.name?.trim() || "General",
    tags: Array.isArray(api.tags)
      ? api.tags.map((t) => t.trim()).filter(Boolean)
      : [],
    author: api.author?.name?.trim() || "ELEVEIIM Editorial",
    authorRole: api.author?.designation?.trim() || "ELEVEIIM Team",
    publishedAt: api.publishedAt || api.createdAt || "",
    readingTime: estimateReadingTime(api.content || ""),
    featured: false,
  };
}
