import Header from "@/components/header";
import { Mail, Phone, MessageSquare } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">How can we help?</h1>
        <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto">
          Our team is here to assist you with any questions or issues you might have.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Email Support</h3>
            <p className="text-gray-500 mb-4">Get a response within 24 hours.</p>
            <a href="mailto:support@napeditor.com" className="text-blue-600 font-medium hover:underline">support@napeditor.com</a>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Phone</h3>
            <p className="text-gray-500 mb-4">Mon-Fri from 9am to 6pm.</p>
            <a href="tel:+10123456789" className="text-blue-600 font-medium hover:underline">+1 (012) 345-6789</a>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
            <p className="text-gray-500 mb-4">Chat with our team in real-time.</p>
            <button className="text-blue-600 font-medium hover:underline">Start Chat</button>
          </div>
        </div>
      </div>
    </div>
  );
}
