import type { MetadataRoute } from "next";
import { getSiteContent } from "@/lib/site-content-store";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const { robots } = (await getSiteContent()).seo;

  return {
    rules: {
      userAgent: robots.userAgent,
      allow: robots.allow,
    },
    sitemap: robots.sitemap,
    host: robots.host,
  };
}
