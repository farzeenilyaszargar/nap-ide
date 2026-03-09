import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import Header from "@/components/header";

const companies = [
  { name: "GitHub", logo: "/github-icon.png" },
  { name: "Google Cloud", logo: "/google-icon.png" },
  { name: "Linux Foundation", logo: "/linux-icon.png" },
  { name: "Windows Dev", logo: "/windows-icon.png" },
];

const testimonials = [
  {
    quote:
      "Nap feels like pairing with a terminal-native engineer. I prompt, it opens files, edits, and keeps context without me babysitting.",
    name: "Aarav B.",
    role: "Full-Stack Developer",
  },
  {
    quote:
      "The branch flow is clean, fast, and practical. I can ship feature spikes in minutes and still keep code review quality high.",
    name: "Sana K.",
    role: "Frontend Engineer",
  },
  {
    quote:
      "For real codebases, Nap is the first AI IDE that doesn’t feel toy-like. It handles multi-file refactors like a serious tool.",
    name: "Rithik M.",
    role: "Backend Developer",
  },
];

const faqs = [
  {
    q: "Is Nap local-first?",
    a: "Yes. Nap works against your local repositories and worktrees, with AI assistance layered on top.",
  },
  {
    q: "Can teams use it for production code?",
    a: "Yes. Nap is designed for practical developer workflows, from feature work to cleanup and debugging.",
  },
  {
    q: "How does desktop auth work?",
    a: "You sign in once and Nap maintains a desktop session with refresh-token flow for continuity.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#131110] text-[#EAE8E6]">
      <Header />

      <section className="mx-auto my-6 w-[calc(100%-1.5rem)] max-w-7xl px-6 pb-8 pt-14 sm:my-8 sm:w-[calc(100%-3rem)] sm:px-12 lg:px-24 xl:px-32">
        <div className="flex flex-col items-center justify-center gap-5 text-center">
          <h1 className="text-2xl leading-tight font-semibold sm:text-4xl">
            Nap is the best way to code with agents.
          </h1>
          <p className="max-w-2xl text-xs leading-relaxed text-[#BDB7B3] sm:text-sm">
            Run AI coding workflows like a clean terminal loop: prompt, inspect, edit, ship.
            Built for developers who care about speed, control, and code quality.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/api/download/mac"
              className="inline-flex items-center gap-2 rounded-md border border-[#EAE8E6] bg-[#EAE8E6] px-4 py-2 text-xs font-semibold text-[#131110] transition hover:opacity-90 sm:text-sm"
            >
              <Image src="/apple-icon.png" alt="apple" width={16} height={16} className="h-4 w-4 invert" />
              Download for macOS
            </Link>
            <Link
              href="/features"
              className="inline-flex items-center rounded-md border border-white/20 px-4 py-2 text-xs text-[#D3CECB] transition hover:border-white/40 hover:text-[#EAE8E6] sm:text-sm"
            >
              View Features
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto my-6 w-[calc(100%-1.5rem)] max-w-7xl px-6 pb-6 sm:my-8 sm:w-[calc(100%-3rem)] sm:px-12 lg:px-24 xl:px-32">
        <div className="overflow-hidden rounded-xl bg-[#1A1716] p-2">
          <Image
            src="/main.jpeg"
            width={1280}
            height={720}
            alt="Nap editor preview"
            className="h-full w-full rounded-lg object-cover"
          />
        </div>
      </section>

      <section className="mx-auto my-6 w-[calc(100%-1.5rem)] max-w-7xl px-6 py-10 sm:my-8 sm:w-[calc(100%-3rem)] sm:px-12 lg:px-24 xl:px-32">
        <div className="mb-6 text-center text-[11px] uppercase tracking-[0.2em] text-[#A8A19E]">
          Trusted by builders at
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {companies.map((company) => (
            <div
              key={company.name}
              className="flex items-center justify-center gap-2 rounded-md border border-white/10 bg-[#1A1716] px-3 py-3"
            >
              <Image src={company.logo} alt={company.name} width={18} height={18} className="h-4 w-4 object-contain" />
              <span className="text-[11px] text-[#D3CECB] sm:text-xs">{company.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto my-6 w-[calc(100%-1.5rem)] max-w-7xl px-6 py-10 sm:my-8 sm:w-[calc(100%-3rem)] sm:px-12 lg:px-24 xl:px-32">
        <div className="mb-6 text-center text-[11px] uppercase tracking-[0.2em] text-[#A8A19E]">Testimonials</div>
        <div className="grid gap-4 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.name} className="rounded-md border border-white/10 bg-[#1A1716] p-5">
              <p className="mb-4 text-xs leading-relaxed text-[#D3CECB]">&quot;{item.quote}&quot;</p>
              <p className="text-xs font-semibold text-[#EAE8E6]">{item.name}</p>
              <p className="text-[11px] text-[#A8A19E]">{item.role}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-10 sm:px-12 lg:px-24 xl:px-32">
        <div className="mb-6 text-center text-[11px] uppercase tracking-[0.2em] text-[#A8A19E]">FAQs</div>
        <div className="grid gap-3">
          {faqs.map((item) => (
            <article key={item.q} className="rounded-md border border-white/10 bg-[#1A1716] p-4">
              <h3 className="mb-1 text-xs font-semibold text-[#EAE8E6] sm:text-sm">{item.q}</h3>
              <p className="text-[11px] leading-relaxed text-[#BDB7B3] sm:text-xs">{item.a}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto my-6 w-[calc(100%-1.5rem)] max-w-7xl px-6 pb-14 pt-8 text-center sm:my-8 sm:w-[calc(100%-3rem)] sm:px-12 lg:px-24 xl:px-32">
        <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-[#A8A19E]">
          Build faster. Ship cleaner.
        </p>
        <h2 className="mb-5 text-xl font-semibold sm:text-2xl">
          Turn your backlog into shipped code with Nap.
        </h2>
        <div className="flex justify-center">
          <Link
            href="/api/download/mac"
            className="inline-flex items-center gap-2 rounded-md border border-[#EAE8E6] bg-[#EAE8E6] px-4 py-2 text-xs font-semibold text-[#131110] transition hover:opacity-90 sm:text-sm"
          >
            <Image src="/apple-icon.png" alt="apple" width={16} height={16} className="h-4 w-4 invert" />
            Download for macOS
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
