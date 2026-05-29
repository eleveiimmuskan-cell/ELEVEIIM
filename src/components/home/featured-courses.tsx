"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedCourses } from "@/services/courses.service";
import { SectionReveal } from "@/components/common/motion-wrapper";
import { SectionHeader } from "@/components/common/section-header";
import { CourseCard } from "@/components/courses/course-card";
import { Button } from "@/components/ui/button";

export function FeaturedCoursesSection() {
  const courses = getFeaturedCourses(3);

  return (
    <SectionReveal className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Our Programs"
          title="Featured Courses"
          description="Explore our most popular programs — designed for career-ready outcomes."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, i) => (
            <CourseCard key={course.slug} course={course} index={i}/>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="outline" className="border-brand text-brand hover:bg-brand hover:text-white">
            <Link href="/courses">
              View All Courses
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </SectionReveal>
  );
}
