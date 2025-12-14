import Header from "@/components/header";

export default function FAQs() {
  const faqs = [
    { q: "What is Nap Editor?", a: "Nap Editor is a powerful, flexible text editor designed for developers and writers who need a distraction-free environment." },
    { q: "Is there a free trial?", a: "Yes, we offer a free tier with basic features. You can upgrade to Pro for advanced capabilities." },
    { q: "Can I cancel my subscription?", a: "Unless you are on an annual plan, you can cancel your subscription at any time from your dashboard." },
    { q: "How do I contact support?", a: "You can reach our support team via the Support page or email us at support@napeditor.com." }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">Frequently Asked Questions</h1>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
