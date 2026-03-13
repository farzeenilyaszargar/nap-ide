"use client";

import Features from "@/components/features";
import Footer from "@/components/footer";
import Header from "@/components/header";
import TryNap from "@/components/trySurfer";
import { Zap, Shield, Plug } from "lucide-react";

export default function FeaturesPage() {
    return (
        <div className="min-h-screen bg-white text-black">
            <Header />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10">
                <div className="text-center">
                    <p className="text-gray-400 text-lg font-mono mb-2">/nap/</p>
                    <h2 className="text-6xl font-bold text-[#383838]">features</h2>
                </div>
            </div>

            <Features />

            <div className="w-full py-20 px-5 bg-gray-50 mt-10">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="space-y-4 p-6 rounded-2xl bg-white border border-gray-200 hover:border-gray-400 transition-all">
                        <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <Zap className="w-6 h-6 text-black" />
                        </div>
                        <h3 className="text-xl font-bold text-black">Lightning Fast</h3>
                        <p className="text-gray-500">Built on Rust for instant startup and zero latency typing.</p>
                    </div>
                    <div className="space-y-4 p-6 rounded-2xl bg-white border border-gray-200 hover:border-gray-400 transition-all">
                        <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <Shield className="w-6 h-6 text-black" />
                        </div>
                        <h3 className="text-xl font-bold text-black">Secure by Design</h3>
                        <p className="text-gray-500">Your code never leaves your machine unless you want it to.</p>
                    </div>
                    <div className="space-y-4 p-6 rounded-2xl bg-white border border-gray-200 hover:border-gray-400 transition-all">
                        <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <Plug className="w-6 h-6 text-black" />
                        </div>
                        <h3 className="text-xl font-bold text-black">Fully Extensible</h3>
                        <p className="text-gray-500">Compatible with all your favorite VS Code extensions.</p>
                    </div>
                </div>
            </div>

            <TryNap />
            <Footer />
        </div>
    );
}
