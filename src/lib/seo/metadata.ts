import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/constants";

// export const defaultMetadata: Metadata = {
//   metadataBase: new URL(SITE_URL),
//   title: {
//     default: `${SITE_NAME} | ${SITE_TAGLINE}`,
//     template: `%s | ${SITE_NAME}`,
//   },
//   description: SITE_DESCRIPTION,
//   keywords: [
//     "training institute",
//     "professional courses",
//     "placement training",
//     "scholarship program",
//     "ELEVEIIM",
//     "career development",
//     "certification courses",
//   ],
//   authors: [{ name: SITE_NAME, url: SITE_URL }],
//   creator: SITE_NAME,
//   publisher: SITE_NAME,
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       "max-video-preview": -1,
//       "max-image-preview": "large",
//       "max-snippet": -1,
//     },
//   },
//   openGraph: {
//     type: "website",
//     locale: "en_IN",
//     url: SITE_URL,
//     siteName: SITE_NAME,
//     title: `${SITE_NAME} | ${SITE_TAGLINE}`,
//     description: SITE_DESCRIPTION,
//     images: [
//       {
//         url: "/og-image.jpg",
//         width: 1200,
//         height: 630,
//         alt: `${SITE_NAME} - ${SITE_TAGLINE}`,
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: `${SITE_NAME} | ${SITE_TAGLINE}`,
//     description: SITE_DESCRIPTION,
//     images: ["/og-image.jpg"],
//   },
//   alternates: { canonical: SITE_URL },
//   category: "education",
// };


export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default:
      "ELEVEIIM | Tech & Non-Tech Career Training Institute in Mohali",
    template: "%s | ELEVEIIM",
  },

  description:
    "ELEVEIIM is a leading career training institute in Mohali offering Software Development, Full Stack Development, PHP, Laravel, Next.js, Node.js, Flutter, Digital Marketing, Graphic Designing, Real Estate, Personality Development, Soft Skills, Leadership Training, and placement-oriented professional courses.",

  keywords: [
    // Brand
    "ELEVEIIM",

    // Location
    "training institute in Mohali",
    "best training institute in Mohali",
    "career training institute Mohali",
    "professional courses in Mohali",

    // Development Courses
    "software development course",
    "full stack developer course",
    "full stack development training",
    "php training",
    "php course in Mohali",
    "laravel training",
    "laravel course",
    "next js training",
    "next js course",
    "node js training",
    "node js course",
    "flutter training",
    "flutter app development course",
    "mobile app development training",

    // Marketing & Design
    "digital marketing course",
    "graphic designing course",
    "seo training",
    "social media marketing course",

    // Non-Tech
    "real estate training",
    "personality development course",
    "soft skills training",
    "communication skills training",
    "leadership development program",

    // Career
    "job oriented courses",
    "placement training",
    "career development courses",
    "industry ready skills",
    "professional certification courses",
  ],

  authors: [
    {
      name: "ELEVEIIM",
      url: SITE_URL,
    },
  ],

  creator: "ELEVEIIM",
  publisher: "ELEVEIIM",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "ELEVEIIM",
    title:
      "ELEVEIIM | Tech & Non-Tech Career Training Institute in Mohali",
    description:
      "Learn Full Stack Development, PHP, Laravel, Next.js, Node.js, Flutter, Digital Marketing, Graphic Designing, Real Estate, Personality Development, and Soft Skills with industry-focused training.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ELEVEIIM Training Institute",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "ELEVEIIM | Tech & Non-Tech Career Training Institute in Mohali",
    description:
      "Industry-focused training for Software Development, Marketing, Design, Real Estate, Leadership and Career Growth.",
    images: ["/og-image.jpg"],
  },

  alternates: {
    canonical: SITE_URL,
  },

  category: "Education",
};


interface PageMetadataOptions {
  title: string;
  description: string;
  path?: string;
  ogType?: "website" | "article";
  keywords?: string[];
}

export function createPageMetadata({
  title,
  description,
  path = "",
  ogType = "website",
  keywords = [],
}: PageMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    keywords,
    openGraph: {
      type: ogType,
      locale: "en_IN",
      url,
      siteName: SITE_NAME,
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: ["/og-image.jpg"],
    },
    alternates: { canonical: url },
  };
}

export function createArticleMetadata(
  title: string,
  description: string,
  path: string,
  publishedAt: string,
  author: string
): Metadata {
  return {
    ...createPageMetadata({ title, description, path, ogType: "article" }),
    authors: [{ name: author }],
    openGraph: {
      type: "article",
      publishedTime: publishedAt,
      authors: [author],
      title: `${title} | ${SITE_NAME}`,
      description,
      url: `${SITE_URL}${path}`,
    },
  };
}
