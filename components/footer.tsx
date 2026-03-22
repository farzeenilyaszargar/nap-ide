import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full px-5 text-gray-300 sm:px-5 lg:px-10">
            <div>
                <p>
                    For anything specific about Nap email us at issues@napeditor.com or you can directly contact us on +91 8855885588 (Nap’s help desk ). Check us on social media on X & Reddit.
                </p>
            </div>
            <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 text-xs text-gray-400 sm:flex-row sm:text-sm  border-t border-gray-200 py-4">
                <span className="whitespace-nowrap">Copyright © 2026 Nap Inc. All Rights Reserved.</span>
                <div className="hidden flex-wrap items-center justify-center gap-2 sm:flex sm:justify-end">
                    <Link className="whitespace-nowrap transition-colors hover:text-black" href="/privacy">Privacy Policy</Link>
                    <span className="inline-flex items-center leading-none ">|</span>
                    <Link className="whitespace-nowrap transition-colors hover:text-black" href="/tc">Terms &amp; Conditions</Link>
                    <span className="inline-flex items-center leading-none ">|</span>
                    <Link className="whitespace-nowrap transition-colors hover:text-black" href="/data-usage">Data Usage</Link>
                    <span className="inline-flex items-center leading-none ">|</span>
                    <Link className="whitespace-nowrap transition-colors hover:text-black" href="/reachus">Reach Us</Link>
                </div>
                <span>8 Off Western Road, 400068, Mumbai, India.</span>
            </div>
        </footer>
    );
}
