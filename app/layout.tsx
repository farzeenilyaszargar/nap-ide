import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nap Code | AI Code Editor for Fast, Reliable Development",
  description: "Nap Code is an AI-native code editor that helps developers ship faster with reliable agent workflows, multi-file edits, and clean diffs.",
  keywords: [
    "Nap Code",
    "AI code editor",
    "AI IDE",
    "developer tools",
    "agentic coding",
    "multi-file edits",
    "code review",
    "dev workflow",
    "software engineering",
    "code assistant"
  ],
  alternates: { canonical: "https://www.nap.bot" },
  icons: { icon: "/logo-white.ico" },
  robots: {
    index: true,
    follow: true,
    nocache: false
  },
  openGraph: {
    title: "Nap Code",
    description: "AI-native code editor for fast, reliable development.",
    url: "https://www.nap.bot",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nap Code preview"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Nap Code",
    description: "AI-native code editor for fast, reliable development.",
    images: ["/og-image.png"],
  },

};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
