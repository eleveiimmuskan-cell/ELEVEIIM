import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/common/json-ld";
import { PageCta } from "@/components/common/page-cta";
import { PageTransition } from "@/animations/page-transition";
import { PlacementDetailContent } from "@/components/pages/placement-detail-content";
import {
  getPlacementBySlug,
  getPlacementSlugs,
} from "@/services/placements.service";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPlacementSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = getPlacementBySlug(slug);
  if (!story) return { title: "Placement Not Found" };

  return createPageMetadata({
    title: `${story.studentName} — ${story.company}`,
    description: story.summary,
    path: `/placements/${slug}`,
  });
}

export default async function PlacementDetailPage({ params }: Props) {
  const { slug } = await params;
  const story = getPlacementBySlug(slug);
  if (!story) notFound();

  return (
    <PageTransition>
      <JsonLd
        data={breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Placements", href: "/placements" },
          { label: story.studentName },
        ])}
      />

      <PlacementDetailContent story={story} />

      <PageCta
        title="Write Your Success Story"
        description="Join ELEVEIIM and land your dream role with structured training and placement support."
      />
    </PageTransition>
  );
}
