import DownloadButton from "./customDownload";

export default function TryNap() {
    return (
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-6 px-4 py-16 sm:gap-8 sm:px-6 sm:py-24 lg:px-10">
            <div className="w-full rounded-3xl border border-white/10 bg-white/5 px-6 py-10 text-center sm:px-12 sm:py-12">
                <p className="font-display text-3xl font-semibold text-white sm:text-5xl">Start building with agents today.</p>
                <p className="mt-3 text-sm text-white/65 sm:text-base">Download Nap and orchestrate edits across your codebase in minutes.</p>
                <div className="mt-6 flex justify-center">
                    <DownloadButton showOnMobile />
                </div>
            </div>
        </div>
    );
}
