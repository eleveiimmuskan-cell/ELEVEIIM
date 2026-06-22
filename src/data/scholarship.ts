import type { FAQItem, ScholarshipBenefit } from "@/types";

export const scholarshipBenefits: ScholarshipBenefit[] = [
  {
    id: "1",
    title: "Up to 100% Fee Waiver",
    description:
      "Merit-based scholarships covering full or partial tuition for deserving candidates.",
  },
  {
    id: "2",
    title: "Easy Application",
    description:
      "Simple online process with quick eligibility assessment and transparent criteria.",
  },
  {
    id: "3",
    title: "No Hidden Charges",
    description:
      "What you see is what you get — no surprise fees after scholarship approval.",
  },
  {
    id: "4",
    title: "Career Support Included",
    description:
      "Scholarship students receive the same placement assistance and mentorship as regular enrollees.",
  },
];

export const SCHOLARSHIP_APPLY_SECTION_ID = "scholarship-apply";

export const SCHOLARSHIP_STUDENTS_IMAGE = "/images/scholarship-students-transparent.png";

export const SCHOLARSHIP_STUDENTS_IMAGE_ALT =
  "ELEVEIIM male and female students in branded apparel promoting the scholarship program";

export const SCHOLARSHIP_HIGHLIGHT_STATS = {
  badge: "Merit-Based Awards",
  discountPrefix: "Up to",
  discountValue: "100%",
  discountSuffix: "OFF",
  avgAwardAmount: "₹2.5 Crore+",
  avgAwardLabel: "Average scholarship awarded",
  avgAwardNote: "Based on recent approved applications",
} as const;

export const faqItems: FAQItem[] = [
  {
    question: "Who is eligible for the ELEVEIIM scholarship program?",
    answer:
      "Students with strong academic records, financial need, or exceptional talent in technology and design are eligible. Applications are reviewed on a rolling basis.",
  },
  {
    question: "What courses are covered under the scholarship?",
    answer:
      "All flagship programs including Full Stack Development, Data Science, Digital Marketing, UI/UX Design, Cloud Engineering, and Cybersecurity are eligible.",
  },
  {
    question: "How long does the scholarship application process take?",
    answer:
      "Most applications are reviewed within 1–2 business days. Approved candidates receive an offer letter with fee details and batch allocation.",
  },
  {
    question: "Does ELEVEIIM provide placement assistance?",
    answer:
      "Yes. Every enrolled student receives resume building, mock interviews, and direct referrals to our 500+ hiring partners.",
  },
];
