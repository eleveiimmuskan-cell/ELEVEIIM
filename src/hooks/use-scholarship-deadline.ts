"use client";

import { useEffect, useState } from "react";
import {
  areScholarshipApplicationsOpen,
  getScholarshipTimeLeft,
  type ScholarshipTimeLeft,
} from "@/lib/scholarship-deadline";
import { getScholarshipSettings } from "@/services/scholarship-settings.service";
import type { ScholarshipSettings } from "@/types/scholarship-settings";
import { useScholarshipCms } from "@/components/common/scholarship-cms-provider";

export interface ScholarshipDeadlineState extends ScholarshipTimeLeft {
  settings: ScholarshipSettings;
}

export function useScholarshipDeadline(): ScholarshipDeadlineState {
  const cms = useScholarshipCms();
  const [state, setState] = useState<ScholarshipDeadlineState>(() => {
    const settings = cms.settings ?? getScholarshipSettings();
    return { ...getScholarshipTimeLeft(Date.now(), settings), settings };
  });

  useEffect(() => {
    const tick = () => {
      const settings = cms.settings ?? getScholarshipSettings();
      setState({ ...getScholarshipTimeLeft(Date.now(), settings), settings });
    };

    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, [cms.settings]);

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
