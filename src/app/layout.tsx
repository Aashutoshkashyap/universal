import type { Metadata } from "next";
import "./globals.css";
import { Manrope, Source_Serif_4 } from "next/font/google";

const socialImageUrl =
  "https://portfolio-tawny-five-47.vercel.app/opengraph-image.png";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-source-serif",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://uesc.edu.np"),
  title: {
    default: "Universal Engineering & Science College | UESC",
    template: "%s | UESC",
  },
  description:
    "Universal Engineering & Science College in Chakupat, Lalitpur offers engineering, architecture, and construction-management education affiliated with Pokhara University.",
  applicationName: "Universal Engineering & Science College",
  authors: [{ name: "Universal Engineering & Science College" }],
  creator: "Universal Engineering & Science College",
  publisher: "Universal Engineering & Science College",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_NP",
    url: "/",
    siteName: "Universal Engineering & Science College",
    title: "Universal Engineering & Science College | UESC",
    description:
      "Engineering, architecture, research, and practical learning in Chakupat, Lalitpur.",
    images: [
      {
        url: socialImageUrl,
        width: 1200,
        height: 630,
        alt: "Universal Engineering & Science College in Chakupat, Lalitpur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Universal Engineering & Science College | UESC",
    description:
      "Engineering, architecture, research, and practical learning in Chakupat, Lalitpur.",
    images: [socialImageUrl],
  },
  category: "education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${sourceSerif.variable}`}
    >
      <body className="flex flex-col min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
