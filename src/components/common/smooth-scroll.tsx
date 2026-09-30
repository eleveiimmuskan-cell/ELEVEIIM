"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { isBarePublicPath } from "@/components/layout/site-chrome";

const DIALOG_OPEN_SELECTOR =
  '[data-slot="dialog-overlay"][data-state="open"], [role="dialog"][data-state="open"]';

function isScrollLocked(): boolean {
  if (typeof document === "undefined") return false;
  return Boolean(document.querySelector(DIALOG_OPEN_SELECTOR));
}

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const disableSmoothScroll = isBarePublicPath(pathname);

  useEffect(() => {
    if (disableSmoothScroll) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      allowNestedScroll: true,
      prevent: (node) => {
        if (!(node instanceof HTMLElement)) return false;
        const tag = node.nodeName;
        return (
          tag === "SELECT" ||
          tag === "INPUT" ||
          tag === "TEXTAREA" ||
          node.closest(
            "select, [role='listbox'], [role='dialog'], [data-slot='dialog-overlay'], [data-slot='dialog-content']"
          ) !== null
        );
      },
    });

    function syncLock() {
      if (isScrollLocked()) lenis.stop();
      else lenis.start();
    }

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);
    syncLock();

    const observer = new MutationObserver(syncLock);
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["data-state"],
    });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [disableSmoothScroll]);

  return <>{children}</>;
}
