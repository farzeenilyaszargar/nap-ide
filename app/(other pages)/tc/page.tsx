import Header from "@/components/header";

export default function TC() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-black">Terms and Conditions</h1>
        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8 space-y-6 text-gray-700">
          <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>

          <section>
            <h2 className="text-xl font-semibold text-black mb-3">1. Acceptance of Terms</h2>
            <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mb-3">2. Usage License</h2>
            <p>Permission is granted to temporarily download one copy of the materials (information or software) on Surfers Editor's website for personal, non-commercial transitory viewing only.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mb-3">3. Disclaimer</h2>
            <p>The materials on Surfers Editor's website are provided on an 'as is' basis. Surfers Editor makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
