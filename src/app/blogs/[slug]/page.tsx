import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Tag } from "lucide-react";
import { createArticleMetadata } from "@/lib/seo/metadata";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/common/json-ld";
import { Breadcrumb } from "@/components/common/page-header";
import { PageTransition } from "@/animations/page-transition";
import { BlogCard } from "@/components/blogs/blog-card";
import { Badge } from "@/components/ui/badge";
import {
  getBlogBySlug,
  getBlogSlugs,
  getRelatedPosts,
} from "@/services/blogs.service";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return { title: "Article Not Found" };

  return createArticleMetadata(
    post.title,
    post.excerpt,
    `/blogs/${slug}`,
    post.publishedAt,
    post.author
  );
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug);
  const paragraphs = post.content.split("\n\n");

  return (
    <PageTransition>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blogs" },
            { label: post.title },
          ]),
          articleSchema({
            title: post.title,
            description: post.excerpt,
            slug: post.slug,
            publishedAt: post.publishedAt,
            author: post.author,
          }),
        ]}
      />

      <article className="pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blogs" },
              { label: post.title },
            ]}
          />

          <Badge variant="outline" className="mb-4 border-brand/20 text-brand">
            {post.category}
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{post.title}</h1>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>{post.author} · {post.authorRole}</span>
            <span className="flex items-center gap-1">
              <Clock className="size-4" />
              {post.readingTime} min read
            </span>
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="gap-1">
                <Tag className="size-3" />
                {tag}
              </Badge>
            ))}
          </div>

          <div className="prose prose-neutral mt-10 max-w-none">
            {paragraphs.map((p, i) => (
              <p key={i} className="mb-4 leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-border bg-muted/30 p-6">
            <p className="text-sm font-semibold text-foreground">About the Author</p>
            <p className="mt-1 font-medium">{post.author}</p>
            <p className="text-sm text-muted-foreground">{post.authorRole}</p>
          </div>

          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="text-xl font-bold">Related Articles</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {related.map((r, i) => (
                  <BlogCard key={r.slug} post={r} index={i} />
                ))}
              </div>
            </div>
          )}

          <div className="mt-10">
            <Link href="/blogs" className="text-sm font-medium text-brand hover:underline">
              ← Back to all articles
            </Link>
          </div>
        </div>
      </article>
    </PageTransition>
  );
}
