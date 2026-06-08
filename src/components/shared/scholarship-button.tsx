"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScholarshipButtonProps {
  href?: string;
  className?: string;
  size?: "sm" | "md";
  pulse?: boolean;
}

export function ScholarshipButton({
  href = "/scholarship",
  className,
  size = "md",
  pulse = true,
}: ScholarshipButtonProps) {
  return (
    <motion.div
      className="relative z-10 inline-flex"
      animate={pulse ? { scale: [1, 1.04, 1] } : undefined}
      transition={
        pulse
          ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
          : undefined
      }
      style={{ transformOrigin: "center center" }}
    >
      <Link
        href={href}
        className={cn(
          "relative inline-flex items-center gap-2 rounded-full bg-brand-accent font-semibold text-white shadow-lg shadow-brand-accent/30 transition-colors hover:bg-brand-accent/90",
          size === "sm" ? "px-4 py-2 text-xs" : "px-5 py-2.5 text-sm",
          className
        )}
      >
        <GraduationCap className={size === "sm" ? "size-3.5" : "size-4"} />
        Scholarship
      </Link>
    </motion.div>
  );
}
