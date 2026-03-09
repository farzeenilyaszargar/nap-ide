import Footer from "@/components/footer";
import Header from "@/components/header";
import Image from "next/image";

export default function DownloadPage() {
  const macDownloadUrl = "/api/download/mac";

  return (
    <div className="min-h-screen bg-[#07090D] text-[#E5E7EB]">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#F3F4F6] mb-6">Download Nap Editor</h1>
          <p className="text-xl text-[#B8C0CC] max-w-2xl mx-auto">
            macOS download is available right now for testing. Windows and Linux builds will be added next.
          </p>
        </div>

        <div className="w-full max-w-2xl">
          <div className="bg-[#0C1016] p-8 rounded-2xl border border-white/10 flex flex-col items-center text-center hover:border-white/30 transition-all">
            <Image src="/apple-icon.png" alt="macOS" width={64} height={64} className="mb-6 invert rounded-xl" />
            <h3 className="text-2xl font-bold mb-2 text-[#F3F4F6]">macOS</h3>
            <p className="text-[#B8C0CC] mb-8">macOS 11.0 or later</p>
            <a
              href={macDownloadUrl}
              className="w-full bg-[#F3F4F6] text-[#0B0F16] py-3 rounded-lg font-medium hover:opacity-90 transition-colors inline-flex items-center justify-center"
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
