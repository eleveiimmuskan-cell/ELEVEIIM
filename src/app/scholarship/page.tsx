import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/common/json-ld";
import { PageCta } from "@/components/common/page-cta";
import { PageTransition } from "@/animations/page-transition";
import { faqItems } from "@/data/scholarship";
import { ScholarshipPageHero } from "@/components/scholarship/scholarship-page-hero";
import { ScholarshipPageContent } from "@/components/pages/animated-page-sections";

export const metadata: Metadata = createPageMetadata({
  title: "Scholarship Program",
  description:
    "Apply for ELEVEIIM scholarships — up to 100% fee waiver. Learn about eligibility, the exam process, and benefits.",
  path: "/scholarship",
  keywords: ["scholarship", "fee waiver", "financial aid", "ELEVEIIM"],
});

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

      <ScholarshipPageHero />
      <ScholarshipPageContent />

      <PageCta
        primaryHref="/courses"
        primaryLabel="Browse Courses"
        secondaryHref="/contact"
        secondaryLabel="Contact Us"
      />
    </PageTransition>
  );
}
