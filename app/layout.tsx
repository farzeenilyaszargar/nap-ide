import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const schemaOrg = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.nap-code.com/#organization",
      "name": "Nap Code",
      "alternateName": "Nap",
      "url": "https://www.nap-code.com",
      "logo": "https://www.nap-code.com/logo.png",
      "sameAs": [
        "https://x.com/napverse",
        "https://www.youtube.com/@napHQ",
        "https://www.reddit.com/r/surfersbot/"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.nap-code.com/#website",
      "url": "https://www.nap-code.com",
      "name": "Nap Code",
      "alternateName": "Nap",
      "publisher": {
        "@id": "https://www.nap-code.com/#organization"
      }
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.nap-code.com/#software",
      "name": "Nap Code",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "macOS, Windows, Linux",
      "url": "https://www.nap-code.com",
      "downloadUrl": "https://www.nap-code.com/download",
      "publisher": {
        "@id": "https://www.nap-code.com/#organization"
      },
      "description": "Agent orchestration platform for coding that runs multiple coding agents on your PC."
    },
    {
      "@type": "WebPage",
      "@id": "https://www.nap-code.com/#webpage",
      "url": "https://www.nap-code.com",
      "name": "Nap | Run coding agents on your PC",
      "isPartOf": {
        "@id": "https://www.nap-code.com/#website"
      },
      "about": {
        "@id": "https://www.nap-code.com/#software"
      }
    }
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nap-code.com"),
  title: "Nap | Run coding agents on your PC",
  description: "Nap is an agent orchestration platform for coding that runs multiple coding agents on your PC.",
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
    "Nap desktop",
    "download nap",
    "parallel coding agents",
    "ADE"
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
    description: "Agent orchestration platform for coding that runs multiple coding agents on your PC.",
    url: "https://www.nap-code.com",
    siteName: "Nap Code",
    images: [
      {
        url: "/og-imagee.png",
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
    description: "agent orchestration platform for coding that runs multiple coding agents on your PC.",
    creator: "@farzeenilya", 
    images: ["/og-imagee.png"],
  }

};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
        {children}
      </body>
    </html>
  );
}
