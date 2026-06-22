import type { ScholarshipAdminSettings } from "@/types/scholarship-settings";

/**
 * Dummy admin-managed scholarship timer settings.
 * Replace with API response from the admin panel when integrated.
 *
 * Admin panel → update `lastDateToApply` → countdown recalculates automatically.
 */
export const SCHOLARSHIP_ADMIN_SETTINGS: ScholarshipAdminSettings = {
  lastDateToApply: "2026-07-30",
  seatsMessage: "Limited Scholarship Seats Available",
  closedMessage: "Scholarship Applications Closed",
  isActive: true,
};
