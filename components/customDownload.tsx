"use client";
import Image from "next/image";
import Link from "next/link";

export default function DownloadButton() {
  const MAC_RELEASES_URL = "https://github.com/aaravbangsmetal/xMetallic/releases/latest";

  return (
    <Link
      href={MAC_RELEASES_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="border border-gray-300 sm:flex justify-center items-center gap-1 bg-black text-white px-7 py-2 rounded-full text-xl hidden hover:bg-gray-800 transition"
    >
      Download for macOS
      <Image
        src="/right-arrow.png"
        width={16}
        height={16}
        alt="download"
        className="invert mt-0.5 ml-1 rotate-320"
      />
    </Link>
  );
}
