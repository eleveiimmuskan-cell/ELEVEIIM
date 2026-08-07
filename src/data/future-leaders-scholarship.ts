import {
  Award,
  Bot,
  Briefcase,
  CalendarDays,
  GraduationCap,
  IndianRupee,
  Layers,
  MonitorPlay,
  Percent,
  Users,
  type LucideIcon,
} from "lucide-react";
import { SCHOLARSHIP_APPLY_SECTION_ID } from "@/data/scholarship";

export const FUTURE_LEADERS_SCHOLARSHIP_APPLY_HREF = `#${SCHOLARSHIP_APPLY_SECTION_ID}`;

export const FUTURE_LEADERS_DEADLINE_LABEL = "Last Date to Apply:";
export const FUTURE_LEADERS_DEADLINE_DATE = "25 August 2026";

export const FUTURE_LEADERS_SCHOLARSHIP_META = {
  title: "Future Leaders Scholarship 2026",
  description:
    "Apply for ELEVEIIM Future Leaders Scholarship and get a 100% Free Scholarship for eligible students.",
  path: "/future-leaders-scholarship",
  keywords: [
    "future leaders scholarship",
    "ELEVEIIM scholarship",
    "100% free scholarship",
    "scholarship 2026",
    "industry ready programs",
  ],
} as const;

export const FUTURE_LEADERS_SCHOLARSHIP_FEATURES: {
  label: string;
  icon: LucideIcon;
}[] = [
  { label: "Live Training", icon: MonitorPlay },
  { label: "Industry Mentors", icon: Users },
  { label: "Real Projects", icon: Layers },
  { label: "AI Tools Training", icon: Bot },
  { label: "Placement Support", icon: Briefcase },
  { label: "Certificate of Completion", icon: Award },
];

export const FUTURE_LEADERS_SCHOLARSHIP_STATS: {
  value: string;
  label: string;
  icon: LucideIcon;
  /** Show value struck through with a FREE badge below (Course Worth). */
  freeOverride?: boolean;
}[] = [
  { value: "100", label: "Limited Seats", icon: GraduationCap },
  {
    value: "₹45,000",
    label: "Course Worth",
    icon: IndianRupee,
    freeOverride: true,
  },
  { value: "45", label: "Course Duration", icon: CalendarDays },
  { value: "100%", label: "Scholarship", icon: Percent },
];

export const FUTURE_LEADERS_WHO_CAN_APPLY = [
  "Good Will to Grow Your Career",
  "Must Be a Student (School, College, or University)",
  "Must Have a Laptop",
  "Passion for Technology & Innovation",
  "Eager to Learn New Skills",
] as const;

export const FUTURE_LEADERS_WHO_CAN_APPLY_DESCRIPTION =
  "This scholarship is designed for motivated individuals who are serious about building a successful career in technology and professional skills.";

export const FUTURE_LEADERS_SELECTION_STEPS = [
  {
    title: "Apply Online",
    description:
      "Submit your Future Leaders Scholarship application in a few minutes.",
  },
  {
    title: "Scholarship Test",
    description: "Take the assessment to unlock your scholarship percentage.",
  },
  {
    title: "Application Review",
    description: "Our team reviews your profile, eligibility, and test score.",
  },
  {
    title: "Scholarship Selection",
    description: "Selected candidates receive their scholarship offer details.",
  },
  {
    title: "Admission",
    description: "Confirm your seat and start your industry-ready program.",
  },
] as const;

export const FUTURE_LEADERS_STUDENTS_IMAGE =
  "/images/scholarship-students-transparent.png";

export const FUTURE_LEADERS_ELIGIBILITY_IMAGE =
  "/images/industrial-training/student-2.webp";
