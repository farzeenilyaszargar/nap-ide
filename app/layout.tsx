import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nap-code.com"),
  title: "Nap | Run coding agents on your PC",
  description: "Nap is an AI-powered code editor that runs coding agents on your PC. Manage workflows, switch context fast, and ship faster with confidence.",
  keywords: [
    "Nap",
    "Nap Code",
    "coding agents",
    "AI coding agents",
    "AI code editor",
    "AI IDE",
    "code assistant",
    "agentic coding",
    "multi-file edits",
    "code review",
    "developer tools",
    "software engineering",
    "dev workflow",
    "code",
    "coding",
    "download",
    "Nap download",
    "Nap desktop"
  ],
  alternates: { canonical: "https://www.nap-code.com" },
  icons: { icon: "/favicon.ico" },
  applicationName: "Nap Code",
  robots: {
    index: true,
    follow: true,
    nocache: false
  },
  openGraph: {
    title: "Nap Code",
    description: "AI-powered code editor that runs coding agents on your PC.",
    url: "https://www.nap-code.com",
    siteName: "Nap Code",
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
    description: "AI-powered code editor that runs coding agents on your PC.",
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
