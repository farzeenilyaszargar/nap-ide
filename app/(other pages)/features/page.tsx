"use client";

import Features from "@/components/features";
import Footer from "@/components/footer";
import Header from "@/components/header";
import TrySurfers from "@/components/trySurfer";
import Image from "next/image";

export default function FeaturesPage() {
    return (
        <div className="">
            <Header />

            <div className="flex flex-col items-center justify-center pt-20 px-5 text-center space-y-6">
                <h1 className="text-5xl md:text-6xl font-bold text-white">
                    Supercharged <span className="text-stone-500">Features</span>
                </h1>
                <p className="text-xl text-stone-400 max-w-2xl">
                    Everything you need to build faster, ship better, and stay in flow.
                </p>
            </div>

            <Features />

            <div className="w-full py-20 px-5 bg-white/5 mt-10">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="space-y-4 p-6 rounded-2xl bg-black/20 border border-white/10 hover:border-white/20 transition-all">
                        <div className="mx-auto w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                            <span className="text-2xl">⚡</span>
                        </div>
                        <h3 className="text-xl font-bold text-white">Lightning Fast</h3>
                        <p className="text-stone-400">Built on Rust for instant startup and zero latency typing.</p>
                    </div>
                    <div className="space-y-4 p-6 rounded-2xl bg-black/20 border border-white/10 hover:border-white/20 transition-all">
                        <div className="mx-auto w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                            <span className="text-2xl">🛡️</span>
                        </div>
                        <h3 className="text-xl font-bold text-white">Secure by Design</h3>
                        <p className="text-stone-400">Your code never leaves your machine unless you want it to.</p>
                    </div>
                    <div className="space-y-4 p-6 rounded-2xl bg-black/20 border border-white/10 hover:border-white/20 transition-all">
                        <div className="mx-auto w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                            <span className="text-2xl">🔌</span>
                        </div>
                        <h3 className="text-xl font-bold text-white">Fully Extensible</h3>
                        <p className="text-stone-400">Compatible with all your favorite VS Code extensions.</p>
                    </div>
                </div>
            </div>

            <TrySurfers />
            <Footer />
        </div>
    );
}
