"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { filterPlacements } from "@/services/placements.service";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlacementCard } from "./placement-card";

export function PlacementsListing() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { items, total, totalPages } = useMemo(
    () => filterPlacements({ search, page, pageSize: 6 }),
    [search, page]
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((story, i) => (
          <PlacementCard key={story.slug} story={story} index={i} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-3">
          <Button variant="outline" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages} ({total} stories)
          </span>
          <Button variant="outline" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
