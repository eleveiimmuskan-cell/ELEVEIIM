"use client";

import { ScholarshipModal } from "@/components/common/scholarship-modal";
import { useScholarshipModal } from "@/hooks/use-scholarship-modal";

/**
 * Client wrapper for layout integration — mounts the modal and wires timing logic.
 */
export function ScholarshipModalHost() {
  const { isOpen, onOpenChange } = useScholarshipModal();
  return <ScholarshipModal open={isOpen} onOpenChange={onOpenChange} />;
}
