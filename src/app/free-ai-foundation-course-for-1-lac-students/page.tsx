import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/common/json-ld";
import { PageTransition } from "@/animations/page-transition";
import {
  FreeAiFoundationFaqSection,
  FreeAiFoundationFinalCta,
  FreeAiFoundationHero,
  FreeAiFoundationLearnSection,
  FreeAiFoundationStatsBar,
  FreeAiFoundationWhoSection,
} from "@/components/free-ai-foundation-course";
import {
  FREE_AI_FOUNDATION_FAQS,
  FREE_AI_FOUNDATION_META,
  FREE_AI_FOUNDATION_PATH,
} from "@/data/free-ai-foundation-course";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = createPageMetadata({
  title: FREE_AI_FOUNDATION_META.title,
  description: FREE_AI_FOUNDATION_META.description,
  path: FREE_AI_FOUNDATION_META.path,
  keywords: [...FREE_AI_FOUNDATION_META.keywords],
});

export default function FreeAiFoundationCoursePage() {
  return (
    <PageTransition>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", href: "/" },
            { label: "Free AI Foundation Course" },
          ]),
          faqSchema(FREE_AI_FOUNDATION_FAQS),
          {
            "@context": "https://schema.org",
            "@type": "Course",
            name: FREE_AI_FOUNDATION_META.title,
            description: FREE_AI_FOUNDATION_META.description,
            url: `${SITE_URL}${FREE_AI_FOUNDATION_PATH}`,
            provider: {
              "@type": "Organization",
              name: SITE_NAME,
              sameAs: SITE_URL,
            },
            offers: {
              "@type": "Offer",
              price: "299",
              priceCurrency: "INR",
              description:
                "One-time registration fee. The course itself is free, with no hidden charges.",
            },
            educationalCredentialAwarded: "Certificate of Completion",
          },
        ]}
      />

      <FreeAiFoundationHero />
      <FreeAiFoundationStatsBar />
      <FreeAiFoundationLearnSection />
      <FreeAiFoundationWhoSection />
      <FreeAiFoundationFaqSection />
      <FreeAiFoundationFinalCta />
    </PageTransition>
  );
}
