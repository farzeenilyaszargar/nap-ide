import type { Metadata } from "next";
import Script from "next/script";

import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Nap | Terms",
  description:
    "Review Nap’s terms and conditions for using the agent orchestration platform and desktop app.",
  alternates: { canonical: "https://www.nap-code.com/tc" },
  openGraph: {
    title: "Nap | Terms",
    description:
      "Review Nap’s terms and conditions for using the agent orchestration platform and desktop app.",
    url: "https://www.nap-code.com/tc",
    type: "website",
  },
  twitter: {
    title: "Nap | Terms",
    description:
      "Review Nap’s terms and conditions for using the agent orchestration platform and desktop app.",
  },
};

export default function TC() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Script
        id="breadcrumb-terms"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.nap-code.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Terms",
                item: "https://www.nap-code.com/tc",
              },
            ],
          }),
        }}
      />
      <Header />

      {/* Hero Section */}
      <div className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-0">
          <div className="text-center">
            <p className="text-gray-400 text-lg font-mono mb-2">/nap/</p>
            <h2 className="text-4xl sm:text-6xl font-bold text-black">terms</h2>
          </div>
          <p className="mt-4 text-center text-gray-500">Last updated: January 3, 2026</p>
        </div>
      </div>

      <div className="flex-1 max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">

          <section className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-black mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              By accessing, downloading, installing, or using Nap ("the Software") or visiting our website at nap-code.com ("the Website"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, please do not use our Software or Website.
            </p>
            <p className="text-gray-600 leading-relaxed">
              These Terms constitute a legally binding agreement between you and Nap ("we," "us," or "our"). We reserve the right to modify these Terms at any time, and such modifications will be effective immediately upon posting on our Website.
            </p>
          </section>

          <section className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-black mb-4">2. License Grant</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to download, install, and use the Software for your personal or commercial development purposes.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>You may install the Software on multiple devices that you own or control</li>
              <li>You may use the Software for both personal and commercial projects</li>
              <li>You may not redistribute, sublicense, or resell the Software</li>
              <li>You may not reverse engineer, decompile, or attempt to extract the source code</li>
            </ul>
          </section>

          <section className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-black mb-4">3. User Accounts</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              To access certain features of the Software, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>
            <p className="text-gray-600 leading-relaxed">
              You agree to provide accurate and complete information when creating your account and to update your information as necessary. We reserve the right to suspend or terminate your account if any information provided is inaccurate, false, or violates these Terms.
            </p>
          </section>

          <section className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-black mb-4">4. Subscription and Payments</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Some features of the Software require a paid subscription. By subscribing to a paid plan, you agree to pay all applicable fees as described on our pricing page. All fees are non-refundable except as expressly stated in these Terms.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Subscriptions automatically renew at the end of each billing period unless you cancel before the renewal date. You may cancel your subscription at any time through your account dashboard.
            </p>
          </section>

          <section className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-black mb-4">5. Intellectual Property</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The Software, including all content, features, and functionality, is owned by Nap and is protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
            <p className="text-gray-600 leading-relaxed">
              You retain all rights to the code and content you create using the Software. We do not claim any ownership over your work product.
            </p>
          </section>

          <section className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-black mb-4">6. Disclaimer of Warranties</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              THE SOFTWARE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We do not warrant that the Software will be uninterrupted, error-free, or completely secure. You use the Software at your own risk.
            </p>
          </section>

          <section className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-black mb-4">7. Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, SURFERS INC. SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR BUSINESS OPPORTUNITIES, ARISING OUT OF OR RELATED TO YOUR USE OF THE SOFTWARE.
            </p>
          </section>

          <section className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-black mb-4">8. Contact Information</h2>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions about these Terms, please contact us at <a href="mailto:support@nap-code.com" className="text-blue-600 hover:underline">support@nap-code.com</a> or through our <a href="/support" className="text-blue-600 hover:underline">support page</a>.
            </p>
          </section>

        </div>
      </div>

      <Footer />
    </div>
  );
}
