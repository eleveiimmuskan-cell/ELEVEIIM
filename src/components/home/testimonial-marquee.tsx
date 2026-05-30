"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { Testimonial } from "@/types";
import { GlassCard } from "@/components/common/glass-card";
import { cn } from "@/lib/utils";

const GAP = 24;
const SCROLL_SPEED = 0.45;

function getVisibleCount(width: number) {
  if (width >= 1024) return 3;
  if (width >= 768) return 2;
  return 1;
}

function wrapOffset(offset: number, setWidth: number) {
  if (setWidth <= 0) return offset;

  let wrapped = offset % setWidth;
  if (wrapped > 0) wrapped -= setWidth;
  return wrapped;
}

interface TestimonialMarqueeProps {
  items: Testimonial[];
  className?: string;
}

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <motion.div
      className="h-full shrink-0"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
    >
      <GlassCard
        hover={false}
        className="h-full border-white/20 bg-white/10 text-white backdrop-blur-xl hover:border-white/40"
      >
        <div className="mb-3 flex gap-0.5">
          {Array.from({ length: item.rating }).map((_, i) => (
            <Star
              key={i}
              className="size-4 fill-brand-accent text-brand-accent"
            />
          ))}
        </div>
        <p className="text-sm leading-relaxed text-white/90">
          &ldquo;{item.content}&rdquo;
        </p>
        <div className="mt-5 flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/20 text-sm font-bold">
            {item.image}
          </div>
          <div className="min-w-0">
            <p className="font-semibold">{item.name}</p>
            <p className="text-xs text-white/70">
              {item.role} · {item.company}
            </p>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

export function TestimonialMarquee({ items, className }: TestimonialMarqueeProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const offsetRef = useRef(0);
  const setWidthRef = useRef(0);
  const isPausedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const prefersReducedMotionRef = useRef(false);

  const [cardWidth, setCardWidth] = useState(0);
  const loopItems = [...items, ...items];

  const applyTransform = useCallback(() => {
    if (!trackRef.current) return;
    trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
  }, []);

  const updateLayout = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const width = viewport.offsetWidth;
    const visible = getVisibleCount(width);
    const nextCardWidth = (width - GAP * (visible - 1)) / visible;

    setCardWidth(nextCardWidth);
    setWidthRef.current = items.length * (nextCardWidth + GAP);
    offsetRef.current = wrapOffset(offsetRef.current, setWidthRef.current);
    applyTransform();
  }, [applyTransform, items.length]);

  useLayoutEffect(() => {
    updateLayout();
  }, [updateLayout]);

  useEffect(() => {
    prefersReducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const viewport = viewportRef.current;
    if (!viewport) return;

    const observer = new ResizeObserver(updateLayout);
    observer.observe(viewport);

    let rafId = 0;

    const tick = () => {
      const setWidth = setWidthRef.current;

      if (
        setWidth > 0 &&
        !isPausedRef.current &&
        !isDraggingRef.current &&
        !prefersReducedMotionRef.current
      ) {
        offsetRef.current -= SCROLL_SPEED;

        if (offsetRef.current <= -setWidth) {
          offsetRef.current += setWidth;
        }

        applyTransform();
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [applyTransform, updateLayout]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    dragStartXRef.current = event.clientX;
    dragStartOffsetRef.current = offsetRef.current;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    const delta = event.clientX - dragStartXRef.current;
    offsetRef.current = dragStartOffsetRef.current + delta;
    applyTransform();
  };

  const finishDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    isDraggingRef.current = false;
    offsetRef.current = wrapOffset(offsetRef.current, setWidthRef.current);
    applyTransform();

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div className={cn("relative mt-2 w-full", className)}>
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-brand via-brand/80 to-transparent sm:w-16 lg:w-24"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-brand via-brand/80 to-transparent sm:w-16 lg:w-24"
        aria-hidden
      />

      <div
        ref={viewportRef}
        className="cursor-grab overflow-hidden select-none active:cursor-grabbing"
        style={{ touchAction: "none" }}
        onMouseEnter={() => {
          isPausedRef.current = true;
        }}
        onMouseLeave={() => {
          isPausedRef.current = false;
          isDraggingRef.current = false;
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        aria-label="Student testimonials carousel. Drag to scroll."
        role="region"
      >
        <div
          ref={trackRef}
          className="flex will-change-transform select-none"
          style={{ gap: GAP }}
        >
          {loopItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="shrink-0"
              style={{ width: cardWidth > 0 ? cardWidth : undefined }}
            >
              <TestimonialCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
