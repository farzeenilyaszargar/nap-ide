"use client"
import { useState } from "react";

export default function FAQs() {
    const faqs = [
        {
            question: "What is the purpose of this platform?",
            answer:
                "This platform helps users explore various features, tools, and resources designed to simplify everyday workflows.",
        },
        {
            question: "How secure is my data?",
            answer:
                "Your data is protected with strong encryption and industry-standard security measures to ensure privacy and reliability.",
        },
        {
            question: "Can I use this service for free?",
            answer:
                "Yes, we offer a free tier with access to essential features, and you can upgrade anytime for additional functionality.",
        },
        {
            question: "Do you offer customer support?",
            answer:
                "We provide 24/7 customer support to assist with any issues or questions you may have.",
        },
    ];

    const [open, setOpen] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpen(open === index ? null : index);
    };

    return (
        <section className="w-full overflow-hidden py-16 sm:py-20">
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-10">
                <div className="rounded-3xl border border-gray-200 bg-white px-6 py-10 shadow-[0_18px_45px_rgba(0,0,0,0.08)] sm:px-10 sm:py-12">
                    <div className="text-center">
                        <p className="text-gray-400 text-sm font-mono mb-2">/faq/</p>
                        <h2 className="text-3xl sm:text-5xl font-semibold text-[#383838]">Frequently Asked Questions</h2>
                        <p className="mt-3 text-sm sm:text-base text-gray-500">Quick answers to get you moving faster.</p>
                    </div>
                    <div className="mt-8 space-y-4">
                        {faqs.map((faq, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => toggle(index)}
                                aria-expanded={open === index}
                                className={`w-full text-left rounded-2xl border px-5 py-4 transition-all ${
                                    open === index
                                        ? "border-black bg-white shadow-md"
                                        : "border-gray-200 bg-gray-50 hover:bg-white"
                                }`}
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-base sm:text-lg font-medium text-black">{faq.question}</span>
                                    <span className={`text-black text-xl transition-transform ${open === index ? "rotate-45" : ""}`}>+</span>
                                </div>
                                {open === index && (
                                    <p className="mt-3 text-sm sm:text-base text-gray-600">{faq.answer}</p>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
