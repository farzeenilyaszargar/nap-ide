import Link from "next/link";
import DownloadButton from "./customDownload";

export default function TryNap() {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-10 sm:py-18 lg:px-14">
      <div className="rounded-[28px] border border-[#1c3f32] bg-[var(--surface-strong)] p-8 text-center shadow-[0_20px_44px_rgba(10,20,16,0.28)] sm:p-12">
        <p className="text-xs font-semibold tracking-[0.14em] text-white/60 uppercase">Ready To Build Faster</p>
        <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-semibold leading-tight text-white sm:text-5xl">
          Download Nap Editor and turn ideas into shipped product.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
          Join the waitlist for early access and get updates as new desktop builds roll out.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <DownloadButton className="border-white/25 bg-white text-[#0f1713] hover:bg-white/90" />
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10 sm:text-base"
          >
            View Pricing
          </Link>
        </div>
      </div>
    </section>
  );
}
