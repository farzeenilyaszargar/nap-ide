import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import Header from "@/components/header";
import HeroOceanBackground from "@/components/hero-ocean-background";

const features = [
  {
    title: "Parallel Execution, Real Throughput",
    description:
      "Run multi-file tasks faster with parallel workflows and clear execution tracking across your repository.",
    image: "/parallel.jpeg",
    alt: "Parallel execution view",
  },
  {
    title: "Terminal-Native Agent Loop",
    description:
      "Prompt, inspect, edit, and ship with a terminal-like flow designed for practical engineering work.",
    image: "/terminal.png",
    alt: "Terminal style coding experience",
  },
  {
    title: "Git-Aware by Default",
    description:
      "Stay safe while moving fast with branch-aware changes, clean diffs, and commit-friendly outputs.",
    image: "/git.jpeg",
    alt: "Git workflow integration",
  },
  {
    title: "File-Level Context and Control",
    description:
      "Navigate and modify project files with high signal context, so large codebases remain manageable.",
    image: "/files.jpeg",
    alt: "Project files overview",
  },
];

const testimonials = [
  {
    quote:
      "Nap helps me move from idea to clean implementation without losing control of the code.",
    name: "Aarav B.",
    role: "Full-Stack Developer",
  },
  {
    quote:
      "The agent loop feels practical, not gimmicky. It saves real time on day-to-day feature work.",
    name: "Sana K.",
    role: "Frontend Engineer",
  },
  {
    quote:
      "For larger repos, Nap stays reliable. It handles multi-file edits with much better context than most tools.",
    name: "Rithik M.",
    role: "Backend Developer",
  },
];

const faqs = [
  {
    q: "Is Nap local-first?",
    a: "Yes. Nap runs against local repositories and worktrees, with AI support layered in.",
  },
  {
    q: "Can teams use Nap for production code?",
    a: "Yes. Nap is built for daily engineering workflows including review, cleanup, and debugging.",
  },
  {
    q: "How does desktop auth work?",
    a: "You sign in through the website and the desktop app stores a refreshable auth session.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#07090D] text-[#E5E7EB]">
      <Header />

      <section className="relative p-0 m-0">
        <div className="hero-shell relative min-h-[78vh] w-full overflow-hidden p-0 m-0">
          <HeroOceanBackground />
          <div className="relative z-10 mx-auto max-w-6xl px-6 pb-16 pt-24 text-center sm:px-12 sm:pt-28 lg:px-20">
            <h1 className="text-4xl leading-[1.05] font-normal tracking-tight text-[#121417] sm:text-6xl lg:text-7xl">
              Build software with
              <span className="block text-[#121417]/72">fast agent workflows</span>
              <span className="block text-[#121417]/42">that stay clean and predictable.</span>
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-sm leading-relaxed text-[#3D4654] sm:text-base">
              Nap gives you an execution-focused coding assistant for real repositories.
              Prompt, inspect changes, and ship with control.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/api/download/mac"
                className="inline-flex items-center gap-2 rounded-md border border-[#111827] bg-[#111827] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
              >
                <Image src="/apple-icon.png" alt="apple" width={16} height={16} className="h-4 w-4" />
                Download for macOS
              </Link>
              <Link
                href="/features"
                className="inline-flex items-center rounded-md border border-[#D3D8DF] bg-white px-5 py-2.5 text-sm font-medium text-[#1F2937] transition hover:border-[#B7BEC9]"
              >
                Explore Features
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 pb-16 pt-10 sm:px-12 sm:pt-14 lg:px-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-[#DFE4EB] via-[#646F82] to-[#07090D]" />
        <h2 className="relative z-10 mb-8 text-center text-3xl font-normal tracking-tight text-[#E7EBF1] sm:text-4xl">
          See Nap in action
        </h2>
        <div className="relative z-10 overflow-hidden rounded-2xl">
          <Image
            src="/main.jpeg"
            width={1280}
            height={720}
            alt="Nap editor preview"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 sm:px-12 lg:px-20">
        <h2 className="mb-10 text-center text-3xl font-normal tracking-tight text-[#F3F4F6] sm:text-4xl">Features</h2>
        <div className="space-y-10">
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className={`grid items-center gap-6 lg:grid-cols-2 lg:gap-12 ${
                index % 2 === 1 ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""
              }`}
            >
              <div>
                <h3 className="text-2xl font-normal tracking-tight text-[#F3F4F6]">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#B8C0CC] sm:text-base">{feature.description}</p>
              </div>
              <div className="overflow-hidden rounded-xl">
                <Image
                  src={feature.image}
                  width={900}
                  height={600}
                  alt={feature.alt}
                  className="h-full w-full object-cover"
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 sm:px-12 lg:px-20">
        <h2 className="mb-8 text-center text-3xl font-normal tracking-tight text-[#F3F4F6] sm:text-4xl">FAQs</h2>
        <div className="grid gap-1">
          {faqs.map((item) => (
            <article key={item.q} className="border-b border-white/10 py-5 last:border-b-0">
              <h3 className="mb-2 text-base font-normal text-[#F3F4F6] sm:text-lg">{item.q}</h3>
              <p className="text-sm leading-relaxed text-[#B8C0CC]">{item.a}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 sm:px-12 lg:px-20">
        <h2 className="mb-8 text-center text-3xl font-normal tracking-tight text-[#F3F4F6] sm:text-4xl">
          What Developers Are Saying
        </h2>
        <div className="grid gap-4 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.name} className="rounded-xl border border-white/10 bg-[#0C1016] p-5">
              <p className="mb-4 text-sm leading-relaxed text-[#CBD5E1]">&quot;{item.quote}&quot;</p>
              <p className="text-sm font-normal text-[#F3F4F6]">{item.name}</p>
              <p className="text-xs text-[#98A2B3]">{item.role}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-12 sm:px-12 lg:px-20">
        <div className="relative overflow-hidden px-2 py-12 text-center sm:px-4">
          <HeroOceanBackground className="hero-ocean--cta" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_65%_at_50%_0%,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_70%)]" />
          <div className="relative z-10">
          <h2 className="mx-auto mb-5 max-w-2xl text-3xl font-normal tracking-tight text-[#F3F4F6] sm:text-4xl">
            Move from idea to reviewed code, without breaking your workflow.
          </h2>
          <div className="flex justify-center">
            <Link
              href="/api/download/mac"
              className="inline-flex items-center gap-2 rounded-md border border-[#F3F4F6] bg-[#F3F4F6] px-5 py-2.5 text-sm font-medium text-[#0B0F16] transition hover:opacity-90"
            >
              <Image src="/apple-icon.png" alt="apple" width={16} height={16} className="h-4 w-4" />
              Download for macOS
            </Link>
          </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
