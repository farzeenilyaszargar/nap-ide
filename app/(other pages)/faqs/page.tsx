import Header from "@/components/header";
import Footer from "@/components/footer";

export default function FAQs() {
  const faqs = [
    {
      q: "What is Nap Editor?",
      a: "Nap Editor is a next-generation AI-powered code editor built for developers who demand speed, intelligence, and precision. It features an advanced AI agent that understands your entire codebase with absolute clarity — every file, every pattern, every nuance. Whether you're building web apps, mobile apps, backend systems, or large-scale projects, Nap provides a fast, intuitive, and AI-enhanced workspace that keeps you productive and focused."
    },
    {
      q: "How does the AI understand my codebase?",
      a: "Nap uses advanced code indexing and semantic analysis to build a comprehensive understanding of your project. It analyzes file relationships, function dependencies, coding patterns, and project structure. This allows the AI to provide context-aware suggestions, make intelligent multi-file edits, and understand the implications of changes across your entire codebase — not just the file you're working on."
    },
    {
      q: "Is there a free plan available?",
      a: "Yes! We offer a generous free tier that includes basic AI features, code completion, and access to community support. The free plan is perfect for getting started, personal projects, or trying out Nap before committing. You can upgrade to Pro at any time for advanced features like unlimited AI requests, priority support, and team collaboration tools."
    },
    {
      q: "What platforms does Nap support?",
      a: "Nap Editor is available for macOS (Intel and Apple Silicon), Windows (10/11 64-bit), and Linux (Debian, Ubuntu, Fedora). We provide native installers optimized for each platform to ensure the best performance. The editor is built on Rust for lightning-fast startup times and zero-latency typing experience."
    },
    {
      q: "Can Nap edit multiple files at once?",
      a: "Absolutely! One of Nap's most powerful features is its ability to make intelligent multi-file edits. When you ask the AI to implement a feature or refactor code, it can modify multiple files simultaneously while maintaining consistency across your codebase. This includes updating imports, adjusting function signatures, and ensuring all related code stays in sync."
    },
    {
      q: "How secure is my code?",
      a: "Your code security is our top priority. By default, your code never leaves your machine unless you explicitly choose to use cloud-based AI features. All communications are encrypted using industry-standard TLS/SSL protocols. For enterprise customers, we offer on-premise deployment options and additional security certifications to meet your compliance requirements."
    },
    {
      q: "Can I use my existing VS Code extensions?",
      a: "Yes! Nap is fully compatible with the VS Code extension ecosystem. You can install and use your favorite extensions directly within Nap. This means you don't have to give up the tools you love — just enhance them with Nap's powerful AI capabilities."
    },
    {
      q: "How do I cancel my subscription?",
      a: "You can cancel your subscription at any time from your dashboard. If you're on a monthly plan, your access will continue until the end of your current billing period. For annual plans, please contact our support team to discuss your options. We also offer prorated refunds in certain circumstances."
    },
    {
      q: "Does Surfers integrate with GitHub?",
      a: "Yes, Nap has deep GitHub integration. You can push code, create branches, manage repos, and sync your work seamlessly — all from within the editor. The AI can even help you write meaningful commit messages and manage your Git workflow with the grace of engineered precision."
    },
    {
      q: "How do I contact support?",
      a: "We offer multiple support channels to help you. You can email us at support@napeditor.com for a response within 24 hours, call our support line Monday-Friday 9am-6pm, or use the live chat feature for real-time assistance. Pro and Enterprise customers get priority support with faster response times."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-black">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Everything you need to know about Nap Editor. Can't find what you're looking for? Contact our support team.
          </p>
        </div>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl border border-gray-200 p-8 hover:border-gray-400 hover:shadow-lg transition-all">
              <h3 className="text-xl font-semibold text-black mb-4">{faq.q}</h3>
              <p className="text-gray-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center bg-gray-50 rounded-2xl border border-gray-200 p-10">
          <h2 className="text-2xl font-bold text-black mb-4">Still have questions?</h2>
          <p className="text-gray-500 mb-6">Our team is here to help you with anything you need.</p>
          <a
            href="/support"
            className="inline-block bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
