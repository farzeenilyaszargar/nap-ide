"use client";

import Footer from "@/components/footer";
import GenHeader from "@/components/genericHeader";
import { useState } from "react";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import TryNap from "@/components/trySurfer";
import { Check } from "lucide-react";

export default function PricingPage() {
    const [monthly, setMonthly] = useState(true);
    const router = useRouter();
    const supabase = createClient();

    const handlePayment = async (planName: string, amount: number) => {
        // ... (existing payment logic kept for reference or future re-enabling, but currently unused for Coming Soon plans)
        // For Free plan, we just redirect.
    };

    const handleFree = () => {
        router.push('/dashboard');
    }

    const Feature = ({ text }: { text: string }) => (
        <div className="flex items-center gap-2">
            <div className="p-0.5 rounded-full bg-black/10">
                <Check className="w-3 h-3 text-black" />
            </div>
            <span className="text-sm text-gray-600">{text}</span>
        </div>
    );

    return (
        <div className="min-h-screen bg-white text-black">
            <Header />
            <div className="flex flex-col justify-center items-center gap-5 my-20">
                <h1 className="font-bold text-4xl text-black">Pricing</h1>
                <p className="text-gray-500">Flexible pricing, ultra flexible plans, cancel anytime.</p>
                <div className="border border-gray-300 rounded-full p-1 flex items-center justify-around overflow-hidden bg-gray-100">
                    <button onClick={() => setMonthly(true)} className={`px-4 py-1 rounded-full transition-all ${monthly ? 'bg-black text-white' : 'text-gray-500 hover:text-black'} `}>Monthly</button>
                    <button onClick={() => setMonthly(false)} className={`px-4 py-1 rounded-full transition-all ${!monthly ? 'bg-black text-white' : 'text-gray-500 hover:text-black'} `}>Annually</button>
                </div>

                <div className="w-screen flex flex-col justify-center items-center mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl px-4">

                        {/* Free Plan */}
                        <div className="border border-gray-200 rounded-2xl flex flex-col p-6 gap-6 bg-gray-50 hover:border-gray-400 transition-all">
                            <div className="space-y-2">
                                <h2 className="text-xl font-bold text-black">Free Plan</h2>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-black">₹0</span>
                                    <span className="text-gray-500">/{monthly ? 'month' : 'year'}</span>
                                </div>
                                <p className="text-gray-500 text-sm">Perfect for getting started</p>
                            </div>

                            <button
                                onClick={handleFree}
                                className="w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-gray-800 transition"
                            >
                                Get Started
                            </button>

                            <div className="space-y-3">
                                <Feature text="Basic Access" />
                                <Feature text="1 User" />
                                <Feature text="Community Support" />
                                <Feature text="Limited Features" />
                            </div>
                        </div>

                        {/* Pro Plan */}
                        <div className="border border-gray-200 rounded-2xl flex flex-col p-6 gap-6 bg-gray-50 hover:border-gray-400 transition-all">
                            <div className="space-y-2">
                                <h2 className="text-xl font-bold text-black">Pro Plan</h2>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-black">₹{monthly ? '5' : '60'}</span>
                                    <span className="text-gray-500">/{monthly ? 'month' : 'year'}</span>
                                </div>
                                <p className="text-gray-500 text-sm">For power users</p>
                            </div>

                            <button
                                disabled
                                className="w-full bg-gray-200 text-gray-500 font-semibold py-2 rounded-lg cursor-not-allowed"
                            >
                                Coming Soon
                            </button>

                            <div className="space-y-3">
                                <Feature text="Full Access" />
                                <Feature text="5 Users" />
                                <Feature text="Priority Support" />
                                <Feature text="Advanced Features" />
                                <Feature text="Usage Analytics" />
                            </div>
                        </div>

                        {/* Enterprise Plan */}
                        <div className="border border-gray-200 rounded-2xl flex flex-col p-6 gap-6 bg-gray-50 hover:border-gray-400 transition-all">
                            <div className="space-y-2">
                                <h2 className="text-xl font-bold text-black">Enterprise</h2>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-bold text-black">Custom</span>
                                </div>
                                <p className="text-gray-500 text-sm">For large teams</p>
                            </div>

                            <button
                                disabled
                                className="w-full bg-gray-200 text-gray-500 font-semibold py-2 rounded-lg cursor-not-allowed"
                            >
                                Coming Soon
                            </button>

                            <div className="space-y-3">
                                <Feature text="Unlimited Users" />
                                <Feature text="24/7 Dedicated Support" />
                                <Feature text="Custom Integrations" />
                                <Feature text="SLA" />
                                <Feature text="On-premise deployment" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <TryNap />
            <Footer />
        </div>
    );
}
