import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import { defaultMetadata } from "@/lib/seo/metadata";
import { organizationSchema, websiteSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/common/json-ld";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { WhatsAppButton } from "@/components/common/whatsapp-button";
import { FloatingCallButton } from "@/components/common/floating-call-button";
import { ScholarshipModalProvider } from "@/components/common/scholarship-modal-provider";
import { SmoothScrollProvider } from "@/components/common/smooth-scroll";
import { getSiteFooter } from "@/services/footer.service";
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

export const metadata: Metadata = defaultMetadata;

/** Footer chrome ISR — matches other public API sections. */
export const revalidate = 60;

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const footer = await getSiteFooter();

  return (
    <html lang="en" className={`${jakarta.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-white font-sans text-foreground antialiased">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <SmoothScrollProvider>
          <Navbar />
          <main>{children}</main>
          <Footer data={footer} />
          <FloatingCallButton />
          <WhatsAppButton />
          <ScholarshipModalProvider />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
