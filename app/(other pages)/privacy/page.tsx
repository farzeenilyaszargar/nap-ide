import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Header />

      {/* Hero Section */}
      <div className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-0">
          <div className="text-center">
            <p className="text-gray-400 text-lg font-mono mb-2">/nap/</p>
            <h2 className="text-4xl sm:text-6xl font-bold text-black">privacy</h2>
          </div>
          <p className="mt-4 text-center text-gray-500">Last updated: January 3, 2026</p>
        </div>
      </div>

      <div className="flex-1 max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">

          <section className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-black mb-4">1. Information We Collect</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We collect information you provide directly to us when you create an account, subscribe to our services, contact us for support, or interact with our Software and Website.
            </p>
            <h3 className="text-lg font-semibold text-black mb-2">Personal Information:</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>Name and email address when you create an account</li>
              <li>Payment information when you subscribe to a paid plan</li>
              <li>Communications you send to us (support requests, feedback)</li>
              <li>OAuth data when you sign in with Google or GitHub</li>
            </ul>
            <h3 className="text-lg font-semibold text-black mb-2">Usage Information:</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Device information (operating system, browser type)</li>
              <li>Usage patterns and feature interactions within the Software</li>
              <li>Error logs and crash reports to improve our services</li>
            </ul>
          </section>

          <section className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-black mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use the information we collect to provide, maintain, and improve our services:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>To create and manage your account</li>
              <li>To process your transactions and send related information</li>
              <li>To provide customer support and respond to your inquiries</li>
              <li>To send you updates, security alerts, and administrative messages</li>
              <li>To analyze usage patterns and improve our Software</li>
              <li>To detect, prevent, and address technical issues and abuse</li>
            </ul>
          </section>

          <section className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-black mb-4">3. Your Code and Data Privacy</h2>
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-4">
              <p className="text-green-800 font-semibold mb-2">🔒 Your Code Stays Private</p>
              <p className="text-green-700">
                By default, your code never leaves your machine. The AI features in Nap process your code locally. If you choose to use cloud-based AI features, your code is encrypted in transit and is not stored on our servers beyond the processing session.
              </p>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We do not sell, share, or monetize your code or the content you create using our Software. Your intellectual property remains yours.
            </p>
          </section>

          <section className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-black mb-4">4. Data Sharing</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We do not sell your personal information. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li><strong>Service Providers:</strong> With trusted third parties who assist in operating our services (payment processors, hosting providers)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to respond to valid legal processes</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              <li><strong>With Your Consent:</strong> When you explicitly agree to sharing</li>
            </ul>
          </section>

          <section className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-black mb-4">5. Data Security</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We implement industry-standard security measures to protect your personal information:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>All data transmitted between your device and our servers is encrypted using TLS/SSL</li>
              <li>Passwords are hashed and salted using bcrypt</li>
              <li>Access to personal data is restricted to authorized personnel only</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Secure data centers with physical and network security controls</li>
            </ul>
          </section>

          <section className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-black mb-4">6. Your Rights</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Depending on your location, you may have the following rights regarding your personal data:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate data</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data</li>
              <li><strong>Portability:</strong> Request transfer of your data to another service</li>
              <li><strong>Opt-out:</strong> Opt out of marketing communications at any time</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              To exercise these rights, please contact us at <a href="mailto:support@nap-code.com" className="text-blue-600 hover:underline">support@nap-code.com</a>.
            </p>
          </section>

          <section className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-black mb-4">7. Cookies and Tracking</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use cookies and similar tracking technologies to improve your experience:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li><strong>Essential Cookies:</strong> Required for the Website to function properly</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our Website</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              You can manage cookie preferences through your browser settings.
            </p>
          </section>

          <section className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-black mb-4">8. Contact Us</h2>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions about this Privacy Policy or our data practices, please contact us at <a href="mailto:support@nap-code.com" className="text-blue-600 hover:underline">support@nap-code.com</a> or visit our <a href="/support" className="text-blue-600 hover:underline">support page</a>.
            </p>
          </section>

        </div>
      </div>

      <Footer />
    </div>
  );
}
