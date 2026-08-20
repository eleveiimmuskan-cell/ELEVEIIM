import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Award, Clock, Star, User, Users } from "lucide-react";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  breadcrumbSchema,
  courseSchema,
  faqSchema,
} from "@/lib/seo/schema";
import { JsonLd } from "@/components/common/json-ld";
import { Breadcrumb, PageHero } from "@/components/common/page-header";
import { PageCta } from "@/components/common/page-cta";
import { PageTransition } from "@/animations/page-transition";
import { PageContentSection } from "@/components/common/motion-wrapper";
import { CourseCard } from "@/components/courses/course-card";
import { GlassCard } from "@/components/common/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getCourseBySlug,
  getPublishedCourseSlugs,
  getRelatedCourses,
} from "@/services/courses.service";
import { getCourseSeo } from "@/data/course-seo";

/** Flip to `true` when Student Reviews / FAQ are ready to show again. */
const SHOW_COURSE_REVIEWS = false;
const SHOW_COURSE_FAQS = false;

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getPublishedCourseSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) return { title: "Course Not Found" };

  const seo = getCourseSeo(slug);

  return createPageMetadata({
    title: seo?.title ?? course.title,
    description:
      seo?.description ?? course.seoDescription ?? course.description,
    path: `/courses/${slug}`,
    keywords: [course.category, course.title, "course", "ELEVEIIM"],
    absoluteTitle: Boolean(seo),
  });
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) notFound();

  const related = await getRelatedCourses(slug);
  const courseReviews = course.reviews ?? [];
  const jsonLd = [
    breadcrumbSchema([
      { label: "Home", href: "/" },
      { label: "Courses", href: "/courses" },
      { label: course.title },
    ]),
    courseSchema(course),
    ...(SHOW_COURSE_FAQS ? [faqSchema(course.faqs)] : []),
  ];

  return (
    <PageTransition>
      <JsonLd data={jsonLd} />

      <PageHero
        eyebrow={course.category}
        title={course.title}
        description={course.seoDescription || course.shortDescription}
      />

      <PageContentSection>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Courses", href: "/courses" },
            { label: course.title },
          ]}
        />

        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            <div>
              <h2 className="text-2xl font-bold">About This Course</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {course.description}
              </p>
            </div>

            {course.curriculum.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold">Curriculum</h2>
                <div className="mt-6 space-y-4">
                  {course.curriculum.map((mod, i) => (
                    <GlassCard
                      key={`${mod.title}-${i}`}
                      hover={false}
                      className="bg-muted/20"
                    >
                      <div className="flex items-start gap-4">
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand text-sm font-bold text-white">
                          {i + 1}
                        </span>
                        <div>
                          <h3 className="font-semibold">{mod.title}</h3>
                          {mod.topics.length > 0 && (
                            <ul className="mt-2 flex flex-wrap gap-2">
                              {mod.topics.map((t) => (
                                <Badge key={t} variant="secondary">
                                  {t}
                                </Badge>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            )}

            {SHOW_COURSE_REVIEWS && (
              <div>
                <h2 className="text-2xl font-bold">Student Reviews</h2>
                <div className="mt-6 space-y-4">
                  {courseReviews.map((r) => (
                    <GlassCard key={r.id} hover={false}>
                      <div className="flex items-center gap-2">
                        <Star className="size-4 fill-brand-accent text-brand-accent" />
                        <span className="font-semibold">{r.name}</span>
                        {r.date && (
                          <span className="text-sm text-muted-foreground">
                            · {r.date}
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {r.content}
                      </p>
                    </GlassCard>
                  ))}
                </div>
              </div>
            )}

            {SHOW_COURSE_FAQS && (
              <div itemScope itemType="https://schema.org/FAQPage">
                <h2 className="text-2xl font-bold">FAQ</h2>
                <div className="mt-6 space-y-4">
                  {course.faqs.map((faq) => (
                    <GlassCard key={faq.question} hover={false}>
                      <div
                        itemScope
                        itemProp="mainEntity"
                        itemType="https://schema.org/Question"
                      >
                        <h3 itemProp="name" className="font-semibold">
                          {faq.question}
                        </h3>
                        <div
                          itemScope
                          itemProp="acceptedAnswer"
                          itemType="https://schema.org/Answer"
                        >
                          <p
                            itemProp="text"
                            className="mt-2 text-sm text-muted-foreground"
                          >
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside>
            <GlassCard hover={false} className="sticky top-24 bg-white">
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Clock className="size-4 text-brand" /> {course.duration}
                </li>
                <li className="flex items-center gap-2">
                  <Award className="size-4 text-brand" /> {course.certification}
                </li>
                <li className="flex items-center gap-2">
                  <User className="size-4 text-brand" /> {course.trainer}
                </li>
                <li className="flex items-center gap-2">
                  <Users className="size-4 text-brand" />{" "}
                  {course.students.toLocaleString()}+ enrolled
                </li>
                <li className="flex items-center gap-2">
                  <Star className="size-4 fill-brand-accent text-brand-accent" />{" "}
                  {course.rating} rating
                </li>
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">
                {course.batchTiming}
              </p>
              <Button asChild className="mt-6 w-full bg-brand hover:bg-brand/90">
                <Link href="/contact">Enroll Now</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="mt-2 w-full border-brand text-brand"
              >
                <Link href="/scholarship">Apply for Scholarship</Link>
              </Button>
            </GlassCard>
          </aside>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold">Related Courses</h2>
            <div className="mt-6 grid items-stretch gap-6 md:grid-cols-3">
              {related.map((c, i) => (
                <CourseCard key={c.slug} course={c} index={i} />
              ))}
            </div>
          </div>
        )}
      </PageContentSection>

      <PageCta
        title={`Ready to start ${course.title}?`}
        description="Enroll today or apply for a scholarship to begin your journey."
      />
    </PageTransition>
  );
}
