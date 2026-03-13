import Header from "@/components/header";
import { Code, Terminal, Boxes } from "lucide-react";

export default function Devs() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-black">Developer Resources</h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Everything you need to build with Nap Editor. API references, SDKs, and guides.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 hover:border-gray-400 transition-colors cursor-pointer group">
            <Code className="w-8 h-8 mb-4 text-gray-500 group-hover:text-black" />
            <h3 className="text-xl font-semibold mb-2 text-black group-hover:underline">API Reference</h3>
            <p className="text-gray-500">Comprehensive documentation for our REST and GraphQL APIs.</p>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 hover:border-gray-400 transition-colors cursor-pointer group">
            <Terminal className="w-8 h-8 mb-4 text-gray-500 group-hover:text-black" />
            <h3 className="text-xl font-semibold mb-2 text-black group-hover:underline">CLI Tools</h3>
            <p className="text-gray-500">Command line utilities to streamline your workflow.</p>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 hover:border-gray-400 transition-colors cursor-pointer group">
            <Boxes className="w-8 h-8 mb-4 text-gray-500 group-hover:text-black" />
            <h3 className="text-xl font-semibold mb-2 text-black group-hover:underline">SDKs & Libraries</h3>
            <p className="text-gray-500">Official libraries for Node.js, Python, Ruby, and more.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
