"use client";
import Image from "next/image";
import Link from "next/link";

type DownloadButtonProps = {
  className?: string;
  iconClassName?: string;
};

export default function DownloadButton({ className = "", iconClassName = "" }: DownloadButtonProps) {
  return (
    <Link
      href="/download"
      className={`inline-flex items-center justify-center gap-3 rounded-full border border-[#0e5a42] bg-[var(--surface-strong)] px-7 py-3 text-sm font-semibold tracking-wide text-white transition hover:-translate-y-0.5 hover:bg-[#15261f] sm:text-base ${className}`}
    >
      <span>Download Now</span>
      <Image
        src="/apple-icon.png"
        width={16}
        height={16}
        alt="platform icon"
        className={`h-4 w-4 object-contain ${iconClassName}`}
      />
    </Link>
  );
}
