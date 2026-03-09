import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import Header from "@/components/header";

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
    <main className="min-h-screen bg-[#F6F7F8] text-[#121417]">
      <Header />

      <section className="mx-auto max-w-7xl px-6 pb-12 pt-20 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-6 text-xs font-medium tracking-[0.18em] text-[#6B7280] uppercase">Nap Editor</p>
          <h1 className="text-4xl leading-[1.05] font-semibold tracking-tight text-[#121417] sm:text-6xl lg:text-7xl">
            Build software with
            <span className="block text-[#121417]/72">fast agent workflows</span>
            <span className="block text-[#121417]/42">that stay clean and predictable.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-sm leading-relaxed text-[#525866] sm:text-base">
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
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 sm:px-12 lg:px-20">
        <div className="overflow-hidden rounded-2xl border border-[#E4E7EC] bg-white shadow-[0_20px_60px_rgba(17,24,39,0.08)]">
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
        <div className="mb-10 text-center text-[11px] font-medium tracking-[0.2em] text-[#7A818E] uppercase">Features</div>
        <div className="space-y-10">
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className={`grid items-center gap-6 rounded-2xl border border-[#E6E9EF] bg-white p-4 sm:p-6 lg:grid-cols-2 lg:gap-10 ${
                index % 2 === 1 ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""
              }`}
            >
              <div>
                <h3 className="text-2xl font-semibold tracking-tight text-[#111827]">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#4B5563] sm:text-base">{feature.description}</p>
              </div>
              <div className="overflow-hidden rounded-xl border border-[#E6E9EF] bg-[#F9FAFB]">
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
        <div className="mb-8 text-center text-[11px] font-medium tracking-[0.2em] text-[#7A818E] uppercase">FAQs</div>
        <div className="grid gap-3">
          {faqs.map((item) => (
            <article key={item.q} className="rounded-xl border border-[#E6E9EF] bg-white p-5">
              <h3 className="mb-2 text-sm font-semibold text-[#111827] sm:text-base">{item.q}</h3>
              <p className="text-sm leading-relaxed text-[#4B5563]">{item.a}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 sm:px-12 lg:px-20">
        <div className="mb-8 text-center text-[11px] font-medium tracking-[0.2em] text-[#7A818E] uppercase">
          What Developers Are Saying
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.name} className="rounded-xl border border-[#E6E9EF] bg-white p-5">
              <p className="mb-4 text-sm leading-relaxed text-[#374151]">&quot;{item.quote}&quot;</p>
              <p className="text-sm font-semibold text-[#111827]">{item.name}</p>
              <p className="text-xs text-[#6B7280]">{item.role}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-12 sm:px-12 lg:px-20">
        <div className="rounded-2xl border border-[#E6E9EF] bg-[linear-gradient(180deg,#FFFFFF_0%,#F9FAFB_100%)] px-6 py-12 text-center sm:px-12">
          <p className="mb-3 text-[11px] font-medium tracking-[0.2em] text-[#7A818E] uppercase">For developers shipping every week</p>
          <h2 className="mx-auto mb-5 max-w-2xl text-2xl font-semibold tracking-tight text-[#111827] sm:text-3xl">
            Move from idea to reviewed code, without breaking your workflow.
          </h2>
          <div className="flex justify-center">
            <Link
              href="/api/download/mac"
              className="inline-flex items-center gap-2 rounded-md border border-[#111827] bg-[#111827] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
            >
              <Image src="/apple-icon.png" alt="apple" width={16} height={16} className="h-4 w-4" />
              Download for macOS
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
