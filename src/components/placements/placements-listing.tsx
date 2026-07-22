"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { PlacementStory } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlacementCard } from "./placement-card";

const PAGE_SIZE = 6;

function filterStories(
  stories: PlacementStory[],
  search: string,
  page: number
) {
  let result = [...stories];

  if (search.trim()) {
    const q = search.trim().toLowerCase();
    result = result.filter(
      (p) =>
        p.studentName.toLowerCase().includes(q) ||
        p.company.toLowerCase().includes(q) ||
        p.course.toLowerCase().includes(q) ||
        p.role.toLowerCase().includes(q)
    );
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

interface PlacementsListingProps {
  stories: PlacementStory[];
}

export function PlacementsListing({ stories }: PlacementsListingProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { items, total, totalPages } = useMemo(
    () => filterStories(stories, search, page),
    [stories, search, page]
  );

  return (
    <div>
      <div className="relative mb-8 max-w-md">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name, company, or course..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="pl-9"
        />
      </div>

      {items.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">
          {stories.length === 0
            ? "Success stories will appear here soon."
            : "No stories found. Try adjusting your search."}
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((story, i) => (
            <PlacementCard key={story.slug} story={story} index={i} />
          ))}
        </div>
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
            Page {page} of {totalPages} ({total} stories)
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
