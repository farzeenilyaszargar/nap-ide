import type { MetadataRoute } from "next";

const baseUrl = "https://nap-code.com";

const routes = [
  "",
  "/download",
  "/features",
  "/faqs",
  "/pricing",
  "/support",
  "/blogs",
  "/privacy",
  "/tc",
  "/sitemap",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.6,
  }));
}
