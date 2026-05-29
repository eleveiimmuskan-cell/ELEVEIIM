"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import type { BlogPost } from "@/types";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/common/glass-card";

export function BlogCard({ post, index = 0 }: { post: BlogPost; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
    >
      <Link href={`/blogs/${post.slug}`}>
        <GlassCard className="flex h-full flex-col bg-white">
          <Badge variant="outline" className="mb-3 w-fit border-brand/20 text-brand">
            {post.category}
          </Badge>
          <h3 className="text-lg font-bold text-foreground">{post.title}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>
          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <span>{post.author}</span>
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" />
              {post.readingTime} min read
            </span>
          </div>
        </GlassCard>
      </Link>
    </motion.div>
  );
}
