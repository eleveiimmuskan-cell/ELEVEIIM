import type { NavLink } from "@/types";

export const SITE_NAME = "ELEVEIIM";
export const SITE_TAGLINE = "Elevate to Educate";
export const SITE_URL = "https://eleveiim.com";
export const SITE_DESCRIPTION =
  "ELEVEIIM is a premium training institute offering industry-ready courses, expert trainers, placement support, and scholarship programs to elevate your career.";

export const BRAND = {
  primary: "#1877F2",
  accent: "#FF6700",
  whatsapp: "+919876543210",
} as const;

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Placements", href: "/placements" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/eleveiim",
  instagram: "https://instagram.com/eleveiim",
  linkedin: "https://linkedin.com/company/eleveiim",
  youtube: "https://youtube.com/@eleveiim",
} as const;

export const COURSE_CATEGORIES = [
  "All",
  "Development",
  "Data & AI",
  "Marketing",
  "Design",
  "Cloud",
  "Security",
] as const;

export const BLOG_CATEGORIES = [
  "All",
  "Career",
  "Technology",
  "Education",
  "Placements",
] as const;
