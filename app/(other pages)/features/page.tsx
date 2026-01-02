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
                <h1 className="text-5xl md:text-6xl font-bold text-black">
                    Supercharged <span className="text-gray-500">Features</span>
                </h1>
                <p className="text-xl text-gray-500 max-w-2xl">
                    Everything you need to build faster, ship better, and stay in flow.
                </p>
            </div>

            <Features />

            <div className="w-full py-20 px-5 bg-gray-50 mt-10">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="space-y-4 p-6 rounded-2xl bg-white border border-gray-200 hover:border-gray-400 transition-all">
                        <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="text-2xl">⚡</span>
                        </div>
                        <h3 className="text-xl font-bold text-black">Lightning Fast</h3>
                        <p className="text-gray-500">Built on Rust for instant startup and zero latency typing.</p>
                    </div>
                    <div className="space-y-4 p-6 rounded-2xl bg-white border border-gray-200 hover:border-gray-400 transition-all">
                        <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="text-2xl">🛡️</span>
                        </div>
                        <h3 className="text-xl font-bold text-black">Secure by Design</h3>
                        <p className="text-gray-500">Your code never leaves your machine unless you want it to.</p>
                    </div>
                    <div className="space-y-4 p-6 rounded-2xl bg-white border border-gray-200 hover:border-gray-400 transition-all">
                        <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="text-2xl">🔌</span>
                        </div>
                        <h3 className="text-xl font-bold text-black">Fully Extensible</h3>
                        <p className="text-gray-500">Compatible with all your favorite VS Code extensions.</p>
                    </div>
                </div>
            </div>

            <TrySurfers />
            <Footer />
        </div>
    );
}
