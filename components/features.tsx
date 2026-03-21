import Image from "next/image";

export default function Features() {
    return (
        <section id="features" className="w-full overflow-hidden py-5 sm:py-10">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 sm:gap-10 sm:px-6 lg:px-10">
                <h2 className="sr-only">Features</h2>
                <div className="flex flex-col gap-15 sm:gap-10">
                    <div className="flex flex-col gap-6 rounded-3xl border border-gray-200 bg-white p-7 text-left shadow-[0_18px_45px_rgba(0,0,0,0.08)] overflow-hidden md:flex-row md:items-center">
                        <div className="flex flex-col gap-5 md:w-1/3">
                            <h3 className="text-2xl sm:text-4xl font-semibold tracking-tight text-[#383838]">For the <span className="text-black">Real Devs</span>  <br></br>Nap is the best way to <span className="text-black">Code.</span></h3>
                            <p className="text-xs sm:text-base text-gray-500">For developers who builds real stuff Nap delivers a world class intelligent agent that sees your entire codebase with absolute clarity, understands every file, every nuance, and builds with the sophistication of a top tier engineer.</p>
                        </div>
                        <div className="relative w-full overflow-hidden rounded-md sm:rounded-md md:w-2/3" style={{ aspectRatio: "5 / 3" }}>
                            <Image
                                src="/parallel.jpeg"
                                alt="img"
                                fill
                                sizes="(min-width: 768px) 66vw, 100vw"
                                className="object-cover object-left"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-6 rounded-3xl border border-gray-200 bg-white p-7 text-left shadow-[0_18px_45px_rgba(0,0,0,0.08)] overflow-hidden md:flex-row md:items-center">
                        <div className="relative w-full overflow-hidden rounded-md sm:rounded-md md:w-2/3" style={{ aspectRatio: "5 / 3" }}>
                            <Image
                                src="/files.jpeg"
                                alt="img"
                                fill
                                sizes="(min-width: 768px) 66vw, 100vw"
                                className="object-cover object-left"
                            />
                        </div>
                        <div className="flex flex-col gap-5 md:w-1/3">
                            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#383838]">Nap edits <span className="text-black">multiple files at a time</span>  so relax <span className="text-black">&amp; take a Nap.</span></h3>
                            <p className="text-xs sm:text-base text-gray-500">Manage agents, workflows, and project state from one place. Switch contexts fast, track changes, and keep the entire build loop under your control.</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6 rounded-3xl border border-gray-200 bg-white p-7 text-left shadow-[0_18px_45px_rgba(0,0,0,0.08)] overflow-hidden md:flex-row md:items-center">
                        <div className="w-full px-5 md:w-1/3">
                            <h3 className="text-2xl sm:text-4xl font-semibold tracking-tight mb-4 text-[#383838]">
                                Control <span className="text-black">Anything</span> &amp; <span className="text-black">Everything</span> on Nap.
                            </h3>
                            <p className="text-gray-500 text-sm sm:text-lg leading-relaxed">Nap pushes your work to GitHub with the grace of engineered silence branches and repos synced without a ripple.</p>
                        </div>
                        <div className="relative w-full overflow-hidden rounded-md sm:rounded-md md:w-2/3" style={{ aspectRatio: "5 / 3" }}>
                            <Image
                                src="/git.jpeg"
                                alt="Built for Performance"
                                fill
                                sizes="(min-width: 768px) 66vw, 100vw"
                                className="object-cover object-left"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
