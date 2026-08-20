import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/data/page-seo";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/common/json-ld";
import { PageHero } from "@/components/common/page-header";
import { PageTransition } from "@/animations/page-transition";
import {
  ContactPageContent,
  type ContactDisplayInfo,
} from "@/components/pages/contact-page-content";
import { getSiteFooter } from "@/services/footer.service";
import { phoneTelHref, siteContact } from "@/data/site";

export const revalidate = 60;

export const metadata: Metadata = createPageMetadata({
  title: PAGE_SEO.contact.title,
  description: PAGE_SEO.contact.description,
  path: "/contact",
  keywords: ["contact", "inquiry", "ELEVEIIM", "support"],
  absoluteTitle: true,
});

function toTelHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : phoneTelHref;
}

export default async function ContactPage() {
  const footer = await getSiteFooter();

  const contact: ContactDisplayInfo = {
    address: footer?.address?.trim() || siteContact.address,
    phone: footer?.phone?.trim() || siteContact.phone,
    email: footer?.email?.trim() || siteContact.email,
    mapsUrl: siteContact.mapsUrl,
    phoneTelHref: toTelHref(footer?.phone?.trim() || siteContact.phone),
  };

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
      <ContactPageContent contact={contact} />
    </PageTransition>
  );
}
