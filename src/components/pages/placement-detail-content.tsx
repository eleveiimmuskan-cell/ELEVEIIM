"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Breadcrumb } from "@/components/common/page-header";
import { GlassCard } from "@/components/common/glass-card";
import { Button } from "@/components/ui/button";
import {
  PageContentSection,
  PREMIUM_EASE,
  VIEWPORT_ONCE,
} from "@/components/common/motion-wrapper";
import type { PlacementStory } from "@/types";

export function PlacementDetailContent({ story }: { story: PlacementStory }) {
  return (
    <>
      <section className="bg-brand pt-24 pb-12">
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.75, ease: PREMIUM_EASE }}
          >
            <div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-2xl bg-white/15 text-2xl font-bold text-white backdrop-blur-sm">
              {story.image}
            </div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">{story.studentName}</h1>
            <p className="mt-2 text-lg text-white/85">
              {story.role} at {story.company}
            </p>
            <p className="mt-1 text-2xl font-bold text-brand-accent">{story.package}</p>
          </motion.div>
        </div>
      </section>

      <PageContentSection narrow>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Placements", href: "/placements" },
            { label: story.studentName },
          ]}
        />

        <Button asChild variant="ghost" className="mb-6 -ml-2 text-brand">
          <Link href="/placements">
            <ArrowLeft className="size-4" />
            Back to Placements
          </Link>
        </Button>

        <GlassCard hover={false} className="bg-white">
          <div className="mb-6 grid gap-4 text-sm sm:grid-cols-3">
            <div>
              <p className="text-muted-foreground">Course</p>
              <p className="font-semibold">{story.course}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Batch</p>
              <p className="font-semibold">{story.batch}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Package</p>
              <p className="font-semibold text-brand-accent">{story.package}</p>
            </div>
          </div>
          <p className="leading-relaxed text-muted-foreground">{story.story}</p>
        </GlassCard>
      </PageContentSection>
    </>
  );
}
