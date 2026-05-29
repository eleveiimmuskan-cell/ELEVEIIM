"use client";

import Link from "next/link";
import { CheckCircle2, GraduationCap } from "lucide-react";
import { faqItems, scholarshipBenefits } from "@/data/scholarship";
import { Button } from "@/components/ui/button";
import {
  SectionReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/common/motion-wrapper";
import { SectionHeader } from "@/components/common/section-header";
import { GlassCard } from "@/components/common/glass-card";
import { ScholarshipButton } from "@/components/common/scholarship-button";

export function ScholarshipSection() {
  return (
    <SectionReveal id="scholarship" className="bg-brand/5 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader
              align="left"
              eyebrow="Scholarship Program"
              title="Make Quality Education Accessible"
              description="Merit-based scholarships up to 100% fee waiver. No hidden charges — just opportunity."
            />
            <ScholarshipButton className="mb-8" />
            <StaggerContainer className="space-y-4">
              {scholarshipBenefits.map((benefit) => (
                <StaggerItem key={benefit.id}>
                  <div className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand" />
                    <div>
                      <p className="font-semibold text-foreground">
                        {benefit.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          <GlassCard hover={false} className="relative overflow-hidden bg-white">
            <div className="absolute -right-8 -top-8 size-32 rounded-full bg-brand/10" />
            <div className="absolute -bottom-6 -left-6 size-24 rounded-full bg-brand-accent/10" />
            <div className="relative">
              <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-brand text-white shadow-lg shadow-brand/25">
                <GraduationCap className="size-7" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                Apply for Scholarship
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Limited seats available for the upcoming batch. Submit your
                application and our team will reach out within 5–7 business days.
              </p>
              <Button
                asChild
                size="lg"
                className="mt-6 w-full bg-brand-accent hover:bg-brand-accent/90"
              >
                <Link href="#contact">Start Application</Link>
              </Button>
            </div>
          </GlassCard>
        </div>

        <div className="mt-16" itemScope itemType="https://schema.org/FAQPage">
          <SectionHeader
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            description="Schema-ready FAQ section for SEO — answers to common scholarship and enrollment queries."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {faqItems.map((faq) => (
              <GlassCard key={faq.question} hover={false} className="bg-white">
                <div
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <h3 itemProp="name" className="font-semibold text-foreground">
                    {faq.question}
                  </h3>
                  <div
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <p
                      itemProp="text"
                      className="mt-2 text-sm leading-relaxed text-muted-foreground"
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
