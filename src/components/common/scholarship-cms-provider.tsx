"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type {
  ApiScholarshipModal,
  ApiScholarshipSettings,
} from "@/types/api-scholarship-cms";
import { mapApiScholarshipSettings } from "@/services/scholarship-settings.service";
import type { ScholarshipSettings } from "@/types/scholarship-settings";
import {
  SCHOLARSHIP_HIGHLIGHT_STATS,
  SCHOLARSHIP_STUDENTS_IMAGE,
  SCHOLARSHIP_STUDENTS_IMAGE_ALT,
} from "@/data/scholarship";

interface ScholarshipCmsContextValue {
  apiSettings: ApiScholarshipSettings;
  settings: ScholarshipSettings;
  modal: ApiScholarshipModal;
  highlightStats: {
    badge: string;
    discountPrefix: string;
    discountValue: string;
    discountSuffix: string;
    avgAwardAmount: string;
    avgAwardLabel: string;
    avgAwardNote: string;
  };
  studentsImage: string;
  studentsImageAlt: string;
}

const ScholarshipCmsContext = createContext<ScholarshipCmsContextValue | null>(
  null
);

export function ScholarshipCmsProvider({
  settings,
  modal,
  children,
}: {
  settings: ApiScholarshipSettings;
  modal: ApiScholarshipModal;
  children: ReactNode;
}) {
  const value = useMemo<ScholarshipCmsContextValue>(() => {
    return {
      apiSettings: settings,
      settings: mapApiScholarshipSettings(settings),
      modal,
      highlightStats: {
        badge: settings.statsBadge,
        discountPrefix: settings.discountPrefix,
        discountValue: settings.discountValue,
        discountSuffix: settings.discountSuffix,
        avgAwardAmount: settings.avgAwardAmount,
        avgAwardLabel: settings.avgAwardLabel,
        avgAwardNote: settings.avgAwardNote,
      },
      studentsImage: settings.studentsImage || SCHOLARSHIP_STUDENTS_IMAGE,
      studentsImageAlt:
        settings.studentsImageAlt || SCHOLARSHIP_STUDENTS_IMAGE_ALT,
    };
  }, [settings, modal]);

  return (
    <ScholarshipCmsContext.Provider value={value}>
      {children}
    </ScholarshipCmsContext.Provider>
  );
}

const FALLBACK_HIGHLIGHT = {
  badge: SCHOLARSHIP_HIGHLIGHT_STATS.badge,
  discountPrefix: SCHOLARSHIP_HIGHLIGHT_STATS.discountPrefix,
  discountValue: SCHOLARSHIP_HIGHLIGHT_STATS.discountValue,
  discountSuffix: SCHOLARSHIP_HIGHLIGHT_STATS.discountSuffix,
  avgAwardAmount: SCHOLARSHIP_HIGHLIGHT_STATS.avgAwardAmount,
  avgAwardLabel: SCHOLARSHIP_HIGHLIGHT_STATS.avgAwardLabel,
  avgAwardNote: SCHOLARSHIP_HIGHLIGHT_STATS.avgAwardNote,
};

const FALLBACK_CONTEXT: ScholarshipCmsContextValue = {
  apiSettings: {
    id: "local",
    lastDateToApply: "2026-08-30",
    seatsMessage: "Limited Scholarship Seats Available",
    closedMessage: "Scholarship Applications Closed",
    applicationsOpen: true,
    discountPrefix: FALLBACK_HIGHLIGHT.discountPrefix,
    discountValue: FALLBACK_HIGHLIGHT.discountValue,
    discountSuffix: FALLBACK_HIGHLIGHT.discountSuffix,
    statsBadge: FALLBACK_HIGHLIGHT.badge,
    avgAwardAmount: FALLBACK_HIGHLIGHT.avgAwardAmount,
    avgAwardLabel: FALLBACK_HIGHLIGHT.avgAwardLabel,
    avgAwardNote: FALLBACK_HIGHLIGHT.avgAwardNote,
    studentsImage: SCHOLARSHIP_STUDENTS_IMAGE,
    studentsImageAlt: SCHOLARSHIP_STUDENTS_IMAGE_ALT,
    isActive: true,
    createdAt: "",
    updatedAt: "",
  },
  settings: {
    lastDateToApply: "2026-08-30",
    seatsMessage: "Limited Scholarship Seats Available",
    closedMessage: "Scholarship Applications Closed",
    isActive: true,
    headline: "Apply Before 30 August",
    deadlineMs: new Date("2026-08-30T23:59:59+05:30").getTime(),
  },
  modal: {
    id: "local",
    enabled: true,
    eyebrow: "ELEVEIIM Scholarship Program",
    description:
      "Take the scholarship assessment and earn fee waivers based on your performance.",
    trustItems: [],
    primaryButtonText: "Apply Now",
    secondaryButtonText: "Maybe Later",
    footerNote: "Trusted by aspiring learners across India",
    initialDelayMs: 900,
    intervalMs: 120000,
    isActive: true,
  },
  highlightStats: FALLBACK_HIGHLIGHT,
  studentsImage: SCHOLARSHIP_STUDENTS_IMAGE,
  studentsImageAlt: SCHOLARSHIP_STUDENTS_IMAGE_ALT,
};

export function useScholarshipCms(): ScholarshipCmsContextValue {
  return useContext(ScholarshipCmsContext) ?? FALLBACK_CONTEXT;
}
