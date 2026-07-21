import { HeroSection } from "@/components/home/hero-section";
import { TrustedPartnersSection } from "@/components/home/trusted-partners";
import { FeaturedCoursesSection } from "@/components/home/featured-courses";
import { PlacementHighlightsSection } from "@/components/home/placement-highlights";
import { ScholarshipHighlightSection } from "@/components/home/scholarship-highlight";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { WhoCanJoinSection } from "@/components/home/who-can-join-section";
import { BenefitsSection } from "@/components/home/benefits-section";
import { IndustrialTrainingPreview } from "@/components/home/industrial-training-preview";
import { PageCta } from "@/components/common/page-cta";
import { PageTransition } from "@/animations/page-transition";
import { getActiveIndustryPartners } from "@/services/industry-partners.service";
import { getFeaturedCourses } from "@/services/courses.service";
import { getFeaturedPlacements } from "@/services/placements.service";
import { getActiveTestimonials } from "@/services/testimonials.service";
import { getWhoCanJoinSection } from "@/services/homepage.service";

/** Homepage ISR — extend Promise.all below as more sections go dynamic. */
export const revalidate = 60;

export default async function HomePage() {
  const [
    partners,
    featuredCourses,
    featuredPlacements,
    testimonials,
    whoCanJoin,
  ] = await Promise.all([
    getActiveIndustryPartners(),
    getFeaturedCourses(3),
    getFeaturedPlacements(3),
    getActiveTestimonials(20),
    getWhoCanJoinSection(),
  ]);

  return (
    <PageTransition>
      <HeroSection />
      <TrustedPartnersSection partners={partners} />
      <FeaturedCoursesSection courses={featuredCourses} />
      <PlacementHighlightsSection stories={featuredPlacements} />
      <ScholarshipHighlightSection />
      <TestimonialsSection testimonials={testimonials} />
      {whoCanJoin && <WhoCanJoinSection section={whoCanJoin} />}
      <BenefitsSection />
      <IndustrialTrainingPreview />
      <PageCta />
    </PageTransition>
  );
}
