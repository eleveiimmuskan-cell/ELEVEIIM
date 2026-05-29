"use client";

import { BadgeCheck, Star } from "lucide-react";
import { reviews } from "@/data/reviews";
import { Badge } from "@/components/ui/badge";
import {
  SectionReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/common/motion-wrapper";
import { SectionHeader } from "@/components/common/section-header";
import { GlassCard } from "@/components/common/glass-card";

export function ReviewsSection() {
  return (
    <SectionReveal id="blogs" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Student Reviews"
          title="Rated by Our Community"
          description="Verified reviews from students across all programs — transparency you can trust."
        />

        <StaggerContainer className="grid gap-6 md:grid-cols-2">
          {reviews.map((review) => (
            <StaggerItem key={review.id}>
              <GlassCard hover={false} className="bg-muted/20">
                <div className="mb-3 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-foreground">
                        {review.name}
                      </p>
                      {review.verified && (
                        <Badge
                          variant="outline"
                          className="gap-1 border-brand/20 text-brand"
                        >
                          <BadgeCheck className="size-3" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {review.course} · {review.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 rounded-lg bg-brand/10 px-2 py-1">
                    <Star className="size-3.5 fill-brand-accent text-brand-accent" />
                    <span className="text-sm font-semibold text-brand">
                      {review.rating}
                    </span>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {review.content}
                </p>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </SectionReveal>
  );
}
