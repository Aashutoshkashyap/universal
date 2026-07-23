import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://uesc.edu.np/",
      changeFrequency: "weekly",
      priority: 1,
      images: [
        "https://uesc.edu.np/opengraph-image.png",
      ],
    },
  ];
}
