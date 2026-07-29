import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/common/json-ld";
import { PageTransition } from "@/animations/page-transition";
import {
  CancellationCard,
  CTASection,
  EligibilityCard,
  FAQSection,
  FooterNote,
  HeroSection,
  ImportantNotesCard,
  IntroductionCard,
  RenewalCard,
  ScholarshipTable,
  TermsStickyNav,
} from "@/components/scholarship/terms";
import {
  SCHOLARSHIP_TERMS_FAQS,
  SCHOLARSHIP_TERMS_PATH,
} from "@/data/scholarship-terms";

export const metadata: Metadata = createPageMetadata({
  title: "Scholarship Terms & Conditions",
  description:
    "Read ELEVEIIM scholarship terms and conditions — eligibility, award structure, renewal, cancellation, and important policy notes.",
  path: SCHOLARSHIP_TERMS_PATH,
  keywords: [
    "scholarship terms",
    "scholarship conditions",
    "merit scholarship",
    "ELEVEIIM scholarship policy",
  ],
});

export default function ScholarshipTermsPage() {
  return (
    <PageTransition>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", href: "/" },
            { label: "Scholarship", href: "/scholarship" },
            { label: "Terms & Conditions" },
          ]),
          faqSchema(SCHOLARSHIP_TERMS_FAQS),
        ]}
      />

      <HeroSection />
      <TermsStickyNav />

      <div className="bg-gradient-to-b from-white via-[#F8FBFF] to-white dark:from-slate-950 dark:via-slate-950 dark:to-slate-950">
        <div className="mx-auto max-w-7xl space-y-10 px-4 py-12 sm:space-y-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <IntroductionCard />
          <ScholarshipTable />

          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            <EligibilityCard />
            <RenewalCard />
          </div>

          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            <CancellationCard />
            <ImportantNotesCard />
          </div>

          <FAQSection />
          <CTASection />
          <FooterNote />
        </div>
      </div>
    </PageTransition>
  );
}
