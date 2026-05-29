import type { Course } from "@/types";

const defaultFaqs = [
  {
    question: "Do I need prior experience?",
    answer:
      "Most courses include beginner-friendly modules. Check the level on each course page for specific prerequisites.",
  },
  {
    question: "Is placement support included?",
    answer:
      "Yes. All enrolled students receive resume building, mock interviews, and referrals to 500+ hiring partners.",
  },
];

export const courses: Course[] = [
  {
    id: "1",
    slug: "full-stack-web-development",
    title: "Full Stack Web Development",
    shortDescription:
      "Master React, Node.js, and cloud deployment with hands-on projects.",
    description:
      "Master React, Node.js, and cloud deployment with hands-on projects and industry mentorship. Build production-grade applications and graduate with a portfolio that impresses recruiters.",
    duration: "6 Months",
    certification: "Industry Certified",
    trainer: "Arjun Mehta",
    rating: 4.9,
    batchTiming: "Weekday · 10 AM – 1 PM",
    category: "Development",
    students: 2400,
    level: "Beginner to Advanced",
    curriculum: [
      { title: "Frontend Foundations", topics: ["HTML/CSS", "JavaScript ES6+", "React & Next.js"] },
      { title: "Backend & APIs", topics: ["Node.js", "Express", "REST & GraphQL"] },
      { title: "Databases & DevOps", topics: ["MongoDB", "PostgreSQL", "Docker basics"] },
    ],
    faqs: defaultFaqs,
  },
  {
    id: "2",
    slug: "data-science-ai",
    title: "Data Science & AI",
    shortDescription:
      "Learn Python, ML, and AI workflows with real-world datasets.",
    description:
      "Learn Python, machine learning, and AI workflows with real-world datasets and capstone projects. From statistics to deep learning — become job-ready in data science.",
    duration: "8 Months",
    certification: "IBM Certified",
    trainer: "Priya Sharma",
    rating: 4.8,
    batchTiming: "Weekend · 2 PM – 6 PM",
    category: "Data & AI",
    students: 1800,
    level: "Intermediate",
    curriculum: [
      { title: "Python & Statistics", topics: ["NumPy", "Pandas", "Statistical modeling"] },
      { title: "Machine Learning", topics: ["Scikit-learn", "Feature engineering", "Model evaluation"] },
      { title: "Deep Learning & AI", topics: ["TensorFlow", "NLP basics", "Computer vision intro"] },
    ],
    faqs: defaultFaqs,
  },
  {
    id: "3",
    slug: "digital-marketing-mastery",
    title: "Digital Marketing Mastery",
    shortDescription:
      "SEO, paid ads, analytics, and brand strategy for measurable growth.",
    description:
      "SEO, paid ads, analytics, and brand strategy — build campaigns that drive measurable growth. Perfect for aspiring marketers and business owners.",
    duration: "4 Months",
    certification: "Google Certified",
    trainer: "Rahul Verma",
    rating: 4.7,
    batchTiming: "Weekday · 6 PM – 9 PM",
    category: "Marketing",
    students: 1200,
    level: "All Levels",
    curriculum: [
      { title: "SEO & Content", topics: ["Keyword research", "On-page SEO", "Content strategy"] },
      { title: "Paid Advertising", topics: ["Google Ads", "Meta Ads", "Campaign optimization"] },
      { title: "Analytics & Growth", topics: ["GA4", "Conversion tracking", "Growth funnels"] },
    ],
    faqs: defaultFaqs,
  },
  {
    id: "4",
    slug: "ui-ux-design-professional",
    title: "UI/UX Design Professional",
    shortDescription:
      "Design thinking, Figma workflows, and portfolio-ready projects.",
    description:
      "Design thinking, Figma workflows, and portfolio-ready projects for product design roles. Learn user research, wireframing, and high-fidelity prototyping.",
    duration: "5 Months",
    certification: "Adobe Certified",
    trainer: "Sneha Kapoor",
    rating: 4.9,
    batchTiming: "Weekend · 10 AM – 2 PM",
    category: "Design",
    students: 950,
    level: "Beginner",
    curriculum: [
      { title: "Design Fundamentals", topics: ["Typography", "Color theory", "Layout systems"] },
      { title: "UX Research", topics: ["User interviews", "Personas", "Journey mapping"] },
      { title: "UI & Prototyping", topics: ["Figma", "Design systems", "Interactive prototypes"] },
    ],
    faqs: defaultFaqs,
  },
  {
    id: "5",
    slug: "cloud-devops-engineering",
    title: "Cloud & DevOps Engineering",
    shortDescription:
      "AWS, Docker, Kubernetes, and CI/CD for modern infrastructure.",
    description:
      "AWS, Docker, Kubernetes, and CI/CD pipelines for modern infrastructure careers. Deploy, monitor, and scale applications in production environments.",
    duration: "6 Months",
    certification: "AWS Certified",
    trainer: "Vikram Singh",
    rating: 4.8,
    batchTiming: "Weekday · 7 PM – 10 PM",
    category: "Cloud",
    students: 1100,
    level: "Advanced",
    curriculum: [
      { title: "Cloud Foundations", topics: ["AWS core services", "IAM", "Networking"] },
      { title: "Containers & Orchestration", topics: ["Docker", "Kubernetes", "Helm basics"] },
      { title: "CI/CD & Monitoring", topics: ["GitHub Actions", "Terraform intro", "Observability"] },
    ],
    faqs: defaultFaqs,
  },
  {
    id: "6",
    slug: "cybersecurity-analyst",
    title: "Cybersecurity Analyst",
    shortDescription:
      "Ethical hacking, network security, and threat analysis with labs.",
    description:
      "Ethical hacking, network security, and threat analysis with lab-based learning. Prepare for security analyst roles with hands-on penetration testing.",
    duration: "7 Months",
    certification: "CompTIA Ready",
    trainer: "Ananya Reddy",
    rating: 4.9,
    batchTiming: "Weekend · 3 PM – 7 PM",
    category: "Security",
    students: 780,
    level: "Intermediate",
    curriculum: [
      { title: "Security Foundations", topics: ["Networking", "Cryptography", "Security policies"] },
      { title: "Offensive Security", topics: ["Reconnaissance", "Vulnerability assessment", "Exploitation basics"] },
      { title: "Defensive Operations", topics: ["SIEM", "Incident response", "Threat hunting"] },
    ],
    faqs: defaultFaqs,
  },
];

export const featuredCourses = courses.slice(0, 3);
