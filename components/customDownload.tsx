"use client";
import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

type DownloadButtonProps = {
  className?: string;
};

export default function DownloadButton({ className = "" }: DownloadButtonProps) {
  const osIcon = useMemo(() => {
    if (typeof navigator === "undefined") return "/download.png";
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes("mac os") || ua.includes("macintosh")) return "/apple-icon.png";
    if (ua.includes("windows")) return "/windows-icon.png";
    if (ua.includes("linux")) return "/linux-icon.png";
    return "/download.png";
  }, []);

  return (
    <Link
      href="/download"
      className={`inline-flex items-center justify-center gap-3 rounded-full border border-[#0e5a42] bg-[var(--surface-strong)] px-7 py-3 text-sm font-semibold tracking-wide text-white transition hover:-translate-y-0.5 hover:bg-[#15261f] sm:text-base ${className}`}
    >
      <span>Download Now</span>
      <Image
        src={osIcon}
        width={16}
        height={16}
        alt="platform icon"
        className="h-4 w-4 object-contain"
      />
      <Image
        src="/right-arrow.png"
        width={16}
        height={16}
        alt="arrow"
        className="h-3.5 w-3.5 rotate-[320deg] invert"
      />
    </Link>
  );
}
