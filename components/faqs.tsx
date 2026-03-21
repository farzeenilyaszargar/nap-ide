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
    ];

    return (
        <div className="flex justify-center items-center w-full overflow-hidden mt-20">
            <div className="w-full max-w-4xl px-6 sm:px-10 space-y-6">
                <h2 className="text-2xl py-7 font-normal text-center text-black">Frequently Asked Questions</h2>
                <div className="space-y-7">
                    {faqs.map((faq, index) => (
                        <div key={index} className="text-left">
                            <p className="text-lg font-medium text-black">{faq.question}</p>
                            <div className="mt-2 flex items-start gap-3 text-gray-600">
                                <span className="font-mono text-gray-400 font-spac">|_</span>
                                <p className="text-sm sm:text-base">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
