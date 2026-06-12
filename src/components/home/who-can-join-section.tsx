"use client";

import { motion } from "framer-motion";
import {
  SectionReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/common/motion-wrapper";
import { SectionHeader } from "@/components/common/section-header";
import { cn } from "@/lib/utils";
import {
  WHO_CAN_JOIN_HEADING,
  whoCanJoinItems,
} from "@/data/home-sections";

export function WhoCanJoinSection() {
  return (
    <SectionReveal
      id="who-can-join"
      className="bg-white py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header>
          <SectionHeader
            title={WHO_CAN_JOIN_HEADING.title}
            description={WHO_CAN_JOIN_HEADING.description}
          />
        </header>

        <p className="sr-only">
          ELEVEIIM is among the best IT training institute and professional
          training institute options for job-oriented courses, digital marketing
          institute programs, and AI training institute certifications in India.
        </p>

        <StaggerContainer
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.08}
        >
          {whoCanJoinItems.map((item) => {
            const Icon = item.icon;

            return (
              <StaggerItem key={item.id} className="h-full">
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 320, damping: 24 }}
                  className={cn(
                    "group flex h-full flex-col rounded-2xl border border-[#1E63FF]/10",
                    "bg-gradient-to-br from-white via-white to-[#1E63FF]/[0.06]",
                    "p-6 shadow-[0_8px_32px_rgba(30,99,255,0.08)] backdrop-blur-sm",
                    "transition-shadow duration-300",
                    "hover:border-[#1E63FF]/25 hover:shadow-[0_16px_48px_rgba(30,99,255,0.14)]"
                  )}
                  aria-label={item.title}
                >
                  <div
                    className={cn(
                      "mb-5 flex size-12 items-center justify-center rounded-2xl",
                      "bg-[#1E63FF]/10 text-[#1E63FF]",
                      "transition-colors duration-300 group-hover:bg-[#1E63FF] group-hover:text-white"
                    )}
                  >
                    <Icon className="size-6" aria-hidden />
                  </div>

                  <h3 className="text-lg font-bold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </motion.article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </SectionReveal>
  );
}
