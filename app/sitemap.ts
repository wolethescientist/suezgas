import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/** Priority reflects commercial intent, not how much work a page took. */
const ROUTES: [path: string, priority: number, frequency: "weekly" | "monthly"][] = [
  ["", 1, "weekly"],
  ["/order", 0.9, "weekly"],
  ["/pricing", 0.9, "weekly"],
  ["/services", 0.8, "monthly"],
  ["/safety", 0.7, "monthly"],
  ["/about", 0.6, "monthly"],
  ["/contact", 0.6, "monthly"],
  ["/privacy", 0.2, "monthly"],
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map(([path, priority, changeFrequency]) => ({
    url: `${SITE.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
