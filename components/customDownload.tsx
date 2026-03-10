"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type DownloadButtonProps = {
  className?: string;
  showOnMobile?: boolean;
};

type OsKind = "mac" | "windows" | "linux" | "unknown";

const RELEASES_URL =
  "https://pub-e25e5e6494664382ac6f6979fa447e85.r2.dev/releases";

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
        return { label: "Windows", icon: "/windows-icon.png" };
      case "linux":
        return { label: "Linux", icon: "/linux-icon.png" };
      case "mac":
      default:
        return { label: "macOS", icon: "/apple-icon.png" };
    }
  }, [os]);

  return (
    <Link
      href={RELEASES_URL}
      className={`${showOnMobile ? "inline-flex" : "hidden sm:inline-flex"} items-center justify-center gap-2 rounded-full border border-gray-300 bg-black px-7 py-2 text-xl text-white transition hover:bg-gray-800 ${className}`.trim()}
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
