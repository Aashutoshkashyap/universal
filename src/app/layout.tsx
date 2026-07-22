import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Er. Aashutosh Jha | Electrical Engineer & Digital Marketer",
  description: "Portfolio of Er. Aashutosh Jha — Electrical Engineer, Digital Marketer, and Educator based in Nepal. NEC Reg. No. 3065.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", inter.variable)}>
      <body className="flex flex-col min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
