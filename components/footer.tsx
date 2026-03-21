import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full border-t border-gray-300 bg-[#f2f2f2] px-5 py-6 text-black sm:px-5 lg:px-10">
            <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 text-xs text-gray-600 sm:flex-row sm:text-sm">
                <span className="whitespace-nowrap">© 2026 Nap Inc.</span>
                <div className="hidden flex-wrap items-center justify-center gap-2 sm:flex sm:justify-end">
                    <Link className="whitespace-nowrap transition-colors hover:text-black" href="/privacy">Privacy Policy</Link>
                    <span className="inline-flex items-center leading-none pb-1.5">.</span>
                    <Link className="whitespace-nowrap transition-colors hover:text-black" href="/tc">Terms &amp; Conditions</Link>
                    <span className="inline-flex items-center leading-none pb-1.5">.</span>
                    <Link className="whitespace-nowrap transition-colors hover:text-black" href="https://x.com/napverse" target="_blank">X</Link>
                    <span className="inline-flex items-center leading-none pb-1.5">.</span>
                    <Link className="whitespace-nowrap transition-colors hover:text-black" href="https://www.youtube.com/@napHQ" target="_blank">YouTube</Link>
                </div>
            </div>
        </footer>
    );
}
