"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type DownloadButtonProps = {
  className?: string;
  showOnMobile?: boolean;
};

type OsKind = "mac" | "windows" | "linux" | "unknown";

const RELEASES_URLS: Record<OsKind, string> = {
  mac: "/api/download/mac",
  windows: "/api/download/windows",
  linux: "/api/download/linux",
  unknown: "https://pub-e25e5e6494664382ac6f6979fa447e85.r2.dev/releases",
};

export default function DownloadButton({
  className = "",
  showOnMobile = false,
}: DownloadButtonProps) {
  const [os, setOs] = useState<OsKind>("unknown");

  useEffect(() => {
    const platform =
      (navigator as unknown as { userAgentData?: { platform?: string } })
        .userAgentData?.platform ||
      navigator.platform ||
      navigator.userAgent;
    const value = platform.toLowerCase();

    if (value.includes("mac")) {
      setOs("mac");
    } else if (value.includes("win")) {
      setOs("windows");
    } else if (value.includes("linux")) {
      setOs("linux");
    } else {
      setOs("unknown");
    }
  }, []);

  const config = useMemo(() => {
    switch (os) {
      case "windows":
        return {
          label: "Windows",
          icon: "/windows-icon.png",
          href: RELEASES_URLS.windows,
        };
      case "linux":
        return {
          label: "Linux",
          icon: "/linux-icon.png",
          href: RELEASES_URLS.linux,
        };
      case "mac":
      default:
        return {
          label: "macOS",
          icon: "/apple-icon.png",
          href: RELEASES_URLS.mac,
        };
    }
  }, [os]);

  return (
    <Link
      href={config.href}
      className={`${showOnMobile ? "inline-flex" : "hidden sm:inline-flex"} items-center justify-center gap-2 rounded-full border border-white/15 bg-white px-6 py-2.5 text-base font-semibold text-black shadow-[0_8px_20px_rgba(0,0,0,0.35)] transition hover:bg-white/90 active:bg-white/80 sm:px-7 sm:text-lg ${className}`.trim()}
    >
      Download for {config.label}
      <Image
        src={config.icon}
        width={18}
        height={18}
        alt={config.label}
        className="h-4 w-4"
      />
    </Link>
  );
}
