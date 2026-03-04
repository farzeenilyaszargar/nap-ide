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
          Download Nap now and start building faster with a codebase-aware AI editor.
        </p>
        <div className="mt-8 flex items-center justify-center">
          <DownloadButton variant="light" className="px-10 py-4 text-base sm:text-lg" />
        </div>
      </div>
    </section>
  );
}
