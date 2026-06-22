"use client";

import type { LucideIcon } from "lucide-react";
import {
  Award,
  BookOpen,
  GraduationCap,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type DecorationVariant = "hero" | "modal" | "home";

interface IconDecoration {
  Icon: LucideIcon;
  position: string;
  size: string;
  fill?: boolean;
  bubble?: boolean;
  accent?: boolean;
  hideMobile?: boolean;
}

/** Minimal, edge-placed accents — avoid overlapping main content */
const HERO_DECORATIONS: IconDecoration[] = [
  { Icon: Star, position: "left-[5%] top-[16%]", size: "size-4 sm:size-5", fill: true },
  { Icon: GraduationCap, position: "left-[8%] top-[48%]", size: "size-5 sm:size-6", bubble: true, hideMobile: true },
  { Icon: BookOpen, position: "right-[38%] top-[14%]", size: "size-4 sm:size-5", hideMobile: true },
  { Icon: Trophy, position: "right-[10%] top-[28%]", size: "size-5 sm:size-6", bubble: true, accent: true },
  { Icon: Sparkles, position: "right-[6%] top-[52%]", size: "size-4", accent: true, hideMobile: true },
  { Icon: Award, position: "right-[22%] top-[62%]", size: "size-4 sm:size-5", hideMobile: true },
];

const HOME_DECORATIONS: IconDecoration[] = [
  { Icon: Star, position: "left-[4%] top-[14%]", size: "size-4 sm:size-5", fill: true },
  { Icon: GraduationCap, position: "left-[6%] top-[68%]", size: "size-5 sm:size-6", bubble: true, hideMobile: true },
  { Icon: Trophy, position: "right-[8%] top-[18%]", size: "size-5 sm:size-6", bubble: true, accent: true, hideMobile: true },
  { Icon: Sparkles, position: "right-[5%] top-[72%]", size: "size-4 sm:size-5", accent: true },
];

const MODAL_DECORATIONS: IconDecoration[] = [
  { Icon: Star, position: "left-[7%] top-[12%]", size: "size-4", fill: true },
  { Icon: GraduationCap, position: "left-[10%] top-[40%]", size: "size-5", bubble: true, hideMobile: true },
  { Icon: Trophy, position: "right-[8%] top-[16%]", size: "size-5", bubble: true, accent: true },
  { Icon: BookOpen, position: "right-[14%] top-[44%]", size: "size-4", hideMobile: true },
];

const VARIANT_DECORATIONS: Record<DecorationVariant, IconDecoration[]> = {
  hero: HERO_DECORATIONS,
  home: HOME_DECORATIONS,
  modal: MODAL_DECORATIONS,
};

interface ScholarshipBannerDecorationsProps {
  variant?: DecorationVariant;
  className?: string;
}

function getIconClass(
  variant: DecorationVariant,
  { fill, accent }: Pick<IconDecoration, "fill" | "accent">
) {
  const onBlue = variant === "hero" || variant === "home";

  if (fill) {
    return onBlue
      ? "fill-white/12 text-white/25"
      : "fill-brand-accent/10 text-brand-accent/25";
  }

  if (accent && onBlue) {
    return "text-brand-accent/35";
  }

  return onBlue ? "text-white/22" : "text-brand/20";
}

function getBubbleClass(variant: DecorationVariant) {
  if (variant === "home" || variant === "hero") {
    return "border-white/25 bg-white/10 backdrop-blur-md";
  }

  return "border-white/40 bg-white/25 backdrop-blur-sm";
}

export function ScholarshipBannerDecorations({
  variant = "hero",
  className,
}: ScholarshipBannerDecorationsProps) {
  const decorations = VARIANT_DECORATIONS[variant];
  const isHome = variant === "home";
  const bubbleClass = getBubbleClass(variant);

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 z-[1] overflow-hidden", className)}
      aria-hidden
    >
      <div
        className={cn(
          "absolute -left-10 top-[20%] size-40 rounded-full blur-3xl",
          variant === "modal" ? "bg-brand/6" : "bg-white/8"
        )}
      />
      <div
        className={cn(
          "absolute right-[5%] top-[30%] size-32 rounded-full blur-3xl",
          variant === "modal" ? "bg-brand-accent/8" : "bg-brand-accent/12"
        )}
      />

      {decorations.map(
        ({ Icon, position, size, fill, bubble, accent, hideMobile }, index) => {
          const iconClass = getIconClass(variant, { fill, accent });
          const content = bubble ? (
            <div
              className={cn(
                "flex size-9 items-center justify-center rounded-full border sm:size-10",
                bubbleClass
              )}
            >
              <Icon className={cn(size, iconClass)} />
            </div>
          ) : (
            <Icon className={cn(size, iconClass)} />
          );

          const wrapperClass = cn("absolute", position, hideMobile && "max-sm:hidden");

          if (!isHome) {
            return (
              <div key={`scholarship-decoration-${index}`} className={wrapperClass}>
                {content}
              </div>
            );
          }

          return (
            <motion.div
              key={`scholarship-decoration-${index}`}
              className={wrapperClass}
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: index * 0.6,
                ease: "easeInOut",
              }}
            >
              {content}
            </motion.div>
          );
        }
      )}
    </div>
  );
}
