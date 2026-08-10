"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useScholarshipCms } from "@/components/common/scholarship-cms-provider";

/** localStorage key — timestamp (ms) when the modal was last shown or dismissed */
export const SCHOLARSHIP_MODAL_LAST_SHOWN_KEY = "eleveiim_scholarship_last_shown";

/** Paths where the promotional modal should not appear */
const SKIP_PATHS = ["/scholarship", "/future-leaders-scholarship"];

function getLastShown(): number {
  if (typeof window === "undefined") return 0;
  const raw = localStorage.getItem(SCHOLARSHIP_MODAL_LAST_SHOWN_KEY);
  const parsed = raw ? Number.parseInt(raw, 10) : 0;
  return Number.isFinite(parsed) ? parsed : 0;
}

function markLastShown() {
  localStorage.setItem(SCHOLARSHIP_MODAL_LAST_SHOWN_KEY, String(Date.now()));
}

/**
 * Coordinates scholarship modal timing using CMS interval/delay settings.
 */
export function useScholarshipModal() {
  const pathname = usePathname();
  const { modal } = useScholarshipCms();
  const shouldSkip =
    !modal.enabled || SKIP_PATHS.some((path) => pathname.startsWith(path));

  const initialDelayMs = modal.initialDelayMs ?? 900;
  const intervalMs = modal.intervalMs ?? 120000;

  const [isOpen, setIsOpen] = useState(false);
  const isOpenRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const initialTimerRef = useRef<number | null>(null);

  const canShowAgain = useCallback(() => {
    return Date.now() - getLastShown() >= intervalMs;
  }, [intervalMs]);

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

    initialTimerRef.current = window.setTimeout(() => {
      initialTimerRef.current = null;
      if (!isOpenRef.current) openModal();
    }, initialDelayMs);

    intervalRef.current = setInterval(() => {
      if (!isOpenRef.current && canShowAgain()) {
        openModal();
      }
    }, intervalMs);

    return () => {
      if (initialTimerRef.current !== null) {
        window.clearTimeout(initialTimerRef.current);
        initialTimerRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [shouldSkip, openModal, initialDelayMs, intervalMs, canShowAgain]);

  return {
    isOpen,
    openModal,
    closeModal,
    onOpenChange,
  };
}

/** @deprecated use modal.intervalMs from CMS */
export const SCHOLARSHIP_MODAL_INTERVAL_MS = 2 * 60 * 1000;
