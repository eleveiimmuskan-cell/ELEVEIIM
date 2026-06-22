"use client";

import { CheckCircle2 } from "lucide-react";
import { aboutContent } from "@/data/about";
import { counterStats } from "@/data/counters";
import { faqItems, scholarshipBenefits } from "@/data/scholarship";
import { Breadcrumb } from "@/components/common/page-header";
import { GlassCard } from "@/components/common/glass-card";
import { ScholarshipApplicationForm } from "@/components/scholarship/application-form";
import { CountdownTimer } from "@/components/scholarship/countdown-timer";
import { ScholarshipStatsCard } from "@/components/scholarship/scholarship-stats-card";
import {
  AnimatedHeading,
  PageContentSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/common/motion-wrapper";

const eligibility = [
  "Strong academic record or exceptional talent in tech/design",
  "Financial need documentation (if applicable)",
  "Minimum age 18 years",
  "Commitment to complete the full program",
];

const examInfo = [
  { title: "Aptitude Test", description: "Logical reasoning, quantitative ability, and verbal skills." },
  { title: "Domain Assessment", description: "Basic knowledge in your chosen course area." },
  { title: "Personal Interview", description: "Short interview to understand your goals and motivation." },
];

export function AboutPageContent() {
  return (
    <PageContentSection>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />

      <StaggerContainer className="grid gap-12 lg:grid-cols-2">
        <StaggerItem>
          <AnimatedHeading>
            <h2 className="text-2xl font-bold">Our Mission</h2>
          </AnimatedHeading>
          <p className="mt-4 leading-relaxed text-muted-foreground">{aboutContent.mission}</p>
        </StaggerItem>
        <StaggerItem>
          <AnimatedHeading>
            <h2 className="text-2xl font-bold">Our Vision</h2>
          </AnimatedHeading>
          <p className="mt-4 leading-relaxed text-muted-foreground">{aboutContent.vision}</p>
        </StaggerItem>
      </StaggerContainer>

      <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-3">
        {aboutContent.values.map((v) => (
          <StaggerItem key={v.title}>
            <GlassCard hover={false}>
              <h3 className="font-bold text-brand">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.description}</p>
            </GlassCard>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <StaggerContainer className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {counterStats.map((s) => (
          <StaggerItem key={s.id}>
            <GlassCard className="text-center">
              <p className="text-2xl font-bold text-brand">
                {s.value}{s.suffix}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </GlassCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </PageContentSection>
  );
}

export function ScholarshipPageContent() {
  return (
    <PageContentSection>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Scholarship" }]} />

      <CountdownTimer variant="page" className="mb-10" />

      <div className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-10">
          <div>
            <AnimatedHeading>
              <h2 className="text-2xl font-bold">Benefits</h2>
            </AnimatedHeading>
            <StaggerContainer className="mt-6 space-y-4" stagger={0.08}>
              {scholarshipBenefits.map((b) => (
                <StaggerItem key={b.id}>
                  <li className="flex list-none gap-3">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand" />
                    <div>
                      <p className="font-semibold">{b.title}</p>
                      <p className="text-sm text-muted-foreground">{b.description}</p>
                    </div>
                  </li>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          <div>
            <AnimatedHeading>
              <h2 className="text-2xl font-bold">Eligibility</h2>
            </AnimatedHeading>
            <StaggerContainer className="mt-4 space-y-2" stagger={0.06}>
              {eligibility.map((item) => (
                <StaggerItem key={item}>
                  <li className="flex list-none items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand" />
                    {item}
                  </li>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          <div>
            <AnimatedHeading>
              <h2 className="text-2xl font-bold">Scholarship Exam</h2>
            </AnimatedHeading>
            <StaggerContainer className="mt-6 space-y-4" stagger={0.1}>
              {examInfo.map((step, i) => (
                <StaggerItem key={step.title}>
                  <GlassCard hover={false}>
                    <div className="flex gap-4">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand text-sm font-bold text-white">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-semibold">{step.title}</p>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  </GlassCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>

        <StaggerContainer stagger={0.12}>
          <StaggerItem>
            <ScholarshipStatsCard className="mb-8" />
          </StaggerItem>
          <StaggerItem>
            <ScholarshipApplicationForm />
          </StaggerItem>
        </StaggerContainer>
      </div>

      <div className="mt-16" itemScope itemType="https://schema.org/FAQPage">
        <AnimatedHeading>
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        </AnimatedHeading>
        <StaggerContainer className="mt-6 grid gap-4 md:grid-cols-2">
          {faqItems.map((faq) => (
            <StaggerItem key={faq.question}>
              <GlassCard hover={false}>
                <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 itemProp="name" className="font-semibold">{faq.question}</h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p itemProp="text" className="mt-2 text-sm text-muted-foreground">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </PageContentSection>
  );
}
