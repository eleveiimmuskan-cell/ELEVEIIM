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
      "Professional Training Institute in Mohali & Chandigarh | Eleveiim",
    template: "%s | ELEVEIIM",
  },

  description:
    "Explore AI, Data Science, Digital Marketing, Full Stack Development and professional certification courses at Eleveiim in Mohali & Chandigarh. Join industry-focused training today.",

    
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
      "Professional Training Institute in Mohali & Chandigarh | Eleveiim",
    description:
      "Explore AI, Data Science, Digital Marketing, Full Stack Development and professional certification courses at Eleveiim in Mohali & Chandigarh. Join industry-focused training today.",
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
      "Professional Training Institute in Mohali & Chandigarh | Eleveiim",
    description:
      "Explore AI, Data Science, Digital Marketing, Full Stack Development and professional certification courses at Eleveiim in Mohali & Chandigarh. Join industry-focused training today.",
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
  /**
   * When true, use the title exactly (no root `%s | ELEVEIIM` template and no
   * extra `| ELEVEIIM` on Open Graph / Twitter titles). Use for SEO titles that
   * already include the brand.
   */
  absoluteTitle?: boolean;
}

export function createPageMetadata({
  title,
  description,
  path = "",
  ogType = "website",
  keywords = [],
  absoluteTitle = false,
}: PageMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;
  const socialTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    openGraph: {
      type: ogType,
      locale: "en_IN",
      url,
      siteName: SITE_NAME,
      title: socialTitle,
      description,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
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
