"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/shared/section-header";
import { AiToolLogo } from "@/components/free-ai-foundation-course/tool-logo";
import { FREE_AI_FOUNDATION_TOOLS } from "@/data/free-ai-foundation-course";
import {
  PREMIUM_EASE,
  VIEWPORT_ONCE,
  itemFadeUp,
} from "@/components/common/motion-wrapper";

export function FreeAiFoundationLearnSection() {
  return (
    <section className="bg-white py-16 sm:py-20" aria-labelledby="what-you-learn-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Curriculum"
          title="Five tools, used on real work"
          titleId="what-you-learn-heading"
          description="Each session is hands-on. You leave knowing how to use the tool, not only what it is called."
        />

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.05 } },
          }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          {FREE_AI_FOUNDATION_TOOLS.map((tool) => (
            <motion.li
              key={tool.name}
              variants={itemFadeUp}
              transition={{ duration: 0.5, ease: PREMIUM_EASE }}
              className="flex h-full flex-col rounded-2xl border border-border bg-white p-5"
            >
              <AiToolLogo name={tool.name} src={tool.src} />
              <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground">
                {tool.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {tool.description}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
