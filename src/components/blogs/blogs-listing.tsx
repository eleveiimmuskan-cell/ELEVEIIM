"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { BlogPost } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BlogCard } from "./blog-card";
import { cn } from "@/lib/utils";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/common/motion-wrapper";

const PAGE_SIZE = 12;

/** Unique categories from posts (for chip filters). */
function buildCategoryChips(posts: BlogPost[]): string[] {
  const seen = new Set<string>();
  const chips: string[] = [];

  for (const post of posts) {
    const name = post.category?.trim();
    if (!name || name.toLowerCase() === "general") continue;
    const key = name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    chips.push(name);
  }

  return chips.sort((a, b) => a.localeCompare(b));
}

function filterPostsClient(
  posts: BlogPost[],
  search: string,
  category: string,
  page: number
) {
  let result = [...posts];

  if (category !== "All") {
    const key = category.toLowerCase();
    result = result.filter((p) => p.category.trim().toLowerCase() === key);
  }

  if (search.trim()) {
    const q = search.trim().toLowerCase();
    result = result.filter((p) => {
      const haystack = [
        p.title,
        p.excerpt,
        p.category,
        p.author,
        ...(p.tags ?? []),
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

interface BlogsListingProps {
  posts: BlogPost[];
}

export function BlogsListing({ posts }: BlogsListingProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);

  const chipOptions = useMemo(
    () => ["All", ...buildCategoryChips(posts)],
    [posts]
  );

  const { items, total, totalPages } = useMemo(
    () => filterPostsClient(posts, search, category, page),
    [posts, search, category, page]
  );

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
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
                  setCategory(option);
                  setPage(1);
                }}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200",
                  category === option
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
          {posts.length === 0
            ? "No articles available right now. Please check back soon."
            : "No articles found. Try adjusting your search or filters."}
        </p>
      ) : (
        <StaggerContainer
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          key={`${category}-${page}-${search}`}
        >
          {items.map((post, i) => (
            <StaggerItem key={post.slug}>
              <BlogCard post={post} index={i} />
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
            Page {page} of {totalPages} ({total} articles)
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
