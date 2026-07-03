import type { NavLink } from "@/types";
import { CONTACT_PHONE } from "@/data/site";

export const SITE_NAME = "ELEVEIIM";
export const SITE_TAGLINE = "Elevate to Educate";
export const SITE_URL = "https://eleveiim.com";
export const SITE_DESCRIPTION =
  "ELEVEIIM is a premium training institute offering industry-ready courses, expert trainers, placement support, and scholarship programs to elevate your career.";

export const BRAND = {
  primary: "#1877F2",
  accent: "#FF6700",
  whatsapp: CONTACT_PHONE.whatsapp,
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
  facebook: "https://www.facebook.com/people/Eleveiim/61590698637936/",
  instagram: "https://www.instagram.com/eleveiim/",
  linkedin: "https://linkedin.com/company/eleveiim",
  youtube: "https://youtube.com/@eleveiim",
  twitter: "https://twitter.com/eleveiim",
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
