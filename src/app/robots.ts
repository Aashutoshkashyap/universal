import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://uesc.edu.np/sitemap.xml",
    host: "https://uesc.edu.np",
  };
}
