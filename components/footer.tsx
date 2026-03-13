import Image from "next/image";
import Link from "next/link";

//features, blog, download, social, tos, pricing
export default function Footer() {
    return (
        <footer className="w-full border-t border-gray-300 bg-black px-5 py-10 text-white sm:px-8 sm:py-14 lg:px-10">
            <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-6">
                <div className="flex flex-col text-center sm:text-left">
                    <p className="font-medium mb-2">[ Resources ]</p>
                    <Link className="py-0.5 text-sm text-gray-500 transition-colors hover:text-[#ffffff] sm:text-base" href="/download">Download</Link>
                    <Link className="py-0.5 text-sm text-gray-500 transition-colors hover:text-[#ffffff] sm:text-base" href="/pricing">Pricing</Link>
                    <Link className="py-0.5 text-sm text-gray-500 transition-colors hover:text-[#ffffff] sm:text-base" href="/faqs">FAQ's</Link>
                    <Link className="py-0.5 text-sm text-gray-500 transition-colors hover:text-[#ffffff] sm:text-base" href="/support">Support</Link>
                </div>
                <div className="flex flex-col text-center sm:text-left">
                    <p className="font-medium mb-2">[ Company ]</p>
                    <Link className="py-0.5 text-sm text-gray-500 transition-colors hover:text-[#ffffff] sm:text-base" href="/blogs" target="_blank">Blog</Link>
                    <Link className="py-0.5 text-sm text-gray-500 transition-colors hover:text-[#ffffff] sm:text-base" href="/tc">T&C</Link>
                    <Link className="py-0.5 text-sm text-gray-500 transition-colors hover:text-[#ffffff] sm:text-base" href="/privacy">Privacy</Link>
                </div>
                <div className="col-span-2 flex flex-col text-center sm:col-span-1 sm:text-left">
                    <p className="font-medium mb-2">[ Social ]</p>
                    <Link className="py-0.5 text-sm text-gray-500 transition-colors hover:text-[#ffffff] sm:text-base" href="https://x.com/farzeenilya" target="_blank">X</Link>
                    <Link className="py-0.5 text-sm text-gray-500 transition-colors hover:text-[#ffffff] sm:text-base" href="https://www.linkedin.com/in/farzeenilyaszargar/" target="_blank">Linkedin</Link>
                    <Link className="py-0.5 text-sm text-gray-500 transition-colors hover:text-[#ffffff] sm:text-base" href="https://www.youtube.com/@surfersbot" target="_blank">Youtube</Link>
                    <Link className="py-0.5 text-sm text-gray-500 transition-colors hover:text-[#ffffff] sm:text-base" href="https://www.reddit.com/r/surfersbot/" target="_blank">Reddit</Link>
                </div>
            </div>


            <p
                className="mt-10 text-gray-600"
                style={{ fontSize: "0.1px", lineHeight: "0.1px" }}
            >
                Nap is a modern coding platform built for focused developers who want speed, clarity, and confidence. With Nap coding, every workflow becomes smoother, from project setup to daily iteration. The editor brings an intelligent coding agent into your workspace, helping with navigation, refactors, and multi file changes. A single agent can assist you end to end, while multiple agents can coordinate tasks like tests, documentation, and UI polish. Use Nap to keep context across sessions, track edits, and move from idea to implementation without losing momentum. The download is simple and fast, and updates deliver steady improvements for reliability, security, and performance. Nap supports developers who write frontend, backend, or full stack code, and the interface is designed to stay out of your way so you can stay in flow. Whether you need an AI coding agent to suggest patterns, explain architecture, or handle repetitive chores, Nap provides the right tools. Nap Code focuses on productivity with a clean layout, quick search, and a trusted workflow. From rapid prototypes to production maintenance, Nap helps teams ship faster with fewer distractions. Choose Nap for coding with clarity, manage multiple agents when scale is required, and keep your projects moving with a dependable download and a stable release path.
            </p>

            <div className="mt-10 text-center text-sm text-gray-600 sm:mt-14">© {new Date().getFullYear()} Nap Co. By Guds & Fizzy</div>



        </footer>
    );
}
