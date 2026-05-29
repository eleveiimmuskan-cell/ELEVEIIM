import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/common/json-ld";
import { PageHero, Breadcrumb } from "@/components/common/page-header";
import { PageTransition } from "@/animations/page-transition";
import { BlogsListing } from "@/components/blogs/blogs-listing";

export const metadata: Metadata = createPageMetadata({
  title: "Blog",
  description:
    "Career tips, technology insights, and educational resources from the ELEVEIIM team.",
  path: "/blogs",
  keywords: ["blog", "career tips", "education", "technology"],
});

export default function BlogsPage() {
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
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
          <BlogsListing />
        </div>
      </section>
    </PageTransition>
  );
}
