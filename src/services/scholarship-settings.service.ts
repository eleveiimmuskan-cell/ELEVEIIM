import { SCHOLARSHIP_ADMIN_SETTINGS } from "@/data/scholarship-admin.mock";
import type {
  ScholarshipAdminSettings,
  ScholarshipSettings,
} from "@/types/scholarship-settings";

const IST_TIMEZONE = "Asia/Kolkata";

/** End of the given calendar day in IST (23:59:59). */
export function getDeadlineMsFromDate(lastDateToApply: string): number {
  return new Date(`${lastDateToApply}T23:59:59+05:30`).getTime();
}

/** e.g. "Apply Before 30 July" */
export function formatScholarshipHeadline(lastDateToApply: string): string {
  const date = new Date(`${lastDateToApply}T12:00:00+05:30`);
  const dayMonth = date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    timeZone: IST_TIMEZONE,
  });
  return `Apply Before ${dayMonth}`;
}

export function resolveScholarshipSettings(
  admin: ScholarshipAdminSettings
): ScholarshipSettings {
  return {
    ...admin,
    headline: formatScholarshipHeadline(admin.lastDateToApply),
    deadlineMs: getDeadlineMsFromDate(admin.lastDateToApply),
  };
}

/**
 * Returns current scholarship timer settings.
 * TODO: swap mock with `fetch('/api/admin/scholarship-settings')` when API is ready.
 */
export function getScholarshipSettings(): ScholarshipSettings {
  return resolveScholarshipSettings(SCHOLARSHIP_ADMIN_SETTINGS);
}
