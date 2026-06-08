"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/** localStorage key — timestamp (ms) when the modal was last shown or dismissed */
export const SCHOLARSHIP_MODAL_LAST_SHOWN_KEY = "eleveiim_scholarship_last_shown";

/** Minimum time between automatic displays while browsing */
export const SCHOLARSHIP_MODAL_INTERVAL_MS = 2 * 60 * 1000;

const INITIAL_DELAY_MS = 900;

/** Prevents duplicate initial timers when React Strict Mode double-mounts in dev */
let initialShowTimerId: number | null = null;

/** Paths where the promotional modal should not appear */
const SKIP_PATHS = ["/scholarship"];

function getLastShown(): number {
  if (typeof window === "undefined") return 0;
  const raw = localStorage.getItem(SCHOLARSHIP_MODAL_LAST_SHOWN_KEY);
  const parsed = raw ? Number.parseInt(raw, 10) : 0;
  return Number.isFinite(parsed) ? parsed : 0;
}

function markLastShown() {
  localStorage.setItem(
    SCHOLARSHIP_MODAL_LAST_SHOWN_KEY,
    String(Date.now())
  );
}

function canShowAgain(): boolean {
  return Date.now() - getLastShown() >= SCHOLARSHIP_MODAL_INTERVAL_MS;
}

/**
 * Coordinates scholarship modal timing:
 * - Opens shortly after mount (first visit + every full page refresh)
 * - Re-opens every 2 minutes while the user stays on the site
 * - Uses localStorage for last-shown timestamp to avoid duplicate rapid opens
 */
export function useScholarshipModal() {
  const pathname = usePathname();
  const shouldSkip = SKIP_PATHS.some((path) => pathname.startsWith(path));

  const [isOpen, setIsOpen] = useState(false);
  const isOpenRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const openModal = useCallback(() => {
    if (shouldSkip || isOpenRef.current) return;

    isOpenRef.current = true;
    setIsOpen(true);
    markLastShown();
  }, [shouldSkip]);

  const closeModal = useCallback(() => {
    isOpenRef.current = false;
    setIsOpen(false);
    markLastShown();
  }, []);

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (open) openModal();
      else closeModal();
    },
    [openModal, closeModal]
  );

  useEffect(() => {
    if (shouldSkip) {
      setIsOpen(false);
      isOpenRef.current = false;
      return;
    }

    // Initial display on load / refresh (slight delay for a polished entrance)
    if (initialShowTimerId === null) {
      initialShowTimerId = window.setTimeout(() => {
        initialShowTimerId = null;
        if (!isOpenRef.current) openModal();
      }, INITIAL_DELAY_MS);
    }

    // Periodic re-display every 2 minutes while the session continues
    intervalRef.current = setInterval(() => {
      if (!isOpenRef.current && canShowAgain()) {
        openModal();
      }
    }, SCHOLARSHIP_MODAL_INTERVAL_MS);

    return () => {
      if (initialShowTimerId !== null) {
        window.clearTimeout(initialShowTimerId);
        initialShowTimerId = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [shouldSkip, openModal]);

  return {
    isOpen,
    openModal,
    closeModal,
    onOpenChange,
  };
}
