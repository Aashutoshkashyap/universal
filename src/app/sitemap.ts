import type { MetadataRoute } from "next";
import { getSiteContent } from "@/lib/site-content-store";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { sitemap } = (await getSiteContent()).seo;

  return [
    {
      url: sitemap.url,
      changeFrequency: sitemap.changeFrequency,
      priority: sitemap.priority,
      images: sitemap.imageUrls,
    },
  ];
}
