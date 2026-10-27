"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { PayNowButton } from "@/components/free-ai-foundation-course/pay-now-button";

export function FreeAiFoundationStickyRegister() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const media = window.matchMedia("(max-width: 1023px)");

    const apply = () => {
      document.body.style.paddingBottom = media.matches
        ? "calc(5.25rem + env(safe-area-inset-bottom, 0px))"
        : "";
    };

    apply();
    media.addEventListener("change", apply);

    return () => {
      media.removeEventListener("change", apply);
      document.body.style.paddingBottom = "";
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-white/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur-md lg:hidden">
      <PayNowButton className="w-[calc(100%-4.25rem)]" />
    </div>,
    document.body
  );
}
