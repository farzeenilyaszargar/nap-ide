"use client";

import Image from "next/image";
import Link from "next/link";
import DownloadButton from "./customDownload";

export default function HeroPage() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col px-5 pb-8 pt-10 sm:px-10 lg:px-14">
      <div className="fade-up-delay mx-auto mt-4 max-w-4xl text-center">
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-zinc-700 sm:text-5xl lg:text-6xl">
          Code.
        </h1>
        <h1 className="mt-1 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          <span className="text-zinc-500">Lightning.</span>{" "}
          <span className="text-zinc-400">Fast.</span>
        </h1>
      </div>

      <div className="fade-up-delay mt-10 flex flex-wrap items-center justify-center gap-4">
        <DownloadButton />
        <Link
          href="/features"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 underline underline-offset-4 transition hover:text-zinc-800 sm:text-base"
        >
          See Features
          <Image src="/next.svg" width={15} height={15} alt="arrow" className="h-3.5 w-3.5" />
        </Link>
      </div>

      <Image
        src="/main.jpeg"
        width={1280}
        height={720}
        alt="Nap editor demo"
        className="fade-up mt-12 h-auto w-full rounded-[22px] object-cover"
        priority
      />
    </section>
  );
}
