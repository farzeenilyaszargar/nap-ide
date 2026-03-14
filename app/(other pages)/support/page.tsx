"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

export default function SupportPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("support@nap-code.com");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section */}
      <div className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0">
          <div className="text-center">
            <p className="text-gray-400 text-lg font-mono mb-2">/nap/</p>
            <h2 className="text-6xl font-bold text-[#383838]">support</h2>
          </div>
          <p className="mt-7 text-center text-gray-500">
            Message us to assist you with any questions, issues, or feedback you might have about Nap.
          </p>
        </div>
      </div>

      {/* Contact Options */}
      <div className="max-w-6xl mx-auto px-4 my-5 flex-1">
        <div className="text-center max-w-3xl mb-15 mx-auto">
          <div className="flex items-center justify-center gap-3">
            <a
              href="mailto:support@nap-code.com"
              className="text-2xl sm:text-4xl font-semibold text-black hover:text-gray-700 transition-colors font-mono"
            >
              support@nap-code.com
            </a>
            <button
              type="button"
              onClick={handleCopy}
              aria-label="Copy email"
              className="inline-flex items-center justify-center rounded-full border border-black p-1.5 text-black transition-colors hover:bg-black hover:text-white"
            >
              {copied ? (
                <Check className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
          </div>
          <a
            href="mailto:support@nap-code.com"
            className="mt-6 inline-flex items-center justify-center rounded-md border border-black bg-black px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black"
          >
            Send Mail Now
          </a>
        </div>

        {/* FAQ CTA */}
        <div className="bg-black rounded-2xl p-10 mb-10 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Looking for quick answers?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Check out our comprehensive FAQ section for answers to common questions about Nap.
          </p>
          <a href="/faqs" className="inline-block bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
            Browse FAQs
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
