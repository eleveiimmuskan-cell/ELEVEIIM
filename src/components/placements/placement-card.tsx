"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { PlacementStory } from "@/types";
import { GlassCard } from "@/components/common/glass-card";
import { isRemoteMediaUrl } from "@/lib/media-url";

function StudentAvatar({ story }: { story: PlacementStory }) {
  const [failed, setFailed] = useState(false);
  const showPhoto = Boolean(story.photoUrl) && !failed;

  return (
    <div className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-brand/10 text-sm font-bold text-brand">
      {showPhoto ? (
        <Image
          src={story.photoUrl!}
          alt={story.studentName}
          width={48}
          height={48}
          className="size-full object-cover"
          unoptimized={isRemoteMediaUrl(story.photoUrl!)}
          onError={() => setFailed(true)}
        />
      ) : (
        story.image
      )}
    </div>
  );
}

export function PlacementCard({
  story,
  index = 0,
}: {
  story: PlacementStory;
  index?: number;
}) {
  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
    >
      <Link href={`/placements/${story.slug}`} className="block h-full">
        <GlassCard className="flex h-full flex-col bg-white">
          <div className="mb-4 flex items-center gap-3">
            <StudentAvatar story={story} />
            <div className="min-w-0">
              <p className="font-semibold text-foreground">{story.studentName}</p>
              <p className="text-xs text-muted-foreground">
                {[story.course, story.batch].filter(Boolean).join(" · ") || "—"}
              </p>
            </div>
          </div>
          <p className="text-sm font-medium text-brand">
            {story.role} · {story.company}
          </p>
          <p className="mt-1 text-lg font-bold text-brand-accent">{story.package}</p>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
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
