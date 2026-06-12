import { SITE_NAME, SITE_URL } from "@/lib/constants";
import type { BreadcrumbItem, FAQItem } from "@/types";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/eleveiim-logo.jpg`,
    description: "Premium training institute — Elevate to Educate",
    slogan: "Elevate to Educate",
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  };
}

export function faqSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };
}

export function courseSchema(course: {
  title: string;
  description: string;
  duration: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    url: `${SITE_URL}/courses/${course.slug}`,
    provider: { "@type": "Organization", name: SITE_NAME, sameAs: SITE_URL },
    timeRequired: course.duration,
  };
}

export function industrialTrainingCourseSchema(course: {
  title: string;
  description: string;
  path?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    url: `${SITE_URL}${course.path ?? "/industrial-training"}`,
    provider: { "@type": "Organization", name: SITE_NAME, sameAs: SITE_URL },
    timeRequired: "P6M",
    educationalCredentialAwarded: "Certificate of Completion",
    occupationalCategory: [
      "Software Developer",
      "Digital Marketing Specialist",
      "Graphic Designer",
      "Business Consultant",
    ],
  };
}

export function articleSchema(article: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    url: `${SITE_URL}/blogs/${article.slug}`,
    datePublished: article.publishedAt,
    author: { "@type": "Person", name: article.author },
    publisher: { "@type": "Organization", name: SITE_NAME },
  };
}
