import type { Metadata } from "next";
import Script from "next/script";

import Features from "@/components/features";
import Footer from "@/components/footer";
import Header from "@/components/header";
import HeroPage from "@/components/heroPage";
import TryNap from "@/components/trySurfer";

export const metadata: Metadata = {
  title: "Nap | Run coding agents on your PC",
  description:
    "Nap is an agent orchestration layer for coding. Run multiple coding agents locally to edit, refactor, and review across files with control.",
  alternates: { canonical: "https://www.nap-code.com" },
  openGraph: {
    title: "Nap | Run coding agents on your PC",
    description:
      "Nap is an agent orchestration layer for coding. Run multiple coding agents locally to edit, refactor, and review across files with control.",
    url: "https://www.nap-code.com",
    type: "website",
  },
  twitter: {
    title: "Nap | Run coding agents on your PC",
    description:
      "Nap is an agent orchestration layer for coding. Run multiple coding agents locally to edit, refactor, and review across files with control.",
  },
};

export default function Home() {
  return (
    <div className="bg-transparent text-white">
      <Script
        id="breadcrumb-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.nap-code.com",
              },
            ],
          }),
        }}
      />
      <Header />
      <h1 className="sr-only">nap codes multiple files with agents on your pc.</h1>
      <HeroPage />
      <Features />

      <TryNap />
      <Footer />
    </div>
  );
}
