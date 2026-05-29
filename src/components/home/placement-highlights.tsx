"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  getFeaturedPlacements,
  placementStats,
} from "@/services/placements.service";
import { SectionReveal } from "@/components/common/motion-wrapper";
import { SectionHeader } from "@/components/common/section-header";
import { GlassCard } from "@/components/common/glass-card";
import { PlacementCard } from "@/components/placements/placement-card";
import { Button } from "@/components/ui/button";

export function PlacementHighlightsSection() {
  const stories = getFeaturedPlacements(3);

  return (
    <SectionReveal className="bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Career Outcomes"
          title="Placement Highlights"
          description="Real success stories from students who transformed their careers with ELEVEIIM."
        />

        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {placementStats.map((stat) => (
            <GlassCard key={stat.id} className="text-center">
              <p className="text-2xl font-bold text-brand">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </GlassCard>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {stories.map((story, i) => (
            <PlacementCard key={story.slug} story={story} index={i} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button asChild variant="outline" className="border-brand text-brand hover:bg-brand hover:text-white">
            <Link href="/placements">
              View All Placements
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </SectionReveal>
  );
}
