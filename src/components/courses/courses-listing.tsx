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

const PAGE_SIZE = 12;

/** Unique first-tags from courses, for chip filters. */
function buildChipTags(courses: Course[]): string[] {
  const seen = new Set<string>();
  const chips: string[] = [];

  for (const course of courses) {
    const first = course.tags?.[0]?.trim();
    if (!first) continue;
    const key = first.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    chips.push(first);
  }

  return chips.sort((a, b) => a.localeCompare(b));
}

function filterCoursesClient(
  courses: Course[],
  search: string,
  chip: string,
  page: number
) {
  let result = [...courses];

  if (chip !== "All") {
    const chipKey = chip.toLowerCase();
    result = result.filter(
      (c) => c.tags?.[0]?.trim().toLowerCase() === chipKey
    );
  }

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
  const [chip, setChip] = useState("All");
  const [page, setPage] = useState(1);

  const chipOptions = useMemo(
    () => ["All", ...buildChipTags(courses)],
    [courses]
  );

  const { items, total, totalPages } = useMemo(
    () => filterCoursesClient(courses, search, chip, page),
    [courses, search, chip, page]
  );

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
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
        {chipOptions.length > 1 ? (
          <div className="flex flex-wrap gap-2">
            {chipOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setChip(option);
                  setPage(1);
                }}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200",
                  chip === option
                    ? "bg-brand text-white shadow-md shadow-brand/20"
                    : "bg-muted text-muted-foreground hover:bg-brand/10 hover:text-brand"
                )}
              >
                {option}
              </button>
            ))}
          </div>
        ) : null}
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
