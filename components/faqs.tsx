import Image from "next/image";

export default function FAQs() {
    const faqs = [
        {
            question: "Is this app free?",
            answer:
                "Yes, it’s free for everyone, and AI is included. You can start right away without a credit card.",
        },
        {
            question: "Are there worktrees in this?",
            answer:
                "Yes. You can create worktrees to keep changes isolated and switch contexts fast. It’s great for parallel experiments or quick hotfixes.",
        },
        {
            question: "What are parallel agents and how do I use them here?",
            answer:
                "Parallel agents let you split work across tasks at the same time. Assign each agent a goal and review the results before merging. It’s a simple way to move faster without losing control.",
        },
        {
            question: "How do commits work in this app?",
            answer:
                "You can review changes, stage what you want, and create commits per task or branch for clean history. This keeps your timeline clean and easy to audit.",
        },
    ];

    return (
        <div className="flex justify-center items-center w-full overflow-hidden mt-12 sm:mt-20">
            <div className="w-full max-w-4xl px-4 sm:px-10 space-y-5 sm:space-y-6">
                <h2 className="text-2xl sm:text-3xl py-5 sm:py-7 font-normal text-center text-black">Frequently Asked Questions</h2>
                <div className="space-y-6 sm:space-y-7">
                    {faqs.map((faq, index) => (
                        <div key={index} className="text-left">
                            <p className="text-base sm:text-lg font-medium text-black">{faq.question}</p>
                            <div className="mt-2 flex items-start gap-3 text-gray-600">
                                <Image
                                    src="/down-left.png"
                                    alt=""
                                    width={12}
                                    height={12}
                                    className="-scale-x-100 mt-1 h-3 w-3 shrink-0"
                                />
                                <p className="text-sm sm:text-base leading-relaxed">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
