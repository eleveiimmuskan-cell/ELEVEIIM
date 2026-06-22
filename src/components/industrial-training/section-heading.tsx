"use client";

import { cn } from "@/lib/utils";
import { AnimatedHeading } from "@/components/common/motion-wrapper";

interface SectionHeadingProps {
  title: string;
  description?: string;
  eyebrow?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h2" | "h3";
  id?: string;
}

export function SectionHeading({
  title,
  description,
  eyebrow,
  align = "left",
  className,
  as: Tag = "h2",
  id,
}: SectionHeadingProps) {
  return (
    <AnimatedHeading
      className={cn(
        "mb-8 max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#0B63CE]">
          {eyebrow}
        </p>
      )}
      <Tag
        id={id}
        className="text-2xl font-bold tracking-tight text-[#1E293B] sm:text-3xl"
      >
        {title}
      </Tag>
      {description && (
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </AnimatedHeading>
  );
}
