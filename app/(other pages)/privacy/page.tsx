import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
          <div className="text-center">
            <p className="text-gray-400 text-lg font-mono mb-2">/nap/</p>
            <h2 className="text-6xl font-bold text-black">privacy</h2>
          </div>
          <p className="mt-4 text-center text-gray-500">Last updated: January 3, 2026</p>
        </div>
      </div>

      <div className="flex-1 max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">

          <section className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-black mb-4">1. What We Collect</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We collect the information you provide when you create an account, contact support, or use Nap.
            </p>
            <h3 className="text-lg font-semibold text-black mb-2">Account Information</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>Name and email address</li>
              <li>Billing details for paid plans</li>
              <li>Support messages you send</li>
            </ul>
            <h3 className="text-lg font-semibold text-black mb-2">Usage Information</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Device and OS details</li>
              <li>Feature usage and performance logs</li>
              <li>Error reports to improve reliability</li>
            </ul>
          </section>

          <section className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-black mb-4">2. How We Use It</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use your data to provide Nap, improve performance, and support your account.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Operate and maintain nap-code.com</li>
              <li>Process payments and subscriptions</li>
              <li>Respond to support requests</li>
              <li>Improve stability, speed, and security</li>
            </ul>
          </section>

          <section className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-black mb-4">3. Your Code</h2>
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-4">
              <p className="text-green-800 font-semibold mb-2">Your Code Stays Yours</p>
              <p className="text-green-700">
                By default, your code stays on your machine. If you enable cloud features, data is encrypted in transit.
              </p>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We do not sell your code or use it to train models without your consent.
            </p>
          </section>

          <section className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-black mb-4">4. Sharing</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We only share data when required to run the service or comply with the law.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Trusted providers (payments, hosting)</li>
              <li>Legal requirements</li>
              <li>With your explicit consent</li>
            </ul>
          </section>

          <section className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-black mb-4">5. Contact</h2>
            <p className="text-gray-600 leading-relaxed">
              Questions? Email us at support@nap-code.com.
            </p>
          </section>

        </div>
      </div>

      <Footer />
    </div>
  );
}
