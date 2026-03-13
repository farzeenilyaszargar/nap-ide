import Header from "@/components/header";
import Footer from "@/components/footer";
import { Mail, Phone, MessageSquare, Clock, MapPin, Headphones } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section */}
      <div className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-10">
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
      <div className="max-w-6xl mx-auto px-4 py-16 flex-1">
        <div className="grid grid-cols-1 gap-8 mb-20 max-w-xl mx-auto">
          <div className="bg-gray-50 p-10 rounded-2xl border border-gray-200 hover:border-gray-400 hover:shadow-lg transition-all text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-black">Email Support</h3>
            <p className="text-gray-500 mb-6">Get a detailed response from our team within 24 hours. Best for non-urgent inquiries.</p>
            <a href="mailto:support@nap-code.com" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Send Email
            </a>
            <p className="text-sm text-gray-400 mt-4">support@nap-code.com</p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="flex items-start gap-4 p-6">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <h4 className="font-semibold text-black mb-1">Response Time</h4>
              <p className="text-gray-500 text-sm">We aim to respond to all inquiries within 24 hours. Pro users get priority support.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <h4 className="font-semibold text-black mb-1">Global Support</h4>
              <p className="text-gray-500 text-sm">We support customers worldwide with teams across multiple time zones.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Headphones className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <h4 className="font-semibold text-black mb-1">Enterprise Support</h4>
              <p className="text-gray-500 text-sm">Dedicated account managers and 24/7 support for enterprise customers.</p>
            </div>
          </div>
        </div>

        {/* FAQ CTA */}
        <div className="bg-black rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Looking for quick answers?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Check out our comprehensive FAQ section for answers to common questions about Surfers Editor.
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
