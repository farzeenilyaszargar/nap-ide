import type { MetadataRoute } from "next";

const baseUrl = "https://nap-code.com";

const routes = [
  "",
  "/download",
  "/pricing",
  "/features",
  "/faqs",
  "/support",
  "/blogs",
  "/privacy",
  "/tc",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
