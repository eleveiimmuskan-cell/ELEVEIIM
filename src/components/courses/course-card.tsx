"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Award, Clock, Star, User } from "lucide-react";
import type { Course } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/common/glass-card";

interface CourseCardProps {
  course: Course;
  index?: number;
}

export function CourseCard({ course, index = 0 }: CourseCardProps) {
  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <GlassCard className="flex h-full flex-col">
        <div className="mb-4 flex shrink-0 items-start justify-between gap-2">
          <Badge variant="outline" className="border-brand/20 text-brand">
            {course.category}
          </Badge>
          <div className="flex items-center gap-1 text-sm font-medium">
            <Star className="size-3.5 fill-brand-accent text-brand-accent" />
            {course.rating}
          </div>
        </div>

        <h3 className="line-clamp-2 min-h-[3.5rem] text-lg font-bold leading-snug text-foreground">
          {course.title}
        </h3>
        <p className="mt-2 line-clamp-3 min-h-[3.75rem] flex-1 text-sm leading-relaxed text-muted-foreground">
          {course.shortDescription}
        </p>

        <ul className="mt-4 shrink-0 space-y-2 text-sm text-muted-foreground">
          <li className="flex items-center gap-2">
            <Clock className="size-4 shrink-0 text-brand" />
            <span className="line-clamp-1">
              {course.duration} · {course.batchTiming}
            </span>
          </li>
          <li className="flex items-center gap-2">
            <Award className="size-4 shrink-0 text-brand" />
            <span className="line-clamp-1">{course.certification}</span>
          </li>
          <li className="flex items-center gap-2">
            <User className="size-4 shrink-0 text-brand" />
            <span className="line-clamp-1">{course.trainer}</span>
          </li>
        </ul>

        <Button asChild className="mt-6 w-full shrink-0 bg-brand hover:bg-brand/90">
          <Link href={`/courses/${course.slug}`}>View Course</Link>
        </Button>
      </GlassCard>
    </motion.div>
  );
}
