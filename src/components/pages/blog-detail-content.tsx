"use client";

import Link from "next/link";
import { Clock, Tag } from "lucide-react";
import { Breadcrumb } from "@/components/common/page-header";
import { BlogCard } from "@/components/blogs/blog-card";
import { Badge } from "@/components/ui/badge";
import {
  AnimatedHeading,
  PageContentSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/common/motion-wrapper";
import type { BlogPost } from "@/types";

export function BlogDetailContent({
  post,
  related,
  paragraphs,
}: {
  post: BlogPost;
  related: BlogPost[];
  paragraphs: string[];
}) {
  return (
    <PageContentSection narrow className="pt-24">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blogs" },
          { label: post.title },
        ]}
      />

      <AnimatedHeading>
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
      </AnimatedHeading>

      <StaggerContainer className="prose prose-neutral mt-10 max-w-none" stagger={0.06}>
        {paragraphs.map((p, i) => (
          <StaggerItem key={i}>
            <p className="mb-4 leading-relaxed text-muted-foreground">{p}</p>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <StaggerContainer stagger={0.1}>
        <StaggerItem>
          <div className="mt-12 rounded-2xl border border-border bg-muted/30 p-6">
            <p className="text-sm font-semibold text-foreground">About the Author</p>
            <p className="mt-1 font-medium">{post.author}</p>
            <p className="text-sm text-muted-foreground">{post.authorRole}</p>
          </div>
        </StaggerItem>
      </StaggerContainer>

      {related.length > 0 && (
        <div className="mt-16">
          <AnimatedHeading>
            <h2 className="text-xl font-bold">Related Articles</h2>
          </AnimatedHeading>
          <StaggerContainer className="mt-6 grid gap-6 sm:grid-cols-2">
            {related.map((r, i) => (
              <StaggerItem key={r.slug}>
                <BlogCard post={r} index={i} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      )}

      <div className="mt-10">
        <Link href="/blogs" className="text-sm font-medium text-brand hover:underline">
          ← Back to all articles
        </Link>
      </div>
    </PageContentSection>
  );
}
