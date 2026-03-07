import Footer from "@/components/footer";
import Header from "@/components/header";
import Image from "next/image";

export default function DownloadPage() {
  const macReleasesUrl = "https://github.com/aaravbangsmetal/xMetallic/releases/latest";

  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-black mb-6">Download Nap Editor</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            macOS download is available right now for testing. Windows and Linux builds will be added next.
          </p>
        </div>

        <div className="w-full max-w-2xl">
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 flex flex-col items-center text-center hover:border-gray-400 transition-all">
            <Image src="/apple-icon.png" alt="macOS" width={64} height={64} className="mb-6 invert rounded-xl" />
            <h3 className="text-2xl font-bold mb-2 text-black">macOS</h3>
            <p className="text-gray-500 mb-8">macOS 11.0 or later</p>
            <a
              href={macReleasesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors inline-flex items-center justify-center"
            >
              Download for macOS
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
