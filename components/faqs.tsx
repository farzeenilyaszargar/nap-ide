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
        <div className="flex justify-center items-center w-full overflow-hidden mt-20">
            <div className="w-full max-w-4xl px-6 sm:px-10 space-y-4">
                <h2 className="text-3xl font-semibold mb-4 text-center text-black">Frequently Asked Questions</h2>
                {faqs.map((faq, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => toggle(index)}
                        aria-expanded={open === index}
                        className={`w-full text-left rounded-2xl border p-5 transition-all ${
                            open === index
                                ? "border-black bg-white shadow-md"
                                : "border-gray-200 bg-gray-50 hover:bg-white"
                        }`}
                    >
                        <div className="flex justify-between items-center gap-4">
                            <span className="text-lg font-medium text-black">{faq.question}</span>
                            <span className="text-black text-xl">{open === index ? "−" : "+"}</span>
                        </div>

                        {open === index && (
                            <p className="mt-3 text-gray-600">{faq.answer}</p>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
