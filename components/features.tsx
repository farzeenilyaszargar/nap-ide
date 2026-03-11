import Image from "next/image";

export default function Features() {
    return (
        <section className="w-full py-10 sm:py-20 flex flex-col gap-16 sm:gap-32 overflow-hidden px-4 sm:px-0">

            <div className="flex flex-col md:flex-row gap-6 sm:gap-0">
                <div className="flex flex-col mx-4 sm:m-10 bg-[#0C1016] rounded-2xl border border-white/10 p-6 sm:p-15 gap-6 sm:gap-15 text-center">
                    <p className="text-lg sm:text-3xl font-bold text-[#F3F4F6]">For the <span className="text-[#B8C0CC]">Real Devs</span>  <br></br>Nap is the best way to <span className="text-[#B8C0CC]">code.</span></p>
                    <p className="text-xs sm:text-base text-[#B8C0CC]">For developers who builds real stuff nap delivers a world-class intelligent agent that sees your entire codebase with absolute clarity, understands every file, every nuance, and builds with the sophistication of a top-tier engineer.</p>
                    <Image src="/parallel.jpeg" width={2000} height={2000} alt="img" className="rounded-2xl" />
                </div>
                <div className="flex flex-col mx-4 sm:m-10 bg-[#0C1016] rounded-2xl border border-white/10 p-6 sm:p-15 gap-6 sm:gap-15 text-center">
                    <Image src="/files.jpeg" width={2000} height={2000} alt="img" className="rounded-2xl" />
                    <p className="text-lg sm:text-3xl font-bold text-[#F3F4F6]">Nap edits <span className="text-[#B8C0CC]">multiple files at a time</span>  so relax <span className="text-[#B8C0CC]">&amp; take a nap.</span></p>
                    <p className="text-xs sm:text-base text-[#B8C0CC]">Nap pushes your work to GitHub with the grace of engineered silence branches and repos synced without a ripple.</p>
                </div>
            </div>


            <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-10">
                <div className="md:w-1/2 w-full relative px-4 md:px-10">
                    <div className=" transition-transform hover:scale-105 duration-500">
                        <Image
                            src="/git.jpeg"
                            alt="Built for Performance"
                            className="rounded-2xl md:rounded-r-2xl object-cover"
                            width={800}
                            height={600}
                        />
                    </div>
                </div>
                <div className="md:w-1/2 w-full px-5 text-center">
                    <h2 className="text-xl sm:text-3xl font-semibold mb-4 text-[#F3F4F6]">Control anything &amp;
                        everything on Nap.</h2>
                    <p className="text-[#B8C0CC] text-sm sm:text-lg leading-relaxed">Nap pushes your work to GitHub with the grace of engineered silence branches and repos synced without a ripple.</p>
                </div>

            </div>

        </section>
    );
}
