import {
  Building2,
  CalendarDays,
  GraduationCap,
  Monitor,
  MonitorPlay,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { FAQItem } from "@/types";

export const FREE_AI_FOUNDATION_PATH =
  "/free-ai-foundation-course-for-1-lac-students";

export const FREE_AI_FOUNDATION_PAYMENT_URL = "https://rzp.io/rzp/eleve001";

export const FREE_AI_FOUNDATION_TITLE =
  "Free AI Foundation Course for 1 Lakh Students";

export const FREE_AI_FOUNDATION_DESCRIPTION =
  "Master the latest AI tools, boost productivity, and build practical skills for real-world success and future career growth.";

export const FREE_AI_FOUNDATION_SCHEDULE = {
  duration: "30 days",
  daily: "Daily 1 hour class",
  timing: "Batch timing 10 AM to 5 PM",
  ends: "Batch ends 15 October",
} as const;

export const FREE_AI_FOUNDATION_CTA = "Register now";

export const FREE_AI_FOUNDATION_INCLUDES = [
  "ChatGPT, Gemini, Lovable, Perplexity and NotebookLM",
  "Online and offline classes",
  "Certificate of completion",
  "No additional fees after registration",
] as const;

export const FREE_AI_FOUNDATION_CLASS_MODES: {
  label: string;
  icon: LucideIcon;
}[] = [
  { label: "Online", icon: Monitor },
  { label: "Offline", icon: Building2 },
];

export const FREE_AI_FOUNDATION_META = {
  title: FREE_AI_FOUNDATION_TITLE,
  description: FREE_AI_FOUNDATION_DESCRIPTION,
  path: FREE_AI_FOUNDATION_PATH,
  keywords: [
    "free AI foundation course",
    "AI course for 1 lakh students",
    "ChatGPT course",
    "Gemini",
    "Lovable",
    "Perplexity",
    "NotebookLM",
    "ELEVEIIM",
  ],
} as const;

export const FREE_AI_FOUNDATION_TOOLS: {
  name: string;
  src: string;
  description: string;
}[] = [
  {
    name: "ChatGPT",
    src: "/images/ai-tools/chatgpt.svg",
    description:
      "Write, plan, and finish everyday work faster with clear prompts.",
  },
  {
    name: "Gemini",
    src: "/images/ai-tools/gemini.svg",
    description: "Research, draft, and organize work in one place.",
  },
  {
    name: "Lovable",
    src: "/images/ai-tools/lovable.svg",
    description:
      "Turn an idea into a working app without starting from a blank page.",
  },
  {
    name: "Perplexity",
    src: "/images/ai-tools/perplexity.svg",
    description: "Find sourced answers you can check, cite, and actually use.",
  },
  {
    name: "NotebookLM",
    src: "/images/ai-tools/notebooklm.svg",
    description:
      "Study from your own notes, PDFs, and documents with an AI notebook.",
  },
];

export const FREE_AI_FOUNDATION_STATS: {
  value: string;
  label: string;
  icon: LucideIcon;
  tone?: "accent" | "positive";
  long?: boolean;
  detail?: string;
}[] = [
  { value: "1 Lakh", label: "Students", icon: Users },
  {
    value: "30 Days",
    label: "Duration",
    detail: "1 hour class · 10 AM to 5 PM",
    icon: CalendarDays,
  },
  { value: "Free", label: "Course access", icon: GraduationCap, tone: "positive" },
  { value: "Online / Offline", label: "Class modes", icon: MonitorPlay, long: true },
];

export const FREE_AI_FOUNDATION_WHO = [
  "School, college, and university students",
  "Beginners who want practical AI skills",
  "Online from anywhere, or offline at ELEVEIIM Mohali",
  "Students ready to register for ₹299",
] as const;

export const FREE_AI_FOUNDATION_WHO_DESCRIPTION =
  "This foundation is for students who want to master current AI tools, work faster, and build skills they can use in studies and a future career.";

export const FREE_AI_FOUNDATION_STEPS = [
  {
    title: "Register now",
    description: "Pay the one-time ₹299 registration fee on the secure payment page.",
  },
  {
    title: "Get confirmation",
    description: "Our team contacts you with your seat and session details.",
  },
  {
    title: "Learn the tools",
    description:
      "Attend online or offline classes on ChatGPT, Gemini, Lovable, Perplexity, and NotebookLM.",
  },
  {
    title: "Receive your certificate",
    description: "Finish the course and get your certificate of completion.",
  },
] as const;

export const FREE_AI_FOUNDATION_FAQS: FAQItem[] = [
  {
    question: "Is the course free?",
    answer:
      "Yes. The course is completely free. You pay ₹299 once as a registration fee. There are no hidden charges and no additional fees.",
  },
  {
    question: "Which tools will I learn?",
    answer:
      "ChatGPT, Gemini, Lovable, Perplexity, and NotebookLM. You will practice using them for real study and work tasks.",
  },
  {
    question: "Do I need to know coding?",
    answer:
      "No. The foundation is designed for beginners. You do not need programming experience.",
  },
  {
    question: "Who can register?",
    answer:
      "School, college, and university students, and other beginners who want practical AI skills for study, work, and career growth.",
  },
  {
    question: "How will the classes be conducted?",
    answer:
      "Classes run for 30 days, with a 1 hour class every day. Batch timing is 10 AM to 5 PM. This batch ends on 15 October. Join online from anywhere in India, or attend offline at ELEVEIIM in Sector 82, Mohali.",
  },
  {
    question: "Will I receive a certificate?",
    answer:
      "Yes. Students who complete the foundation receive a certificate of completion from ELEVEIIM.",
  },
];
