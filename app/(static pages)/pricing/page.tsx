"use client";

import Footer from "@/components/footer";
import GenHeader from "@/components/genericHeader";
import { useState } from "react";

export default function PricingPage() {
    const [monthly, setMonthly] = useState(true);

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
                            <div className="border rounded-2xl w-full flex flex-col justify-center items-center">
                                Basic Plan
                                $199
                            </div>
                            <div className="border rounded-2xl w-full flex flex-col justify-center items-center">
                                Pro Plan
                                $399
                            </div>
                            <div className="border rounded-2xl  w-full flex flex-col justify-center items-center">
                                Enterprise Plan
                                $300/employee
                                
                                 
                            </div>

                        </div>

                    </div>
                )}

                {monthly === false && (
                    <div className="p-4">

                        Annual Plan

                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
