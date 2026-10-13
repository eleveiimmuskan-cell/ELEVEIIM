"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Course } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CourseCard } from "./course-card";
import { cn } from "@/lib/utils";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/common/motion-wrapper";
import {
  COURSE_LISTING_FILTERS,
  courseMatchesListingFilter,
  type CourseListingFilterId,
} from "@/lib/courses/listing-filters";

const PAGE_SIZE = 12;

function filterCoursesClient(
  courses: Course[],
  search: string,
  chip: CourseListingFilterId,
  page: number
) {
  let result = courses.filter((course) =>
    courseMatchesListingFilter(course, chip)
  );

  if (search.trim()) {
    const q = search.trim().toLowerCase();
    result = result.filter((c) => {
      const haystack = [
        c.title,
        c.shortDescription,
        c.description,
        c.category,
        c.level,
        ...(c.tags ?? []),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }

  const total = result.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * PAGE_SIZE;

  return {
    items: result.slice(start, start + PAGE_SIZE),
    total,
    page: safePage,
    totalPages: total === 0 ? 0 : totalPages,
  };
}

interface CoursesListingProps {
  courses: Course[];
}

export function CoursesListing({ courses }: CoursesListingProps) {
  const [search, setSearch] = useState("");
  const [chip, setChip] = useState<CourseListingFilterId>("all");
  const [page, setPage] = useState(1);

  const { items, total, totalPages } = useMemo(
    () => filterCoursesClient(courses, search, chip, page),
    [courses, search, chip, page]
  );

  return (
    <div>
      <div className="mb-8 space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-9"
          />
        </div>
        <div
          className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible"
          role="tablist"
          aria-label="Course filters"
        >
          {COURSE_LISTING_FILTERS.map((option) => (
            <button
              key={option.id}
              type="button"
              role="tab"
              aria-selected={chip === option.id}
              onClick={() => {
                setChip(option.id);
                setPage(1);
              }}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200 sm:px-4",
                chip === option.id
                  ? "bg-brand text-white shadow-md shadow-brand/20"
                  : "bg-muted text-muted-foreground hover:bg-brand/10 hover:text-brand"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {items.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">
          {courses.length === 0
            ? "No courses available right now. Please check back soon."
            : "No courses found. Try adjusting your search or filters."}
        </p>
      ) : (
        <StaggerContainer
          className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3"
          key={`${chip}-${page}-${search}`}
        >
          {items.map((course, i) => (
            <StaggerItem key={course.slug} className="h-full">
              <CourseCard course={course} index={i} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}

      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-3">
          <Button
            variant="outline"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages} ({total} courses)
          </span>
          <Button
            variant="outline"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
