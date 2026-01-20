import Image from "next/image";
import Link from "next/link";

//features, blog, download, social, tos, pricing
export default function Footer() {
    return (
        <div className="bg-black text-white py-15 px-5 sm:px-10 w-screen border-t border-gray-300">
            <div className="flex flex-col sm:flex-row justify-around gap-8 sm:gap-4">
                <div className="flex flex-col text-center sm:text-left">
                    <p className="font-medium mb-2">Resources</p>
                    <Link className="text-gray-500 transition-colors hover:text-[#ffffff]" href="/download">Download</Link>
                    <Link className="text-gray-500 transition-colors hover:text-[#ffffff]" href="/pricing">Pricing</Link>
                    <Link className="text-gray-500 transition-colors hover:text-[#ffffff]" href="/faqs">FAQ's</Link>
                    <Link className="text-gray-500 transition-colors hover:text-[#ffffff]" href="/support">Support</Link>
                </div>
                <div className="flex flex-col text-center sm:text-left">
                    <p className="font-medium mb-2">Company</p>
                    <Link className="text-gray-500 transition-colors hover:text-[#ffffff]" href="https://www.surfers.bot" target="_blank">Try Surfers</Link>
                    <Link className="text-gray-500 transition-colors hover:text-[#ffffff]" href="/blogs" target="_blank">Blog</Link>
                    <Link className="text-gray-500 transition-colors hover:text-[#ffffff]" href="/devs">Developers</Link>
                    <Link className="text-gray-500 transition-colors hover:text-[#ffffff]" href="/tc">T&C</Link>
                    <Link className="text-gray-500 transition-colors hover:text-[#ffffff]" href="/privacy">Privacy</Link>
                </div>
                <div className="flex flex-col text-center sm:text-left">
                    <p className="font-medium mb-2">Social</p>
                    <Link className="text-gray-500 transition-colors hover:text-[#ffffff]" href="https://x.com/farzeenilya" target="_blank">X</Link>
                    <Link className="text-gray-500 transition-colors hover:text-[#ffffff]" href="https://www.linkedin.com/in/farzeenilyaszargar/" target="_blank">Linkedin</Link>
                    <Link className="text-gray-500 transition-colors hover:text-[#ffffff]" href="https://www.youtube.com/@surfersbot" target="_blank">Youtube</Link>
                    <Link className="text-gray-500 transition-colors hover:text-[#ffffff]" href="https://www.reddit.com/r/surfersbot/" target="_blank">Reddit</Link>
                </div>
            </div>


            <div className="text-gray-300 text-sm text-center mt-20">© {new Date().getFullYear()} Surfers Inc.</div>



        </div>
    );
}
