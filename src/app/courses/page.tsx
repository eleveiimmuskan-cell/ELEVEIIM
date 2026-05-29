import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/common/json-ld";
import { PageHero } from "@/components/common/page-header";
import { Breadcrumb } from "@/components/common/page-header";
import { PageCta } from "@/components/common/page-cta";
import { PageTransition } from "@/animations/page-transition";
import { CoursesListing } from "@/components/courses/courses-listing";

export const metadata: Metadata = createPageMetadata({
  title: "Courses",
  description:
    "Browse industry-ready courses at ELEVEIIM — Full Stack, Data Science, Digital Marketing, UI/UX, Cloud, and Cybersecurity programs.",
  path: "/courses",
  keywords: ["courses", "training programs", "certification", "ELEVEIIM"],
});

export default function CoursesPage() {
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
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Courses" }]} />
          <CoursesListing />
        </div>
      </section>
      <PageCta />
    </PageTransition>
  );
}
