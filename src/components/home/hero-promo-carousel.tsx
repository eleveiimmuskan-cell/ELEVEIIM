"use client";

import {
  useCallback,
  useEffect,
  useEffectEvent,
  useId,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";
import {
  HERO_PROMO_AUTO_ADVANCE_MS,
  HERO_PROMO_SLIDES,
  type HeroPromoSlide,
} from "@/data/hero-promo-slides";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const SWIPE_THRESHOLD_PX = 48;

function SlideContent({ slide }: { slide: HeroPromoSlide }) {
  const Icon = slide.icon;
  const isFocal = Boolean(slide.focalHighlight);

  return (
    <div
      className={cn(
        "flex h-full flex-col items-center justify-center text-center lg:items-end lg:text-right",
        isFocal ? "gap-3.5 sm:gap-4" : "gap-5"
      )}
    >
      <div className="inline-flex size-12 items-center justify-center rounded-2xl border border-white/25 bg-white/10 text-brand-accent shadow-[0_8px_28px_rgba(0,0,0,0.12)] backdrop-blur-md sm:size-14">
        <Icon className="size-6 sm:size-7" aria-hidden />
      </div>

      {isFocal ? (
        <>
          <h2 className="max-w-md text-balance text-xs font-bold uppercase tracking-[0.22em] text-white/85 sm:text-sm">
            {slide.title.map((part, index) => (
              <span key={`${slide.id}-title-${index}`}>{part.text}</span>
            ))}
          </h2>

          <p
            className={cn(
              "relative max-w-full text-[2.75rem] font-black leading-none tracking-tighter sm:text-5xl xl:text-6xl",
              "bg-gradient-to-r from-brand-accent via-[#ff8533] to-brand-accent bg-clip-text text-transparent",
              "drop-shadow-[0_0_28px_rgba(255,103,0,0.45)]"
            )}
          >
            <span
              className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 mx-auto h-10 w-[70%] -translate-y-1/2 rounded-full bg-brand-accent/25 blur-2xl sm:h-12"
              aria-hidden
            />
            {slide.focalHighlight}
          </p>
        </>
      ) : (
        <h2 className="max-w-md text-balance text-2xl font-black leading-[1.15] tracking-tight text-white sm:text-3xl xl:text-4xl">
          {slide.title.map((part, index) => (
            <span
              key={`${slide.id}-title-${index}`}
              className={part.highlight ? "text-brand-accent" : undefined}
            >
              {part.text}
            </span>
          ))}
        </h2>
      )}

      <p className="max-w-sm text-pretty text-sm leading-relaxed text-white/75 sm:text-[15px]">
        {slide.description}
      </p>

      <Link
        href={slide.ctaHref}
        className="relative z-20 inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/15 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:bg-white/25 active:scale-[0.98]"
      >
        {slide.ctaLabel}
        <ArrowRight className="size-4" aria-hidden />
      </Link>

      {slide.footnote ? (
        <p className="max-w-xs text-pretty text-[10px] leading-relaxed text-white/55 sm:max-w-sm sm:text-[11px]">
          {slide.footnote}
        </p>
      ) : null}
    </div>
  );
}

export function HeroPromoCarousel({ className }: { className?: string }) {
  const slides = HERO_PROMO_SLIDES;
  const slideCount = slides.length;
  const reducedMotion = useReducedMotion();
  const labelId = useId();
  const regionRef = useRef<HTMLDivElement>(null);
  const pointerStartX = useRef<number | null>(null);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);

  const goTo = useCallback(
    (next: number, dir?: number) => {
      const normalized = ((next % slideCount) + slideCount) % slideCount;
      setDirection(dir ?? (normalized > index ? 1 : -1));
      setIndex(normalized);
    },
    [index, slideCount]
  );

  const goNext = useCallback(() => goTo(index + 1, 1), [goTo, index]);
  const goPrev = useCallback(() => goTo(index - 1, -1), [goTo, index]);

  const onAutoAdvance = useEffectEvent(() => {
    goNext();
  });

  useEffect(() => {
    setPaused(userPaused || hoverPaused || Boolean(reducedMotion));
  }, [userPaused, hoverPaused, reducedMotion]);

  useEffect(() => {
    if (paused || reducedMotion || slideCount < 2) return;

    const timer = window.setInterval(() => {
      onAutoAdvance();
    }, HERO_PROMO_AUTO_ADVANCE_MS);

    return () => window.clearInterval(timer);
  }, [paused, reducedMotion, slideCount, index]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    } else if (event.key === " ") {
      event.preventDefault();
      setUserPaused((value) => !value);
    }
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    pointerStartX.current = event.clientX;
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (pointerStartX.current == null) return;
    const delta = event.clientX - pointerStartX.current;
    pointerStartX.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;
    if (delta < 0) goNext();
    else goPrev();
  };

  const active = slides[index] ?? slides[0];
  const transition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.55, ease: EASE };

  const variants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: reducedMotion ? 0 : dir > 0 ? 36 : -36,
    }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({
      opacity: 0,
      x: reducedMotion ? 0 : dir > 0 ? -28 : 28,
    }),
  };

  return (
    <div
      ref={regionRef}
      role="region"
      aria-roledescription="carousel"
      aria-labelledby={labelId}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onFocusCapture={() => setHoverPaused(true)}
      onBlurCapture={(event) => {
        if (!regionRef.current?.contains(event.relatedTarget as Node | null)) {
          setHoverPaused(false);
        }
      }}
      className={cn(
        "relative z-10 flex min-w-0 flex-col outline-none",
        "rounded-3xl border border-white/20 bg-white/10 p-5 shadow-[0_16px_48px_rgba(0,0,0,0.12)] backdrop-blur-md sm:p-7 lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-none lg:border-0",
        className
      )}
    >
      <p id={labelId} className="sr-only">
        ELEVEIIM highlights carousel
      </p>

      <div
        className="relative min-h-[320px] sm:min-h-[340px] lg:min-h-[360px]"
        aria-live="polite"
        aria-atomic="true"
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={active.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            className="absolute inset-0"
          >
            <SlideContent slide={active} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 lg:mt-7 lg:justify-end">
        <div className="flex items-center gap-1.5" role="tablist" aria-label="Slide indicators">
          {slides.map((slide, i) => {
            const isActive = i === index;
            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to slide ${i + 1}: ${slide.ctaLabel}`}
                onClick={() => goTo(i, i > index ? 1 : -1)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  isActive
                    ? "w-7 bg-brand-accent"
                    : "w-2 bg-white/40 hover:bg-white/65"
                )}
              />
            );
          })}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous slide"
            className="inline-flex size-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <ChevronLeft className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => setUserPaused((value) => !value)}
            aria-label={userPaused ? "Play carousel" : "Pause carousel"}
            className="inline-flex size-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            {userPaused || reducedMotion ? (
              <Play className="size-3.5" aria-hidden />
            ) : (
              <Pause className="size-3.5" aria-hidden />
            )}
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next slide"
            className="inline-flex size-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <ChevronRight className="size-4" aria-hidden />
          </button>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Slide {index + 1} of {slideCount}
      </p>
    </div>
  );
}
