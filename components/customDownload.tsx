"use client";
import Image from "next/image";
import Link from "next/link";

export default function DownloadButton() {
  const MAC_DOWNLOAD_URL = "/api/download/mac";

  return (
    <Link
      href={MAC_DOWNLOAD_URL}
      className="hidden items-center justify-center gap-2 rounded-full border border-gray-300 bg-black px-7 py-2 text-xl text-white transition hover:bg-gray-800 sm:inline-flex"
    >
      Download for macOS
      <Image
        src="/apple-icon.png"
        width={16}
        height={16}
        alt="apple"
        className="h-4 w-4 invert"
      />
    </Link>
  );
}
