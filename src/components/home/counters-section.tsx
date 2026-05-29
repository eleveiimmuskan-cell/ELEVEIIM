"use client";

import { counterStats } from "@/data/counters";
import {
  AnimatedCounter,
  SectionReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/common/motion-wrapper";
import { GlassCard } from "@/components/common/glass-card";

export function CountersSection() {
  return (
    <SectionReveal className="bg-muted/30 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {counterStats.map((stat) => (
            <StaggerItem key={stat.id}>
              <GlassCard className="text-center">
                <p className="text-3xl font-bold text-brand sm:text-4xl">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                  />
                </p>
                <p className="mt-2 text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </SectionReveal>
  );
}
