import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getCourseSlugs } from "@/services/courses.service";
import { getBlogSlugs } from "@/services/blogs.service";
import { getPlacementSlugs } from "@/services/placements.service";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/courses",
    "/placements",
    "/scholarship",
    "/blogs",
    "/contact",
    "/industrial-training",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const courseRoutes = getCourseSlugs().map((slug) => ({
    url: `${SITE_URL}/courses/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const blogRoutes = getBlogSlugs().map((slug) => ({
    url: `${SITE_URL}/blogs/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const placementRoutes = getPlacementSlugs().map((slug) => ({
    url: `${SITE_URL}/placements/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...courseRoutes, ...blogRoutes, ...placementRoutes];
}
