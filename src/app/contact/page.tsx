import type { Metadata } from "next";

import { createPageMetadata } from "@/lib/seo/metadata";

import { breadcrumbSchema } from "@/lib/seo/schema";

import { JsonLd } from "@/components/common/json-ld";

import { PageHero } from "@/components/common/page-header";

import { PageTransition } from "@/animations/page-transition";
import { ContactPageContent } from "@/components/pages/contact-page-content";



export const metadata: Metadata = createPageMetadata({

  title: "Contact Us",

  description:

    "Get in touch with ELEVEIIM for course inquiries, scholarship applications, and placement support.",

  path: "/contact",

  keywords: ["contact", "inquiry", "ELEVEIIM", "support"],

});



export default function ContactPage() {

  return (

    <PageTransition>

      <JsonLd

        data={breadcrumbSchema([

          { label: "Home", href: "/" },

          { label: "Contact" },

        ])}

      />

      <PageHero

        eyebrow="Get in Touch"

        title="Contact ELEVEIIM"

        description="Have questions about courses, scholarships, or placements? We're here to help."

      />

      <ContactPageContent />

    </PageTransition>

  );

}

