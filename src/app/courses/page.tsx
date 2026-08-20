import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/data/page-seo";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/common/json-ld";
import { PageHero } from "@/components/common/page-header";
import { Breadcrumb } from "@/components/common/page-header";
import { PageCta } from "@/components/common/page-cta";
import { PageTransition } from "@/animations/page-transition";
import { PageContentSection } from "@/components/common/motion-wrapper";
import { CoursesListing } from "@/components/courses/courses-listing";
import { getPublishedCourses } from "@/services/courses.service";

export const metadata: Metadata = createPageMetadata({
  title: PAGE_SEO.courses.title,
  description: PAGE_SEO.courses.description,
  path: "/courses",
  keywords: ["courses", "training programs", "certification", "ELEVEIIM"],
  absoluteTitle: true,
});

/** Courses listing ISR. */
export const revalidate = 60;

export default async function CoursesPage() {
  const courses = await getPublishedCourses(50);

  return (
    <PageTransition>
      <JsonLd
        data={breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Courses" },
        ])}
      />
      <PageHero
        eyebrow="Programs"
        title="Industry-Ready Courses"
        description="Hands-on learning with certifications, expert trainers, and flexible batch timings."
      />
      <PageContentSection>
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Courses" }]}
        />
        <CoursesListing courses={courses} />
      </PageContentSection>
      <PageCta />
    </PageTransition>
  );
}
