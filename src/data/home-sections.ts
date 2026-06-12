import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  Building2,
  GraduationCap,
  Home,
  Laptop,
  Video,
} from "lucide-react";

export interface WhoCanJoinItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const WHO_CAN_JOIN_HEADING = {
  title: "Who Can Join ELEVEIIM?",
  description:
    "Our training programs are designed for learners, professionals, entrepreneurs, and creators who want to build successful careers.",
} as const;

export const whoCanJoinItems: WhoCanJoinItem[] = [
  {
    id: "students",
    title: "Students & Job Seekers",
    description:
      "Launch your career with job-oriented courses, practical skills, and placement support from India's best IT training institute.",
    icon: GraduationCap,
  },
  {
    id: "business-owners",
    title: "Business Owners",
    description:
      "Upskill your team or yourself with digital marketing, AI tools, and professional training tailored for growth-focused entrepreneurs.",
    icon: Briefcase,
  },
  {
    id: "professionals",
    title: "Working Professionals",
    description:
      "Advance in your role with flexible, industry-ready programs from a leading professional training institute.",
    icon: Building2,
  },
  {
    id: "housewives",
    title: "Housewives",
    description:
      "Build independent careers from home with structured learning, certifications, and supportive community guidance.",
    icon: Home,
  },
  {
    id: "influencers",
    title: "Influencers & YouTubers",
    description:
      "Master content strategy, digital marketing, and AI-powered creation through our digital marketing institute programs.",
    icon: Video,
  },
  {
    id: "freelancers",
    title: "Freelancers",
    description:
      "Expand your service offerings with AI training institute modules, live projects, and portfolio-ready certifications.",
    icon: Laptop,
  },
];

export const BENEFITS_HEADING = {
  title: "What You Will Get at ELEVEIIM",
  description:
    "ELEVEIIM provides industry-focused training with practical exposure, certifications, live projects, and AI-powered learning to prepare students for real-world careers.",
} as const;

export const eleveiimBenefits: string[] = [
  "120+ Course Modules",
  "25+ Certifications",
  "Trainers with 17+ Years Experience",
  "Hands-on Practical Training",
  "AI Tools Training",
  "Live Projects",
  "Internship Opportunities",
  "Placement Assistance",
  "Lifetime Community Support",
];

export const CERTIFICATE_IMAGES = [
  {
    src: "/images/certificate1.webp",
    alt: "ELEVEIIM professional certification sample for job-oriented courses",
    width: 640,
    height: 480,
  },
  {
    src: "/images/certificate2.webp",
    alt: "ELEVEIIM industry training certificate sample from professional training institute",
    width: 640,
    height: 480,
  },
] as const;
