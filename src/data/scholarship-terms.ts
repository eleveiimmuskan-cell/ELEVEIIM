import type { FAQItem } from "@/types";

export const SCHOLARSHIP_TERMS_PATH = "/scholarship/terms-and-conditions";

export const SCHOLARSHIP_TERMS_NAV = [
  { id: "introduction", label: "Introduction" },
  { id: "award-structure", label: "Award Structure" },
  { id: "eligibility", label: "Eligibility" },
  { id: "renewal", label: "Renewal" },
  { id: "cancellation", label: "Cancellation" },
  { id: "important-notes", label: "Notes" },
  { id: "faq", label: "FAQ" },
] as const;

export interface ScholarshipAwardRow {
  eligibility: string;
  amount: string;
}

export interface ScholarshipAwardSection {
  category: string;
  rows: ScholarshipAwardRow[];
}

/** Award bands — amounts kept highest → lowest within each category. */
export const SCHOLARSHIP_AWARD_SECTIONS: ScholarshipAwardSection[] = [
  {
    category: "Under Institute's own merit award scheme",
    rows: [
      {
        eligibility: "Top 2% Students",
        amount: "100% of total tuition fee",
      },
      {
        eligibility: "The next top 1% Students",
        amount: "50% of total tuition fee",
      },
    ],
  },
  {
    category: "Under Institute's own merit-cum-need awards scheme",
    rows: [
      {
        eligibility: "Top 5% Students",
        amount: "100% of total tuition fee",
      },
      {
        eligibility: "The next top 2% Students",
        amount: "50% of total tuition fee",
      },
      {
        eligibility: "The next top 5% Students",
        amount: "25% of total tuition fee",
      },
      {
        eligibility: "The next top 10% Students",
        amount: "10% of total tuition fee",
      },
    ],
  },
];

export const SCHOLARSHIP_ELIGIBILITY_POINTS = [
  "Candidate must satisfy course eligibility.",
  "Scholarship is subject to document verification.",
  "Scholarship cannot be transferred.",
  "Scholarship cannot be exchanged for cash.",
  "Institute reserves all rights.",
] as const;

export const SCHOLARSHIP_RENEWAL_POINTS = [
  "Minimum attendance requirement",
  "Good academic performance",
  "Good discipline",
  "Timely assignment submission",
  "Live project participation",
] as const;

export const SCHOLARSHIP_CANCELLATION_POINTS = [
  "False documents submitted",
  "Misconduct",
  "Poor attendance",
  "Violation of institute rules",
  "Academic dishonesty",
] as const;

export const SCHOLARSHIP_IMPORTANT_NOTES = [
  "Scholarship is limited.",
  "Seats are first come first served.",
  "Scholarship committee decision is final.",
  "Institute may revise scholarship policy without prior notice.",
] as const;

export const SCHOLARSHIP_TERMS_FAQS: FAQItem[] = [
  {
    question: "Who can apply?",
    answer:
      "Students who meet the eligibility criteria for their chosen ELEVEIIM course may apply. Awards are granted on a merit or merit-cum-need basis, subject to document verification and committee approval.",
  },
  {
    question: "Can scholarship be transferred?",
    answer:
      "No. Scholarships are awarded to a specific applicant for a specific program and cannot be transferred to another student, course, or batch.",
  },
  {
    question: "Can scholarship be combined with other offers?",
    answer:
      "Scholarships generally cannot be combined with other fee waivers, promotional discounts, or cash equivalents unless the scholarship committee expressly approves an exception in writing.",
  },
  {
    question: "What happens if attendance is low?",
    answer:
      "Poor attendance may lead to non-renewal or cancellation of the scholarship. Recipients are expected to maintain the institute’s minimum attendance and academic standards throughout the program.",
  },
];
