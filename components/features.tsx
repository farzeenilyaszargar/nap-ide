import Image from "next/image";

export default function Features() {
    return (
        <section className="w-full py-20 flex flex-col gap-32 overflow-hidden">

            {/* Feature 1 - Image Left, Text Right */}
            <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="md:w-1/2 w-full relative">
                    <div className="md:-translate-x-1/4 w-full transition-transform hover:scale-105 duration-500">
                        <Image
                            src="/demo.png"
                            alt="Fast & Smooth Experience"
                            className="rounded-r-2xl shadow-2xl object-cover"
                            width={800}
                            height={600}
                        />
                    </div>
                </div>
                <div className="md:w-2/3 w-full px-5 md:pr-20 text-center">
                    <h2 className="text-3xl font-semibold mb-4  text-gray-500">For the <span className="text-black">extraordinarily productive devs,</span><br></br>
                        Surfers is the <span className="text-black">best</span> way to code with <span className="text-black">AI.</span></h2>
                    <p className=" text-lg leading-relaxed  text-gray-500">
                        For developers who live in their tools Surfers delivers a world-class intelligent agent that sees your entire codebase with absolute clarity, understands every file, every pattern, every nuance, and builds with the sophistication of a top-tier engineer.
                    </p>
                </div>
            </div>

            {/* Feature 2 - Image Right, Text Left */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-10">
                <div className="md:w-2/3 w-full relative">
                    <div className="md:translate-x-1/4 w-full transition-transform hover:scale-105 duration-500">
                        <Image
                            src="/demo.png"
                            alt="Smart Automation"
                            className="rounded-l-2xl shadow-2xl object-cover ml-auto"
                            width={800}
                            height={600}
                        />
                    </div>
                </div>
                <div className="md:w-2/3 w-full px-5 md:pl-20 text-center">
                    <h2 className="text-3xl font-semibold mb-4 text-black">Surfers edits multiple files at a time,
                        sk anything you want & go to sleep.</h2>
                    <p className="text-gray-500 text-lg leading-relaxed">
                        Surfers gets things done fantastic — be it the code indexing of your entire files or making multiple edits in a single go or even change the whole codebase for the updated needs of the developers.
                    </p>
                </div>
            </div>

            {/* Feature 3 - Image Left, Text Right */}
            <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="md:w-1/2 w-full relative">
                    <div className="md:-translate-x-1/4 w-full transition-transform hover:scale-105 duration-500">
                        <Image
                            src="/demo.png"
                            alt="Built for Performance"
                            className="rounded-r-2xl shadow-2xl object-cover"
                            width={800}
                            height={600}
                        />
                    </div>
                </div>
                <div className="md:w-1/2 w-full px-5 text-center    ">
                    <h2 className="text-3xl font-semibold mb-4 text-black">Control anything &
                        everything on Surfers.</h2>
                    <p className="text-gray-500 text-lg leading-relaxed">Surfers pushes your work to GitHub with the grace of engineered silence — branches and repos synced without a ripple.
                    </p>
                </div>
                <div className="md:w-1/2 w-full flex flex-col text-center items-center justify-center">
                    <Image
                        src="/terminal.png"
                        alt="Built for Performance"
                        className="rounded-r-2xl shadow-2xl object-cover w-1/2 "
                        width={500}
                        height={500}
                    />
                    <h1 className="text-5xl font-semibold mb-4 text-gray-400">Control</h1>
                    <h1 className="text-5xl font-semibold mb-4 text-gray-300">Terminal</h1>
                </div>
            </div>



        </section>
    );
}
