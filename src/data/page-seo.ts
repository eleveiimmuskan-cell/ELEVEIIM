/**
 * Site page SEO overrides from the ELEVEIIM title-tags brief.
 * Applied only via Next.js metadata — does not change on-page content.
 */
export interface PageSeoMeta {
  title: string;
  description: string;
}

export const PAGE_SEO = {
  home: {
    title: "Professional Training Institute in Mohali & Chandigarh | Eleveiim",
    description:
      "Explore AI, Data Science, Digital Marketing, Full Stack Development and professional certification courses at Eleveiim in Mohali & Chandigarh. Join industry-focused training today.",
  },
  scholarship: {
    title: "Scholarship Program for Professional Courses | Eleveiim Mohali",
    description:
      "Apply for Eleveiim's merit-based scholarship program and explore up to 100% fee waiver opportunities for professional training courses in Mohali.",
  },
  about: {
    title: "About Eleveiim | Professional Training Institute in Mohali",
    description:
      "Learn about Eleveiim, a professional training institute in Mohali offering AI, Data Science, Digital Marketing, Full Stack and career-focused programs.",
  },
  contact: {
    title: "Contact Eleveiim | Training Institute in Mohali",
    description:
      "Contact Eleveiim in Sector 82, Mohali to enquire about AI, Data Science, Digital Marketing, Full Stack Development and professional courses.",
  },
  placements: {
    title: "Student Placements & Career Outcomes | Eleveiim Mohali",
    description:
      "Explore Eleveiim student placement stories, career outcomes, industry exposure and placement support across professional training programs in Mohali.",
  },
  blogs: {
    title: "Eleveiim Blog | AI, Digital Marketing & Career Insights",
    description:
      "Explore practical guides and insights on AI, Digital Marketing, Data Science, SEO, careers, technology and professional skills from Eleveiim.",
  },
  courses: {
    title: "Professional Courses in Mohali & Chandigarh | Eleveiim",
    description:
      "Explore industry-ready courses in AI, Data Science, Digital Marketing, SEO, Full Stack Development, Graphic Design and more at Eleveiim in Mohali & Chandigarh",
  },
} as const satisfies Record<string, PageSeoMeta>;
