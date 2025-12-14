import Image from "next/image";

//features, blog, download, social, tos, pricing
export default function Footer() {
    return (
        <div className="bg-black text-white py-15 sm:px-10 w-screen border-t border-[#414141] ">
            <div className="flex justify-around">
                <div className="flex flex-col w-1/4 ">
                    <p className="font-medium">Resources</p>
                    <a className="text-gray-400 hover:text-white" href="/download" >Download</a>
                    <a className="text-gray-400 hover:text-white" href="/pricing" >Pricing</a>
                    <a className="text-gray-400 hover:text-white" href="/faqs">FAQ's</a>
                    <a className="text-gray-400 hover:text-white" href="/support">Support</a>
                </div>
                <div className="flex flex-col w-1/4">
                    <p className="font-medium">Company</p>
                    <a className="text-gray-400 hover:text-white" href="https://www.surfers.bot" target="_blank">Try Surfers</a>
                    <a className="text-gray-400 hover:text-white" href="/blogs" target="_blank">Blog</a>
                    <a className="text-gray-400 hover:text-white" href="/devs">Developers</a>
                    <a className="text-gray-400 hover:text-white" href="/tc">T&C</a>
                    <a className="text-gray-400 hover:text-white" href="/privacy">Privacy</a>
                </div>
                <div className="flex flex-col w-1/4">
                    <p className="font-medium">Social</p>
                    <a className="text-gray-400 hover:text-white group" href="https://x.com/farzeenilya" target="_blank">X</a>
                    <a className="text-gray-400 hover:text-white" href="https://www.linkedin.com/in/farzeenilyaszargar/" target="_blank">Linkedin</a>
                    <a className="text-gray-400 hover:text-white" href="https://www.youtube.com/@surfersbot" target="_blank">Youtube</a>
                    <a className="text-gray-400 hover:text-white" href="https://www.reddit.com/r/surfersbot/" target="_blank">Reddit</a>
                </div>
            </div>


            <div className="text-gray-100 text-sm text-center mt-20">© {new Date().getFullYear()} Nap Inc.</div>



        </div>
    );
}
