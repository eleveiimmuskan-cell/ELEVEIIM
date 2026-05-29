import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ELEVEIIM - Elevate to Educate",
    short_name: "ELEVEIIM",
    description:
      "Premium training institute offering industry-ready courses and placement support.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1877F2",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
