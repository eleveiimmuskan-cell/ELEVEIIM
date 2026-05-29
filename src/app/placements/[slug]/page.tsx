import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/common/json-ld";
import { Breadcrumb } from "@/components/common/page-header";
import { PageCta } from "@/components/common/page-cta";
import { PageTransition } from "@/animations/page-transition";
import { GlassCard } from "@/components/common/glass-card";
import { Button } from "@/components/ui/button";
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

      <section className="bg-brand pt-24 pb-12">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-2xl bg-white/15 text-2xl font-bold text-white backdrop-blur-sm">
            {story.image}
          </div>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">{story.studentName}</h1>
          <p className="mt-2 text-lg text-white/85">
            {story.role} at {story.company}
          </p>
          <p className="mt-1 text-2xl font-bold text-brand-accent">{story.package}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Placements", href: "/placements" },
              { label: story.studentName },
            ]}
          />

          <Button asChild variant="ghost" className="mb-6 -ml-2 text-brand">
            <Link href="/placements">
              <ArrowLeft className="size-4" />
              Back to Placements
            </Link>
          </Button>

          <GlassCard hover={false} className="bg-white">
            <div className="mb-6 grid gap-4 sm:grid-cols-3 text-sm">
              <div>
                <p className="text-muted-foreground">Course</p>
                <p className="font-semibold">{story.course}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Batch</p>
                <p className="font-semibold">{story.batch}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Package</p>
                <p className="font-semibold text-brand-accent">{story.package}</p>
              </div>
            </div>
            <p className="leading-relaxed text-muted-foreground">{story.story}</p>
          </GlassCard>
        </div>
      </section>

      <PageCta
        title="Write Your Success Story"
        description="Join ELEVEIIM and land your dream role with structured training and placement support."
      />
    </PageTransition>
  );
}
