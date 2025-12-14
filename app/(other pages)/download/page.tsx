import Header from "@/components/header";
import { Apple, Monitor, Smartphone } from "lucide-react";

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Download Nap Editor</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Experience the future of code editing on your preferred platform. Fast, lightweight, and powerful.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 w-full max-w-4xl">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <Apple className="w-16 h-16 text-gray-900 mb-6" />
            <h3 className="text-2xl font-bold mb-2">macOS</h3>
            <p className="text-gray-500 mb-8">macOS 11.0 or later</p>
            <div className="space-y-3 w-full">
              <button className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                Download for Intel
              </button>
              <button className="w-full bg-gray-100 text-gray-900 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                Download for Apple Silicon
              </button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <Monitor className="w-16 h-16 text-gray-900 mb-6" />
            <h3 className="text-2xl font-bold mb-2">Windows</h3>
            <p className="text-gray-500 mb-8">Windows 10/11 (64-bit)</p>
            <button className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors mt-auto">
              Download for Windows
            </button>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <Smartphone className="w-16 h-16 text-gray-900 mb-6" />
            <h3 className="text-2xl font-bold mb-2">Linux</h3>
            <p className="text-gray-500 mb-8">Debian, Ubuntu, Fedora</p>
            <div className="space-y-3 w-full mt-auto">
              <button className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                Download .deb
              </button>
              <button className="w-full bg-gray-100 text-gray-900 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                Download .rpm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
