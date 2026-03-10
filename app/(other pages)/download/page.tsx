"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import DownloadButton from "@/components/customDownload";
import Image from "next/image";
import Link from "next/link";

export default function DownloadPage() {
  const releasesUrl = "https://github.com/aaravbangsmetal/xMetallic/releases/latest";

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-black mb-6">Download Nap Editor</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            We detect your OS and send you to the latest GitHub release.
          </p>
        </div>
        <DownloadButton showOnMobile />

        <div className="mt-10 w-full max-w-3xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center">
              <Image src="/apple-icon.png" alt="macOS" width={28} height={28} className="mx-auto mb-3" />
              <p className="text-sm font-semibold text-black">macOS</p>
              <Link
                href={releasesUrl}
                className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
              >
                Download
              </Link>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center">
              <Image src="/windows-icon.png" alt="Windows" width={28} height={28} className="mx-auto mb-3" />
              <p className="text-sm font-semibold text-black">Windows</p>
              <button
                type="button"
                className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-500 cursor-not-allowed"
                disabled
              >
                Coming soon
              </button>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center">
              <Image src="/linux-icon.png" alt="Linux" width={28} height={28} className="mx-auto mb-3" />
              <p className="text-sm font-semibold text-black">Linux</p>
              <button
                type="button"
                className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-500 cursor-not-allowed"
                disabled
              >
                Coming soon
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
