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
        <div className="flex justify-center items-center w-screen overflow-hidden mt-20">
            <div className="md:min-w-5xl px-10 space-y-4">
                <h2 className="text-3xl font-semibold mb-4 text-center">Frequently Asked Questions</h2>
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border rounded-2xl p-4 shadow-sm bg-white/80 backdrop-blur"
                    >
                        <button
                            onClick={() => toggle(index)}
                            className="w-full text-left flex justify-between items-center"
                        >
                            <span className="text-lg font-medium">{faq.question}</span>
                            <span>{open === index ? "−" : "+"}</span>
                        </button>

                        {open === index && (
                            <p className="mt-2 text-gray-600">{faq.answer}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}