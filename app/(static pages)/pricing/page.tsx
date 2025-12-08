"use client";

import Footer from "@/components/footer";
import GenHeader from "@/components/genericHeader";
import { useState } from "react";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function PricingPage() {
    const [monthly, setMonthly] = useState(true);
    const router = useRouter();
    const supabase = createClient();

    const handlePayment = async (planName: string, amount: number) => {
        // 1. Check Auth
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            alert("Please sign in to purchase a plan.");
            router.push("/signin");
            return;
        }

        try {
            // 2. Create Order
            const res = await fetch("/api/razorpay/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: amount, planId: planName }), // Sending planName as planId to order, note: order API might need check
            });
            const data = await res.json();

            if (data.error) {
                alert("Order creation failed: " + data.error);
                return;
            }

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: data.amount,
                currency: data.currency,
                name: "Surfers",
                description: `Subscription for ${planName}`,
                order_id: data.id,
                handler: async function (response: any) {
                    const verifyRes = await fetch("/api/razorpay/verify", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            planName: planName, // Send Name!
                            amount
                        }),
                    });
                    const verifyData = await verifyRes.json();
                    if (verifyData.success) {
                        alert("Payment successful! Subscription active.");
                        window.location.href = '/dashboard';
                    } else {
                        alert("Payment verification failed. Please contact support.");
                        console.error("Verification failed", verifyData);
                    }
                },
                prefill: {
                    name: user.user_metadata?.full_name || "User Name",
                    email: user.email,
                    contact: "",
                },
                theme: {
                    color: "#000000",
                },
            };

            // 3. Load Script and Open
            const razorpayScript = document.createElement("script");
            razorpayScript.src = "https://checkout.razorpay.com/v1/checkout.js";
            razorpayScript.onload = () => {
                // @ts-ignore
                const rzp1 = new window.Razorpay(options);
                rzp1.on('payment.failed', function (response: any) {
                    alert(response.error.description);
                });
                rzp1.open();
            };
            document.body.appendChild(razorpayScript);

        } catch (error) {
            console.error("Payment failed", error);
            alert("Payment initialization failed.");
        }
    };

    return (
        <div className="">
            <GenHeader />
            <div className="flex flex-col justify-center items-center gap-5 my-20">
                <h1 className="font-bold text-4xl">Pricing</h1>
                <p>Flexible pricing, ultra flexible plans, cancel anytime.</p>
                <div className="border rounded-full px-0 flex items-center justify-around overflow-hidden">
                    <button onClick={() => setMonthly(true)} className={`px-3 ${monthly ? 'bg-black text-white ' : 'bg-white text-black'} `}>Monthly</button>
                    <button onClick={() => setMonthly(false)} className={`px-3  ${monthly ? 'bg-white text-black' : 'bg-black text-white '} `}>Anually</button>
                </div>
                {monthly === true && (
                    <div className="w-screen flex flex-col justify-center items-center">

                        <div className=" flex gap-5 h-110  w-4/5">
                            <div className="border rounded-2xl w-full flex flex-col justify-center items-center p-5 gap-4">
                                <h2 className="text-xl font-bold">Basic Plan</h2>
                                <p className="text-3xl font-bold">₹2</p>
                                <button
                                    onClick={() => handlePayment("Basic Plan", 200)}
                                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                                >
                                    Buy Now
                                </button>
                            </div>
                            <div className="border rounded-2xl w-full flex flex-col justify-center items-center p-5 gap-4">
                                <h2 className="text-xl font-bold">Pro Plan</h2>
                                <p className="text-3xl font-bold">₹5</p>
                                <button
                                    onClick={() => handlePayment("Pro Plan", 500)}
                                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                                >
                                    Buy Now
                                </button>
                            </div>
                            <div className="border rounded-2xl  w-full flex flex-col justify-center items-center p-5 gap-4">
                                <h2 className="text-xl font-bold">Enterprise Plan</h2>
                                <p className="text-3xl font-bold">Custom Pricing</p>
                                <p className="text-center text-gray-500">For large teams and custom requirements.</p>
                                <a href="/contact" className="border border-black px-4 py-2 rounded-lg hover:bg-gray-100 transition">Contact Sales</a>
                            </div>

                        </div>

                    </div>
                )}

                {monthly === false && (
                    <div className="w-screen flex flex-col justify-center items-center">
                        <div className=" flex gap-5 h-110  w-4/5">
                            <div className="border rounded-2xl w-full flex flex-col justify-center items-center p-5 gap-4">
                                <h2 className="text-xl font-bold">Basic Annual</h2>
                                <p className="text-3xl font-bold">₹24</p>
                                <p className="text-gray-500 text-sm">₹2/month billed annually</p>
                                <button
                                    onClick={() => handlePayment("Basic Annual", 2400)}
                                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                                >
                                    Buy Now
                                </button>
                            </div>
                            <div className="border rounded-2xl w-full flex flex-col justify-center items-center p-5 gap-4">
                                <h2 className="text-xl font-bold">Pro Annual</h2>
                                <p className="text-3xl font-bold">₹60</p>
                                <p className="text-gray-500 text-sm">₹5/month billed annually</p>
                                <button
                                    onClick={() => handlePayment("Pro Annual", 6000)}
                                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                                >
                                    Buy Now
                                </button>
                            </div>
                            <div className="border rounded-2xl  w-full flex flex-col justify-center items-center p-5 gap-4">
                                <h2 className="text-xl font-bold">Enterprise Plan</h2>
                                <p className="text-3xl font-bold">Custom Pricing</p>
                                <p className="text-center text-gray-500">For large teams and custom requirements.</p>
                                <a href="/contact" className="border border-black px-4 py-2 rounded-lg hover:bg-gray-100 transition">Contact Sales</a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
