"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/common/page-header";
import { PREMIUM_EASE, VIEWPORT_ONCE } from "@/components/common/motion-wrapper";
import { isRemoteMediaUrl } from "@/lib/media-url";

export function AnimatedPageHero({
  eyebrow,
  title,
  description,
  backgroundImage,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Optional CMS background image (About hero, etc.). */
  backgroundImage?: string | null;
}) {
  const hasBackground = Boolean(backgroundImage?.trim());

  return (
    <section className="relative overflow-hidden bg-brand pt-24 pb-16 sm:pt-28 sm:pb-20">
      {hasBackground ? (
        <>
          <Image
            src={backgroundImage!}
            alt=""
            fill
            priority
            className="object-cover"
            unoptimized={isRemoteMediaUrl(backgroundImage!)}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-brand/80" />
        </>
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12),transparent_60%)]" />
      )}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.75, ease: PREMIUM_EASE }}
        >
          <PageHeader
            eyebrow={eyebrow}
            title={title}
            description={description}
            light
          />
        </motion.div>
      </div>
    </section>
  );
}
