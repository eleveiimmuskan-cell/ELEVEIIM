import type { LucideIcon } from "lucide-react";
import {
  BadgePercent,
  BriefcaseBusiness,
  IndianRupee,
  MapPinned,
  Sparkles,
} from "lucide-react";

export interface HeroPromoTitlePart {
  text: string;
  /** When true, render in brand-accent orange. */
  highlight?: boolean;
}

export interface HeroPromoSlide {
  id: string;
  icon: LucideIcon;
  title: HeroPromoTitlePart[];
  description: string;
  ctaLabel: string;
  ctaHref: string;
  /**
   * Oversized orange focal line (e.g. package claim).
   * When set, rendered as the visual centerpiece under the heading.
   */
  focalHighlight?: string;
  /** Small disclaimer under the CTA. */
  footnote?: string;
}

/**
 * Homepage hero right-panel promo slides.
 * Edit this array to update copy, CTAs, or icons.
 * First item is shown on page load.
 */
export const HERO_PROMO_SLIDES: HeroPromoSlide[] = [
  {
    id: "aim-package",
    icon: IndianRupee,
    title: [{ text: "AIM FOR A PACKAGE UP TO" }],
    focalHighlight: "₹15 LPA*",
    description:
      "Build in-demand tech and AI skills with practical training, live projects, and placement assistance.",
    ctaLabel: "Explore Career Courses",
    ctaHref: "/courses",
    footnote:
      "Salary depends on skills, experience, role, and employer selection. Placement or package is not guaranteed.",
  },
  {
    id: "top-courses",
    icon: BriefcaseBusiness,
    title: [
      { text: "Top Courses for " },
      { text: "High-Paying Careers", highlight: true },
    ],
    description:
      "Build practical, industry-ready skills through expert-led training and live projects.",
    ctaLabel: "Explore Courses",
    ctaHref: "/courses",
  },
  {
    id: "placement-assistance",
    icon: MapPinned,
    title: [
      { text: "100% Placement Assistance", highlight: true },
      { text: " Across India" },
    ],
    description:
      "Prepare for opportunities with resume support, interview preparation, and career guidance.",
    ctaLabel: "Explore Placement Support",
    ctaHref: "/placements",
  },
  {
    id: "learn-ai",
    icon: Sparkles,
    title: [
      { text: "Learn AI.", highlight: true },
      { text: " Become More In Demand." },
    ],
    description:
      "Master practical AI tools, automate everyday tasks, and strengthen your professional skills.",
    ctaLabel: "Explore AI Courses",
    ctaHref: "/courses",
  },
  {
    id: "scholarship",
    icon: BadgePercent,
    title: [
      { text: "Get Up to " },
      { text: "75% Scholarship", highlight: true },
    ],
    description:
      "Unlock career-focused training through our scholarship selection process. Eligibility and terms apply.",
    ctaLabel: "Apply for Scholarship",
    ctaHref: "/scholarship",
  },
];

export const HERO_PROMO_AUTO_ADVANCE_MS = 5000;
