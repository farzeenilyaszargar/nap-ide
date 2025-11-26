"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function DownloadButton() {
  const [os, setOS] = useState("");

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();

    if (ua.includes("mac os") || ua.includes("macintosh")) setOS("mac");
    else if (ua.includes("windows")) setOS("windows");
    else if (ua.includes("linux")) setOS("linux");
  }, []);

  if (!os) return null;

  return (
    <a
      href={
        os === "mac"
          ? "/downloads/app.dmg"
          : os === "windows"
          ? "/downloads/app.exe"
          : "/downloads/app.deb"
      }
      className="border sm:flex justify-center items-center gap-1 bg-black text-white px-3 py-1 rounded-md text-xl hidden hover:invert">
      Download for {os === "mac" ? "macOS" : os.charAt(0).toUpperCase() + os.slice(1)}
      <Image src={"/download.png"} width={20} height={20} alt='download'/>
    </a>
  );
}
