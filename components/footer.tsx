import Image from "next/image";

//features, blog, download, social, tos, pricing
export default function Footer() {
    return (
        <div className="bg-black text-white py-15 px-10 w-screen ">
            <div className="flex justify-around ">
                <div className="flex flex-col w-1/4 ">
                    <p className="font-medium">Resources</p>
                    <a className="text-gray-400 hover:text-white" href="/download">Download</a>
                    <a className="text-gray-400 hover:text-white" href="/faqs">FAQ's</a>
                    <a className="text-gray-400 hover:text-white" href="/support">Support</a>
                </div>
                <div className="flex flex-col w-1/4">
                    <p className="font-medium">Company</p>
                    <a className="text-gray-400 hover:text-white" href="#">Surfers</a>

                    <a className="text-gray-400 hover:text-white" href="#">Blog</a>
                    <a className="text-gray-400 hover:text-white" href="/devs">Developers</a>
                    <a className="text-gray-400 hover:text-white" href="/tc">Terms and Conditions</a>
                    <a className="text-gray-400 hover:text-white" href="/privacy">Privacy Policy</a>
                </div>
                <div className="flex flex-col w-1/4">
                    <p className="font-medium">Social</p>
                    <a className="text-gray-400 hover:text-white group" href="https://x.com/farzeenilya">X</a>
                    <a className="text-gray-400 hover:text-white" href="https://www.linkedin.com/in/farzeenilyaszargar/">Linkedin</a>
                    <a className="text-gray-400 hover:text-white" href="https://www.youtube.com/@surfersbot">Youtube</a>
                    <a className="text-gray-400 hover:text-white" href="https://www.reddit.com/r/surfersbot/">Reddit</a>
                </div>
            </div>


            <div className="text-gray-100 text-sm text-center mt-20">© {new Date().getFullYear()} Surfers Inc.</div>



        </div>
    );
}
