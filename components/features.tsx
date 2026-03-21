import Image from "next/image";

export default function Features() {
    return (
        <section id="features" className="w-full overflow-hidden py-5 sm:py-10">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 sm:gap-10 sm:px-6 lg:px-10">
                <h2 className="sr-only">Features</h2>
                <div className="flex flex-col gap-6 sm:gap-10">
                    <div className="flex flex-col gap-6 bg-[#F5F5F5] rounded-sm sm:rounded-lg p-6 sm:p-15 text-left overflow-hidden md:flex-row md:items-center">
                        <div className="flex flex-col gap-5 md:w-1/2">
                            <h3 className="text-2xl sm:text-4xl font-medium tracking-tight text-[#7E7E7E]">For the <span className="text-[#414141]">Real Devs</span>  <br></br>Nap is the best way to <span className="text-[#414141]">Code.</span></h3>
                            <p className="text-xs sm:text-base text-[#7E7E7E]">For developers who builds real stuff Nap delivers a world class intelligent agent that sees your entire codebase with absolute clarity, understands every file, every nuance, and builds with the sophistication of a top tier engineer.</p>
                        </div>
                        <Image src="/parallel.jpeg" width={2000} height={2000} alt="img" className="h-64 w-full max-w-none rounded-md object-cover object-left sm:h-[420px] sm:rounded-md md:h-[360px] md:w-1/2" />
                    </div>
                    <div className="flex flex-col gap-6 bg-[#1A1A1A] rounded-sm sm:rounded-lg p-6 sm:p-15 text-left overflow-hidden md:flex-row md:items-center">
                        <Image src="/files.jpeg" width={2000} height={2000} alt="img" className="h-64 w-full max-w-none rounded-md object-cover object-left sm:h-[420px] sm:rounded-md md:h-[360px] md:w-1/2" />
                        <div className="flex flex-col gap-5 md:w-1/2">
                            <h3 className="text-2xl sm:text-4xl font-medium tracking-tight text-[#EAEAEA]">Nap edits <span className="text-[#6D6D6D]">multiple files at a time</span>  so relax <span className="text-[#6D6D6D]">&amp; take a Nap.</span></h3>
                            <p className="text-xs sm:text-base text-[#6D6D6D]">Manage agents, workflows, and project state from one place. Switch contexts fast, track changes, and keep the entire build loop under your control.</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6 text-left md:flex-row md:items-center">
                        <div className="overflow-hidden rounded-md sm:rounded-md md:w-1/2">
                            <Image
                                src="/git.jpeg"
                                alt="Built for Performance"
                                className="h-64 w-full max-w-none object-cover object-left sm:h-[420px] sm:rounded-md md:h-[360px]"
                                width={800}
                                height={600}
                            />
                        </div>
                        <div className="w-full px-5 md:w-1/2">
                            <h3 className="text-2xl sm:text-4xl font-medium tracking-tight mb-4 text-[#969696]">
                                Control <span className="text-black">Anything</span> &amp; <span className="text-black">Everything</span> on Nap.
                            </h3>
                            <p className="text-gray-500 text-sm sm:text-lg leading-relaxed">Nap pushes your work to GitHub with the grace of engineered silence branches and repos synced without a ripple.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
