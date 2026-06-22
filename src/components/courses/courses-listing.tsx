"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { COURSE_CATEGORIES } from "@/lib/constants";
import { filterCourses } from "@/services/courses.service";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CourseCard } from "./course-card";
import { cn } from "@/lib/utils";
import { StaggerContainer, StaggerItem } from "@/components/common/motion-wrapper";

export function CoursesListing() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);

  const { items, total, totalPages } = useMemo(
    () => filterCourses({ search, category, page, pageSize: 6 }),
    [search, category, page]
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
        <div className="flex flex-wrap gap-2">
          {COURSE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setCategory(cat);
                setPage(1);
              }}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200",
                category === cat
                  ? "bg-brand text-white shadow-md shadow-brand/20"
                  : "bg-muted text-muted-foreground hover:bg-brand/10 hover:text-brand"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {items.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">
          No courses found. Try adjusting your search or filters.
        </p>
      ) : (
        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" key={`${category}-${page}-${search}`}>
          {items.map((course, i) => (
            <StaggerItem key={course.slug}>
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
