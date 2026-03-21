import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full border-t border-gray-300 bg-black px-5 py-4 text-white sm:px-5 lg:px-10">
            <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 text-xs text-gray-500 sm:flex-row sm:text-sm">
                <span className="whitespace-nowrap">© 2026 Nap Inc.</span>
                <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-end">
                    <Link className="whitespace-nowrap transition-colors hover:text-[#ffffff]" href="/privacy">Privacy Policy</Link>
                    <span>.</span>
                    <Link className="whitespace-nowrap transition-colors hover:text-[#ffffff]" href="/tc">Terms &amp; Conditions</Link>
                    <span>.</span>
                    <Link className="whitespace-nowrap transition-colors hover:text-[#ffffff]" href="https://x.com/napverse" target="_blank">X</Link>
                    <span>.</span>
                    <Link className="whitespace-nowrap transition-colors hover:text-[#ffffff]" href="https://www.youtube.com/@napHQ" target="_blank">YouTube</Link>
                </div>
            </div>
        </footer>
    );
}
