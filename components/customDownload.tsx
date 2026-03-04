"use client";
import Image from "next/image";
import Link from "next/link";

type DownloadButtonProps = {
  className?: string;
  iconClassName?: string;
  variant?: "dark" | "light";
};

export default function DownloadButton({ className = "", iconClassName = "", variant = "dark" }: DownloadButtonProps) {
  const isLight = variant === "light";

  return (
    <Link
      href="/download"
      className={`inline-flex items-center justify-center gap-3 rounded-full px-7 py-3 text-sm font-semibold tracking-wide transition hover:-translate-y-0.5 sm:text-base ${
        isLight
          ? "border-white/25 bg-white text-black hover:bg-white/90"
          : "border-[#0e5a42] bg-[var(--surface-strong)] text-white hover:bg-[#15261f]"
      } ${className}`}
    >
      <span>Download Now</span>
      <Image
        src="/apple-icon.png"
        width={16}
        height={16}
        alt="platform icon"
        className={`h-4 w-4 object-contain ${isLight ? "invert" : ""} ${iconClassName}`}
      />
    </Link>
  );
}
