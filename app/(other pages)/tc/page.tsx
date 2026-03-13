import Header from "@/components/header";
import Footer from "@/components/footer";

export default function TC() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
          <div className="text-center">
            <p className="text-gray-400 text-lg font-mono mb-2">/nap/</p>
            <h2 className="text-6xl font-bold text-black">terms</h2>
          </div>
          <p className="mt-4 text-center text-gray-500">Last updated: January 3, 2026</p>
        </div>
      </div>

      <div className="flex-1 max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">

          <section className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-black mb-4">1. Acceptance</h2>
            <p className="text-gray-600 leading-relaxed">
              By using Nap or visiting nap-code.com, you agree to these Terms.
            </p>
          </section>

          <section className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-black mb-4">2. License</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We grant you a limited, non-exclusive license to use Nap for personal or commercial work.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Use on devices you own or control</li>
              <li>No resale or redistribution</li>
              <li>No reverse engineering</li>
            </ul>
          </section>

          <section className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-black mb-4">3. Accounts</h2>
            <p className="text-gray-600 leading-relaxed">
              You are responsible for account security and the accuracy of your information.
            </p>
          </section>

          <section className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-black mb-4">4. Subscriptions</h2>
            <p className="text-gray-600 leading-relaxed">
              Paid plans renew unless canceled before the renewal date. Fees are non-refundable unless stated otherwise.
            </p>
          </section>

          <section className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-black mb-4">5. Intellectual Property</h2>
            <p className="text-gray-600 leading-relaxed">
              Nap and its content are owned by Nap. You retain rights to your own code.
            </p>
          </section>

          <section className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-black mb-4">6. Disclaimer</h2>
            <p className="text-gray-600 leading-relaxed">
              Nap is provided “as is” without warranties. Use at your own risk.
            </p>
          </section>

          <section className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-black mb-4">7. Contact</h2>
            <p className="text-gray-600 leading-relaxed">
              Questions? Email support@nap-code.com.
            </p>
          </section>

        </div>
      </div>

      <Footer />
    </div>
  );
}
