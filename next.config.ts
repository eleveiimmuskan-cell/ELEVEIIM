import type { NextConfig } from "next";

function getApiOrigin(): string {
  return (
    process.env.API_URL?.trim() ||
    process.env.NEXT_PUBLIC_API_URL?.trim() ||
    "https://api.eleveiim.com/api/v1"
  ).replace(/\/api\/v\d+\/?$/, "");
}

function buildUploadRemotePatterns() {
  const patterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [
    {
      protocol: "http",
      hostname: "localhost",
      port: "3001",
      pathname: "/uploads/**",
    },
    {
      protocol: "http",
      hostname: "127.0.0.1",
      port: "3001",
      pathname: "/uploads/**",
    },
    {
      protocol: "https",
      hostname: "*.r2.dev",
    },
  ];

  try {
    const origin = new URL(getApiOrigin());
    if (origin.hostname !== "localhost" && origin.hostname !== "127.0.0.1") {
      patterns.push({
        protocol: origin.protocol.replace(":", "") as "http" | "https",
        hostname: origin.hostname,
        ...(origin.port ? { port: origin.port } : {}),
        pathname: "/uploads/**",
      });
    }
  } catch {
    // localhost patterns are enough
  }

  const cdn = process.env.NEXT_PUBLIC_MEDIA_CDN_URL?.trim();
  if (cdn) {
    try {
      const origin = new URL(cdn);
      patterns.push({
        protocol: origin.protocol.replace(":", "") as "http" | "https",
        hostname: origin.hostname,
      });
    } catch {
      // ignore invalid CDN URL
    }
  }

  return patterns;
}

const nextConfig: NextConfig = {
  // Keep Turbopack scoped to this app. A parent lockfile otherwise makes Next
  // treat the whole monorepo as root (watching backend + other apps).
  turbopack: {
    root: __dirname,
  },
  images: {
    // Serve `/images/*` from `public/` (and the postbuild copy in `.next/static`)
    // instead of `/_next/image`. Hostinger does not run the optimizer reliably.
    unoptimized: true,
    remotePatterns: buildUploadRemotePatterns(),
  },
  async rewrites() {
    const apiOrigin = getApiOrigin();
    return [
      {
        source: "/images/:path*",
        destination: "/_next/static/images/:path*",
      },
      {
        source: "/og-image.jpg",
        destination: "/_next/static/og-image.jpg",
      },
      {
        source: "/uploads/:path*",
        destination: `${apiOrigin}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;
