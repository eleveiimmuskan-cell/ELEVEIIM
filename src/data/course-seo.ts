/**
 * Course page SEO overrides from the ELEVEIIM SEO brief.
 * Applied only in generateMetadata — does not change on-page course content.
 */
export interface CourseSeoMeta {
  title: string;
  description: string;
}

export const COURSE_SEO_BY_SLUG: Record<string, CourseSeoMeta> = {
  "python-ai-and-data-science-professional-certification": {
    title:
      "Data Science Course in Mohali | Python, AI & Machine Learning | ELEVEIIM",
    description:
      "Join ELEVEIIM's Data Science Course in Mohali and learn Python, AI, Machine Learning, Deep Learning, SQL & Power BI with practical projects and certification.",
  },
  "chatgpt-generative-ai-certification-program": {
    title:
      "Generative AI Course in Mohali | ChatGPT & AI Certification | ELEVEIIM",
    description:
      "Learn Generative AI, ChatGPT, Prompt Engineering, AI Agents, Gemini, Claude, AI Automation & AI tools with practical projects at ELEVEIIM. Get certified in Mohali.",
  },
  "advanced-digital-marketing-and-ai-automation": {
    title: "Digital Marketing Course in Mohali | AI & Automation | ELEVEIIM",
    description:
      "Join ELEVEIIM's Digital Marketing Course in Mohali and master AI, SEO, Google Ads, Meta Ads, Social Media, Analytics & Marketing Automation with practical projects.",
  },
  "full-stack-web-development-master-nodejs-and-react": {
    title:
      "Full Stack Development Course in Mohali | React & Node.js | ELEVEIIM",
    description:
      "Join ELEVEIIM's Full Stack Development Course in Mohali and learn React, Node.js, JavaScript, MongoDB, Express.js, APIs & real-world projects with certification.",
  },
  "e-commerce-growth-and-marketplace-marketing": {
    title: "E-Commerce Course in Mohali | Marketplace Marketing | ELEVEIIM",
    description:
      "Learn E-Commerce Marketing, Amazon, Flipkart, Shopify, Marketplace Management, SEO, Ads & AI at ELEVEIIM. Get practical training and certification in Mohali.",
  },
  "ai-for-everyone-practical-ai-skills-program": {
    title:
      "AI Course in Mohali | Artificial Intelligence & GenAI Training | ELEVEIIM",
    description:
      "Learn Artificial Intelligence, Generative AI, ChatGPT, Prompt Engineering, AI Automation and practical AI tools at ELEVEIIM. Join our AI course in Mohali.",
  },
  "professional-seo-certification-program-2026": {
    title: "SEO Course in Mohali | Advanced SEO & Certification | ELEVEIIM",
    description:
      "Join ELEVEIIM's SEO Course in Mohali and learn Technical SEO, On-Page SEO, Off-Page SEO, Keyword Research, Local SEO, AI SEO & Google Search Console.",
  },
  "advanced-graphic-design-and-creative-branding-mastery": {
    title:
      "Graphic Design Course in Mohali | Branding & Creative Design | ELEVEIIM",
    description:
      "Join ELEVEIIM's Graphic Design Course in Mohali and learn Photoshop, Illustrator, Figma, Canva, Branding, UI/UX, Creative Design & Portfolio Development.",
  },
  "performance-marketing-mastery-google-ads-ppc-ai": {
    title:
      "Performance Marketing Course in Mohali | Google Ads, PPC & AI | ELEVEIIM",
    description:
      "Join ELEVEIIM's Performance Marketing Course in Mohali and learn Google Ads, PPC, Meta Ads, AI Marketing, Conversion Tracking, Analytics & Campaign Optimization.",
  },
  "ai-driven-graphic-design": {
    title:
      "AI Graphic Design Course in Mohali | AI Tools & Certification | ELEVEIIM",
    description:
      "Learn AI Graphic Design in Mohali with Photoshop, Illustrator, Canva, Generative AI, AI Design Tools, Branding & Creative Projects. Get certified at ELEVEIIM.",
  },
  "social-media-growth-and-content-marketing": {
    title:
      "Social Media Marketing Course in Mohali | Content & AI Marketing | ELEVEIIM",
    description:
      "Join ELEVEIIM's Social Media Marketing Course in Mohali and learn Instagram, Facebook, Content Marketing, Reels, AI Tools, Social Media Ads & Analytics.",
  },
  "php-full-stack-development-with-mysql-and-ai": {
    title:
      "PHP Full Stack Development Course in Mohali | MySQL & AI | ELEVEIIM",
    description:
      "Learn PHP, MySQL, Laravel, HTML, CSS, JavaScript, APIs and AI tools with practical projects at ELEVEIIM. Join our PHP Full Stack Development Course in Mohali.",
  },
  "ai-powered-flutter-app-development": {
    title: "Flutter App Development Course in Mohali | AI & Dart | ELEVEIIM",
    description:
      "Learn Flutter, Dart, AI integration, Firebase, API development and cross-platform app development with practical projects at ELEVEIIM in Mohali.",
  },
  "elevate-x-personality-transformation-program": {
    title:
      "Personality Development Course in Mohali | Communication & Career Skills | ELEVEIIM",
    description:
      "Join ELEVEIIM's Personality Development Course in Mohali to build communication, confidence, leadership, interview and professional skills for career success.",
  },
  "certified-real-estate-professional-program": {
    title:
      "Real Estate Course in Mohali | Real Estate Professional Certification | ELEVEIIM",
    description:
      "Join ELEVEIIM's Real Estate Course in Mohali and learn property sales, real estate marketing, lead generation, negotiation, client management and professional skills.",
  },
  "nodejs-backend-development-with-ai": {
    title: "Node.js Course in Mohali | Backend Development & AI | ELEVEIIM",
    description:
      "Learn Node.js, Express.js, REST APIs, MongoDB, Backend Development, AI Integration and real-world projects at ELEVEIIM. Get job-ready skills in Mohali.",
  },
  "prompt-enginnering": {
    title: "Prompt Engineering Course in Mohali | GenAI & ChatGPT | ELEVEIIM",
    description:
      "Learn Prompt Engineering, ChatGPT, Generative AI, AI Tools, LLMs, AI Automation and advanced prompting techniques with practical training at ELEVEIIM Mohali.",
  },
  "php-backend-development-with-mysql": {
    title: "PHP Backend Development Course in Mohali | MySQL | ELEVEIIM",
    description:
      "Learn PHP, MySQL, Backend Development, APIs, Database Management and real-world projects at ELEVEIIM. Build job-ready backend skills with practical training in Mohali.",
  },
  "nodejs-api-and-backend-development": {
    title:
      "Node.js Backend Development Course in Mohali | APIs & Node.js | ELEVEIIM",
    description:
      "Learn Node.js, Express.js, REST APIs, MongoDB, Backend Development, Authentication and real-world projects at ELEVEIIM. Get job-ready backend skills in Mohali.",
  },
  "reactjs-professional-frontend-development-2": {
    title:
      "React JS Course in Mohali | Frontend Development Certification | ELEVEIIM",
    description:
      "Join ELEVEIIM's React JS Course in Mohali and learn React, JavaScript, HTML, CSS, APIs, modern frontend development and real-world projects with certification.",
  },
};

export function getCourseSeo(slug: string): CourseSeoMeta | undefined {
  return COURSE_SEO_BY_SLUG[slug];
}
