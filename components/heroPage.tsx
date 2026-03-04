"use client";

import Image from "next/image";
import Link from "next/link";
import DownloadButton from "./customDownload";

export default function HeroPage() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col px-5 pb-8 pt-10 sm:px-10 lg:px-14">
      <div className="fade-up mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--line-soft)] bg-white/70 px-4 py-2 text-xs font-semibold tracking-[0.12em] text-[var(--text-muted)] uppercase backdrop-blur">
        <span className="inline-block h-2 w-2 rounded-full bg-[var(--accent)]" />
        Built For Real Shipping Speed
      </div>

      <div className="fade-up-delay mx-auto max-w-4xl text-center">
        <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight text-[var(--text-strong)] sm:text-6xl lg:text-7xl">
          Download Nap Editor and ship features before others finish planning.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
          Nap is an AI coding partner designed for serious builders. It understands your codebase, executes real work across files, and keeps GitHub synced without friction.
        </p>
      </div>

      <div className="fade-up-delay mt-10 flex flex-wrap items-center justify-center gap-4">
        <DownloadButton />
        <Link
          href="/features"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--line-soft)] bg-white px-6 py-3 text-sm font-medium text-[var(--text-strong)] transition hover:-translate-y-0.5 hover:bg-[#f7faf8] sm:text-base"
        >
          See Features
          <Image src="/next.svg" width={15} height={15} alt="arrow" className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-xs text-[var(--text-muted)] sm:text-sm">
        <span className="rounded-full border border-[var(--line-soft)] bg-white/70 px-3 py-1.5">Codebase-aware AI agent</span>
        <span className="rounded-full border border-[var(--line-soft)] bg-white/70 px-3 py-1.5">Multi-file execution</span>
        <span className="rounded-full border border-[var(--line-soft)] bg-white/70 px-3 py-1.5">Faster branch-to-ship cycle</span>
      </div>

      <div className="fade-up mt-12 rounded-[28px] border border-[var(--line-soft)] bg-white/80 p-3 shadow-[0_16px_40px_rgba(8,24,17,0.08)] backdrop-blur sm:p-5">
        <div className="relative overflow-hidden rounded-[22px] border border-black/5">
          <div className="pointer-events-none absolute left-4 top-4 z-10 rounded-full bg-black/65 px-3 py-1 text-xs font-medium text-white">
            Live Product Preview
          </div>
          <Image src="/main.jpeg" width={1280} height={720} alt="Nap editor demo" className="h-auto w-full object-cover" priority />
        </div>
      </div>
    </section>
  );
}
