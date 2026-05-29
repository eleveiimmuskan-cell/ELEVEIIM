"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { PlacementStory } from "@/types";
import { GlassCard } from "@/components/common/glass-card";
import { ArrowRight } from "lucide-react";

export function PlacementCard({
  story,
  index = 0,
}: {
  story: PlacementStory;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
    >
      <Link href={`/placements/${story.slug}`}>
        <GlassCard className="h-full bg-white">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-xl bg-brand/10 text-sm font-bold text-brand">
              {story.image}
            </div>
            <div>
              <p className="font-semibold text-foreground">{story.studentName}</p>
              <p className="text-xs text-muted-foreground">{story.batch}</p>
            </div>
          </div>
          <p className="text-sm font-medium text-brand">{story.role} · {story.company}</p>
          <p className="mt-1 text-lg font-bold text-brand-accent">{story.package}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {story.summary}
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand">
            Read story <ArrowRight className="size-3.5" />
          </span>
        </GlassCard>
      </Link>
    </motion.div>
  );
}
