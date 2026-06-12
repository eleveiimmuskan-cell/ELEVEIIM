import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  breadcrumbSchema,
  faqSchema,
  industrialTrainingCourseSchema,
  organizationSchema,
} from "@/lib/seo/schema";
import { JsonLd } from "@/components/common/json-ld";
import { PageTransition } from "@/animations/page-transition";
import {
  HeroSection,
  WhyChooseSection,
  RoadmapTimeline,
  BenefitsSection,
  PortfolioProjects,
  Testimonials,
  PlacementProcess,
  CertificatesSection,
  ComparisonTable,
  MentorsSection,
  FinalCTA,
} from "@/components/industrial-training";
import {
  INDUSTRIAL_FAQS,
  INDUSTRIAL_TRAINING_META,
} from "@/data/industrial-training";

const TrainingDomains = dynamic(
  () =>
    import("@/components/industrial-training/training-domains").then(
      (m) => m.TrainingDomains
    ),
  { loading: () => <div className="min-h-[400px] bg-[#0B63CE]/[0.03] py-16" /> }
);

const CompanyLogos = dynamic(
  () =>
    import("@/components/industrial-training/company-logos").then(
      (m) => m.CompanyLogos
    ),
  { loading: () => <div className="min-h-[200px] bg-[#1E293B]" /> }
);

const FaqSection = dynamic(
  () =>
    import("@/components/industrial-training/faq-section").then((m) => m.FaqSection),
  { loading: () => <div className="min-h-[320px] py-16" /> }
);

export const metadata: Metadata = createPageMetadata({
  title: INDUSTRIAL_TRAINING_META.title,
  description: INDUSTRIAL_TRAINING_META.description,
  path: "/industrial-training",
  keywords: [...INDUSTRIAL_TRAINING_META.keywords],
});

export default function IndustrialTrainingPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Industrial Training" },
  ];

  return (
    <PageTransition>
      <JsonLd
        data={[
          organizationSchema(),
          breadcrumbSchema(breadcrumbs),
          faqSchema(INDUSTRIAL_FAQS),
          industrialTrainingCourseSchema({
            title: INDUSTRIAL_TRAINING_META.title,
            description: INDUSTRIAL_TRAINING_META.description,
          }),
        ]}
      />

      <main>
        <HeroSection />
        <WhyChooseSection />
        <TrainingDomains />
        <RoadmapTimeline />
        <BenefitsSection />
        <PortfolioProjects />
        <CompanyLogos />
        <Testimonials />
        <PlacementProcess />
        <CertificatesSection />
        <ComparisonTable />
        <MentorsSection />
        <FaqSection />
        <FinalCTA />
      </main>
    </PageTransition>
  );
}
