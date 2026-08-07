import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/common/json-ld";
import { PageTransition } from "@/animations/page-transition";
import {
  FutureLeadersEligibilitySection,
  FutureLeadersScholarshipFinalCta,
  FutureLeadersScholarshipHero,
  FutureLeadersScholarshipStatsBar,
} from "@/components/future-leaders-scholarship";
import { FUTURE_LEADERS_SCHOLARSHIP_META } from "@/data/future-leaders-scholarship";

export const metadata: Metadata = createPageMetadata({
  title: FUTURE_LEADERS_SCHOLARSHIP_META.title,
  description: FUTURE_LEADERS_SCHOLARSHIP_META.description,
  path: FUTURE_LEADERS_SCHOLARSHIP_META.path,
  keywords: [...FUTURE_LEADERS_SCHOLARSHIP_META.keywords],
});

export default function FutureLeadersScholarshipPage() {
  return (
    <PageTransition>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", href: "/" },
            { label: "Future Leaders Scholarship" },
          ]),
        ]}
      />

      <FutureLeadersScholarshipHero />
      <FutureLeadersScholarshipStatsBar />
      <FutureLeadersEligibilitySection />
      <FutureLeadersScholarshipFinalCta />
    </PageTransition>
  );
}
