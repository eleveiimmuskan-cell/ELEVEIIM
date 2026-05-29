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
        src: "/images/favicon.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
  };
}
