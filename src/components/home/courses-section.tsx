"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Award,
  Clock,
  Star,
  User,
  Users,
} from "lucide-react";
import { courses } from "@/data/courses";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  SectionReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/common/motion-wrapper";
import { SectionHeader } from "@/components/common/section-header";
import { GlassCard } from "@/components/common/glass-card";

export function CoursesSection() {
  return (
    <SectionReveal id="courses" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Our Programs"
          title="Industry-Ready Courses"
          description="Hands-on learning with certifications, expert trainers, and flexible batch timings designed for your success."
        />

        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <StaggerItem key={course.id}>
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <GlassCard className="flex h-full flex-col">
                  <div className="mb-4 flex items-start justify-between gap-2">
                    <Badge variant="outline" className="border-brand/20 text-brand">
                      {course.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm font-medium">
                      <Star className="size-3.5 fill-brand-accent text-brand-accent" />
                      {course.rating}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-foreground">
                    {course.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {course.description}
                  </p>

                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <Clock className="size-4 text-brand" />
                      {course.duration} · {course.batchTiming}
                    </li>
                    <li className="flex items-center gap-2">
                      <Award className="size-4 text-brand" />
                      {course.certification}
                    </li>
                    <li className="flex items-center gap-2">
                      <User className="size-4 text-brand" />
                      Trainer: {course.trainer}
                    </li>
                    <li className="flex items-center gap-2">
                      <Users className="size-4 text-brand" />
                      {course.students.toLocaleString()}+ enrolled
                    </li>
                  </ul>

                  <Button
                    asChild
                    className="mt-6 w-full bg-brand hover:bg-brand/90"
                  >
                    <Link href="#contact">Enroll Now</Link>
                  </Button>
                </GlassCard>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </SectionReveal>
  );
}
