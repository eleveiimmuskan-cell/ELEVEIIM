import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createArticleMetadata } from "@/lib/seo/metadata";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/common/json-ld";
import { PageTransition } from "@/animations/page-transition";
import { BlogDetailContent } from "@/components/pages/blog-detail-content";
import {
  getBlogBySlug,
  getPublishedBlogSlugs,
  getRelatedPosts,
} from "@/services/blogs.service";

interface Props {
  params: Promise<{ slug: string }>;
}

/** Blog detail ISR. */
export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getPublishedBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
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
  const post = await getBlogBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(slug);

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

      <BlogDetailContent post={post} related={related} />
    </PageTransition>
  );
}
