"use client";

import { useState } from "react";
import Image from "next/image";
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
import { isRemoteMediaUrl } from "@/lib/media-url";
import type { PlacementStory } from "@/types";

function StudentHeroAvatar({ story }: { story: PlacementStory }) {
  const [failed, setFailed] = useState(false);
  const showPhoto = Boolean(story.photoUrl) && !failed;

  return (
    <div className="relative mx-auto mb-4 flex size-20 items-center justify-center overflow-hidden rounded-2xl bg-white/15 text-2xl font-bold text-white backdrop-blur-sm">
      {showPhoto ? (
        <Image
          src={story.photoUrl!}
          alt={story.studentName}
          width={80}
          height={80}
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
            <StudentHeroAvatar story={story} />
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
          <div
            className="prose prose-neutral max-w-none leading-relaxed prose-p:text-muted-foreground prose-headings:text-foreground prose-a:text-brand prose-strong:text-foreground"
            dangerouslySetInnerHTML={{ __html: story.story }}
          />
        </GlassCard>
      </PageContentSection>
    </>
  );
}
