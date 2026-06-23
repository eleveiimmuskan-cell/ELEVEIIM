"use client";

import { FloatingWhatsApp } from "react-floating-whatsapp";
import { BRAND } from "@/lib/constants";

export function WhatsAppButton() {
  return (
    <FloatingWhatsApp
      phoneNumber={BRAND.whatsapp.replace("+", "")}
      accountName="ELEVEIIM"
      avatar="/images/favicon.png"
      statusMessage="Typically replies within an hour"
      chatMessage="Hi! 👋 How can we help you with courses or scholarships?"
      placeholder="Type a message..."
      // allowClickAway
      // allowEsc
      notification
      notificationSound
      buttonStyle={{
        backgroundColor: "#25D366",
        width: 56,
        height: 56,
      }}
    />
  );
}
