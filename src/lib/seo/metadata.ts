import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/constants";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "training institute",
    "professional courses",
    "placement training",
    "scholarship program",
    "ELEVEIIM",
    "career development",
    "certification courses",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
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
    siteName: SITE_NAME,
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - ${SITE_TAGLINE}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  alternates: { canonical: SITE_URL },
  category: "education",
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
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: ["/og-image.png"],
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
