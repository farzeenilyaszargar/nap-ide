"use client";
import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

type DownloadButtonProps = {
  className?: string;
};

export default function DownloadButton({ className = "" }: DownloadButtonProps) {
  const osLabel = useMemo(() => {
    if (typeof navigator === "undefined") return "Desktop";
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes("mac os") || ua.includes("macintosh")) return "macOS";
    if (ua.includes("windows")) return "Windows";
    if (ua.includes("linux")) return "Linux";
    return "Desktop";
  }, []);

  return (
    <Link
      href="/waitlist"
      className={`inline-flex items-center justify-center gap-3 rounded-full border border-[#0e5a42] bg-[var(--surface-strong)] px-7 py-3 text-sm font-semibold tracking-wide text-white transition hover:-translate-y-0.5 hover:bg-[#15261f] sm:text-base ${className}`}
    >
      <span>Join Waitlist</span>
      <span className="rounded-full border border-white/25 bg-white/10 px-2 py-0.5 text-[11px] uppercase tracking-wider text-white/90">
        {osLabel}
      </span>
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
