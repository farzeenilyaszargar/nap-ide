"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";


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
    // <Link
    //   href={os === "mac" ? "/downloads/app.dmg" : os === "windows" ? "/downloads/app.exe" : "/downloads/app.deb"}
    //   className="border border-gray-300 sm:flex justify-center items-center gap-1 bg-black text-white px-5 py-2 rounded-full text-xl hidden hover:bg-gray-800 transition">
    //   Download for {os === "mac" ? "macOS" : os.charAt(0).toUpperCase() + os.slice(1)}
    //   <Image src={"/download.png"} width={20} height={20} alt='download' />
    // </Link>
    <Link href="/waitlist"
      className="border border-gray-300 sm:flex justify-center items-center gap-1 bg-black text-white px-7 py-2 rounded-full text-xl hidden hover:bg-gray-800 transition">

      Join Waitlist
      <Image src={"/right-arrow.png"} width={16} height={16} alt='download' className="invert mt-0.5 ml-1 rotate-320" />
    </Link>
  );
}
