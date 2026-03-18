import type { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";
import Link from "next/link";

import Footer from "@/components/footer";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "Nap | Download",
  description:
    "Download Nap for macOS, Windows, or Linux. Run coding agents locally and orchestrate multi-file changes with confidence.",
  alternates: { canonical: "https://nap-code.com/download" },
  openGraph: {
    title: "Nap | Download",
    description:
      "Download Nap for macOS, Windows, or Linux. Run coding agents locally and orchestrate multi-file changes with confidence.",
    url: "https://nap-code.com/download",
    type: "website",
  },
  twitter: {
    title: "Nap | Download",
    description:
      "Download Nap for macOS, Windows, or Linux. Run coding agents locally and orchestrate multi-file changes with confidence.",
  },
};

export default function DownloadPage() {
  const macUrl = "/api/download/mac";
  const windowsUrl = "/api/download/windows";
  const linuxUrl = "/api/download/linux";

  return (
    <div className="min-h-screen text-black">
      <Script
        id="breadcrumb-download"
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
                item: "https://nap-code.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Download",
                item: "https://nap-code.com/download",
              },
            ],
          }),
        }}
      />
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-16 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-10">
          <div className="text-center">
            <p className="text-gray-400 text-lg font-mono mb-2">/nap/</p>
            <h2 className="text-4xl sm:text-6xl font-bold text-[#383838]">download</h2>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-[0_18px_45px_rgba(0,0,0,0.08)]">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center">
              <Image src="/apple-icon.png" alt="macOS" width={65} height={65} className="brightness-0" />
            </div>
            <p className="text-3xl font-semibold text-black">macOS</p>
            <p className="mt-2 text-sm text-gray-500">Apple Silicon & Intel</p>
            <Link
              href={macUrl}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-black bg-black px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
            >
              Download
              <Image src="/download.png" alt="Download" width={16} height={16} className="h-4 w-4" />
            </Link>
          </div>
          <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-[0_18px_45px_rgba(0,0,0,0.08)]">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center">
              <Image src="/windows-icon.png" alt="Windows" width={65} height={65} className="brightness-0" />
            </div>
            <p className="text-3xl font-semibold text-black">Windows</p>
            <p className="mt-2 text-sm text-gray-500">Windows 10+ (64-bit)</p>
            <Link
              href={windowsUrl}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-black bg-black px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
            >
              Download
              <Image src="/download.png" alt="Download" width={16} height={16} className="h-4 w-4" />
            </Link>
          </div>
          <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-[0_18px_45px_rgba(0,0,0,0.08)]">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center">
              <Image src="/linux-icon.png" alt="Linux" width={65} height={65} className="brightness-0" />
            </div>
            <p className="text-3xl font-semibold text-black">Linux</p>
            <p className="mt-2 text-sm text-gray-500">Ubuntu, Debian, Fedora</p>
            <Link
              href={linuxUrl}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-black bg-black px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
            >
              Download
              <Image src="/download.png" alt="Download" width={16} height={16} className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
