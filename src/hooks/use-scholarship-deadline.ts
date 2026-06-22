"use client";

import { useEffect, useState } from "react";
import {
  areScholarshipApplicationsOpen,
  getScholarshipTimeLeft,
  type ScholarshipTimeLeft,
} from "@/lib/scholarship-deadline";
import { getScholarshipSettings } from "@/services/scholarship-settings.service";
import type { ScholarshipSettings } from "@/types/scholarship-settings";

export interface ScholarshipDeadlineState extends ScholarshipTimeLeft {
  settings: ScholarshipSettings;
}

export function useScholarshipDeadline(): ScholarshipDeadlineState {
  const [state, setState] = useState<ScholarshipDeadlineState>(() => {
    const settings = getScholarshipSettings();
    return { ...getScholarshipTimeLeft(Date.now(), settings), settings };
  });

  useEffect(() => {
    const tick = () => {
      const settings = getScholarshipSettings();
      setState({ ...getScholarshipTimeLeft(Date.now(), settings), settings });
    };

    tick();
    const interval = window.setInterval(tick, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  return state;
}

export function useScholarshipApplicationsOpen(): boolean {
  const { isExpired, settings } = useScholarshipDeadline();
  return !isExpired && settings.isActive;
}

export function useScholarshipSettings(): ScholarshipSettings {
  const { settings } = useScholarshipDeadline();
  return settings;
}
