import type { Metadata } from "next";
import { CheckCircle2, GraduationCap } from "lucide-react";
import { createPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/common/json-ld";
import { PageHero, Breadcrumb } from "@/components/common/page-header";
import { PageCta } from "@/components/common/page-cta";
import { PageTransition } from "@/animations/page-transition";
import { faqItems, scholarshipBenefits } from "@/data/scholarship";
import { ScholarshipApplicationForm } from "@/components/scholarship/application-form";
import { GlassCard } from "@/components/common/glass-card";

export const metadata: Metadata = createPageMetadata({
  title: "Scholarship Program",
  description:
    "Apply for ELEVEIIM scholarships — up to 100% fee waiver. Learn about eligibility, the exam process, and benefits.",
  path: "/scholarship",
  keywords: ["scholarship", "fee waiver", "financial aid", "ELEVEIIM"],
});

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

export default function ScholarshipPage() {
  return (
    <PageTransition>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", href: "/" },
            { label: "Scholarship" },
          ]),
          faqSchema(faqItems),
        ]}
      />

      <PageHero
        eyebrow="Scholarship Program"
        title="GET UP TO 100% SCHOLARSHIP"
        description="Merit-based scholarships make premium education accessible. Limited seats — apply today."
      />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Scholarship" }]} />

          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-10">
              <div>
                <h2 className="text-2xl font-bold">Benefits</h2>
                <ul className="mt-6 space-y-4">
                  {scholarshipBenefits.map((b) => (
                    <li key={b.id} className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand" />
                      <div>
                        <p className="font-semibold">{b.title}</p>
                        <p className="text-sm text-muted-foreground">{b.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold">Eligibility</h2>
                <ul className="mt-4 space-y-2">
                  {eligibility.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold">Scholarship Exam</h2>
                <div className="mt-6 space-y-4">
                  {examInfo.map((step, i) => (
                    <GlassCard key={step.title} hover={false}>
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
                  ))}
                </div>
              </div>
            </div>

            <div>
              <GlassCard hover={false} className="mb-8 bg-brand/5">
                <div className="flex items-center gap-4">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-brand text-white">
                    <GraduationCap className="size-7" />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-brand">75% OFF</p>
                    <p className="text-sm text-muted-foreground">Average scholarship awarded</p>
                  </div>
                </div>
              </GlassCard>
              <ScholarshipApplicationForm />
            </div>
          </div>

          <div className="mt-16" itemScope itemType="https://schema.org/FAQPage">
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {faqItems.map((faq) => (
                <GlassCard key={faq.question} hover={false}>
                  <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                    <h3 itemProp="name" className="font-semibold">{faq.question}</h3>
                    <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                      <p itemProp="text" className="mt-2 text-sm text-muted-foreground">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PageCta
        primaryHref="/courses"
        primaryLabel="Browse Courses"
        secondaryHref="/contact"
        secondaryLabel="Contact Us"
      />
    </PageTransition>
  );
}
