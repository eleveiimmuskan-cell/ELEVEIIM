import {
  Award,
  BookOpen,
  Briefcase,
  Building2,
  Globe,
  GraduationCap,
  Heart,
  Home,
  Laptop,
  Lightbulb,
  Rocket,
  Shield,
  Star,
  Target,
  TrendingUp,
  UserCircle,
  Users,
  Video,
  Zap,
  type LucideIcon,
} from "lucide-react";

/** Lucide icons allowed for homepage Who Can Join cards (matches admin registry). */
const HOME_ICON_MAP: Record<string, LucideIcon> = {
  GraduationCap,
  Briefcase,
  Laptop,
  Home,
  Video,
  UserCircle,
  Users,
  Building2,
  Rocket,
  Target,
  Star,
  BookOpen,
  Lightbulb,
  TrendingUp,
  Award,
  Globe,
  Heart,
  Zap,
  Shield,
};

export function resolveHomeIcon(name: string): LucideIcon {
  return HOME_ICON_MAP[name] ?? UserCircle;
}
