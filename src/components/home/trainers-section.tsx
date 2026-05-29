"use client";

import { Star, Users } from "lucide-react";
import { trainers } from "@/data/trainers";
import { Badge } from "@/components/ui/badge";
import {
  SectionReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/motion-wrapper";
import { SectionHeader } from "@/components/shared/section-header";
import { GlassCard } from "@/components/shared/glass-card";

export function TrainersSection() {
  return (
    <SectionReveal id="about" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Expert Faculty"
          title="Learn From Industry Leaders"
          description="Our trainers bring years of real-world experience to every session, ensuring you learn what employers actually need."
        />

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trainers.map((trainer) => (
            <StaggerItem key={trainer.id}>
              <GlassCard className="text-center">
                <div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand/70 text-xl font-bold text-white shadow-lg shadow-brand/20">
                  {trainer.image}
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  {trainer.name}
                </h3>
                <p className="text-sm text-brand">{trainer.role}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {trainer.experience} experience
                </p>

                <div className="mt-3 flex flex-wrap justify-center gap-1">
                  {trainer.expertise.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="text-[10px]"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="size-3.5 fill-brand-accent text-brand-accent" />
                    {trainer.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="size-3.5 text-brand" />
                    {trainer.students.toLocaleString()}+
                  </span>
                </div>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </SectionReveal>
  );
}
