"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import DownloadButton from "@/components/customDownload";
import Image from "next/image";
import Link from "next/link";

export default function DownloadPage() {
  const macUrl = "/api/download/mac";
  const windowsUrl = "/api/download/windows";
  const linuxUrl = "/api/download/linux";

  return (
    <div className="min-h-screen bg-[#F6F7F8] text-black">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
          <div className="text-center">
            <p className="text-gray-400 text-lg font-mono mb-2">/nap/</p>
            <h2 className="text-6xl font-bold text-black">download</h2>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-[0_18px_45px_rgba(0,0,0,0.08)]">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center">
              <Image src="/apple-icon.png" alt="macOS" width={48} height={48} className="brightness-0" />
            </div>
            <p className="text-xl font-semibold text-black">macOS</p>
            <Link
              href={macUrl}
              className="mt-5 inline-flex w-full items-center justify-center rounded-xl border border-black bg-black px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
            >
              Download
            </Link>
          </div>
          <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-[0_18px_45px_rgba(0,0,0,0.08)]">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center">
              <Image src="/windows-icon.png" alt="Windows" width={48} height={48} className="brightness-0" />
            </div>
            <p className="text-xl font-semibold text-black">Windows</p>
            <Link
              href={windowsUrl}
              className="mt-5 inline-flex w-full items-center justify-center rounded-xl border border-black bg-black px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
            >
              Download
            </Link>
          </div>
          <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-[0_18px_45px_rgba(0,0,0,0.08)]">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center">
              <Image src="/linux-icon.png" alt="Linux" width={48} height={48} className="brightness-0" />
            </div>
            <p className="text-xl font-semibold text-black">Linux</p>
            <Link
              href={linuxUrl}
              className="mt-5 inline-flex w-full items-center justify-center rounded-xl border border-black bg-black px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
            >
              Download
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
