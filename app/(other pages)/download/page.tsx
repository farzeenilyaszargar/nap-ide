"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import DownloadButton from "@/components/customDownload";

export default function DownloadPage() {
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
      </div>
      <Footer />
    </div>
  );
}
