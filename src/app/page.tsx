import { HeroSection } from "@/components/home/hero-section";
import { TrustedPartnersSection } from "@/components/home/trusted-partners";
import { FeaturedCoursesSection } from "@/components/home/featured-courses";
import { PlacementHighlightsSection } from "@/components/home/placement-highlights";
import { ScholarshipHighlightSection } from "@/components/home/scholarship-highlight";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { PageCta } from "@/components/common/page-cta";
import { PageTransition } from "@/animations/page-transition";

export default function HomePage() {
  return (
    <PageTransition>
      <HeroSection />
      <TrustedPartnersSection />
      <FeaturedCoursesSection />
      <PlacementHighlightsSection />
      <ScholarshipHighlightSection />
      <TestimonialsSection />
      <PageCta />
    </PageTransition>
  );
}
