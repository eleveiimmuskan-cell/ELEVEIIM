import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/data/page-seo";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/common/json-ld";
import { PageCta } from "@/components/common/page-cta";
import { PageTransition } from "@/animations/page-transition";
import { ScholarshipPageHero } from "@/components/scholarship/scholarship-page-hero";
import { ScholarshipPageContent } from "@/components/pages/animated-page-sections";
import { getScholarshipPageView } from "@/services/scholarship-cms.service";

export const revalidate = 60;

export const metadata: Metadata = createPageMetadata({
  title: PAGE_SEO.scholarship.title,
  description: PAGE_SEO.scholarship.description,
  path: "/scholarship",
  keywords: ["scholarship", "fee waiver", "financial aid", "ELEVEIIM"],
  absoluteTitle: true,
});

export default async function ScholarshipPage() {
  const { page } = await getScholarshipPageView();

  return (
    <PageTransition>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", href: "/" },
            { label: "Scholarship" },
          ]),
          faqSchema(
            page.faqs.map((faq) => ({
              question: faq.question,
              answer: faq.answer,
            }))
          ),
        ]}
      />

      <ScholarshipPageHero
        eyebrow={page.heroEyebrow}
        description={page.heroDescription}
      />
      <ScholarshipPageContent page={page} />

      <PageCta
        primaryHref="/courses"
        primaryLabel="Browse Courses"
        secondaryHref="/contact"
        secondaryLabel="Contact Us"
      />
    </PageTransition>
  );
}
