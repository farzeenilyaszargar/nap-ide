"use client";

import Features from "@/components/features";
import Footer from "@/components/footer";
import Header from "@/components/header";
import TryNap from "@/components/trySurfer";
import { Zap, Shield, Plug } from "lucide-react";

export default function FeaturesPage() {
    return (
        <div className="min-h-screen bg-[#07090D] text-[#E5E7EB]">
            <Header />

            <div className="flex flex-col items-center justify-center pt-20 px-5 text-center space-y-6">
                <h1 className="text-5xl md:text-6xl font-bold text-[#F3F4F6]">
                    Supercharged <span className="text-[#B8C0CC]">Features</span>
                </h1>
                <p className="text-xl text-[#B8C0CC] max-w-2xl">
                    Everything you need to build faster, ship better, and stay in flow.
                </p>
            </div>

            <Features />

            <div className="w-full py-20 px-5 bg-[#07090D] mt-10">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="space-y-4 p-6 rounded-2xl bg-[#0C1016] border border-white/10 hover:border-white/30 transition-all">
                        <div className="mx-auto w-12 h-12 bg-[#141B24] rounded-full flex items-center justify-center">
                            <Zap className="w-6 h-6 text-[#F3F4F6]" />
                        </div>
                        <h3 className="text-xl font-bold text-[#F3F4F6]">Lightning Fast</h3>
                        <p className="text-[#B8C0CC]">Built on Rust for instant startup and zero latency typing.</p>
                    </div>
                    <div className="space-y-4 p-6 rounded-2xl bg-[#0C1016] border border-white/10 hover:border-white/30 transition-all">
                        <div className="mx-auto w-12 h-12 bg-[#141B24] rounded-full flex items-center justify-center">
                            <Shield className="w-6 h-6 text-[#F3F4F6]" />
                        </div>
                        <h3 className="text-xl font-bold text-[#F3F4F6]">Secure by Design</h3>
                        <p className="text-[#B8C0CC]">Your code never leaves your machine unless you want it to.</p>
                    </div>
                    <div className="space-y-4 p-6 rounded-2xl bg-[#0C1016] border border-white/10 hover:border-white/30 transition-all">
                        <div className="mx-auto w-12 h-12 bg-[#141B24] rounded-full flex items-center justify-center">
                            <Plug className="w-6 h-6 text-[#F3F4F6]" />
                        </div>
                        <h3 className="text-xl font-bold text-[#F3F4F6]">Fully Extensible</h3>
                        <p className="text-[#B8C0CC]">Compatible with all your favorite VS Code extensions.</p>
                    </div>
                </div>
            </div>

            <TryNap />
            <Footer />
        </div>
    );
}
