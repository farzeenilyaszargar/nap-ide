import type { Metadata } from "next";
import { } from "next/font/google";
import "./globals.css";



export const metadata: Metadata = {
  title: "Nap Editor | Best Way To Code With AI",
  description: "The Best Way To Code With AI",
  keywords: ["ide", "dev tool", "ai dev tools", "ai ide", "ai developement", "developement platform", "developement tool","nap","editor","nap editor"],
  alternates: { canonical: "www.surfers.bot" },
  icons: { icon: "/favicon.ico" },
  robots: {
    index: true,
    follow: true,
    nocache: false
  },
  openGraph: {
    title: "Nap Editor",
    description: "The Best Way To Code With AI",
    url: "www.surfers.bot",
    images: [
      {
        url: "",
        width: 0,
        height: 0,
        alt: "nap preview"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Nap Editor",
    description: "The Best Way To Code With AI.",
    images: ["/og-image.png"],
  },

};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={``}>
        {children}
      </body>
    </html>
  );
}
