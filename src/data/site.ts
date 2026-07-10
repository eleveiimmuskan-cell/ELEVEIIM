import type { SiteContact } from "@/types";

/** Single source of truth for all call and WhatsApp contact numbers. */
export const CONTACT_PHONE = {
  display: "+91 9056363535",
  tel: "+919056363535",
  whatsapp: "+919056363535",
} as const;

export const phoneTelHref = `tel:${CONTACT_PHONE.tel}` as const;

export const siteContact: SiteContact = {

  address: "ELEVEIIM Educations Private Limited.\nPlot No - 1230, First Floor, JLPL Industrial Area Sector 82 Mohali, Punjab 140306",
  phone: CONTACT_PHONE.display,
  email: "careers@eleveiim.com",
  mapsUrl: "https://share.google/Mz231Vb0oXGaqKUmQ",
};

export const CONTACT_HERO_IMAGE = "/images/contact_us.png";

export const CONTACT_HERO_IMAGE_ALT =
  "ELEVEIIM support representative ready to help with course, scholarship, and placement inquiries";
