"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScholarshipButtonProps {
  className?: string;
  size?: "sm" | "md";
}

export function ScholarshipButton({
  className,
  size = "md",
}: ScholarshipButtonProps) {
  return (
    <motion.div
      animate={{ scale: [1, 1.06, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <Link
        href="/scholarship"
        className={cn(
          "inline-flex items-center gap-2 rounded-full bg-brand-accent font-semibold text-white shadow-lg shadow-brand-accent/30 transition-colors hover:bg-brand-accent/90",
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
