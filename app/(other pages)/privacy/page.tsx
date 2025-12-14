import Header from "@/components/header";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Privacy Policy</h1>
        <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6 text-gray-600">
          <p className="text-sm text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. How We Use Your Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, to process your transactions, and to send you related information including confirmations and invoices.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Data Security</h2>
            <p>We implement reasonable security measures to protect your personal information.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
