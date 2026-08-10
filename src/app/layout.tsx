import type { Metadata } from "next";
import { Suspense } from "react";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import { defaultMetadata } from "@/lib/seo/metadata";
import { organizationSchema, websiteSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/common/json-ld";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { WhatsAppButton } from "@/components/common/whatsapp-button";
import { FloatingCallButton } from "@/components/common/floating-call-button";
import { ScholarshipCmsProvider } from "@/components/common/scholarship-cms-provider";
import { ScholarshipModalHost } from "@/components/common/scholarship-modal-provider";
import { SmoothScrollProvider } from "@/components/common/smooth-scroll";
import { MetaPixel } from "@/components/analytics/MetaPixel";
import { FacebookPixelEvents } from "@/components/analytics/FacebookPixelEvents";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { getSiteFooter } from "@/services/footer.service";
import { getFeaturedCourses } from "@/services/courses.service";
import {
  getScholarshipCmsModal,
  getScholarshipCmsSettings,
} from "@/services/scholarship-cms.service";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  ...defaultMetadata,
  verification: {
    ...defaultMetadata.verification,
    google: "-GsJh2jogY71tdLo_Frhz1DZuTRixTODLXUeIJt6ZtI",
  },
};

/** Footer chrome ISR — matches other public API sections. */
export const revalidate = 60;

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [footer, featuredCourses, scholarshipSettings, scholarshipModal] =
    await Promise.all([
      getSiteFooter(),
      getFeaturedCourses(5),
      getScholarshipCmsSettings(),
      getScholarshipCmsModal(),
    ]);

  return (
    <html lang="en" className={`${jakarta.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-white font-sans text-foreground antialiased">
        <MetaPixel />
        <Suspense fallback={null}>
          <FacebookPixelEvents />
        </Suspense>
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <SmoothScrollProvider>
          <ScholarshipCmsProvider
            settings={scholarshipSettings}
            modal={scholarshipModal}
          >
            <Navbar />
            <main>{children}</main>
            <Footer data={footer} featuredCourses={featuredCourses} />
            <FloatingCallButton />
            <WhatsAppButton />
            <ScholarshipModalHost />
          </ScholarshipCmsProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
