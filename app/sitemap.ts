import type { MetadataRoute } from "next";
import { events } from "@/lib/events";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/souvenirs`, lastModified: now, changeFrequency: "monthly", priority: 0.8 }
  ];
  const eventRoutes: MetadataRoute.Sitemap = events.map((e) => ({
    url: `${site.url}/evenements/${e.slug}`,
    lastModified: new Date(e.date),
    changeFrequency: "yearly",
    priority: 0.7
  }));
  return [...base, ...eventRoutes];
}
