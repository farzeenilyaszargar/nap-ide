import Header from "@/components/header";
import Footer from "@/components/footer";
import { Mail, Phone, MessageSquare, Clock, MapPin, Headphones } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#07090D] text-[#E5E7EB]">
      <Header />

      {/* Hero Section */}
      <div className="bg-[#07090D] py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-[#F3F4F6] mb-6">How can we help?</h1>
          <p className="text-xl text-[#B8C0CC] max-w-2xl mx-auto">
            Our dedicated support team is here to assist you with any questions, issues, or feedback you might have about Nap Editor.
          </p>
        </div>
      </div>

      {/* Contact Options */}
      <div className="max-w-6xl mx-auto px-4 py-16 flex-1">
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-[#0C1016] p-10 rounded-2xl border border-white/10 hover:border-white/30 hover:shadow-lg transition-all text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#F3F4F6]">Email Support</h3>
            <p className="text-[#B8C0CC] mb-6">Get a detailed response from our team within 24 hours. Best for non-urgent inquiries.</p>
            <a href="mailto:support@napeditor.com" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Send Email
            </a>
            <p className="text-sm text-[#98A2B3] mt-4">support@napeditor.com</p>
          </div>

          <div className="bg-[#0C1016] p-10 rounded-2xl border border-white/10 hover:border-white/30 hover:shadow-lg transition-all text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Phone className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#F3F4F6]">Phone Support</h3>
            <p className="text-[#B8C0CC] mb-6">Speak directly with our support specialists. Available Monday through Friday.</p>
            <a href="tel:+10123456789" className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
              Call Now
            </a>
            <p className="text-sm text-[#98A2B3] mt-4">Mon-Fri, 9am - 6pm IST</p>
          </div>

          <div className="bg-[#0C1016] p-10 rounded-2xl border border-white/10 hover:border-white/30 hover:shadow-lg transition-all text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#F3F4F6]">Live Chat</h3>
            <p className="text-[#B8C0CC] mb-6">Chat with our team in real-time for quick questions and immediate assistance.</p>
            <button className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors">
              Start Chat
            </button>
            <p className="text-sm text-[#98A2B3] mt-4">Average response: 2 minutes</p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="flex items-start gap-4 p-6">
            <div className="w-12 h-12 bg-[#141B24] rounded-xl flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 text-[#B8C0CC]" />
            </div>
            <div>
              <h4 className="font-semibold text-[#F3F4F6] mb-1">Response Time</h4>
              <p className="text-[#B8C0CC] text-sm">We aim to respond to all inquiries within 24 hours. Pro users get priority support.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6">
            <div className="w-12 h-12 bg-[#141B24] rounded-xl flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-[#B8C0CC]" />
            </div>
            <div>
              <h4 className="font-semibold text-[#F3F4F6] mb-1">Global Support</h4>
              <p className="text-[#B8C0CC] text-sm">We support customers worldwide with teams across multiple time zones.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6">
            <div className="w-12 h-12 bg-[#141B24] rounded-xl flex items-center justify-center flex-shrink-0">
              <Headphones className="w-6 h-6 text-[#B8C0CC]" />
            </div>
            <div>
              <h4 className="font-semibold text-[#F3F4F6] mb-1">Enterprise Support</h4>
              <p className="text-[#B8C0CC] text-sm">Dedicated account managers and 24/7 support for enterprise customers.</p>
            </div>
          </div>
        </div>

        {/* FAQ CTA */}
        <div className="bg-[#0C1016] rounded-2xl border border-white/10 p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Looking for quick answers?</h2>
          <p className="text-[#98A2B3] mb-8 max-w-xl mx-auto">
            Check out our comprehensive FAQ section for answers to common questions about Surfers Editor.
          </p>
          <a href="/faqs" className="inline-block bg-[#0F141B] text-[#F3F4F6] px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">
            Browse FAQs
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
