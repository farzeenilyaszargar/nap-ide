import Footer from "@/components/footer";
import Header from "@/components/header";
import Image from "next/image";

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-5 py-14 sm:px-10 sm:py-18 lg:px-14">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-zinc-900 sm:text-5xl lg:text-6xl">Download Nap Editor</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-500 sm:text-lg">
            Choose your platform and install Nap in minutes. Fast startup, smooth typing, and AI-assisted development out of the box.
          </p>
        </div>

        <div className="grid w-full max-w-5xl gap-6 md:grid-cols-3">
          <div className="flex flex-col items-center rounded-2xl border border-zinc-200 bg-zinc-50 p-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-zinc-300 hover:shadow-md">
            <Image src="/apple-icon.png" alt="macOS" width={64} height={64} className="mb-6 rounded-xl invert" />
            <h3 className="mb-2 text-2xl font-bold text-zinc-900">macOS</h3>
            <p className="mb-8 text-zinc-500">macOS 11.0 or later</p>
            <div className="space-y-3 w-full">
              <button className="w-full rounded-lg bg-zinc-900 py-3 font-medium text-white transition-colors hover:bg-zinc-800">
                Download for Intel
              </button>
              <button className="w-full rounded-lg bg-zinc-200 py-3 font-medium text-zinc-900 transition-colors hover:bg-zinc-300">
                Download for Apple Silicon
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center rounded-2xl border border-zinc-200 bg-zinc-50 p-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-zinc-300 hover:shadow-md">
            <Image src="/windows-icon.png" alt="Windows" width={64} height={64} className="mb-6 rounded-xl invert" />
            <h3 className="mb-2 text-2xl font-bold text-zinc-900">Windows</h3>
            <p className="mb-8 text-zinc-500">Windows 10/11 (64-bit)</p>
            <div className="mt-auto flex w-full justify-center">
              <button className="w-full max-w-[260px] rounded-lg bg-zinc-900 py-3 font-medium text-white transition-colors hover:bg-zinc-800">
                Download for Windows
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center rounded-2xl border border-zinc-200 bg-zinc-50 p-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-zinc-300 hover:shadow-md">
            <Image src="/linux-icon.png" alt="Linux" width={64} height={64} className="mb-6 rounded-xl invert" />
            <h3 className="mb-2 text-2xl font-bold text-zinc-900">Linux</h3>
            <p className="mb-8 text-zinc-500">Debian, Ubuntu, Fedora</p>
            <div className="space-y-3 w-full mt-auto">
              <button className="w-full rounded-lg bg-zinc-900 py-3 font-medium text-white transition-colors hover:bg-zinc-800">
                Download .deb
              </button>
              <button className="w-full rounded-lg bg-zinc-200 py-3 font-medium text-zinc-900 transition-colors hover:bg-zinc-300">
                Download .rpm
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
