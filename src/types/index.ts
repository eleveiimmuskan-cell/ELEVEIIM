export interface NavLink {
  label: string;
  href: string;
}

export interface CounterStat {
  id: string;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
}

export interface CurriculumModule {
  title: string;
  topics: string[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  duration: string;
  certification: string;
  trainer: string;
  rating: number;
  batchTiming: string;
  category: string;
  students: number;
  level: string;
  curriculum: CurriculumModule[];
  faqs: FAQItem[];
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  expertise: string[];
  experience: string;
  students: number;
  rating: number;
  image: string;
}

export interface PlacementCompany {
  id: string;
  name: string;
  logo: string;
}

export interface PlacementStat {
  id: string;
  label: string;
  value: string;
}

export interface SalaryPackage {
  id: string;
  role: string;
  range: string;
  company: string;
}

export interface OfferLetter {
  id: string;
  studentName: string;
  company: string;
  role: string;
  package: string;
}

export interface PlacementStory {
  id: string;
  slug: string;
  studentName: string;
  course: string;
  company: string;
  role: string;
  package: string;
  batch: string;
  summary: string;
  story: string;
  image: string;
}

export interface Workshop {
  id: string;
  title: string;
  date: string;
  time: string;
  mode: string;
  seats: number;
  instructor: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image: string;
}

export interface Review {
  id: string;
  name: string;
  course: string;
  rating: number;
  date: string;
  content: string;
  verified: boolean;
}

export interface ScholarshipBenefit {
  id: string;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  authorRole: string;
  publishedAt: string;
  readingTime: number;
  featured?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface SiteContact {
  address: string;
  phone: string;
  email: string;
  mapsUrl: string;
}
