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
      "@id": "https://nap-code.com/#organization",
      "name": "Nap Code",
      "url": "https://nap-code.com",
      "logo": "https://nap-code.com/logo.png",
      "sameAs": [
        "https://x.com/farzeenilya",
        "https://www.linkedin.com/in/farzeenilyaszargar/",
        "https://www.instagram.com/",
        "https://www.youtube.com/@surfersbot",
        "https://www.reddit.com/r/surfersbot/"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://nap-code.com/#website",
      "url": "https://nap-code.com",
      "name": "Nap Code",
      "publisher": {
        "@id": "https://nap-code.com/#organization"
      }
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://nap-code.com/#software",
      "name": "Nap Code",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "macOS, Windows, Linux",
      "url": "https://nap-code.com",
      "downloadUrl": "https://nap-code.com/download",
      "publisher": {
        "@id": "https://nap-code.com/#organization"
      },
      "description": "Agent orchestration platform for coding that runs multiple coding agents on your PC."
    },
    {
      "@type": "WebPage",
      "@id": "https://nap-code.com/#webpage",
      "url": "https://nap-code.com",
      "name": "Nap | Run coding agents on your PC",
      "isPartOf": {
        "@id": "https://nap-code.com/#website"
      },
      "about": {
        "@id": "https://nap-code.com/#software"
      }
    }
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL("https://nap-code.com"),
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
    "Nap desktop"
  ],
  alternates: { canonical: "https://nap-code.com" },
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
    url: "https://nap-code.com",
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
    description: "Agent orchestration platform for coding that runs multiple coding agents on your PC.",
    images: ["/og-image.png"],
  },

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
