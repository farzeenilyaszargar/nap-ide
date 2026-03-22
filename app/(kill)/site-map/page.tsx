"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/download", label: "Download" },
  { href: "/features", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blogs", label: "Blogs" },
  { href: "/faqs", label: "FAQs" },
  { href: "/support", label: "Support" },
  { href: "/privacy", label: "Privacy" },
  { href: "/tc", label: "Terms" },
];

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <main className="mx-auto w-full max-w-5xl px-6 pb-16 pt-12">
        <h1 className="text-3xl font-bold text-black">Sitemap</h1>
        <p className="mt-2 text-gray-500">
          Quick access to all main pages on Nap Code.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:text-black"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
