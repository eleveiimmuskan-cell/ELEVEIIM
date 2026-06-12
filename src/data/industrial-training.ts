import type { FAQItem } from "@/types";

export const INDUSTRIAL_TRAINING_META = {
  title: "6 Months Industrial Training Program",
  description:
    "Industry-oriented 6 months industrial training program with live projects, internship certificate, AI tools training and placement support. Learn Full Stack Development, Digital Marketing, Graphic Designing and Business Skills.",
  keywords: [
    "6 months industrial training",
    "industrial training institute",
    "full stack development course",
    "digital marketing training",
    "graphic designing course",
    "internship program",
    "placement assistance",
    "job oriented courses",
  ],
} as const;

export const HOME_PREVIEW = {
  heading: "6 Months Industrial Training Program",
  subheading: "Learn, Build & Get Hired with Industry-Oriented Training",
  description:
    "Become job-ready through practical learning, live projects, internship exposure and placement support. Designed for students, freshers and career switchers.",
  highlights: [
    "100% Placement Assistance",
    "Live Projects",
    "AI Tools Training",
    "Internship Certificate",
    "Resume Building",
    "Mock Interviews",
    "Industry Experts",
  ],
  heroImage: "/images/industrial-training-hero.webp",
  heroImageAlt:
    "ELEVEIIM industrial training program students learning full stack development and digital skills",
  brochureHref: "/industrial-training#brochure",
} as const;

export const HOME_STATS = [
  { value: "10000+", label: "Students Trained" },
  { value: "120+", label: "Modules" },
  { value: "17+", label: "Years Experience" },
  { value: "95%", label: "Student Satisfaction" },
] as const;

export const PAGE_HERO = {
  title: "6 Months Industrial Training Program With Placement Assistance",
  subtitle: "Learn In Demand Skills. Build Real Projects. Launch Your Career.",
} as const;

export const WHY_CHOOSE = [
  { title: "Industry-Oriented Curriculum", description: "Structured syllabus aligned with hiring partner expectations." },
  { title: "AI-Powered Learning", description: "Train with ChatGPT, Copilot, Cursor and modern AI workflows." },
  { title: "Live Projects", description: "Build real-world applications for your professional portfolio." },
  { title: "Internship Certificate", description: "Receive recognized internship exposure upon completion." },
  { title: "Expert Trainers", description: "Learn from mentors with 17+ years of industry experience." },
  { title: "Placement Assistance", description: "Dedicated support for interviews, referrals and job readiness." },
  { title: "Portfolio Building", description: "Showcase projects that demonstrate practical capability." },
  { title: "Lifetime Community", description: "Stay connected with peers, alumni and career guidance." },
] as const;

export interface TrainingDomain {
  id: string;
  label: string;
  sections: { title: string; items: string[] }[];
  careers: string[];
  salaryRange: string;
}

export const TRAINING_DOMAINS: TrainingDomain[] = [
  {
    id: "full-stack",
    label: "Full Stack Development",
    sections: [
      {
        title: "Frontend",
        items: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind"],
      },
      {
        title: "Backend",
        items: ["Node.js", "Express", "MongoDB", "Authentication", "API Development", "Deployment"],
      },
    ],
    careers: [
      "Frontend Developer",
      "Backend Developer",
      "MERN Stack Developer",
      "Software Engineer",
      "Full Stack Developer",
      "Freelancer",
    ],
    salaryRange: "₹3.5 LPA – ₹12 LPA (entry to mid-level roles)",
  },
  {
    id: "digital-marketing",
    label: "Digital Marketing",
    sections: [
      {
        title: "Core Skills",
        items: ["SEO", "Google Ads", "Meta Ads", "Social Media Marketing", "Content Marketing", "AI Marketing", "Analytics"],
      },
    ],
    careers: ["SEO Executive", "Performance Marketer", "Digital Marketing Specialist", "Freelancer", "Marketing Consultant"],
    salaryRange: "₹2.5 LPA – ₹10 LPA depending on role and experience",
  },
  {
    id: "graphic-design",
    label: "Graphic Designing",
    sections: [
      {
        title: "Tools & Skills",
        items: ["Photoshop", "Illustrator", "Figma", "Canva", "Branding", "UI Design", "Social Media Creatives"],
      },
    ],
    careers: ["Graphic Designer", "UI Designer", "Brand Designer", "Creative Designer", "Freelancer"],
    salaryRange: "₹2.4 LPA – ₹9 LPA for design and creative roles",
  },
  {
    id: "business",
    label: "Business & Entrepreneurship",
    sections: [
      {
        title: "Business Skills",
        items: ["Sales", "Lead Generation", "Brand Building", "Automation", "CRM", "Personal Branding", "Business Growth Strategies"],
      },
    ],
    careers: ["Consultant", "Business Owner", "Agency Founder", "Freelancer", "Startup Founder"],
    salaryRange: "Variable — business income depends on niche, offer and execution",
  },
];

export const ROADMAP = [
  { month: "Month 1", title: "Foundation Skills" },
  { month: "Month 2", title: "Core Skills" },
  { month: "Month 3", title: "Advanced Skills" },
  { month: "Month 4", title: "Live Projects" },
  { month: "Month 5", title: "AI Tools + Internship" },
  { month: "Month 6", title: "Placement Preparation" },
] as const;

export const STUDENT_BENEFITS = [
  "120+ Modules",
  "25+ Certifications",
  "Internship Certificate",
  "Live Projects",
  "AI Tools Training",
  "Portfolio Building",
  "Resume Building",
  "Mock Interviews",
  "Placement Assistance",
  "Lifetime Community Access",
  "Doubt Sessions",
  "Soft Skills Training",
] as const;

export const PORTFOLIO_PROJECTS = [
  { title: "E-Commerce Website", description: "Full-stack storefront with cart, checkout and admin panel." },
  { title: "CRM Dashboard", description: "Lead management dashboard with analytics and role-based access." },
  { title: "Digital Marketing Campaign", description: "End-to-end campaign strategy with ads and performance tracking." },
  { title: "Restaurant Website", description: "Responsive business website with booking and menu management." },
  { title: "Portfolio Website", description: "Personal brand site showcasing projects and skills." },
  { title: "Brand Identity Project", description: "Logo, color system and social media creative suite." },
] as const;

export const COMPANY_LOGOS = [
  "Google",
  "Infosys",
  "TCS",
  "Wipro",
  "Accenture",
  "Capgemini",
  "Tech Mahindra",
  "Deloitte",
  "HCL",
  "IBM",
] as const;

export const SUCCESS_STORIES = [
  {
    name: "Rahul Sharma",
    course: "Full Stack Development",
    company: "TCS",
    package: "₹6.2 LPA",
    review: "The live projects and mock interviews helped me crack my first developer role confidently.",
    image: "/images/industrial-training/student-1.webp",
  },
  {
    name: "Priya Verma",
    course: "Digital Marketing",
    company: "Accenture",
    package: "₹4.8 LPA",
    review: "ELEVEIIM's practical campaigns and AI marketing modules made me job-ready within six months.",
    image: "/images/industrial-training/student-2.webp",
  },
  {
    name: "Arjun Mehta",
    course: "Graphic Designing",
    company: "Freelancer",
    package: "₹5 LPA+",
    review: "Portfolio building and mentor feedback helped me land consistent freelance clients.",
    image: "/images/industrial-training/student-3.webp",
  },
] as const;

export const PLACEMENT_STEPS = [
  "Training",
  "Live Projects",
  "Portfolio",
  "Resume",
  "Mock Interviews",
  "Interview Preparation",
  "Placement Support",
  "Get Hired",
] as const;

export const CERTIFICATES = [
  { title: "Course Completion Certificate", image: "/images/certificate1.webp" },
  { title: "Internship Certificate", image: "/images/certificate2.webp" },
  { title: "Project Certificate", image: "/images/certificate1.webp" },
  { title: "Industry Exposure Certificate", image: "/images/certificate2.webp" },
] as const;

export const COMPARISON = {
  traditional: [
    "Theory-heavy syllabus",
    "Limited project exposure",
    "No structured AI training",
    "Basic placement support",
    "Minimal interview prep",
    "Generic certificates",
    "Limited mentor access",
  ],
  eleveiim: [
    "Practical Training",
    "Live Projects",
    "AI Tools",
    "Placement Support",
    "Mock Interviews",
    "Portfolio Building",
    "Industry Mentorship",
  ],
} as const;

export const COMPARISON_ROWS = COMPARISON.eleveiim.map((feature) => ({
  feature,
  traditional: false,
  eleveiim: true,
}));

export const MENTORS = [
  {
    name: "Vikram Singh",
    experience: "18 Years",
    specialization: "Full Stack Development & System Design",
    image: "/images/industrial-training/mentor-1.webp",
    linkedin: "#",
  },
  {
    name: "Neha Kapoor",
    experience: "14 Years",
    specialization: "Digital Marketing & Performance Ads",
    image: "/images/industrial-training/mentor-2.webp",
    linkedin: "#",
  },
  {
    name: "Aman Gill",
    experience: "12 Years",
    specialization: "UI/UX & Brand Design",
    image: "/images/industrial-training/mentor-3.webp",
    linkedin: "#",
  },
] as const;

export const INDUSTRIAL_FAQS: FAQItem[] = [
  {
    question: "What is 6 months industrial training?",
    answer:
      "It is a structured six-month program combining practical training, live projects, internship exposure and placement preparation for job-oriented careers.",
  },
  {
    question: "Who can join?",
    answer:
      "Students, fresh graduates, working professionals, freelancers and career switchers who want industry-ready skills can join.",
  },
  {
    question: "Will I get placement assistance?",
    answer:
      "Yes. ELEVEIIM provides resume building, mock interviews, interview preparation and placement support throughout the program.",
  },
  {
    question: "Will I work on live projects?",
    answer:
      "Yes. You will build live projects across development, marketing and design domains to strengthen your portfolio.",
  },
  {
    question: "Do I get certificates?",
    answer:
      "Yes. You receive course completion, internship, project and industry exposure certificates upon meeting program requirements.",
  },
  {
    question: "Are classes online or offline?",
    answer:
      "ELEVEIIM offers flexible learning modes. Contact our counselors for current batch schedules and availability.",
  },
  {
    question: "What career opportunities are available?",
    answer:
      "Graduates pursue roles such as developers, marketers, designers, consultants, freelancers and entrepreneurs depending on their track.",
  },
  {
    question: "Can beginners join?",
    answer:
      "Yes. The program starts with foundation skills and gradually progresses to advanced concepts and placement preparation.",
  },
];

export const FINAL_CTA = {
  title: "Ready To Start Your Career Journey?",
  description:
    "Join ELEVEIIM's Industry-Oriented Training Program and become job-ready.",
} as const;
