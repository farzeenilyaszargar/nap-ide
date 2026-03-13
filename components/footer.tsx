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
                    <Link className="py-0.5 text-sm text-gray-500 transition-colors hover:text-[#ffffff] sm:text-base" href="/devs">Developers</Link>
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


            <div className="mt-10 text-center text-sm text-gray-600 sm:mt-14">© {new Date().getFullYear()} Nap Co. By Guddu & Fizzy</div>



        </footer>
    );
}
