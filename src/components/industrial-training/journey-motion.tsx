"use client";

import { motion, type Variants } from "framer-motion";

export const PREMIUM_EASE = [0.22, 1, 0.36, 1] as const;

export const VIEWPORT_ONCE = { once: true, margin: "-80px" as const };

export const headingReveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: PREMIUM_EASE },
  },
};

export const containerStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.12 },
  },
};

export const itemFadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: PREMIUM_EASE },
  },
};

export const itemFadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.88, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: PREMIUM_EASE },
  },
};

export const itemSlideLeft: Variants = {
  hidden: { opacity: 0, x: -36 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: PREMIUM_EASE },
  },
};

export const itemSlideRight: Variants = {
  hidden: { opacity: 0, x: 36 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: PREMIUM_EASE },
  },
};

export const nodePop: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: PREMIUM_EASE, type: "spring", stiffness: 260, damping: 18 },
  },
};

export function AnimatedSectionHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={headingReveal}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedSpine({
  className,
  horizontal = false,
}: {
  className?: string;
  horizontal?: boolean;
}) {
  return (
    <motion.div
      initial={{ scaleY: horizontal ? 1 : 0, scaleX: horizontal ? 0 : 1 }}
      whileInView={{ scaleY: 1, scaleX: 1 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: 1.1, ease: PREMIUM_EASE }}
      style={{ transformOrigin: horizontal ? "left center" : "top center" }}
      className={className}
      aria-hidden
    />
  );
}
