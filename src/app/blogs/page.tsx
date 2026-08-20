import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/data/page-seo";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/common/json-ld";
import { PageHero, Breadcrumb } from "@/components/common/page-header";
import { PageTransition } from "@/animations/page-transition";
import { PageContentSection } from "@/components/common/motion-wrapper";
import { BlogsListing } from "@/components/blogs/blogs-listing";
import { getPublishedBlogPosts } from "@/services/blogs.service";

export const metadata: Metadata = createPageMetadata({
  title: PAGE_SEO.blogs.title,
  description: PAGE_SEO.blogs.description,
  path: "/blogs",
  keywords: ["blog", "career tips", "education", "technology"],
  absoluteTitle: true,
});

/** Blogs listing ISR. */
export const revalidate = 60;

export default async function BlogsPage() {
  const posts = await getPublishedBlogPosts(50);

  return (
    <PageTransition>
      <JsonLd
        data={breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Blog" },
        ])}
      />
      <PageHero
        eyebrow="Insights"
        title="Blog & Resources"
        description="Expert articles on careers, technology, placements, and education."
      />
      <PageContentSection>
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        />
        <BlogsListing posts={posts} />
      </PageContentSection>
    </PageTransition>
  );
}
