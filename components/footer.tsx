import Link from "next/link";
import { Wix_Madefor_Text } from "next/font/google";

const wixMadeforText = Wix_Madefor_Text({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
});

export default function Footer() {
    return (
        <footer className={`w-full px-5 py-2 text-gray-300 sm:px-5 lg:px-10 tracking-[-0.015em] text-base ${wixMadeforText.className} flex flex-col items-center justify-center`}>
            <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-2 text-base text-gray-400 py-2 text-center">
                <p className="text-center">
                    For anything specific about Nap email us at{" "}
                    <a className="underline underline-offset-2 text-black hover:text-gray-500" href="mailto:issues@nap-code.com">issues@nap-code.com</a>
                    {" "}. Check us on social media on{" "}
                    <Link className="underline underline-offset-2 text-black hover:text-gray-500" href="https://x.com/napverse" target="_blank">X</Link>
                    {" "} &amp;{" "}
                    <Link className="underline underline-offset-2 text-black hover:text-gray-500" href="https://www.youtube.com/@napHQ" target="_blank">YouTube</Link>.
                </p>
            </div>
            <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 text-gray-400 sm:flex-row border-t border-gray-200 py-2">
                <span className="whitespace-nowrap">Copyright © 2026 Nap Inc. All Rights Reserved.</span>
                <div className="hidden flex-wrap items-center justify-center gap-2 sm:flex sm:justify-end">
                    <Link className="whitespace-nowrap transition-colors hover:text-black" href="/privacy">Privacy Policy</Link>
                    <span className="inline-flex items-center leading-none ">|</span>
                    <Link className="whitespace-nowrap transition-colors hover:text-black" href="/tc">Terms &amp; Conditions</Link>
                    <span className="inline-flex items-center leading-none ">|</span>
                    <Link className="whitespace-nowrap transition-colors hover:text-black" href="/data-usage">Data Usage</Link>
                </div>
                <span>8 Off Western Road, 400068, Mumbai, India.</span>
            </div>
        </footer>
    );
}
