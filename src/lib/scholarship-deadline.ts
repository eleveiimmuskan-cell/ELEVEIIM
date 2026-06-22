import { getScholarshipSettings } from "@/services/scholarship-settings.service";
import type { ScholarshipSettings } from "@/types/scholarship-settings";

export interface ScholarshipTimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  totalMs: number;
}

function getTimeLeft(targetMs: number, nowMs: number): ScholarshipTimeLeft {
  const totalMs = Math.max(0, targetMs - nowMs);
  const isExpired = totalMs <= 0;

  return {
    days: Math.floor(totalMs / (1000 * 60 * 60 * 24)),
    hours: Math.floor((totalMs / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((totalMs / (1000 * 60)) % 60),
    seconds: Math.floor((totalMs / 1000) % 60),
    isExpired,
    totalMs,
  };
}

export function getScholarshipDeadlineMs(
  settings: ScholarshipSettings = getScholarshipSettings()
): number {
  return settings.deadlineMs;
}

export function getScholarshipTimeLeft(
  nowMs = Date.now(),
  settings: ScholarshipSettings = getScholarshipSettings()
): ScholarshipTimeLeft {
  const expiredByDate = nowMs >= settings.deadlineMs;
  const expiredByAdmin = !settings.isActive;
  const timeLeft = getTimeLeft(settings.deadlineMs, nowMs);

  if (expiredByDate || expiredByAdmin) {
    return { ...timeLeft, isExpired: true, totalMs: 0 };
  }

  return timeLeft;
}

export function areScholarshipApplicationsOpen(
  nowMs = Date.now(),
  settings: ScholarshipSettings = getScholarshipSettings()
): boolean {
  return getScholarshipTimeLeft(nowMs, settings).isExpired === false;
}
