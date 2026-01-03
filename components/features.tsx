import Image from "next/image";

export default function Features() {
    return (
        <section className="w-full py-20 flex flex-col gap-32 overflow-hidden">

            <div className="flex flex-row">
                <div className="flex flex-col m-10 bg-[#F5F5F5] rounded-2xl p-15 gap-15 text-center">
                    <p className="text-3xl font-bold text-[#7E7E7E]">For the <span className="text-[#414141]">real devs</span>  <br></br>Surfers is the best way to <span className="text-[#414141]">code.</span></p>
                    <p>For developers who builds real stuff — nap delivers a world-class intelligent agent that sees your entire codebase with absolute clarity, understands every file, every nuance, and builds with the sophistication of a top-tier engineer.</p>
                    <Image src="/demo.png" width={2000} height={2000} alt="img" />
                </div>  
                <div className="flex flex-col m-10 bg-[#1A1A1A] rounded-2xl p-15 gap-15 text-center">
                    <Image src="/demo.png" width={2000} height={2000} alt="img" />
                    <p className="text-3xl font-bold text-[#EAEAEA]">Surfers edits <span className="text-[#6D6D6D]">multiple files at a time</span>  <br></br> so relax <span className="text-[#6D6D6D]">&amp; take a nap.</span></p>
                    <p className="text-[#6D6D6D]">Nap pushes your work to GitHub with the grace of engineered silence — branches and repos synced without a ripple.</p>
                </div>
            </div>
                

            <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="md:w-1/2 w-full relative">
                    <div className="md:-translate-x-1/4 w-full transition-transform hover:scale-105 duration-500">
                        <Image
                            src="/demo.png" 
                            alt="Built for Performance" 
                            className="rounded-r-2xl object-cover"
                            width={800}
                            height={600}
                        />
                    </div>
                </div>
                <div className="md:w-1/2 w-full px-5 text-center">
                    <h2 className="text-3xl font-semibold mb-4 text-black">Control anything &amp;
                        everything on Surfers.</h2>
                    <p className="text-gray-500 text-lg leading-relaxed">Surfers pushes your work to GitHub with the grace of engineered silence — branches and repos synced without a ripple.</p>
                </div>
                <div className="md:w-1/2 w-full flex flex-col text-center items-center justify-center">
                    <Image
                        src="/terminal.png"
                        alt="Built for Performance"
                        className="rounded-r-2xl object-cover w-1/2"
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
