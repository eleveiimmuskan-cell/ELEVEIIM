import {
  GraduationCap,
  IndianRupee,
  MonitorPlay,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { FAQItem } from "@/types";

export const FREE_AI_FOUNDATION_PATH =
  "/free-ai-foundation-course-for-1-lac-students";

export const FREE_AI_FOUNDATION_PAYMENT_URL = "https://rzp.io/rzp/eleve001";

export const FREE_AI_FOUNDATION_TITLE =
  "Free AI Foundation Course for 1 Lac Students";

export const FREE_AI_FOUNDATION_DESCRIPTION =
  "Master the latest AI tools, boost productivity, and build practical skills for real-world success and future career growth.";

export const FREE_AI_FOUNDATION_CTA = "Pay now";

export const FREE_AI_FOUNDATION_INCLUDES = [
  "ChatGPT, Gemini, Lovable, Perplexity and NotebookLM",
  "Live online sessions",
  "Certificate of completion",
  "No additional fees after registration",
] as const;

export const FREE_AI_FOUNDATION_META = {
  title: FREE_AI_FOUNDATION_TITLE,
  description: FREE_AI_FOUNDATION_DESCRIPTION,
  path: FREE_AI_FOUNDATION_PATH,
  keywords: [
    "free AI foundation course",
    "AI course for 1 lac students",
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
}[] = [
  { value: "1 Lac", label: "Student seats", icon: Users },
  { value: "₹299", label: "Registration only", icon: IndianRupee, tone: "accent" },
  { value: "Free", label: "Course access", icon: GraduationCap, tone: "positive" },
  { value: "Live", label: "Online classes", icon: MonitorPlay },
];

export const FREE_AI_FOUNDATION_WHO = [
  "School, college, and university students",
  "Beginners who want practical AI skills",
  "Learners with a phone or laptop and internet",
  "Students ready to register for ₹299",
] as const;

export const FREE_AI_FOUNDATION_WHO_DESCRIPTION =
  "This foundation is for students who want to master current AI tools, work faster, and build skills they can use in studies and a future career.";

export const FREE_AI_FOUNDATION_STEPS = [
  {
    title: "Pay now",
    description: "Pay the one-time ₹299 registration fee on the secure payment page.",
  },
  {
    title: "Get confirmation",
    description: "Our team contacts you with your seat and session details.",
  },
  {
    title: "Learn the tools",
    description:
      "Attend live sessions on ChatGPT, Gemini, Lovable, Perplexity, and NotebookLM.",
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
      "Sessions are live and online. You can join from anywhere in India with a phone or laptop and an internet connection.",
  },
  {
    question: "Will I receive a certificate?",
    answer:
      "Yes. Students who complete the foundation receive a certificate of completion from ELEVEIIM.",
  },
];
