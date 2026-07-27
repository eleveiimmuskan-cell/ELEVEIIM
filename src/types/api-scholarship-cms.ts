export interface ApiScholarshipSettings {
  id: string;
  lastDateToApply: string;
  seatsMessage: string;
  closedMessage: string;
  applicationsOpen: boolean;
  discountPrefix: string;
  discountValue: string;
  discountSuffix: string;
  statsBadge: string;
  avgAwardAmount: string;
  avgAwardLabel: string;
  avgAwardNote: string;
  studentsImage: string;
  studentsImageAlt: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiScholarshipListItem {
  id: string;
  title: string;
  description: string;
  displayOrder: number;
}

export interface ApiScholarshipTextItem {
  id: string;
  text: string;
  displayOrder: number;
}

export interface ApiScholarshipFaqItem {
  id: string;
  question: string;
  answer: string;
  displayOrder: number;
}

export interface ApiScholarshipPage {
  id: string;
  heroEyebrow: string;
  heroDescription: string;
  benefits: ApiScholarshipListItem[];
  eligibility: ApiScholarshipTextItem[];
  examSteps: ApiScholarshipListItem[];
  faqs: ApiScholarshipFaqItem[];
  isActive: boolean;
}

export interface ApiScholarshipModal {
  id: string;
  enabled: boolean;
  eyebrow: string;
  description: string;
  trustItems: ApiScholarshipTextItem[];
  primaryButtonText: string;
  secondaryButtonText: string;
  footerNote: string;
  initialDelayMs: number;
  intervalMs: number;
  isActive: boolean;
}

/** Combined public view model for page + shared settings. */
export interface ScholarshipPageView {
  settings: ApiScholarshipSettings;
  page: ApiScholarshipPage;
}
