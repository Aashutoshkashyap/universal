import type { Metadata } from "next";
import "./globals.css";
import { getSiteContent } from "@/lib/site-content-store";

export async function generateMetadata(): Promise<Metadata> {
  const { seo, site } = await getSiteContent();

  return {
    metadataBase: new URL(site.officialUrl),
    title: seo.title,
    description: seo.description,
    applicationName: seo.applicationName,
    authors: seo.authors.map((name) => ({ name })),
    creator: seo.creator,
    publisher: seo.publisher,
    alternates: {
      canonical: seo.canonical,
    },
    openGraph: {
      type: seo.openGraph.type,
      locale: seo.openGraph.locale,
      url: seo.openGraph.url,
      siteName: seo.openGraph.siteName,
      title: seo.openGraph.title,
      description: seo.openGraph.description,
      images: [
        {
          url: seo.openGraph.imageUrl,
          width: seo.openGraph.imageWidth,
          height: seo.openGraph.imageHeight,
          alt: seo.openGraph.image.alt,
        },
      ],
    },
    twitter: {
      card: seo.twitter.card,
      title: seo.twitter.title,
      description: seo.twitter.description,
      images: [seo.twitter.imageUrl],
    },
    category: seo.category,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
