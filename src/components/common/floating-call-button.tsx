"use client";

import { Phone } from "lucide-react";
import { motion } from "framer-motion";
import { siteContact } from "@/data/site";
import { cn } from "@/lib/utils";

const PHONE_HREF = `tel:${siteContact.phone.replace(/\s/g, "")}`;

export function FloatingCallButton() {
  return (
    <motion.a
      href={PHONE_HREF}
      aria-label={`Call ELEVEIIM now at ${siteContact.phone}`}
      title={`Call Now — ${siteContact.phone}`}
      className={cn(
        "group fixed right-8 z-50 flex size-14 items-center justify-center rounded-full",
        "bg-brand text-white shadow-lg shadow-brand/25",
        "ring-1 ring-white/20 transition-shadow duration-300",
        "hover:shadow-xl hover:shadow-brand/35",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
        "bottom-[calc(6.75rem+env(safe-area-inset-bottom,0px))]"
      )}
      whileHover={{ scale: 1.06, y: -2 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 420, damping: 22 }}
    >
      <Phone className="size-6" aria-hidden strokeWidth={2.25} />
      <span
        className={cn(
          "pointer-events-none absolute right-[calc(100%+0.75rem)] whitespace-nowrap rounded-full",
          "border border-border/60 bg-white/95 px-6s py-1.5 text-xs font-semibold text-foreground",
          "opacity-0 shadow-md backdrop-blur-sm transition-all duration-300",
          "group-hover:opacity-100 group-focus-visible:opacity-100",
          "max-sm:hidden"
        )}
      >
        Call Now
      </span>
    </motion.a>
  );
}
